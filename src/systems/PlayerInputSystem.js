class PlayerInputSystem {
    constructor(player) {
        this.player = player
        this.playerPos = this.player.components.transform
        this.playerSprite = this.player.components.sprite
        this.hitBox = this.player.components.boxCollider
        this.speed = 1
        this.gravity = 1.5
    }
    /**
     * Controlls
     * a - move left
     * d - move right
     * " " - jump
     * @param {input params} input
     */
    update(input) {
        const currentState = this.playerSprite.currentState;
        if(input['a']) {
            this.playerPos.velocityX = clamp(this.playerPos.velocityX - this.speed, -this.playerPos.maxVelocityX, 0)
            this.playerSprite.setAnimation('walkL');
        } else if(input['d']) {
            this.playerPos.velocityX = clamp(this.playerPos.velocityX + this.speed, 0, this.playerPos.maxVelocityX)
            this.playerSprite.setAnimation('walkR');
        } else if(input['w']) { // jetpack?
            this.playerPos.velocityY = clamp(this.playerPos.velocityY - this.speed, -this.playerPos.maxVelocityY, 0)
        }else if(input['s']) { // fast fall
            this.playerPos.velocityY = clamp(this.playerPos.velocityY + this.speed, 0, this.playerPos.maxVelocityY)
            this.playerPos.velocityX = 0;
            if (currentState === 'idleR' || currentState === 'walkR' || currentState === 'jumpR') this.playerSprite.setAnimation('crouchR');
            else if (currentState === 'idleL' || currentState === 'walkL' || currentState === 'jumpL') this.playerSprite.setAnimation('crouchL');
        } else {
            this.playerPos.velocityX === 0 ? this.playerPos.velocityX = 0 :
                (this.playerPos.velocityX > 0 ? this.playerPos.velocityX -= this.speed : this.playerPos.velocityX += this.speed)
            this.playerPos.velocityY === 0 ? this.playerPos.velocityY = 0 :
                (this.playerPos.velocityY > 0 ? this.playerPos.velocityY -= this.speed : this.playerPos.velocityY += this.speed)
            if (currentState === 'walkR' || currentState === 'jumpR' || currentState === 'crouchR') this.playerSprite.setAnimation('idleR');
                else if (currentState === 'walkL' || currentState === 'jumpL' || currentState === 'crouchL') this.playerSprite.setAnimation('idleL');
        }
        if((input[' '] || input['w']) && this.player.components.rigidBody.isGrounded) { //jump
            this.playerPos.velocityY = -25
            this.player.components.rigidBody.isGrounded = false
            if (currentState === 'idleR' || currentState === 'walkR') this.playerSprite.setAnimation('jumpR');
                else if (currentState === 'idleL' || currentState === 'walkL') this.playerSprite.setAnimation('jumpL');
        }

        if(!this.player.components.rigidBody.isGrounded) {
            this.playerPos.velocityY += this.gravity
        } else if(this.player.components.rigidBody.isGrounded) {
            this.playerPos.velocityY = 0
        }

        // move hitbox with player
        this.playerPos.x += this.playerPos.velocityX
        this.playerPos.y += this.playerPos.velocityY
        this.hitBox.x = this.playerPos.x
        this.hitBox.y = this.playerPos.y
    }
}