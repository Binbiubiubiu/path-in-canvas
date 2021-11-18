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

```js
import pathInCanvas from 'path-in-canvas';

const text =
  "M 153.2323 334 C153.1 334.23 151 334 151 334 C151 339 153 344 156 344 C164 344 171 339 171 334 C171 322 164 314 156 314 C142 314 131 322 131 334 C131 350 142 364 156 364 C175 364 191 350 191 334 C191 311 175 294 156 294 C131 294 111 311 111 334 C111 361 131 384 156 384 C186 384 211 361 211 334 C211 300 186 274 156 274";
const canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;
canvas.style = `width:${canvas.width}px;height:${canvas.height}px;`;
document.body.append(canvas);

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#f00";
pathInCanvas.drawPath(ctx,text,{debug:true});
ctx.stroke();
```