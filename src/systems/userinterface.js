class HUD {
    constructor(containermanager, player) {
        this.cm = containermanager;
        this.player = player;

        // create player inventory and trashcan
        this.cm.createInventory("player", 302, 690, 4, 9, undefined, "reverse");
        this.cm.createInventory(null, 678, 502, 1, 1, "red");
        
        this.cm.activateInventory("player");
        this.cm.activateInventory(null);

        this.containers = this.cm.getInventory("player");
        this.activeContainer = this.containers[0];
        this.refreshActiveInfo();

        // TESTING
        this.add(new Entity(generateInteractive('interact_furnace', 0, 0), 0));
    };

    // TESTING
    add(entity) {
        this.cm.addToInventory("player", entity);
    };

    refreshActiveInfo() {
        this.x = this.activeContainer.x;
        this.y = this.activeContainer.y;
    }
    
    draw(menuActive, ctx) {
        if (!menuActive) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "yellow";
            ctx.rect(this.x, this.y, 42, 42);
            ctx.stroke();
            ctx.restore();
        }
    }

    update(menuActive, keys, wheel) {
        if (!menuActive) {
            try {
                if (keys['1']) this.activeContainer = this.containers[0];
                if (keys['2']) this.activeContainer = this.containers[1];
                if (keys['3']) this.activeContainer = this.containers[2];
                if (keys['4']) this.activeContainer = this.containers[3];
                if (keys['5']) this.activeContainer = this.containers[4];
                if (keys['6']) this.activeContainer = this.containers[5];
                if (keys['7']) this.activeContainer = this.containers[6];
                if (keys['8']) this.activeContainer = this.containers[7];
                if (keys['9']) this.activeContainer = this.containers[8];
                if (wheel) {
                    let scroll = (wheel.deltaY < 0) ? -1 : 1;
                    if (this.activeContainer.slot === 0 && scroll < 0) this.activeContainer = this.containers[8];
                    else this.activeContainer = this.containers[(scroll + this.activeContainer.slot) % 9];
                }
            } catch (e) {  // edge case where player scrolls far too fast for system to track
                this.activeContainer = this.containers[0];
            } finally {
                this.refreshActiveInfo();
            }
        }
    }
}
