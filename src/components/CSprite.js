/**
 * Holds display and animation data for an entity.
 *
 * @author Mario Flores Vences
 * @author Andrew Nguyen
 * @version 1/18/23
 */

class CSprite {

    /**
     * Initializes CSprite component
     * @param {Image} sprite       Sprite sheet
     * @param {number} sWidth      Sprite width on sprite sheet
     * @param {number} sHeight     Sprite height on sprite sheet
     * @param {number} scale       Scale factor to apply to sprite, 1 by default
     * @param {number} firstFrameX X position of first frame on sprite sheet (not pixel position!), 0 by default.
     * @param {number} frameY      Y position of frame on sprite sheet (not pixel position!), 0 by default.
     * @param {number} lastFrameX  X position of the last frame on sprite sheet (not pixel position!),
     *                             firstFrameX by default.
     * @param {number} fps         Frames per second of sprite animation, 1 by default.
     * @param {number} padding     Pixels of sprite padding, 0 by default.
     * @param {boolean} loop       If sprite animation loops, true by default.
     * @returns {CSprite}          The CSprite component
     * @constructor
     */
    constructor({sprite, sWidth, sHeight, scale = 1,
                    firstFrameX = 0, frameY = 0, lastFrameX = firstFrameX,
                    fps = 1, padding = 0, loop = true }) {
        Object.assign(this, { sprite, sWidth, sHeight, firstFrameX, frameY, lastFrameX, fps, padding, loop });
        this.name = 'sprite';
        this.currentFrame = this.firstFrameX;
        this.frameDuration = 0;
        this.setFPS(fps);
        this.dWidth = this.sWidth;
        this.dHeight = this.sHeight;
        this.setScale(scale);
        this.elapsedTime = 0;
        this.currentState = 'idleR';
        this.animationMap = new Map();
        return this;
    };

    /**
     * Sets sprite scale.
     * @param scale Scale factor to apply to sprite.
     */
    setScale(scale) {
        this.dWidth = this.sWidth * scale;
        this.dHeight = this.sHeight * scale;
    }

    setFPS(fps) {
        if (fps) this.frameDuration = 1 / fps;
    }

    /**
     * Sets sprite animation properties.
     * @param {string} state
     */
    setAnimation(state) {
        if (state !== this.currentState) {
            const aProps = this.animationMap.get(state);
            this.firstFrameX = aProps.firstFrameX;
            this.currentFrame = this.firstFrameX;
            this.frameY = aProps.frameY;
            this.lastFrameX = aProps.lastFrameX;
            this.setFPS(aProps.fps);
            this.loop = aProps.loop;
            this.currentState = state;
        }
    }
}