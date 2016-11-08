var extname = require('path').extname
var d3 = require('d3')

var schemes = []

var original = {
    name: 'Original'
  , background: '#6A4A3C'
  , specials: {
    node_modules: '#FF8553'
  }
  , main: [
      '#00A0B0'
    , '#CC333F'
    , '#EB6841'
    , '#EDC951'
  ]
}

original.main = []
  .concat(original.main.map(lighten(0.7)))
  .concat(original.main.map(lighten(1.4)))
  .concat(original.main.map(lighten(2.0)))

var highlights = {
    name: 'Structure Highlights'
  , background: '#1A1C1E'
  , specials: {
      node_modules: '#E1F200'
    , lib: '#FF9D3C'
  }
  , main: [
      '#8E99A4'
    , '#F7F7F7'
    , '#6C747C'
  ]
}

var pastel = {
    name: 'Pastel'
  , background: '#362F34'
  , specials: {}
  , main: [
      '#D05931'
    , '#3E8FE9'
    , '#2AB256'
    , '#F8DD3D'
  ]
}

pastel.main = []
  .concat(pastel.main.map(lighten(2.8)))
  .concat(pastel.main.map(lighten(2)))

var typeScale = d3.scale.ordinal()
  .range([
      '#5A5B8F'
    , '#FFE53D'
    , '#47F0FF'
    , '#CD6FF2'
    , '#EB6E6A'
    , '#EB9D6A'
    , '#528AF2'
  ])

var types = {
    name: 'File Types'
  , background: '#160F1F'
  , specials: {}
  , main: typeScale.range()
  , modifier: function(color, root) {
    return typeScale(extname(this.name))
  }
}

schemes.push(
    original
  , highlights
  , pastel
  , types
)

function lighten(n) {
  return function(c) {
    return String(d3.rgb(c).brighter(n))
  }
}

function identity(a) {
  return a
}

module.exports = schemes.map(function(d) {
  d.all = d.main.slice()

  Object.keys(d.specials).forEach(function(s) {
    d.all.push(d.specials[s])
  })

  d.modifier = d.modifier || identity

  return d
})
