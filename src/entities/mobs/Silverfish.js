/**
 * Silverfish is a weak crawling mob.
 * Chases after the player if they get too close but mostly minds its own business.
 *
 * @author Andrew Nguyen
 */

class Silverfish {
    /**
     * Initializes Silverfish
     * @param {Object} props   Position properties.
     * @param {number} props.x X spawn position.
     * @param {number} props.y Y spawn position.
     * @returns {Silverfish} Silverfish blueprint.
     * @constructor
     */
    constructor(props) {
        this.tag = 'mob enemy';
        this.name = 'silverfish';
        this.components = this.#buildComponents(props);
        return this;
    };

    #buildComponents(props) {
        const stats = new CStats({
            speed: 2,
            damage: 0.25,
            maxHealth: 40
        });
        const sprite = new CSprite({
            sprite: ASSET_MANAGER.cache[CHAR_PATH.SILVERFISH],
            sWidth: 93,
            sHeight: 80,
            scale: BLOCKSIZE / 93,
            lastFrameX: 3,
            fps: 9,
        });
        const transform = new CTransform({
            x: props.x,
            y: props.y,
            hasGravity: true,
        });
        const cWidth = BLOCKSIZE * 0.8;
        const cHeight = BLOCKSIZE * 0.8;
        const collider = new CBoxCollider({
            x: props.x,
            y: props.y,
            width: cWidth,
            xOffset: (sprite.dWidth - cWidth) / 2,
            height: cHeight,
        });
        const state = new CState();
        const duration = new CDuration();
        this.#addAnimations(sprite);
        transform.collider = collider
        state.sprite = sprite;
        return [stats, sprite, transform, collider, state, duration];
    }

    update(target, projectileManager) {
        const collider = this.components['boxCollider']
        const origin = collider.center;
        const speed = this.components["stats"].speed;
        const transform = this.components["transform"];
        const state = this.components['state'];

        const distance = getDistance(origin, target.center);
        const dVector = normalize(origin, target.center)
        let animState;
        const interval = 10;

        if (distance > BLOCKSIZE * 5) {
            if (switchInterval(state.elapsedTime, interval/2)) {
                transform.velocityX = switchInterval(state.elapsedTime, interval) ? speed/3 : -speed/3;
                animState = transform.velocityX < 0 ? "idleL" : "idleR"
                state.direction = transform.velocityX < 0 ? "left" : "right"
            } else {
                transform.velocityX = 0;
                animState = state.direction === 'left' ? "idleL" : "idleR";
            }
        } else {
            if (checkCollision(collider, target)) {
                transform.velocityX = 0;
            } else {
                transform.velocityX = dVector.x * speed;
                state.direction = transform.velocityX < 0 ? "left" : "right"
            }
            animState = target.center.x < origin.x ? "walkL" : "walkR";
        }

        // jump
        if (collider.sideCollision && state.grounded) {
            transform.velocityY = -(GRAVITY + BLOCKSIZE * 0.33);
            state.grounded = false;
        }

        state.setState(animState);
    }

    #addAnimations(sprite) {
        const aMap = sprite.animationMap;
        aMap.set('idleR', new AnimationProps(0, 0, 3, 9));
        aMap.set('idleL', new AnimationProps(0, 1,3, 9));
        aMap.set('walkR', new AnimationProps(0, 0, 3, 18));
        aMap.set('walkL', new AnimationProps(0, 1, 3, 18));
    };
}

