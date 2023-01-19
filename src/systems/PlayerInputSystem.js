class PlayerInputSystem {
    constructor(player) {
        this.player = player
        this.playerPos = this.player.components.transform
        this.hitBox = this.player.components.boxCollider
        this.speed = 2
        this.gravity = 0
    }
    /**
     * Controlls
     * a - move left
     * d - move right
     * " " - jump
     * @param {input params} input
     */
    update(input) {

        if(input['a']) {
            this.playerPos.velocityX = clamp(this.playerPos.velocityX - this.speed, -this.playerPos.maxVelocity, 0)
        } else if(input['d']) {
            this.playerPos.velocityX = clamp(this.playerPos.velocityX + this.speed, 0, this.playerPos.maxVelocity)
        } else if(input['w']) {
            this.playerPos.velocityY = clamp(this.playerPos.velocityY - this.speed, -this.playerPos.maxVelocity, 0)
        }else if(input['s']) {
            this.playerPos.velocityY = clamp(this.playerPos.velocityY + this.speed, 0, this.playerPos.maxVelocity)
        } else {
            this.playerPos.velocityX === 0 ? this.playerPos.velocityX = 0 :
                (this.playerPos.velocityX > 0 ? this.playerPos.velocityX -= this.speed : this.playerPos.velocityX += this.speed)
            this.playerPos.velocityY === 0 ? this.playerPos.velocityY = 0 :
                (this.playerPos.velocityY > 0 ? this.playerPos.velocityY -= this.speed : this.playerPos.velocityY += this.speed)
        }
        if(input[' '] && this.player.components.rigidBody.isGrounded) {
            this.playerPos.velocityY = -20
            this.player.components.rigidBody.isGrounded = false
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