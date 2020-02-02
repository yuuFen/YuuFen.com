import { pixelSize as defaultPixelSize } from '../constants/size'
import { getValueArray } from './math'

/**
 * Get canvas instance with given width and height
 *
 * @param {number} width canvas width
 * @param {number} height canvas height
 */
export function getCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

/**
 * Get pixel image in base 64.
 *
 * Here's an example of image with radius 2
 * +-+-+-+-+
 * | | |x|x|
 * | |x| | |
 * |x| | | |
 * |x| | | |
 *
 * @param {Object} config config
 * @param {number} config.width image width
 * @param {number} config.height image height
 * @param {number|Array.<number>} config.radius radius in pixel, from 0 to 4, can be array like border-radius(top, right, bottom, left)
 * @param {string} config.fillColor background color
 * @param {string} config.borderColor border color, undefined for no border
 * @param {string} config.borderSize border size, 0 or 1, can be array like border-radius
 * @param {number} config.pixelSize if not given, the value defined in contants will be used
 * @param {number|Array.<number>} config.margin margin outside of border, undefined for no margin
 */
export function getPixelImage(config) {
  const canvas = getCanvas(config.width, config.height)
  const ctx = canvas.getContext('2d')
  // 默认为true,对像素为主的时,默认的改变大小的算法会造成图片模糊并且破坏图片原有的像素
  ctx.webkitImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false
  ctx.mozImageSmoothingEnabled = false
  ctx.msImageSmoothingEnabled = false

  const pixelSize = config.pixelSize == null ? defaultPixelSize : config.pixelSize
  const margin = getValueArray(config.margin || 0)
  const top = pixelSize * margin[0]
  const right = canvas.width - pixelSize * margin[1]
  const bottom = canvas.height - pixelSize * margin[2]
  const left = pixelSize * margin[3]

  const r = getValueArray(config.radius)

  if (config.borderColor) {
    let borderSize = getValueArray(config.borderSize || 1)
    borderSize = [borderSize[0] * pixelSize, borderSize[1] * pixelSize, borderSize[2] * pixelSize, borderSize[3] * pixelSize]
    // Border
    drawSimplePixelImage(ctx, left, top, right - left, bottom - top, r, config.borderColor, pixelSize)

    // Fill
    const innerR = [Math.max(r[0] - 1, 0), Math.max(r[1] - 1, 0), Math.max(r[2] - 1, 0), Math.max(r[3] - 1, 0)]
    drawSimplePixelImage(ctx, left + borderSize[3], top + borderSize[0],
      right - left - borderSize[1] - borderSize[3], bottom - top - borderSize[0] - borderSize[2],
      innerR, config.fillColor, pixelSize)
  } else {
    drawSimplePixelImage(ctx, left, top, right - left, bottom - top, r, config.fillColor, pixelSize)
  }
  return canvas.toDataURL()
}

function drawSimplePixelImage(ctx, left, top, width, height, r, color, pixelSize) {
  const right = left + width
  const bottom = top + height

  ctx.fillStyle = color
  ctx.beginPath()

  ctx.fillStyle = color
  ctx.beginPath()

  // Left-top
  ctx.moveTo(left, top + pixelSize * r[0])
  for (let i = 0; i < r[0]; i++) {
    ctx.lineTo(left + pixelSize * (i + 1), top + pixelSize * (r[0] - i))
    ctx.lineTo(left + pixelSize * (i + 1), top + pixelSize * (r[0] - i - 1))
  }

  // Right-top
  ctx.lineTo(right - pixelSize * r[1], top)
  for (let i = 0; i < r[1]; i++) {
    ctx.lineTo(right - pixelSize * (r[1] - i), top + pixelSize * (i + 1))
    ctx.lineTo(right - pixelSize * (r[1] - i - 1), top + pixelSize * (i + 1))
  }

  //Right-bottom
  ctx.lineTo(right, bottom - pixelSize * r[2])
  for (let i = 0; i < r[2]; i++) {
    ctx.lineTo(right - pixelSize * (i + 1), bottom - pixelSize * (r[2] - i))
    ctx.lineTo(right - pixelSize * (i + 1), bottom - pixelSize * (r[2] - i - 1))
  }

  //Left-bottom
  ctx.lineTo(left + pixelSize * r[3], bottom)
  for (let i = 0; i < r[3]; i++) {
    ctx.lineTo(left + pixelSize * (r[3] - i), bottom - pixelSize * (i + 1))
    ctx.lineTo(left + pixelSize * (r[3] - i - 1), bottom - pixelSize * (i + 1))
  }

  ctx.closePath()
  ctx.fill()
}
