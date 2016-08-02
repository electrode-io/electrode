"use strict";

/**
 * There is a full range of gulp tasks defined in the above archetype
 * but here is a concise list of most often used gulp tasks at the
 * component level
 *
 * TODO: insert link to the github gulp tasks in the archetype
 *
 * Tasks:
 * "demo": ["generate", "server-dev"],
 * "demo-iso": ["dev-iso"],
 * "generate": ["generate-metadata", "generate-documentation"],
 *
 * TODO: convert the following to gulp tasks and pass them to the archetype gulp file
 * TODO: OSS electrode-docgen
 * "generate-documentation": "electrode-docgen --package ./package.json --src ./src --markdown components.md",
 * "generate-metadata": "electrode-docgen --package ./package.json --src ./src --metadata components.json",
 *
 * "prepublish": ["npm:prepublish"],
 * "preversion": ["check-cov"]
 */

const tasks = {
  "demo": ["generate", "server-dev"],
  "demo-iso": ["dev-iso"],
  "generate": ["generate-metadata", "generate-documentation"],
  "generate-documentation": () => exec(`electrode-docgen --package ./package.json --src ./src --markdown components.md`),
  "generate-metadata": () => exec(`electrode-docgen --package ./package.json --src ./src --metadata components.json`),
  "prepublish": ["npm:prepublish"],
  "preversion": ["check-cov"]
}

require("electrode-archetype-react-component")(tasks);
