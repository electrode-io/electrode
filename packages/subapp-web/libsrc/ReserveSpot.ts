
export const ReserveSpot = (props: any, context: any) => {
  if (props.saveId) {
    const spot = context.output.reserve();
    context.user[props.saveId] = spot;
  }
};
