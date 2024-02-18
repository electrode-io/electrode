import fs from "opfs";
import prompts from "prompts";

export async function checkDir(dirName: string) {
  const existDirFiles = await fs.readdir(process.cwd());
  if (existDirFiles.length > 0) {
    const response = await prompts({
      type: "confirm",
      name: "overwrite",
      message: `Your directory '${dirName}' is not empty, write to it?`,
    });

    return response.overwrite;
  }

  return true;
}
