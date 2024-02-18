import Fs from "opfs";
import Path from "path";
import { readFile } from "fs/promises";

const __filename = new URL(import.meta.url).pathname;
const __dirname = Path.dirname(__filename);

export async function prepareAppDir() {
  const filePathLocation = Path.resolve(
    Path.join(
      __dirname,
      "..",
      "package.json"
    )
  );

  const pkg = JSON.parse(await readFile(filePathLocation, 'utf-8'));
  const pkgName = pkg.name;
  const appDirName = process.argv[2];
  if (!appDirName) {
    console.log(`
Usage: ${pkgName} <app-directory>

  - pass '.' to use current directory
`);
    process.exit(1);
  }

  if (appDirName === ".") {
    const dirName = Path.basename(process.cwd());
    console.log(`Using current directory '${dirName}' to create app`);
    return dirName;
  }

  try {
    await Fs.mkdir(appDirName);
  } catch (err) {
    if (err.code !== "EEXIST") {
      console.log(`Failed to create app directory '${appDirName}'`);
      process.exit(1);
    }
  }

  process.chdir(appDirName);

  return appDirName;
}
