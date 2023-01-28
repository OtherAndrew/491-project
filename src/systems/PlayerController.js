class PlayerController {
    constructor(player) {
        this.player = player
        this.pTransform = this.player.components.transform
        this.pSprite = this.player.components.sprite
        this.pCollider = this.player.components.boxCollider;
        this.acceleration = 1
        this.gravity = 1.5
        this.direction = 'right';
    }
    /**
     * Controlls
     * a - move left
     * d - move right
     * " " - jump
     * @param {input params} input
     */
    update(input) {
        const currentState = this.pSprite.currentState;
        if(input['a']) {
            this.pTransform.velocityX = clamp(this.pTransform.velocityX - this.acceleration, -this.pTransform.maxVelocityX, 0)
            this.pSprite.setAnimation('walkL');
            this.direction = 'left'
        } else if(input['d']) {
            this.pTransform.velocityX = clamp(this.pTransform.velocityX + this.acceleration, 0, this.pTransform.maxVelocityX)
            this.pSprite.setAnimation('walkR');
            this.direction = "right"
        } else if(input['w']) { // jetpack?
            // this.playerPos.velocityY = clamp(this.playerPos.velocityY - this.speed, -this.playerPos.maxVelocityY, 0)

            this.player.components.rigidBody.isGrounded = false
            this.pTransform.velocityY = -20;

        }else if(input['s']) { // fast fall
            this.pTransform.velocityY = clamp(this.pTransform.velocityY + this.acceleration, 0, this.pTransform.maxVelocityY)
            this.pTransform.velocityX = 0;
            if (this.direction === 'right') this.pSprite.setAnimation('crouchR');
            else if (this.direction === "left") this.pSprite.setAnimation('crouchL');
        } else {
            this.pTransform.velocityX === 0 ? this.pTransform.velocityX = 0 :
                (this.pTransform.velocityX > 0 ? this.pTransform.velocityX -= this.acceleration : this.pTransform.velocityX += this.acceleration)
            if (this.direction === 'right' && this.player.components.rigidBody.isGrounded) this.pSprite.setAnimation('idleR');
            else if (this.direction === "left" && this.player.components.rigidBody.isGrounded) this.pSprite.setAnimation('idleL');
        }
        if((input[' ']) && this.player.components.rigidBody.isGrounded) { //jump
            this.pTransform.velocityY = -25
            this.player.components.rigidBody.isGrounded = false
            if (currentState === 'idleR' || currentState === 'walkR') this.pSprite.setAnimation('jumpR');
            else if (currentState === 'idleL' || currentState === 'walkL') this.pSprite.setAnimation('jumpL');
        }

        if(!this.player.components.rigidBody.isGrounded) {
            this.pTransform.velocityY += this.gravity
        } else if(this.player.components.rigidBody.isGrounded) {
            this.pTransform.velocityY = 0
        }


        // move hitbox with player
        // CTransform.update()?
        this.pTransform.x += this.pTransform.velocityX
        this.pTransform.y += this.pTransform.velocityY
        this.pCollider.x = this.pTransform.x
        this.pCollider.y = this.pTransform.y
    }
}