class Scene1 extends Controller {
    constructor() {
        super("scene1");
    }

    preload() {
        this.load.pack("main", "assets/pack.json");
    }

    create() {
        this.physics.world.setBoundsCollision();

        // 0 = Dynamic Body
        // 1 = Static Body
        // let image = this.physics.add.image(0, 0, 'looking').setOrigin(0,0);
        // image.body.immovable = false;
        // image.body.allowGravity = true;
        // image.setCollideWorldBounds(true);
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("idlespritesheet", {
                start: 0,
                end: 20
            }),
            frameRate: 21,
            repeat: -1
        });
        this.anims.create({
            key: "airborne",
            frames: this.anims.generateFrameNumbers("airbornespritesheet", {
                start: 0,
                end: 18
            }),
            frameRate: 60,
            repeat: 0
        })
        let character = this.physics.add.sprite(500, 500, "airbornespritesheet").setOrigin(0.5, 0.6);
        // this.input.keyboard.on('keydown-P', (event) => {
        //     character.play("airborne");
        // });
        // this.input.keyboard.on('keydown-O', (event) => {
        //     character.play("idle");
        // });
        character.play("idle");
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