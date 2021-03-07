/*
 * Looks at each commit that is not a "Merge pull request", figure out
 * the packages it modified and group the commit messages by package.
 *
 * Then check for [major], [minor], [patch] in the commit message, and
 * automatically generate the new package tag name with the would be
 * updated version.
 *
 * Write all these to the file CHANGELOG.md.
 *
 */

const Fs = require("fs");
const xsh = require("xsh");
const Path = require("path");
const assert = require("assert");
const Promise = require("bluebird");
const semver = require("semver");
xsh.Promise = Promise;
xsh.envPath.addToFront(Path.join(__dirname, "../node_modules/.bin"));
const _ = require("lodash");

const changeLogFile = Path.resolve("CHANGELOG.md");
const changeLog = Fs.readFileSync(changeLogFile).toString();
let gitClean = false;

const versionLocking = [
  ["@xarc/app", "@xarc/app-dev"],
  ["electrode-archetype-webpack-dll", "electrode-archetype-webpack-dll-dev"]
];

const versionLockMap = versionLocking.reduce((mapping, locks) => {
  locks.forEach(name => (mapping[name] = locks));
  return mapping;
}, {});

const checkGitClean = () => {
  return xsh
    .exec(`git diff --quiet`)
    .then(() => (gitClean = true))
    .catch(() => (gitClean = false));
};

const removeNpmScope = name => {
  if (name.startsWith("@")) {
    const parts = name.split("/");
    if (parts.length === 2) {
      return parts[0].substr(1) + "-" + parts[1];
    }
  }

  return name;
};

const processLerna2Updated = output => {
  /*
lerna info version 2.11.0
lerna info versioning independent
lerna info Checking for updated packages...
lerna info Comparing with rel-v8-20201202.
lerna info Checking for prereleased packages...
lerna info result
- electrode-react-webapp
- subapp-server
- @xarc/app-dev
- @xarc/index-page
- @xarc/jsx-renderer
- @xarc/render-context
- @xarc/tag-renderer
  */

  // search for last commit that's Publish using lerna
  const lernaInfo = output.stderr.split("\n");
  const tagSig = "Comparing with";
  let tagIndex;
  let tagLine = lernaInfo
    .find(x => {
      tagIndex = x.indexOf(tagSig);
      return tagIndex >= 0;
    })
    .trim();

  if (tagLine.endsWith(".")) {
    tagLine = tagLine.substr(0, tagLine.length - 1);
  }

  assert(tagLine, "Can't find last publish tag from lerna");
  const tag = tagLine.substr(tagIndex + tagSig.length).trim();
  const packages = output.stdout
    .split("\n")
    .filter(x => x.trim().length > 0)
    .map(x => x.substr(2).split(" ")[0]);
  return { tag, packages };
};

const processLerna3Updated = output => {
  /*
lerna notice cli v3.22.1
lerna info versioning independent
lerna info Looking for changed packages since rel-v8-20201202
electrode-react-webapp
subapp-server
@xarc/app-dev
@xarc/index-page
@xarc/jsx-renderer
@xarc/render-context
@xarc/tag-renderer
lerna success found 7 packages ready to publish
*/

  // search for last commit that's Publish using lerna
  // find git tag used to determine last publish from lerna's info
  const lernaInfo = output.stderr.split("\n");
  const tagSig = "Looking for changed packages since";
  let tagIndex;
  let tagLine = lernaInfo
    .find(x => {
      tagIndex = x.indexOf(tagSig);
      return tagIndex >= 0;
    })
    .trim();

  if (tagLine.endsWith(".")) {
    tagLine = tagLine.substr(0, tagLine.length - 1);
  }

  assert(tagLine, "Can't find last publish tag from lerna");
  const tag = tagLine.substr(tagIndex + tagSig.length).trim();

  const pkgGraph = JSON.parse(output.stdout);
  const packages = Object.keys(pkgGraph);

  if (packages.length > 0) {
    console.log(
      `detected from lerna: since tag '${tag}', these packages changed: ${packages.join(" ")}`
    );
  } else {
    console.log(`no packages changed since tag '${tag}'`);
  }

  return { tag, packages, pkgGraph };
};

const listGitCommits = updated => {
  const tag = updated.tag;
  return xsh
    .exec(true, `git log ${tag}...HEAD --pretty=format:'%H %s'`)
    .then(output => {
      const commits = output.stdout.split("\n").filter(x => {
        return !x.startsWith("Merge pull request #") && !x.includes("[no-changelog]");
      });
      return commits.reduce(
        (a, x) => {
          const idx = x.indexOf(" ");
          const id = x.substr(0, idx);
          a.ids.push(id);
          a[id] = x.substr(idx + 1);
          return a;
        },
        { updated, ids: [] }
      );
    })
    .then(commits => {
      if (changeLog.indexOf(commits.ids[0]) >= 0) {
        console.log("change log already contain a commit from new commits");
        process.exit(1);
      }
      return { commits, updated };
    });
};

const collateCommitsPackages = ({ commits, updated }) => {
  const commitIds = commits.ids;
  const collated = {
    realPackages: [],
    packages: {},
    samples: {},
    others: {},
    files: {},
    updated
  };

  return Promise.map(
    commitIds,
    id => {
      // any package that was affected by at least one commit is add to collated.realPackages
      return xsh.exec(true, `git diff-tree --no-commit-id --name-only -r ${id}`).then(output => {
        // determine packages changed
        const files = output.stdout.split("\n").filter(x => x.trim().length > 0);
        const handled = { packages: {}, samples: {}, others: {}, files: {} };
        files.reduce((a, x) => {
          const parts = x.split("/");
          const add = (group, key) => {
            if (handled[group][key]) return;
            if (!a[group][key]) {
              a[group][key] = { msgs: [] };
            }
            a[group][key].msgs.push({ m: commits[id], id });
            handled[group][key] = true;
          };

          if (parts[0] === "packages" || parts[0] === "samples") {
            if (Fs.existsSync(Path.resolve("packages", parts[1]))) {
              const Pkg = require(Path.resolve("packages", parts[1], "package.json"));
              if (parts[0] === "packages" && collated.realPackages.indexOf(Pkg.name) < 0) {
                collated.realPackages.push(Pkg.name);
              }
              add(parts[0], Pkg.name);
            }
          } else if (parts.length > 1) {
            add("others", parts[0]);
          } else {
            add("files", parts[0]);
          }

          return a;
        }, collated);
        return "";
      });
    },
    { concurrency: 1 }
  ).then(() => {
    // collated.forcePackages = collated.realPackages.filter(
    //   r => commits.updated.packages.indexOf(r) < 0
    // );
    return collated;
  });
};

const determinePackageVersions = collated => {
  const types = ["patch", "minor", "major"];

  const findVersion = (name, packages, minBumpType = -1) => {
    packages[name] = packages[name] || {};
    const msgs = packages[name].msgs || [];
    const updateType = msgs.reduce((a, x) => {
      if (x.m.includes("[no-rel")) {
        // no release
      } else if (x.m.includes("[maj")) {
        if (a < 2) {
          a = 2;
        }
      } else if (x.m.includes("[min")) {
        if (a < 1) {
          a = 1;
        }
      } else if (a < 0) {
        a = 0;
      }
      return a;
    }, minBumpType);

    const pkgDir = removeNpmScope(name);
    const Pkg = require(Path.resolve("packages", pkgDir, "package.json"));
    packages[name].version = Pkg.version;
    const x = semver.parse(Pkg.version);
    packages[name].versionOnly = `${x.major}.${x.minor}.${x.patch}`;
    packages[name].semver = x;
    packages[name].originalPkg = Pkg;
    packages[name].updateType = updateType;

    if (updateType >= 0) {
      packages[name].newVersion = semver.inc(packages[name].versionOnly, types[updateType]);
    }

    return name;
  };

  return Promise.resolve().then(() => {
    // update versions for packages that have direct changes
    collated.realPackages.forEach(name => findVersion(name, collated.packages));

    // update any package that depend on a directly bumped package with the same bump type
    const { updated } = collated;
    let count = 0;
    const indirectBumps = [];

    // check for version locking of direct bump packages
    collated.realPackages.filter(pkgName => {
      const verLocks = versionLockMap[pkgName];
      if (verLocks) {
        console.log("verLocks", pkgName, verLocks);
        for (const lockPkgName of _.without(verLocks, pkgName)) {
          if (!collated.realPackages.includes(lockPkgName)) {
            collated.realPackages.push(lockPkgName);
            findVersion(lockPkgName, collated.packages, collated.packages[pkgName].updateType);
            return true;
          }
        }
      }
      return false;
    });

    const directBumps = collated.realPackages.filter(
      name => collated.packages[name] && collated.packages[name].newVersion
    );

    do {
      count = 0;
      updated.packages.map(name => {
        const pkg = collated.packages[name];
        if (!pkg || !pkg.newVersion) {
          // does pkg dep on a bumped pkg?
          const deps = updated.pkgGraph[name];
          const bumpDeps = deps
            .map(depName => collated.packages[depName])
            .filter(x => x && x.newVersion);
          if (bumpDeps.length > 0) {
            count++;
            const minBumpType = _.max(bumpDeps.map(x => x.updateType));
            findVersion(name, collated.packages, minBumpType);
            indirectBumps.push(name);
          }
        }
      });
    } while (count > 0);

    // check for version locking of indirect bump packages
    const indirectLockBumps = indirectBumps.filter(pkgName => {
      const verLocks = versionLockMap[pkgName];
      if (verLocks) {
        for (const lockPkgName of _.without(verLocks, pkgName)) {
          if (!indirectBumps.includes(lockPkgName)) {
            findVersion(lockPkgName, collated.packages, collated.packages[pkgName].updateType);
            return true;
          }
        }
      }
      return false;
    });

    indirectBumps.push(...indirectLockBumps);

    collated.directBumps = directBumps;
    collated.indirectBumps = indirectBumps;

    return collated;
  });
};

const lernaRc = require("../lerna.json");

const getTaggedVersion = pkg => {
  const newVer = pkg.newVersion;

  const fynpoTags = _.get(lernaRc, "command.publish.tags");
  if (fynpoTags) {
    for (const tag in fynpoTags) {
      if (!tag.match(/^[0-9A-Za-z-]+$/)) {
        throw new Error(`tag ${tag} invalid. Only [0-9A-Za-z-] characters allowed.`);
      }
      const tagInfo = fynpoTags[tag];
      if (tagInfo.enabled === false) continue;
      let enabled = _.get(tagInfo, ["packages", pkg.originalPkg.name]);
      if (enabled === undefined && tagInfo.regex) {
        enabled = Boolean(tagInfo.regex.find(r => new RegExp(r).exec(pkg.originalPkg.name)));
      }
      if (enabled) {
        if (tag !== "latest" && tagInfo.addToVersion) {
          const semv = pkg.semver;
          if (semv.prerelease[0] && semv.prerelease[0] === tag) {
            return semv.inc("prerelease").format();
          }
          return `${pkg.newVersion}-${tag}.0`;
        }
      }
    }
  }

  return newVer;
};

const updateChangelog = collated => {
  const d = new Date();
  const output = [];
  const hasIndirectBumps = collated.indirectBumps.length > 0;
  output.push(`# ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}\n\n## Packages\n\n`);
  if (hasIndirectBumps) {
    output.push(`### Directly Updated\n\n`);
  }
  const emitPackageMsg = (pkgName, packages) => {
    const pkg = packages[pkgName];
    if (!pkg.newVersion) return "";
    const newVer = getTaggedVersion(pkg);
    if (pkg.originalPkg.private) return "";
    return `- \`${pkgName}@${newVer}\` ` + "`" + `(${pkg.version} => ${newVer})` + "`\n";
  };

  const directUpdateLines = collated.directBumps
    .sort()
    .map(p => emitPackageMsg(p, collated.packages))
    .filter(x => x);
  output.push(...directUpdateLines);

  if (hasIndirectBumps) {
    const indirectUpdateLines = collated.indirectBumps
      .sort()
      .map(p => emitPackageMsg(p, collated.packages))
      .filter(x => x);
    output.push("\n### Lerna Updated\n\n", ...indirectUpdateLines);
  }
  output.push(`\n## Commits\n\n`);

  const commitUrl = "http://github.com/electrode-io/electrode/commit";

  const prUrl = "https://github.com/electrode-io/electrode/pull";

  const linkifyPR = x => x.replace(/\(#([0-9]+)\)$/, `([#$1](${prUrl}/$1))`);

  const emitCommitMsg = msg => {
    emitCommitMsg[msg.id] = true;
    output.push(`  - ${linkifyPR(msg.m)} [commit](${commitUrl}/${msg.id})\n`);
  };

  const outputCommitMsgs = (items, prefix) => {
    const keys = Object.keys(items);
    if (keys.length === 0) return;
    keys.sort().forEach(p => {
      const pkg = items[p];
      if (!pkg.msgs || pkg.msgs.length === 0) return;
      output.push("- `" + prefix + removeNpmScope(p) + "`\n\n");
      pkg.msgs.slice().reverse().forEach(emitCommitMsg);
      output.push("\n");
    });
  };

  const outputPkgCommitMsgs = (group, prefix) => {
    const items = collated[group];
    outputCommitMsgs(items, prefix ? group + "/" : "");
  };

  outputPkgCommitMsgs("packages", true);
  outputPkgCommitMsgs("samples", true);
  outputPkgCommitMsgs("others", false);
  const filesItems = Object.keys(collated.files).reduce(
    (a, x) => {
      a.MISC.msgs = a.MISC.msgs.concat(
        collated.files[x].msgs.filter(msg => {
          if (!emitCommitMsg[msg.id]) {
            return (emitCommitMsg[msg.id] = true);
          }
          return false;
        })
      );
      return a;
    },
    { MISC: { msgs: [] } }
  );
  outputCommitMsgs(filesItems, "");

  const updateText = output.join("");
  Fs.writeFileSync(changeLogFile, `${updateText}${changeLog}`);
};

const showPublishInfo = collated => {
  console.log(
    "publish command: node_modules/.bin/lerna publish",
    (collated.forcePackages || []).map(p => `--force-publish ${p}`).join(" ")
  );
  const majorBumps = collated.realPackages.filter(pkgName => {
    const pkg = collated.packages[pkgName];
    if (!pkg.newVersion) return false;
    return pkg.newVersion.split(".")[0] > pkg.version.split(".")[0];
  });
  const majorArchetypes = majorBumps.filter(p => p.startsWith("electrode-archetype-react"));
  if (majorArchetypes.length > 0) {
    console.log(
      `\nThese archetypes had major bumps:\n\n${majorArchetypes.join("\n")}`,
      "\n\nBefore publishing, make sure:",
      "\n\n- generator-electrode is updated",
      "\n- The -dev archetype's peer dep is updated\n"
    );
  }
};

const commitChangeLogFile = clean => {
  console.log("Change log updated.");
  if (!gitClean) {
    console.log("Your git branch is not clean, skip committing changelog file");
    return;
  }

  return xsh
    .exec(`git add ${changeLogFile} && git commit -m "Update changelog"`)
    .then(() => {
      console.log("Changelog committed");
    })
    .catch(e => {
      console.log("Commit changelog failed", e);
    });
};

xsh
  .exec(true, `lerna updated --graph`)
  .then(processLerna3Updated)
  .then(listGitCommits)
  .then(collateCommitsPackages)
  .then(determinePackageVersions)
  .tap(checkGitClean)
  .tap(updateChangelog)
  .then(showPublishInfo)
  .then(commitChangeLogFile);
