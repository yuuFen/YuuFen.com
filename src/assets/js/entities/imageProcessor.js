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
    const canvas = this._sunglass(resized, colors.palette)
    return canvas.toDataURL()
  }

  /**
   * @description: Resize image, return canvas
   * @param {Image} srcImage
   * @param {number} distWidth target width
   * @param {number} distHeight target height
   * @return: {HTMLCanvasElement} resized canvas
   */
  _resize(srcImage, distWidth, distHeight) {}

  /**
   * @description: Filter image with the palette
   * @param {Image | HTMLCanvasElement} image      input image
   * @param {string[]}                  [palette=['#fff','#999','#555','#222']]
   *                                        colors of output image
   * @param {string}                    [colorSpace='rgb'] color space
   * @return {HTMLCanvasElement}        output image on canvas
   */
  _sunglass(image, palette, colorsSpace) {}
}
