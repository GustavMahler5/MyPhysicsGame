class Scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }

    preload() {
        this.load.pack("main", "assets/pack.json");
    }

    create() {
        this.physics.world.setBoundsCollision();

        this.input.keyboard.on('keydown-W', (event) => {
            console.log('The W key was pressed!');
            // Gravity Up
            this.physics.world.gravity.y = -1000;
            this.physics.world.gravity.x = 0;
        });
        this.input.keyboard.on('keydown-A', (event) => {
            console.log('The A key was pressed!');
            // Gravity Left
            this.physics.world.gravity.x = -1000;
            this.physics.world.gravity.y = 0;
        });
        this.input.keyboard.on('keydown-S', (event) => {
            console.log('The S key was pressed!');
            // Gravity Down
            this.physics.world.gravity.y = 1000;
            this.physics.world.gravity.x = 0;
        });
        this.input.keyboard.on('keydown-D', (event) => {
            console.log('The D key was pressed!');
            // Gravity Right
            this.physics.world.gravity.x = 1000;
            this.physics.world.gravity.y = 0;
        });
        

        // 0 = Dynamic Body
        // 1 = Static Body
        // let image = this.physics.add.image(0, 0, 'looking').setOrigin(0,0);
        // image.body.immovable = false;
        // image.body.allowGravity = true;
        // image.setCollideWorldBounds(true);
        let character = this.physics.add.sprite(500, 500, 'idle1', '01');
        character.body.setSize(140, 175)
        character.body.setOffset(110, 95);
        character.setCollideWorldBounds(true);
    }

    update() {}
}



class Scene2 extends Phaser.Scene {
    constructor() {
        super("scene2");
    }

    preload() {}

    create() {}

    update() {}
}



class Scene3 extends Phaser.Scene {
    constructor() {
        super("scene3");
    }

    preload() {}

    create() {}

    update() {}
}



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 800
            }
        }
    },
    scene: [Scene1, Scene2, Scene3],
    title: "My Physics Game",
});

console.log("Game Goes Here");