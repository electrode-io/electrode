"use strict";

const ReserveSpot = (props, context) => {
  if (props.saveId) {
    const spot = context.output.reserve();
    context.user[props.saveId] = spot;
  }
};

module.exports = ReserveSpot;
