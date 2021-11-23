const ACTION = "MLHVCSQTZ";
const ACTION_REGEXP = new RegExp(
  `[${ACTION}]([\\s,]*\\-?\\d+(\\.\\d)?[\\s,]*)*`,
  "g"
);
let debugFlag = false; 

/**
 * 调试
 * @param args 
 * @returns 
 */
const debug = (...args: unknown[]) => {
  if (!debugFlag) return;
  console.log(...args);
};

/**
 * 校验操作是否合法
 * @param a 
 * @returns 
 */
export const validatePathAction = (a: string) => {
  if (!ACTION.includes(a)) {
    throw new Error(`unknown action: ${a}`);
  }
  return a;
};

/**
 * 解析path
 * @param path 
 * @returns 
 */
export const parsePathActions = (path:string)=>{
  const steps = path.match(ACTION_REGEXP);
  debug("parsed steps", steps);
  const actions = steps.map(item => {
    const action = validatePathAction(item[0]);
    return {
      action,
      num: item
        .slice(1)
        .split(/[\s,]/)
        .filter(Boolean)
        .map(Number)
    };
  });
  debug("parsed actions", actions);
  return actions;
}

const DEFAULT_OPTION = {
  debug: false
};

/**
 * 绘制
 * @param ctx 
 * @param path 
 * @param ops 
 */
export function drawPath(
  ctx: CanvasRenderingContext2D,
  path: string,
  ops = DEFAULT_OPTION
) {
  debugFlag = ops.debug;
  let actions = parsePathActions(path);

  ctx.beginPath();
  let lastPoint = [0, 0];
  for (let i = 0; i < actions.length; i++) {
    const [la, lb] = lastPoint;
    const { action, num } = actions[i];
    const [a, b, c, d, e, f] = num;
    switch (action) {
      case "M":
        ctx.moveTo(a, b);
        debug(`ctx.moveTo(${a}, ${b})`);
        lastPoint = [a, b];
        continue;
      case "L":
        ctx.lineTo(a, b);
        debug(`ctx.lineTo(${a}, ${b})`);
        lastPoint = [a, b];
        continue;
      case "H":
        ctx.lineTo(a, lb);
        debug(`ctx.lineTo(${a}, ${lb})`);
        lastPoint = [a, lb];
        continue;
      case "V":
        ctx.lineTo(la, b);
        debug(`ctx.lineTo(${la}, ${lb})`);
        lastPoint = [la, b];
        continue;
      case "C":
        ctx.bezierCurveTo(a, b, c, d, e, f);
        debug(`ctx.bezierCurveTo(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`);
        lastPoint = [e, f];
        continue;
      case "S":
        ctx.bezierCurveTo(la, lb, a, b, c, d);
        debug(`ctx.bezierCurveTo(${la}, ${lb}, ${a}, ${b}, ${c}, ${d})`);
        lastPoint = [c, d];
        continue;
      case "Q":
        ctx.quadraticCurveTo(a, b, c, d);
        debug(`ctx.quadraticCurveTo(${a}, ${b}, ${c}, ${d})`);
        lastPoint = [c, d];
        continue;
      case "T":
        ctx.quadraticCurveTo(la, lb, a, b);
        debug(`ctx.quadraticCurveTo(${la}, ${lb}, ${a}, ${b})`);
        lastPoint = [a, b];
        continue;
      case "Z":
        ctx.closePath();
        debug('ctx.closePath()');
        break;
    }
  }
}
