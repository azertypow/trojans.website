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
