export default function(info) {
  // user is directly loading a component as subapp
  if (typeof info === "function") {
    info = {
      name: info.name,
      Component: info
    };
  }

  if (!info.Component) {
    throw new Error(`subapp info missing Component`);
  }

  if (!info.name) {
    info.name = info.Component.name;
  }

  if (!info.name) {
    throw new Error(`subapp info missing name`);
  }

  return info;
}
