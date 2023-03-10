/**
 * Bloodsucker is an aggressive flying mob.
 * Flies at high speed towards the player to do damage.
 *
 * @author Jeep Naarkom
 * @author Andrew Nguyen
 */

class Bloodsucker {
    /**
     * Initializes Bloodsucker
     * @param {Object} props   Position properties.
     * @param {number} props.x X spawn position.
     * @param {number} props.y Y spawn position.
     * @returns {Bloodsucker} Bloodsucker blueprint.
     * @constructor
     */
    constructor(props) {
        this.tag = 'mob enemy';
        this.name = 'bloodsucker';
        this.components = this.#buildComponents(props);
        return this;
    };
    
    #buildComponents(props) {
        const stats = new CStats({
            damage: 1.25,
            speed: 3,
            maxHealth: 80
        });
        const sprite = new CSprite({
            sprite: ASSET_MANAGER.cache[CHAR_PATH.BLOODSUCKER],
            sWidth: 332,
            sHeight: 326,
            scale: BLOCKSIZE * 2.5 / 332,
            // idleR
            firstFrameX: 0,
            frameY: 1,
            lastFrameX: 4,
            fps: 20,
        });
        const transform = new CTransform({
            x: props.x,
            y: props.y
        });
        const cWidth = BLOCKSIZE * 1.75;
        const cHeight = BLOCKSIZE * 0.8;
        const collider = new CBoxCollider({
            x: props.x,
            y: props.y,
            width: cWidth,
            height: cHeight,
            xOffset: (sprite.dWidth - cWidth) / 2,
            yOffset: (sprite.dHeight - cHeight) * 3/4,
        });
        const drops = new CDrops([generateItem('item_keratin')]);
        const state = new CState();
        const duration = new CDuration();
        this.#addAnimations(sprite);
        transform.collider = collider
        state.sprite = sprite;

        return [stats, sprite, transform, collider, state, drops, duration];
    }

    #addAnimations(sprite) {
        const aMap = sprite.animationMap;
        aMap.set('idleL', new AnimationProps(0, 0,4, 20));
        aMap.set('idleR', new AnimationProps(0, 1,4, 20));
        aMap.set('attackL', new AnimationProps(0, 2,3, 30));
        aMap.set('attackR', new AnimationProps(0, 3,3, 30));
    };

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

        if (distance > BLOCKSIZE * 12) {
            if (switchInterval(state.elapsedTime, interval/2)) {
                transform.velocityX = switchInterval(state.elapsedTime, interval) ? speed/5 : -speed/5;
                animState = transform.velocityX < 0 ? "idleL" : "idleR"
                state.direction = transform.velocityX < 0 ? "left" : "right"
            } else {
                transform.velocityX = 0;
                animState = state.direction === 'left' ? "idleL" : "idleR";
            }
            transform.velocityY = normalize(origin, { x: target.center.x, y: target.top - BLOCKSIZE * 2 }).y * speed;
        } else {
            if (checkCollision(collider, target)) {
                transform.velocityX = 0;
            } else {
                transform.velocityX = dVector.x * speed;
            }
            transform.velocityY = dVector.y * speed;
            animState = target.center.x < origin.x ? "attackL" : "attackR";
            state.direction = transform.velocityX < 0 ? "left" : "right"
        }
        state.setState(animState);
    }
}
