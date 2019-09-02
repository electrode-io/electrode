export default function(info) {
  if (!info.name) {
    throw new Error(`subapp info missing name`);
  }

  if (!info.Component) {
    throw new Error(`subapp info missing Component`);
  }

  return info;
}
