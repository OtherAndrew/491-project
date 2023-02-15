/**
 * Constants that are used across the game.
 */

//Game Values
const WIDTH = 1024
const HEIGHT = 768
const GRIDSIZE = 15
const BLOCKSIZE = 32
const WIDTH_PIXELS = GRIDSIZE * GRIDSIZE * BLOCKSIZE
const HEIGHT_PIXELS = WIDTH_PIXELS * 2
const GRAVITY = 1

const MAXCREEPERILA = 2;
const MAXDIRTCARVER = 5;
const MAXLIGHTJELLY = 2;
const MAXSPORE = 10;
const MAXLIGHTBUG = 1;
const MAXGRAPEBOMB = 3;
const MAXBLOODSUCKER = 2;
const MAXWORMTANK = 5;

// const BISMUTH_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 3.0
// }
// const COAL_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 7.0
// }
// const COBALT_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 3.0
// }
// const COPPER_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 7.0
// }
// const FERRITE_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 3.0
// }
// const GOLD_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 6.0
// }
// const IRON_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 7.0
// }
// const PARAFFIN_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 3.0
// }
// const SAND_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 15.0
// }
// const SILICA_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 5.0
// }
// const TIN_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 2.5
// }
// const TITANITE_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 1.5
// }
// const TUNGSTEN_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 3.0
// }
// const RUBY_GEN_STATS = {
//     yMin: 0,
//     yMax: 0,
//     rate: 0.0
// }

const GENSTATS = {
    BISMUTH	    :	{
                        yMin: 0,
                        yMax: 0,
                        rate: 3.0
                    },
    COAL	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 7.0
    				},
    COBALT	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 3.0
    				},
    COPPER	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 7.0
    				},
    FERRITE	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 3.0
    				},
    GOLD	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 6.0
    				},
    IRON	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 7.0
    				},
    PARAFFIN	:	{
    					yMin: 0,
    					yMax: 0,
    					rate: 3.0
    				},
    RUBY	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 0.0
    				},
    SAND	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 15.0
                    },
    SILICA	    :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 5.0
                    },
    TIN	        :	{
    					yMin: 0,
    					yMax: 0,
    					rate: 2.5
                    },
    TITANITE	:	{
    					yMin: 0,
    					yMax: 0,
    					rate: 1.5
                    },
    TUNGSTEN	:	{
    					yMin: 0,
    					yMax: 0,
    					rate: 3.0
                    }
}

const BG_PATH = {
    DIRT	        :	'./assets/backgrounds/background_dirt.png',
    SURFACE_0       :   './assets/backgrounds/surface_background_0.png',
    SURFACE_1       :   './assets/backgrounds/surface_background_1.png',
    UNDERGROUND_0	:	'./assets/backgrounds/underground_0.png',
    UNDERGROUND_1	:	'./assets/backgrounds/underground_1.png',
    UNDERGROUND_2	:	'./assets/backgrounds/underground_2.png',
    UNDERGROUND_3	:	'./assets/backgrounds/underground_3.png',
    UNDERGROUND_4	:	'./assets/backgrounds/underground_4.png',
    UNDERGROUND_5	:	'./assets/backgrounds/underground_5.png',
    UNDERGROUND_6	:	'./assets/backgrounds/underground_6.png'
}

const BG_SCROLL = {
    SPEED_0 :	.03,
    SPEED_1	:	.05,
    SPEED_2	:	.06,
    SPEED_3	:	.07,
    SPEED_4	:	.08,
    SPEED_5	:	.09
}

// ALT SOLUTION
// const BG_SCROLL = {
//     BACKGROUND_0    :   .03,
//     BACKGROUND_1	:	.05,
//     BACKGROUND_2	:	.06,
//     BACKGROUND_3	:	.07,
//     BACKGROUND_4	:	.08,
//     BACKGROUND_5	:	.09
// }

const CHAR_PATH = {
    DIRTCARVER  :	'./assets/sprites/dirtcarver.png',
    ENTITY      :	'./assets/sprites/entity.png',
    GRAPEBOMB   :	'./assets/sprites/grapebomb.png',
    LIGHTBUG    :	'./assets/sprites/lightbug.png',
    LIGHTJELLY  :	'./assets/sprites/lightjelly.png',
    PLAYER      :	'./assets/sprites/player.png',
    SPORE       :	'./assets/sprites/spore.png',
    WORMTANK    :	'./assets/sprites/wormtank.png',
    ROCKET      :	'./assets/sprites/rocket.png',
    MOSSAMBER   :	'./assets/sprites/mossamber.png',
    BLOODSUCKER :	'./assets/sprites/bloodsucker.png'
}

const CRAFT_PATH = {
    ANVIL   :   './assets/icons/anvil.png',
    FURNACE :   './assets/icons/furnace.png',
    TABLE   :   './assets/icons/table.png'
}

const MISC_PATH = {
    CURSOR_CROSSHAIR    :   './assets/cursors/Crosshairs_Red.png',
    CURSOR_HAND         :   './assets/cursors/inventoryhand.png',
    CURSOR_PICK	        :	'./assets/cursors/pickCursor.cur',
    GENERICDEATH	    :	'./assets/sprites/smoke.png',
    PICK	            :	'./assets/icons/item_3485.png',
}

const OVERLAY_PATH = {
    INVENTORY   :   './assets/overlay/inventory.png',
    VIGNETTE    :   './assets/overlay/vignette.png',
    FOV         :   './assets/overlay/fov.png'
}

const PROJECTILE_PATH = {
    BOMB     :   './assets/projectiles/bomb.png',
    DARK_ORB :   './assets/projectiles/orb_invert.png',
    FIRE     :   './assets/projectiles/fire.png',
    ORB      :   './assets/projectiles/orb.png',
    LASER    :   './assets/projectiles/laser.png'
}

const TEST_PATH = {
    // FOR TEST ASSETS
}

const TILE_LIFE = {
    DIRT    :   20,
    RUBY    :   50,
    STONE   :   30
}

const TILE_PATH = {
    BISMUTH	    :	'./assets/tiles/tilesBismuth.png', //-------------------
    COAL	    :	'./assets/tiles/tilesCoal.png', //-------------------
    COBALT	    :	'./assets/tiles/tilesCobalt.png', //-------------------
    COPPER	    :	'./assets/tiles/tilesCopper.png',//-------------------
    DIRT	    :	'./assets/tiles/tilesDirt.png', //-------------------
    FERRITE	    :	'./assets/tiles/tilesFerrite.png', //-------------------
    GOLD	    :	'./assets/tiles/tilesGold.png', //-------------------
    IRON	    :	'./assets/tiles/tilesIron.png', //-------------------
    PARAFFIN	:	'./assets/tiles/tilesParaffin.png',
    RUBY	    :	'./assets/tiles/tilesRuby.png',
    SAND	    :	'./assets/tiles/tilesSand.png', //-------------------
    SILICA	    :	'./assets/tiles/tilesSilica.png', //-------------------
    STONE	    :	'./assets/tiles/tilesStone.png', //-------------------
    TIN	        :	'./assets/tiles/tilesTin.png', //-------------------
    TITANITE	:	'./assets/tiles/tilesTitanite.png', //-------------------
    TUNGSTEN	:	'./assets/tiles/tilesTungsten.png',  //-------------------
}

const WEAPON_PATH = {
    FLAMETHROWER        :   './assets/items/flamethrower.png',
    GRENADE_LAUNCHER    :   './assets/items/grenade_launcher.png',
    HAND_CANNON         :   './assets/items/tech_pistol.png',
    LASER_GUN           :   './assets/items/laser_gun.png',
    LASER_PISTOL        :   './assets/items/laser_pistol.png',
    LASER_RIFLE         :   './assets/items/laser_rifle.png',
    MINIGUN             :   './assets/items/minigun.png',
    RAILGUN             :   './assets/items/sniper.png',
    RAYGUN              :   './assets/items/raygun.png',
}

const PATHS = {
    BGS         :   BG_PATH,
    CHARS       :   CHAR_PATH,
    CRAFTS      :   CRAFT_PATH,
    MISCS       :   MISC_PATH,
    OVERLAYS    :   OVERLAY_PATH,
    PROJECTILES :   PROJECTILE_PATH,
    TESTS       :   TEST_PATH,
    TILES       :   TILE_PATH,
    WEAPONS     :   WEAPON_PATH
}

const CONSTANTS = {
    BGS         :   BG_PATH,
    BGSCROLLS   :   BG_SCROLL,
    CHARS       :   CHAR_PATH,
    CRAFTS      :   CRAFT_PATH,
    LIVES       :   TILE_LIFE,
    MISCS       :   MISC_PATH,
    OVERLAYS    :   OVERLAY_PATH,
    PROJECTILES :   PROJECTILE_PATH,
    TESTS       :   TEST_PATH,
    TILES       :   TILE_PATH,
    WEAPONS     :   WEAPON_PATH
}

for (const constant in CONSTANTS) Object.freeze(CONSTANTS[constant])
