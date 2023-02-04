// Variety of ways to check for a collection
class CollisionSystem {
    constructor(player, entities) {
        this.player = player
        this.entities = entities
        this.collisions = []
        this.directions = {
            UP: [-135, -45],
            DOWN: [45,135],
            LEFT: [135, 225],
            RIGHT: [-45, 45],
        }
    }
    update() {
        const collisionCheckList = []
        collisionCheckList.push('player')
        collisionCheckList.push('dirtcarver')
        collisionCheckList.push('lightbug')
        collisionCheckList.push('spore')
        const collideList = this.entities.filter(e => e.isDrawable && e.components.boxCollider);

        // mobs.forEach
        collideList.forEach(a => {
            // if (a.tag.includes('player') || a.tag.includes('dirtcarver')) {
            if (collisionCheckList.some(mob => a.tag.includes(mob))) {
                collideList.forEach(b => {
                    if (this.#boxCollision(a, b) && a.id !== b.id) {
                        if (b.tag.includes('tile')) {
                            a.components.boxCollider.collisions[b.tag] = {
                                pos: b.components.boxCollider,
                                dir: this.#checkDirection(a, b)
                            }
                        } else {
                            a.components.boxCollider.collisions[b.tag] = true;
                        }
                        this.#collisionResolution(a);
                    }
                });
            }
        });
    }

    #collisionResolution(entity) {
        const eCollider = entity.components.boxCollider
        const eTransform = entity.components.transform;

        let collisions = eCollider.collisions
        for(let c in collisions) {
            if(c.includes('tile') && collisions[c].dir.length > 0) {
                collisions[c].dir.forEach(dir => {
                    if (dir === 'UP' || dir === 'DOWN') {
                        eTransform.velocityY = 0
                        eTransform.y = eTransform.lastY
                        if (dir === 'DOWN') entity.components.state.grounded = true
                    }
                    if (dir === 'LEFT' || dir === 'RIGHT') {
                        eTransform.velocityX = 0
                        eTransform.x = eTransform.lastX
                    }
                });
                eCollider.update(eTransform.x, eTransform.y)
                collisions[c].dir.length = 0;
            }
        }
    }

    //Collision between two Rectangles, does not return direction of collision
    #boxCollision(entityA, entityB) {

        let a = entityA.components.boxCollider
        let b = entityB.components.boxCollider
        // let futurePos = {
        //     x: a.x + (entityA.components.transform.velocityX * deltaTime),
        //     y: a.y + (entityA.components.transform.velocityY * deltaTime)
        // }
        return a.right > b.left
            && a.left < b.right
            && a.top < b.bottom
            && a.bottom > b.top;
    }

    /**
     * Checks which side the collision occurs.
     * entityA is the player.
     * @param {Entity} entityA 
     * @param {Entity} entityB 
     * @return {Array} of directions
     */
    #checkDirection(entityA, entityB) {
        let a = entityA.components.boxCollider
        let b = entityB.components.boxCollider
        let midPointA = {
            x: a.x + (a.width * .5),
            y: a.y + (a.height * .5)
        }
        let midPointB = {
            x: b.x + (b.width * .5),
            y: b.y + (b.height * .5)
        }
        let degree = getDirection(midPointA, midPointB)
        let result = []
        for(let dir in this.directions) {
            if(isBetween(degree, this.directions[dir][0], this.directions[dir][1])) {
                result.push(dir)
            }
        }
       return result
    }

    // Checks if point is within a rectangle
    pointInRect = (point, rect) => {
        return (point.x >= rect.x && point.y >= rect.y && point.x < rect.x + rect.width && point.y < rect.y + rect.height)
    }
}