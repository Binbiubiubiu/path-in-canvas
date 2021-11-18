# path-in-canvas

``` js
const d = "M 153 334 C153 334 151 334 151 334 ";

// =============== transform ===============

ctx.moveTo(153,334)
ctx.bezierCurveTo(153,334,151,334,151,334)

```

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath

# Usage

``` shell
npm install path-in-canvas
```
or
``` shell
yarn add path-in-canvas
```