class Lightbug {
    /**
     * Initializes Lightbug (enemy)
     * @param {Object} props         enemy position and display properties
     * @param {Image} props.sprite   enemy sprite sheet
     * @param {number} props.x       X position of starting frame
     * @param {number} props.y       Y position of the starting frame
     * @param {number} props.sWidth  frame width
     * @param {number} props.sHeight frame height
     * @param {number} props.scale   frame scale
     * @returns {Object}             return enemy
     * @constructor
     */
    constructor(props) {
        this.tag = 'lightbug';
        this.name = 'lightbug';
        this.components = this.#buildComponents(props);
        return this;
    };

    #buildComponents(props) {
        const sprite = new CSprite({
            sprite: props.sprite,
            sWidth: props.sWidth,
            sHeight: props.sHeight,
            scale: props.scale,
            firstFrameX: 0,
            frameY: 0,
            lastFrameX: 7,
            fps: 25,
            padding: 2
        });
        const transform = new CTransform({
            x: props.x,
            y: props.y,
            velocityX: 0,
            velocityY: 0,
            maxVelocityX: 0,
            maxVelocityY: 0
        });
        const collider = new CBoxCollider({
            x: props.x,
            y: props.y,
            width: props.sWidth * props.scale,
            height: props.sHeight * props.scale
        });

        this.#addAnimations(sprite);
        transform.collider = collider
        const state = new CState();
        state.sprite = sprite;

        return [sprite, transform, collider, state];
    }

    #addAnimations(sprite) {
        const aMap = sprite.animationMap;
        aMap.set('idleR', new AnimationProps(0, 0, 7));
        // aMap.set('idleL', new AnimationProps(0, 1,0));
        // aMap.set('walkR', new AnimationProps(0, 0, 3));
        // aMap.set('walkL', new AnimationProps(0, 1, 3));
        // aMap.set('jumpR', new AnimationProps(0, 1));
        // aMap.set('jumpL', new AnimationProps(0, 2));
        // aMap.set('flyR', new AnimationProps(0, 1));
        // aMap.set('flyL', new AnimationProps(0, 2));
        // aMap.set('crouchR', new AnimationProps(5, 1));
        // aMap.set('crouchL', new AnimationProps(5, 2));
    };

}

