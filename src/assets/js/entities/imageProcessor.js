import { getCanvas } from '../utils/image'
import sunglass from '../utils/sunglass'
import colors from '../constants/colors'

export default class ImageProcessor {
  constructor() {}

  /**
   * @description:  Resize image, filter with sunglass
   * @param {Image} srcImage
   * @param {number} distWidth target width
   * @param {number} distHeight target height
   * @return: {Image} sunglass filtered result of distWidth and distHeight
   */
  doSunglass(srcImage, distWidth, distHeight) {
    const resized = this._resize(srcImage, distWidth, distHeight)
    const canvas = sunglass(resized, colors.palette)
    return canvas.toDataURL()
  }

  /**
   * @description: Resize image, return canvas
   * @param {Image} srcImage
   * @param {number} distWidth target width
   * @param {number} distHeight target height
   * @return: {HTMLCanvasElement} resized canvas
   */
  _resize(srcImage, distWidth, distHeight) {
    const distCanvas = getCanvas(distWidth, distHeight)
    const ctx = distCanvas.getContext('2d')
    ctx.drawImage(srcImage, 0, 0, distWidth, distHeight)
    return distCanvas
  }
}
