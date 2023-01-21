class MossAmber {
    constructor(game) {
        //this.game = game;
        this.speed = 0; //base travel speed 25
        this.x = 0;
        this.y = 0;
        this.face = 0;  //0 face right, 1 face left

        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mossamber25f.png");
        this.animations = []
        //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
        this.animations.push(new Animator(this.spritesheet, 0,2,54.5, 62, 5, .4, 1));

    }

    update() {
        this.x += this.speed * this.game.clockTick;

    }
    draw(ctx) {
        //use this.face to switch side.
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x ,this.y, 1);


    }
}