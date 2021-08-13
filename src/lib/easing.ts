/**
 * simple easing TS/JS function tools
 *
 * inspired by
 *
 * https://spicyyoghurt.com/tools/easing-functions
 * https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 */

interface IEaseLinearParams {
  time: number
  startValue: number
  addedValue: number
  duration: number
}

export function easeLinear({
                             time,
                             startValue,
                             addedValue,
                             duration,
                           }: IEaseLinearParams
) {
  return addedValue * time / duration + startValue
}
