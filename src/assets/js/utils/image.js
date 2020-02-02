/**
 * Get canvas instance with given width and height
 *
 * @param {number} width canvas width
 * @param {number} height canvas height
 */
export function getCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
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
 * @param {number|Array.<number>} config.radius in pixel, from 0 to 4, can be array like border-radius
 * @param {string} config.fillColor background color
 * @param {string} config.borderColor border color, undefined for no border
 * @param {string} config.borderSize border size, 0 or 1, can be array like border-radius
 * @param {number} config.pixelSize if not given, the value defined in contants will be used
 * @param {number|number[]} config.margin margin outside of border
 *  
 */
export function getPixelImage(config) {
  
}
