import d3 from 'd3';

export const arc = d3.svg.arc()
  .startAngle(d => angle(d.x))
  .endAngle(d => angle(d.x + Math.max(d.dx - 0.025, 0.0125)))
  .innerRadius(d => Math.sqrt(d.y))
  .outerRadius(d => Math.sqrt(d.y + d.dy * 0.65))

export const initArc = d3.svg.arc()
  .startAngle(d => angle(d.x))
  .endAngle(d => angle(d.x + d.dx))
  .innerRadius(d => Math.sqrt(d.y))
  .outerRadius(d => Math.sqrt(d.y))

export const angle = (x) => x

// Modified version of d3's built-in bounce easing method:
// https://github.com/mbostock/d3/blob/51228ccc4b54789f2d92d268e94716d1c016c774/src/interpolate/ease.js#L105-110
export const bounceHigh = (t) => t < 1 / 2.75 ? 7.5625 * t * t
  : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .65
  : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .85
  : 7.5625 * (t -= 2.625 / 2.75) * t + .975;

export const arcTween = (a) => {
  const i = d3.interpolate({x: a.x0, dx: a.dx0}, a)
  return (t) => {
    const b = i(t)
    a.x0 = b.x
    a.dx0 = b.dx
    return arc(b)
  }
}

//
// A more complex arc tween for handling
// hover states. Returns a tween function
// which returns an interpolator for each
// datum.
//
export const hoverTween = (z) => {
  let ht = 0
  const harc = d3.svg.arc()
    .startAngle(d => angle(d.x))
    .endAngle(d => angle(d.x
        + (1 - ht) * Math.max(d.dx - 0.025, 0.0125)
        + ht * (d.dx + 0.00005)
      )
    )
    .innerRadius(d => Math.sqrt(d.y))
    .outerRadius(d => Math.sqrt(d.y + d.dy * (ht * 0.35 + 0.65)) + ht)

  return (a) => {
    a.t0 = a.t3 = a.t0 || 0
    a.t1 = z
    a.t2 = a.t1 - a.t0
    return (_t) => {
      ht = a.t2 * _t + a.t3
      a.t0 = ht
      return harc(a)
    }
  }
}

//
// Makes it possible to rotate
// angles greater than 180 degrees :)
//
export const rotateTween = (deg) => {
  return (d) => {
    return (t) => 'rotate(' + (1-t) * deg + ')'
  }
}
