
class WorldScene extends Scene {


    constructor(game) {
        super()
        this.game = game;

        //other game stats --- display during win condition (rocket scene)
        //add total each mob kills
        //total blocks mined
        //total jetpack used
        //total jumps
        //total deaths
    }

    /**
     * Initializes this class' terrain entities
     * Player and player movement are for testing purposes
     * @param assets
     */
    init(assets, canvas) {
        let spawnMap
        [this.terrainMap, spawnMap] = getTerrain(this.entityManager)
        this.mobFactory = new MobFactory(this.entityManager);
        // this.#createEntity()
        this.player = this.mobFactory.build('player', WIDTH_PIXELS * .5, HEIGHT_PIXELS * .5 - 100);
        this.rocket =
            this.mobFactory.build('rocket', this.player.components.transform.x - 750, this.player.components.transform.y - 200);
        this.spawnManager = new SpawnerManager(this.mobFactory, spawnMap, this.player)
        this.spawnTestEntities();

        /*
    this.spawnManager.spawnTestEntities({
        x: WIDTH_PIXELS * .5,
        y: HEIGHT_PIXELS * .5 - 100
    });
    */

        this.projectileManager = new ProjectileManager(this.entityManager)
        this.playerController = new PlayerController(this.player, this.game, this.entityManager, this.containerManager,
                                                     this.projectileManager, this.terrainMap);
        this.movementSystem = new MovementSystem(this.entityManager.getEntities, this.player);
        this.mobController = new EntityController(this.entityManager.getEntities, this.player, this.projectileManager);
        this.renderSystem = new RenderSystem(this.entityManager.getEntities);
        this.camera = new Camera(this.player);
        this.renderBox = new RenderBox(this.player, GRIDSIZE, BLOCKSIZE);
        this.hud = new HUD(this.containerManager, this.player);
        this.craftingMenu = new CraftMenu(this.containerManager);
        this.collisionSystem = new CollisionSystem(this.player, this.entityManager.getEntities, this.projectileManager);
        this.cursorSystem = new CursorSystem(canvas, this.terrainMap, this.hud);
        this.cursorSystem.init();
        // this.worldImages = new WorldImages(this.player)
        // this.worldImages.init(this.entityManager)
        this.healthSystem = new HealthSystem(this.entityManager.getEntities, this.projectileManager);
        this.durationSystem = new DurationSystem(this.entityManager.getEntities);
        this.giveWeapons();
    }

    spawnTestEntities() {
        this.mobFactory.build('mossamber', this.player.components.transform.x + 250, this.player.components.transform.y - 200);
        this.mobFactory.build('grapebomb', this.player.components.transform.x + 500, this.player.components.transform.y - 200);
        this.mobFactory.build('spore', this.player.components.transform.x + 1000, this.player.components.transform.y - 200);
        this.mobFactory.build('creeperilla', this.player.components.transform.x + 1500, this.player.components.transform.y - 350);
        this.mobFactory.build('spiderboss', this.player.components.transform.x + 800, this.player.components.transform.y - 550);
    }



    giveWeapons() {
        this.#givePlayerPickAxe()
        this.#givePlayerLaserPistol()
        this.#givePlayerLaserGun()
        this.#givePlayerLaserRifle()
        this.#givePlayerFlamethrower()
        this.#givePlayerGrenadeLauncher()
        this.#givePlayerHandCannon()
        this.#givePlayerMinigun()
        this.#givePlayerRailgun()
    }

    update(menuActive, keys, mouseDown, mouse, deltaTime) {
        if (!menuActive) {
            if (this.#checkWinCon()) {
                this.rocket.components["state"].setState("win");
                this.rocket.components['transform'].gravity = 0;
                this.camera.setTarget(this.rocket);
                this.renderBox.setTarget(this.rocket);
                this.player.isDrawable = false;
                this.player.components['stats'].invincible = true;
                console.log("win");
            } else if (this.player.components['stats'].currentHealth <= 0) {
                this.player.components["transform"].gravity = 0;
                this.player.components["transform"].velocityX = 0;
                this.player.components["transform"].velocityY = 0;
                this.player.isDrawable = false;
                this.player.components['stats'].invincible = true;
                console.log("game over");
            } else {
                this.containerManager.unloadInventory();
                // **get input**
                this.playerController.update(keys, mouseDown, mouse, deltaTime, this.hud.activeContainer);
            }
            // **update state**
            this.spawnManager.update(deltaTime);
            this.entityManager.update();
            this.renderBox.update();
            this.#updateTileState();
            this.entityManager.getEntities.forEach((e) => this.#checkIfExposed(e));
            this.collisionSystem.refresh();

            this.mobController.update(deltaTime);
            // https://gamedev.stackexchange.com/a/71123
            // update Y first for ledges
            this.movementSystem.updateY(deltaTime);
            this.collisionSystem.resolveTileY();
            this.movementSystem.updateX(deltaTime);
            this.collisionSystem.resolveTileX();

            //this.worldImages.update()
            this.collisionSystem.resolveAttack();
            this.healthSystem.update(deltaTime);
            this.durationSystem.update(deltaTime)

            // **draw**
            this.camera.update();
            this.renderSystem.update(deltaTime);
        }
        this.cursorSystem.update(menuActive, this.playerController.getGridCell(mouse))
        this.craftingMenu.update(menuActive);
        this.containerManager.update(menuActive, mouseDown, mouse);
        this.hud.update(menuActive, keys);
    }

    draw(menuActive, ctx, mouse) {
        if (menuActive) ctx.putImageData(this.game.screenshot, 0, 0);
        else this.renderSystem.draw(ctx, this.camera);

        this.#drawColliders(ctx);
    
        this.containerManager.draw(menuActive, ctx, mouse);
        this.hud.draw(menuActive, ctx);
    }

    #drawColliders(ctx) {
        this.entityManager.getEntities.forEach(e => {
            if (e.components.boxCollider) {
                let box = e.components.boxCollider
                ctx.fillStyle = 'rgba(200,200,100,.3)'
                ctx.fillRect(box.x - this.camera.x, box.y - this.camera.y, box.width, box.height)
            }
        });
        this.spawnManager.spawnMap.forEach(pos => {
            ctx.fillStyle = 'rgba(255,0,0)'
            ctx.fillRect((pos.x * BLOCKSIZE) - this.camera.x, (pos.y * BLOCKSIZE) - this.camera.y, BLOCKSIZE, BLOCKSIZE)
        })
    }

    /**
     * This method checks to see what is in the bounds of the view screen. 
     * Entities that are within the view screen are marked as drawable so they can be drawn to the ctx.
     * Also, calls check if exposed method to save a loop routine.
     */
    #updateTileState() {
        this.entityManager.getEntities.forEach(e => {
            if(e.tag !== 'player' && !e.tag.includes('background')) {
                if(e.components.transform.x > (this.renderBox.x - BLOCKSIZE) * BLOCKSIZE &&
                e.components.transform.x < (this.renderBox.x + BLOCKSIZE) * BLOCKSIZE &&
                e.components.transform.y > (this.renderBox.y - BLOCKSIZE) * BLOCKSIZE &&
                e.components.transform.y < (this.renderBox.y + BLOCKSIZE) * BLOCKSIZE) {
                    if(!e.isBroken) {
                        e.isDrawable = true
                    }
                    this.#checkIfExposed(e)
                } else {
                    e.isDrawable = false
                }
            }
        })
    }

    /**
     * Checks a drawable entities four directions to see if it is exposed(not completely surrounded by other blocks).
     * A player will be able to collide with an exposed block, so they must be given colliders.
     * @param {Entity} e
     */
    #checkIfExposed(e) {
        const posX = e.components.transform.x / BLOCKSIZE
        const posY = e.components.transform.y / BLOCKSIZE

        if(e.isDrawable && e.tag.includes('tile') && !e.tag.includes('bedrock')) {
            const collider = new CBoxCollider({
                x: e.components.transform.x,
                y: e.components.transform.y,
                width: BLOCKSIZE,
                height: BLOCKSIZE
            });
            if (this.#isExposed(posY, posX)) {
                if (!e.components["boxCollider"]) e.addComponent([collider]);
            } else {
                delete e.components["boxCollider"];
            }
        }
    }

    #isExposed(posY, posX) {
        return posY === 0
               || /air|craft/.test(this.terrainMap[clamp(posY-1,0,posY)][posX].tag)
               || /air|craft/.test(this.terrainMap[posY][clamp(posX - 1, 0, posX)].tag)
               || /air|craft/.test(this.terrainMap[posY][clamp(posX + 1, 0, this.terrainMap[0].length - 1)].tag)
               || /air|craft/.test(this.terrainMap[clamp(posY + 1, 0, this.terrainMap.length - 1)][posX].tag)
               || /air|craft/.test(this.terrainMap[clamp(posY - 1, 0, this.terrainMap.length - 1)][posX].tag);
    }

    #givePlayerPickAxe() {
        let e = this.entityManager.addEntity({
            tag: 'pickaxe',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[MISC_PATH.PICK],
                    sWidth: BLOCKSIZE,
                    sHeight: BLOCKSIZE
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }

    #givePlayerLaserPistol() {
        let e = this.entityManager.addEntity({
            tag: 'laserPistol',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[WEAPON_PATH.LASER_PISTOL],
                    sWidth: 32,
                    sHeight: 32
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }

    #givePlayerLaserGun() {
        let e = this.entityManager.addEntity({
            tag: 'laserGun',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[WEAPON_PATH.LASER_GUN],
                    sWidth: 32,
                    sHeight: 32
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }

    #givePlayerLaserRifle() {
        let e = this.entityManager.addEntity({
            tag: 'laserRifle',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[WEAPON_PATH.LASER_RIFLE],
                    sWidth: 32,
                    sHeight: 32
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }

    #givePlayerFlamethrower() {
        let e = this.entityManager.addEntity({
            tag: 'flamethrower',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[WEAPON_PATH.FLAMETHROWER],
                    sWidth: 32,
                    sHeight: 32
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }

    #givePlayerGrenadeLauncher() {
        let e = this.entityManager.addEntity({
            tag: 'grenadeLauncher',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[WEAPON_PATH.GRENADE_LAUNCHER],
                    sWidth: 32,
                    sHeight: 32
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }

    #givePlayerHandCannon() {
        let e = this.entityManager.addEntity({
            tag: 'handCannon',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[WEAPON_PATH.HAND_CANNON],
                    sWidth: 32,
                    sHeight: 32
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }

    #givePlayerMinigun() {
        let e = this.entityManager.addEntity({
            tag: 'minigun',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[WEAPON_PATH.MINIGUN],
                    sWidth: 42,
                    sHeight: 42,
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }

    #givePlayerRailgun() {
        let e = this.entityManager.addEntity({
            tag: 'railgun',
            components: [
                new CSprite({
                    sprite: ASSET_MANAGER.cache[WEAPON_PATH.RAILGUN],
                    sWidth: 36,
                    sHeight: 36,
                }),
                new CTransform(this.player.components.transform.x, this.player.components.transform.y)
            ]
        })
        this.containerManager.addToInventory('player', e)
    }
    
    #checkWinCon() {
        let requisite = { item : { tag : 'tile_iron' }, count : 10 }
        return (this.containerManager.checkCount(requisite) && this.collisionSystem.checkCollision(this.player, this.rocket))
    }
}
