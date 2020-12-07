import fs from "fs";
import Promise from "bluebird";
import path from "path";

const readFile = Promise.promisify(fs.readFile);

export default async function(/*options*/) {
  let storage;

  try {
    const x = await readFile(path.resolve("data/storage.json"));
    storage = JSON.parse(x);
  } catch (err) {
    storage = {};
  }

  return {
    reducer: {},
    initialState: {
      visibilityFilter: storage.visibilityFilter,
      todos: storage.todos
    }
  };
}
