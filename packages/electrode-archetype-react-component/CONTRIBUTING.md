Contributing
============

Thanks for helping out!

## Dependencies

We have a three-way dependency scheme:

* `package.json:dependencies`: Production dependencies for the archetype
  installed in a project.
* `dev/package.json:dependencies`: Development dependencies for the archetype
  installed in a project.
* `package.json:devDependencies`: The development dependencies used _internally_
  for the this archetype during development (self tests, checks, etc.) that
  are **not** part of the overall archeype outside workflow.

## Checks, Tests

Ideally, we have CI do all this for us. For _now_, before opening a PR you must
do all of the following steps:

Check the archetype configs:

```sh
$ npm run builder:check
```

Check a fresh init'ed project:

```sh
$ npm install -g builder-init
$ cd /TEMP/DIR
$ builder-init /PATH/TO/ARCHETYPE
(answer prompts)
$ cd NEW_PROJ
$ npm install
$ builder run check-cov
```

## Documentation

To generate the usage snippet in the `README.md`, run:

```sh
$ builder help electrode-archetype-react-component
```

in any project where this archetype is installed and paste in the output.

# Release

For tagged official releases _only_, make sure to:

1. Update appropriate `CHANGELOG.md` notes
2. Bump `package.json` version
3. Generate a new `ARCHETYPE-dev` `package.json`
4. Add to git, tag, and publish

```sh
$ vim CHANGELOG.md              # Version notes
$ vim package.json            # Bump version
$ npm run builder:prepublish  # Generate `dev/package.json`
$ npm run builder:check       # Last check!
$ git add package.json dev CHANGELOG.md
$ git commit -m "Version bump"
$ git tag -a "vNUMBER" -m "Version NUMBER"
$ git push && git push --tags
$ npm publish                 # Publish main project
$ cd dev && npm publish       # Publish dev project
```
