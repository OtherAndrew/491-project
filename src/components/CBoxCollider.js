/**
 * Component that represents a box collider.
 * The collider should have the same dimensions as a sprite.
 *
 * @author Mario Flores Vences
 * @author Andrew Nguyen
 * @version 1/18/23
 */

class CBoxCollider {
    /**
     * Initializes Box Collider component
     * @param {number} x          X coordinate of collider center
     * @param {number} y          Y coordinate of collider center
     * @param {number} width      Collider width
     * @param {number} height     Collider height
     * @param {number} xOffset    X offset for collider
     * @param {number} yOffset    Y offset for collider
     * @returns {CBoxCollider} The box collider component
     * @constructor
     */
    constructor({ x, y, width, height, xOffset = 0, yOffset = 0 }) {
        Object.assign(this, { width, height, xOffset, yOffset });

        this.x = x + this.xOffset;
        this.y = y + this.yOffset
        this.name = "boxCollider";
        this.sideCollision = false;
        this.attackCollision = false;

        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
        this.center = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
        this.last = {
            top: this.top,
            bottom: this.bottom,
            left: this.left,
            right: this.right,
            center: this.center
        };

        return this;
    }

    /**
     * Sets collider position.
     * @param {number} x X position.
     * @param {number} y Y position.
     */
    setPosition(x, y) {
        this.last = {
            top: this.top,
            bottom: this.bottom,
            left: this.left,
            right: this.right,
            center: this.center
        };
        this.x = x + this.xOffset;
        this.y = y + this.yOffset;
        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
        this.center = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }
}