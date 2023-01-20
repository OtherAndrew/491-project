/**
 * Holds sprite data.
 *
 * @author Mario Flores Vences
 * @author Andrew Nguyen
 * @version 1/18/23
 */

/**
 * Initializes CSprite component
 * @param {image} sprite       Sprite sheet
 * @param {number} width       Sprite width
 * @param {number} height      Sprite height
 * @param {number} scale       Scale factor to apply to sprite, 1 by default
 * @param {number} startFrameX X position of first frame on sprite sheet (not pixel position!), 0 by default.
 * @param {number} lastFrameX  X position of the last frame on sprite sheet (not pixel position!), 0 by default.
 * @param {number} frameY      Y position of frame on sprite sheet (not pixel position!), 0 by default.
 * @param {number} fps         Frames per second of sprite animation, 1 by default.
 * @returns {CSprite}          The CSprite component
 * @constructor
 */
const CSprite = function CSprite(sprite, width, height,
                                 { scale = 1, startFrameX = 0, lastFrameX = 0, frameY = 0, fps = 1, } ) {
    Object.assign(this, { sprite, width, height, startFrameX, lastFrameX, frameY  })

    this.frameDuration = 1 / fps;
    this.drawWidth = this.width * scale;
    this.drawHeight = this.height * scale;
    this.elapsedTime = 0;
    return this;
};
CSprite.prototype.name = 'sprite';