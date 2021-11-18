const ACTION = "MLHVCSQTZ";
const ACTION_REGEXP = new RegExp(
  `[${ACTION}](\\s*\\-?\\d+(\.\\d)?\\s*)*`,
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
export const validateAction = (a: string) => {
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
export const parseSteps = (path:string)=>{
  const actions = path.match(ACTION_REGEXP);
  debug("parsed actions", actions);
  const steps = actions.map(item => {
    const action = validateAction(item[0]);
    return {
      action,
      num: item
        .slice(1)
        .split(" ")
        .filter(Boolean)
        .map(Number)
    };
  });
  debug("parsed steps", steps);
  return steps;
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
export default function(
  ctx: CanvasRenderingContext2D,
  path: string,
  ops = DEFAULT_OPTION
) {
  debugFlag = ops.debug;
  let steps = parseSteps(path);

  ctx.beginPath();
  let lastPoint = [0, 0];
  for (let i = 0; i < steps.length; i++) {
    const [la, lb] = lastPoint;
    const { action, num } = steps[i];
    const [a, b, c, d, e, f] = num;
    switch (action) {
      case "M":
        ctx.moveTo(a, b);
        lastPoint = [a, b];
        continue;
      case "L":
        ctx.moveTo(a, b);
        lastPoint = [a, b];
        continue;
      case "H":
        ctx.moveTo(a, lb);
        lastPoint = [a, lb];
        continue;
      case "V":
        ctx.moveTo(la, b);
        lastPoint = [la, b];
        continue;
      case "C":
        ctx.bezierCurveTo(a, b, c, d, e, f);
        lastPoint = [e, f];
        continue;
      case "S":
        ctx.bezierCurveTo(la, lb, a, b, c, d);
        lastPoint = [c, d];
        continue;
      case "Q":
        ctx.quadraticCurveTo(a, b, c, d);
        lastPoint = [c, d];
        continue;
      case "T":
        ctx.quadraticCurveTo(la, lb, a, b);
        lastPoint = [a, b];
        continue;
      case "Z":
        ctx.closePath();
        break;
    }
  }
}
