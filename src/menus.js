class CraftMenu {

    constructor(containManager) {
        this.cm = containManager;
        this.recipes = [];

        // TESTING
        this.x = 30;
        this.y = 30;

        // this.cm.createInventory("table1", this.x, this.y, 1, 3, "pink", "recipe");
        // this.cm.addToInventory("table1", new block1());
        // this.cm.addToInventory("table1", new block2());
        // this.cm.addToInventory("table1", new block3(), 2);
        // this.cm.activateInventory("table1");
        // this.recipes.push("table1");
        //
        // this.cm.createInventory("table2", this.x, this.y + 54, 1, 2, "pink", "recipe");
        // this.cm.addToInventory("table2", new block2());
        // this.cm.addToInventory("table2", new block3());
        // this.cm.activateInventory("table2");
        // this.recipes.push("table2");
        //
        // this.cm.createInventory("furnace1", this.x, this.y + 54 * 2, 1, 2, "red", "recipe");
        // this.cm.addToInventory("furnace1", new block3());
        // this.cm.addToInventory("furnace1", new block1());
        // this.cm.activateInventory("furnace1");
        // this.recipes.push("furnace1");
        //
        // for (const entry in this.recipes) {
        //     let recipe = this.recipes[entry];
        //     if (recipe.includes("table")) {
        //         this.denoteRecipe(recipe, "green");
        //     } else if (recipe.includes("furnace")) {
        //         this.denoteRecipe(recipe, "grey");
        //     }
        // }
    }

    denoteRecipe(owner, color) {
        let recipe = this.cm.getInventory(owner)
        let product = recipe[0];
        product.keyword = owner;
        product.font = "bold 20";
        product.fillColor = color;
        product.x -= 7;
        product.y -= 4;
        product.width += 7;
        product.calculateMiddle();

        for (let i = 1; i < recipe.length; i++) {
            recipe[i].playerCount = this.cm.playerCounts.get(recipe[i].item.tag);
            recipe[i].update = function() {
                this.displayText = recipe[i].playerCount + "/" + this.count;
            }
        }
    }

    update(uiActive) {
        if (uiActive) {
            let actives = this.cm.activeInventory;
            for (let i = 2; i < actives.length; i++) {
                if (this.recipes.includes(actives[i][0].owner)) {
                    actives[i][0].uncraftable = !this.cm.checkSufficient(actives[i]);
                }
                for (let j = 1; j < actives[i].length; j++) {
                    let playerCount = this.cm.playerCounts.get(actives[i][j].item.tag);
                    actives[i][j].playerCount = playerCount;
                    actives[i][j].insufficient = playerCount < actives[i][j].count;
                }
            }
        }
    }
}

class StoreMenu {

}