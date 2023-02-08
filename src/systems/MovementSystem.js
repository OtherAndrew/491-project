/**
 * Movement updating for non-player entities.
 */
class MovementSystem {
    constructor(entities, player) {
        this.entities = entities
        this.player = player;
    }

    /**
     * Update player position.
     * Player needs to be updated separately from other mobs otherwise movement is jittery.
     * @param tick
     */
    updatePlayer(tick) {
        this.#moveEntity(this.player, tick)
    }

    /**
     * Update mob position.
     * @param tick
     */
    updateMobs(tick) {
        const mobs = this.entities.filter(e => e.isDrawable && e.tag.includes('mob'));
        mobs.forEach(e => {
            // const t = e.components.transform;
            // t.lastX = t.x;
            // t.lastY = t.y;
            // t.velocityY = clamp(t.velocityY + t.gravity, -t.maxVelocityY, t.maxVelocityY);
            // t.velocityX = clamp(t.velocityX, -t.maxVelocityX, t.maxVelocityX);
            // t.x += t.velocityX * tick * 60;
            // t.y += t.velocityY * tick * 60;
            // if (t.collider) t.collider.setPosition(t.x, t.y);
            this.#moveEntity(e, tick)
        });
    };

    #moveEntity(entity, tick) {
        const t = entity.components.transform;
        t.lastX = t.x;
        t.lastY = t.y;
        t.velocityY = clamp(t.velocityY + t.gravity, -t.maxVelocityY, t.maxVelocityY);
        t.velocityX = clamp(t.velocityX, -t.maxVelocityX, t.maxVelocityX);
        t.x += t.velocityX * tick * 60;
        t.y += t.velocityY * tick * 60;
        if (t.collider) t.collider.setPosition(t.x, t.y);
    }
}