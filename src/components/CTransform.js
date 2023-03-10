/**
 * Holds position and velocity data.
 *
 * @author Mario Flores Vences
 * @author Andrew Nguyen
 * @version 1/18/23
 */

class CTransform {

    /**
     * Initializes CTransform component
     * @param {number} x            X position of object, 0 by default.
     * @param {number} y            Y position of object, 0 by default.
     * @param {boolean} hasGravity  If affected by gravity, false by default
     * @param {number} velocityX    Initial X velocity of object, 0 by default.
     * @param {number} velocityY    Initial Y velocity of object, 0 by default.
     * @param {number} rotation     Rotation of object, 0 by default.
     * @param {number} maxVelocityX Maximum X velocity value object can reach, BLOCKSIZE by default.
     * @param {number} maxVelocityY Maximum Y velocity value object can reach, BLOCKSIZE by default.
     * @returns {CTransform}
     * @constructor
     */
    constructor({ x = 0, y = 0, hasGravity = false,
                    velocityX = 0, velocityY = 0,
                    rotation = 0,
                    maxVelocityX = BLOCKSIZE * 0.9, maxVelocityY = BLOCKSIZE * 0.9 }) {
        Object.assign(this, {x, y, hasGravity, velocityX, velocityY, rotation, maxVelocityX, maxVelocityY});
        this.name = 'transform'
        this.collider = null;
        this.behaviorMap = new Map();
        // this.gravity = this.hasGravity ? GRAVITY : 0;
        this.last = {
            x: this.x,
            y: this.y
        }
        this.currentState = 'idleR'
        this.fallDamageTime = 0;
        return this;
    }

    /**
     * Sets movement properties.
     * @param {string} state
     */
    setBehavior(state) {
        if (state !== this.currentState) {
            const bProps = this.behaviorMap.get(state);
            if (bProps.velocityX) this.velocityX = bProps.velocityX;
            if (bProps.velocityY) this.velocityY = bProps.velocityY;
            this.currentState = state;
        }
    }
}