/* eslint-disable filenames/match-regex */

export function ReserveSpot(props: any, context: any) {
  if (props.saveId) {
    const spot = context.output.reserve();
    context.user[props.saveId] = spot;
  }
}
