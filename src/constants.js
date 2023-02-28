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
const BLOCK_PLACEMENT_DISTANCE = 3.2
const FALL_DAMAGE_MULTIPLIER = 200;
const MOB_TIMEOUT = 900;
const CHEST_SPAWN_COUNT = 30

const MAXCREEPERILA = 2;
const MAXDIRTCARVER = 5;
const MAXLIGHTJELLY = 2;
const MAXSPORE = 10;
const MAXLIGHTBUG = 1;
const MAXGRAPEBOMB = 3;
const MAXBLOODSUCKER = 2;
const MAXWORMTANK = 5;

const GENSTATS = {
    BISMUTH	    :	12,
    COAL	    :	15,
    COBALT	    :	13,
    COPPER	    :	12,
    FERRITE	    :	8,
    GOLD	    :	12,
    IRON	    :	13,
    PARAFFIN	:	12,
    RUBY	    :	.01,
    SAND	    :	18,
    SILICA	    :	11,
    TIN	        :	10,
    TITANITE	:	11,
    TUNGSTEN	:	9
}

const BG_PATH = {
    SURFACE_0       :   './assets/backgrounds/surface_background_0.png',
    SURFACE_1       :   './assets/backgrounds/surface_background_1.png',
    UNDERGROUND_0	:	'./assets/backgrounds/underground_0.png',
    UNDERGROUND_3	:	'./assets/backgrounds/underground_3.png',
    UNDERGROUND_4	:	'./assets/backgrounds/underground_4.png',
    CAVE_0          :   './assets/backgrounds/cave_0_50.png',
    CAVE_1          :   './assets/backgrounds/cave_1_50.png',
    CAVE_2          :   './assets/backgrounds/cave_2_50.png',
    CAVE_3          :   './assets/backgrounds/cave_3_50.png'
}

const BG_SCROLL = {
    BACKGROUND_0    :   .03,
    BACKGROUND_1	:	.05,
    BACKGROUND_2	:	.06,
    BACKGROUND_3	:	.07,
    BACKGROUND_4	:	.08,
    BACKGROUND_5	:	.09
}

const CHAR_PATH = {
    BLOODSUCKER :	'./assets/sprites/bloodsucker2.png',
    BOMBFLY     :   './assets/sprites/bombfly.png',
    BROODMOTHER :	'./assets/sprites/broodmother.png',
    CREEPERILLA :	'./assets/sprites/creeperilla.png',
    DIRTCARVER  :	'./assets/sprites/dirtcarver2.png',
    ELECTROJELLY:	'./assets/sprites/electrojelly.png',
    ENTITY      :	'./assets/sprites/entity.png',
    GRAPEBOMB   :	'./assets/sprites/grapebomb2.png',
    LIGHTBUG    :	'./assets/sprites/lightbug.png',
    LIGHTJELLY  :	'./assets/sprites/lightjelly.png',
    MOSSFLY     :	'./assets/sprites/mossfly.png',
    NATIVENPC    :	'./assets/sprites/nativenpc.png',
    PLAYER      :	'./assets/sprites/player2.png',
    ROCKET      :	'./assets/sprites/rocket.png',
    SILVERFISH  :   './assets/sprites/silverfish.png',
    SPIKEJUMPER :   './assets/sprites/spikejumper2.png',
    SPORE       :	'./assets/sprites/spore2.png',
    VENGEFLY    :   './assets/sprites/vengefly.png',
    WORMTANK    :	'./assets/sprites/wormtank2.png',
    WORMWOOD   :	'./assets/sprites/wormwood.png'
}

const CRAFT_COLOR = {
    ANVIL_I: 'black',
    ANVIL_P: 'grey',
    BUILTIN_I: 'pink',
    BUILTIN_P: 'purple',
    FURNACE_I: 'orange',
    FURNACE_P: 'red',
    HUB_I: 'orange',
    HUB_P: 'black',
    STATION_I: 'brown',
    STATION_P: 'grey',
    TABLE_I: 'brown',
    TABLE_P: 'green',
    TRADER_I: 'yellow',
    TRADER_P: 'pink'
}

const CRAFT_PATH = {
    ANVIL   :   './assets/interactives/furniture/anvil.png',
    CHEST   :   './assets/interactives/furniture/chest.png',
    FURNACE :   './assets/interactives/furniture/furnace.png',
    HUB     :   './assets/interactives/furniture/hub.png',
    STATION :   './assets/interactives/furniture/station.png',
    TABLE   :   './assets/interactives/furniture/table.png',
    TRADER  :   './assets/interactives/furniture/trader.png'
}

const ITEM_PATH = {
    GRENADELAUNCHER: './assets/items/broken_grenade_launcher.png',
    HANDCANNON: './assets/items/broken_tech_pistol.png',
    MINIGUN: './assets/items/broken_minigun.png',
    RAILGUN: './assets/items/broken_sniper.png',

    BISMUTH: './assets/items/bismuth_bar.png',
    COBALT: './assets/items/cobalt_bar.png',
    COPPER: './assets/items/copper_bar.png',
    FERRITE: './assets/items/ferrite_bar.png',
    GOLD: './assets/items/gold_bar.png',
    IRON: './assets/items/iron_bar.png',
    PARAFFIN: './assets/items/paraffin_bar.png',
    STEEL: './assets/items/steel_bar.png',
    TIN: './assets/items/tin_bar.png',
    TITANITE: './assets/items/titanite_bar.png',
    TUNGSTEN: './assets/items/tungsten_bar.png',

    AMBER: './assets/items/amber.png',
    DIRTCARVER: './assets/items/mob_dirtCarver.png',
    WORMTANK: './assets/items/mob_wormTank.png',
    STICKY: './assets/items/mob_stickySlime.png',
    SPIDER: './assets/items/spiderSilk.png',

    CIRCUIT: './assets/items/circuit.png',
    SMART: './assets/items/smartCircuit.png',
    CHARCOAL: './assets/items/coal.png',
    GLASS: './assets/items/glass.png',
    PLEXIGLASS: './assets/items/plexiglass.png',
    REFINED: './assets/items/silica_refined.png',
    WOOD: './assets/items/wood.png',

    HUB: './assets/items/plan_hub.png',
    STATION: './assets/items/plan_station.png',
    PARAFFINTANK: './assets/items/paraffintank.png',
    PARAFFINTANKPLAN: './assets/items/plan_paraffintank.png',
    MEDICAL: './assets/items/medicalBay.png',
    FUEL: './assets/items/fueltank.png',
    FUELTOWER: './assets/items/fueltower.png',
}

const MISC_PATH = {
    CURSOR_CROSSHAIR: './assets/cursors/Crosshairs_Red.png',
    CURSOR_HAND: './assets/cursors/inventoryhand.png',
    CURSOR_PICK: './assets/cursors/pickCursor.cur',
    BULLET: './assets/icons/bullets.png',
    BULLETFRAME: './assets/icons/bullets_frame.png',
    DEATH_EFFECT: './assets/projectiles/death_explosion.png',
    PICK: './assets/icons/item_3485.png',
    BLOCK_PLACEMENT_GREEN: './assets/cursors/blockPlacementGreen.cur',
    BLOCK_PLACEMENT_RED: './assets/cursors/blockPlacementRed.cur'
}

const OVERLAY_PATH = {
    FOV: './assets/overlays/fov.png',
    INVENTORY: './assets/overlays/inventory.png',
    OBSCURED: './assets/overlays/obscured.png',
    c0000: './assets/overlays/obscured.png',
    c1100: './assets/overlays/obscuredc_nw.png',
    c1000: './assets/overlays/obscuredc_n.png',
    c1010: './assets/overlays/obscuredc_ne.png',
    c0100: './assets/overlays/obscuredc_w.png',
    c0010: './assets/overlays/obscuredc_e.png',
    c0101: './assets/overlays/obscuredc_sw.png',
    c0001: './assets/overlays/obscuredc_s.png',
    c0011: './assets/overlays/obscuredc_se.png',
    o1000: './assets/overlays/obscuredo_nw.png',
    o0100: './assets/overlays/obscuredo_ne.png',
    o0010: './assets/overlays/obscuredo_sw.png',
    o0001: './assets/overlays/obscuredo_se.png',
    VIGNETTE: './assets/overlays/vignette.png'
}

const PROJECTILE_PATH = {
    BOMB        :   './assets/projectiles/bomb.png',
    DARK_ORB    :   './assets/projectiles/orb_invert.png',
    ELECTRICITY :   './assets/projectiles/electricity.png',
    EXPLOSION   :   './assets/projectiles/explosion.png',
    FIRE        :   './assets/projectiles/fire.png',
    IMPACT      :   './assets/projectiles/impact2.png',
    LASER       :   './assets/projectiles/laser.png',
    MINI_BOMB   :   './assets/projectiles/red_bomb.png',
    ORB         :   './assets/projectiles/orb.png'
}

const SOUND_PATH = {
    BOSS: './assets/music/themes/boss_battle.mp3',
    EXPLOSION: './assets/music/sfx/pipe_bomb1.wav',
    FIRE: './assets/music/sfx/flame_thrower_loop.wav',
    GRENADE_LAUNCHER: './assets/music/sfx/grenade_launcher_shoot.wav',
    HAND_CANNON: './assets/music/sfx/back_scatter.wav',
    LASER: './assets/music/sfx/capper_shoot.wav',
    RAILGUN: './assets/music/sfx/sniper_railgun_single_01.wav',
    SMALL_EXPLOSION: './assets/music/sfx/airstrike_small_explosion_03.wav',
    STRONG_LASER: './assets/music/sfx/shooting_star_shoot.wav'
}

const TILE_LIFE = {
    DIRT: 1,
    RUBY: 1,
    STONE: 1
}

const TILE_PATH = {
    BISMUTH	    :	'./assets/tiles/tilesBismuth.png',
    COAL	    :	'./assets/tiles/tilesCoal.png',
    COBALT	    :	'./assets/tiles/tilesCobalt.png',
    COPPER	    :	'./assets/tiles/tilesCopper.png',
    DIRT	    :	'./assets/tiles/tilesDirt.png',
    FERRITE	    :	'./assets/tiles/tilesFerrite.png',
    GOLD	    :	'./assets/tiles/tilesGold.png',
    IRON	    :	'./assets/tiles/tilesIron.png',
    PARAFFIN	:	'./assets/tiles/tilesParaffin.png',
    RUBY	    :	'./assets/tiles/tilesRuby.png',
    SAND	    :	'./assets/tiles/tilesSand.png',
    SILICA	    :	'./assets/tiles/tilesSilica.png',
    STONE	    :	'./assets/tiles/tilesStone.png',
    TIN	        :	'./assets/tiles/tilesTin.png',
    TITANITE	:	'./assets/tiles/tilesTitanite.png',
    TUNGSTEN	:	'./assets/tiles/tilesTungsten.png',
    BEDROCK     :   './assets/tiles/tilesBedrock.png'
}

const WEAPON_PATH = {
    FLAMETHROWER        :   './assets/weapons/flamethrower.png',
    GRENADE_LAUNCHER    :   './assets/weapons/grenade_launcher.png',
    HAND_CANNON         :   './assets/weapons/tech_pistol.png',
    LASER_GUN           :   './assets/weapons/laser_gun.png',
    LASER_PISTOL        :   './assets/weapons/laser_pistol.png',
    LASER_RIFLE         :   './assets/weapons/laser_rifle.png',
    MINIGUN             :   './assets/weapons/minigun.png',
    MINIGUN_ANIM        :   './assets/weapons/minigun_anim.png',
    RAILGUN             :   './assets/weapons/sniper.png',
    RAYGUN              :   './assets/weapons/raygun.png',
}

const ENV_PATH = {
    CHOZO_STATUE        :   './assets/environment/chozoStatue.png',
    RED_PLANET          :   './assets/environment/planet.png'
}

const PATHS = {
    BGS         :   BG_PATH,
    CHARS       :   CHAR_PATH,
    CRAFTS      :   CRAFT_PATH,
    ITEMS       :   ITEM_PATH,
    MISCS       :   MISC_PATH,
    OVERLAYS    :   OVERLAY_PATH,
    PROJECTILES :   PROJECTILE_PATH,
    TILES       :   TILE_PATH,
    WEAPONS     :   WEAPON_PATH,
    SOUNDS      :   SOUND_PATH,
    ENVS: ENV_PATH
}

const CONSTANTS = {
    BGS         :   BG_PATH,
    BGSCROLLS   :   BG_SCROLL,
    CHARS       :   CHAR_PATH,
    CRAFTS      :   CRAFT_PATH,
    CRAFTCOLORS :   CRAFT_COLOR,
    ITEMS       :   ITEM_PATH,
    LIVES       :   TILE_LIFE,
    MISCS       :   MISC_PATH,
    OVERLAYS    :   OVERLAY_PATH,
    PROJECTILES :   PROJECTILE_PATH,
    TILES       :   TILE_PATH,
    WEAPONS     :   WEAPON_PATH,
    SOUNDS      :   SOUND_PATH,
    ENVS: ENV_PATH
}

for (const constant in CONSTANTS) Object.freeze(CONSTANTS[constant])
