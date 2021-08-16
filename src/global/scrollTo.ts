import {easeLinear} from "@/lib/easing"

interface ScrollToParams {
  durationTime: number
  startingScrollPosition: number
  valueToAddedOnScroll: number
  elementToScroll: HTMLElement
}

export function scrollElementTo({
                           durationTime,
                           startingScrollPosition,
                           valueToAddedOnScroll,
                           elementToScroll,
                         }: ScrollToParams
) {

  const framePerSecond = 60
  const totalFrameNumber = framePerSecond * durationTime

  let frameNumber = 0

  function scrollPositionCalculation() {
    const currentScrollValue = easeLinear({
      time: frameNumber,
      duration: totalFrameNumber,
      startValue: startingScrollPosition,
      addedValue: valueToAddedOnScroll,
    })

    elementToScroll.scroll({
      top: 0,
      left: currentScrollValue,
    })

    frameNumber++

    if (frameNumber <= totalFrameNumber)
      requestAnimationFrame(() => {
        scrollPositionCalculation()
      })
  }

  scrollPositionCalculation()

}
