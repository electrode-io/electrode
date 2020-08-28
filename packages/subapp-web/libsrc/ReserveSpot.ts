"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ReserveSpo... Remove this comment to see the full error message
const ReserveSpot = (props, context) => {
  if (props.saveId) {
    const spot = context.output.reserve();
    context.user[props.saveId] = spot;
  }
};

module.exports = ReserveSpot;
