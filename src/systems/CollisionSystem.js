// Variety of ways to check for a collection
class CollisionSystem {
    constructor(entities) {
        this.entities = entities
        this.collisions = []
        this.directions = {
            UP: [-130,-45],
            DOWN: [45,130],
            UP_LEFT: [-179,-135],
            DOWN_LEFT: [135, 180],
            RIGHT: [-30,30]
        }
    }
    update(deltaTime) {
        // let collisionCheckList = []
        // collisionCheckList.push('player')
        // collisionCheckList.push('dircarver')
        // console.log(collisionCheckList)

        this.entities.forEach(e => {
            if(e.isDrawable) {
                if(e.tag === 'player') {
                    this.entities.forEach(t => {
                        if(e.isDrawable) {
                            if(e.id !== t.id) {
                                if(t.components.boxCollider) {
                                    if(this.boxCollision(e, t, deltaTime)) {
                                        if(t.tag.includes('tile')) {
                                            e.components.boxCollider.collisions[t.tag] = {pos: t.components.boxCollider, dir:this.#checkDirection(e,t)}
                                        } else {
                                            e.components.boxCollider.collisions[t.tag] = true
                                        }
                                    }
                                    this.#playerCollisionResolution(e)
                                }
                            }
                        }
                    })
                }
            }

        })

        this.entities.forEach(e => {
            if(e.isDrawable) {
                if(e.tag === 'dirtcarver') {
                    this.entities.forEach(t => {
                        if(e.isDrawable) {
                            if(e.id !== t.id) {
                                if(t.components.boxCollider) {
                                    if(this.boxCollision(e, t, deltaTime)) {
                                        if(t.tag.includes('tile')) {
                                            e.components.boxCollider.collisions[t.tag] = {pos: t.components.boxCollider, dir:this.#checkDirection(e,t)}
                                        } else {
                                            e.components.boxCollider.collisions[t.tag] = true
                                        }
                                    }
                                    this.#playerCollisionResolution(e)
                                }
                            }
                        }
                    })
                }


            }

        })
    }

    #playerCollisionResolution(player) {
        let collisions = player.components.boxCollider.collisions
        for(let e in collisions) {
            if(e.includes('tile')) {
               if(collisions[e].dir.length > 0) {
                collisions[e].dir.forEach(dir => {
                    if(dir === 'DOWN') {
                        player.components.transform.velocitY = 0
                        player.components.transform.y = collisions[e].pos.y - player.components.boxCollider.height
                        player.components.rigidBody.isGrounded = true
                    } else if(dir === 'UP') {
                        player.components.transform.velocityY = 0
                        player.components.transform.y = collisions[e].pos.y + BLOCKSIZE
                    } else if(dir === 'RIGHT') {
                        player.components.transform.velocityX = 0
                        player.components.transform.x = collisions[e].pos.x - player.components.boxCollider.width
                    } else if(dir === 'UP_LEFT' || dir === 'DOWN_LEFT') {
                        player.components.transform.velocityX = 0
                        player.components.transform.x = collisions[e].pos.x + BLOCKSIZE
                    } else {
                        player.components.rigidBody.isGrounded = false
                    }
                })
                collisions[e].dir.length = 0
               }
            }
        }
    }

    //Collision between two Rectangles, does not return direction of collision
    boxCollision(entityA, entityB, deltaTime) {

        let a = entityA.components.boxCollider
        let b = entityB.components.boxCollider
        let futurePos = {
            x: a.x + (entityA.components.transform.velocityX * deltaTime),
            y: a.y + (entityA.components.transform.velocityY * deltaTime)
        }
        if(futurePos.x < b.x + b.width &&
            futurePos.x + a.width > b.x &&
            futurePos.y < b.y + b.height &&
            futurePos.y + a.height > b.y) {
            return true
        }
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