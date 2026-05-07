class Scene1 extends Controller {
    constructor() {
        super("scene1");
    }

    preload() {
        this.load.pack("main", "assets/pack.json");
    }

    create() {
        this.physics.world.setBoundsCollision();
        // this.image = this.physics.add.image(0, this.SCREEN_HEIGHT - 100, 'looking').setOrigin(0,0);
        // this.image.body.immovable = true;
        // this.image.body.allowGravity = false;

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("idlespritesheet", {
                start: 0,
                end: 20
            }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: "airborne",
            frames: this.anims.generateFrameNumbers("airbornespritesheet", {
                start: 8,
                end: 18
            }),
            frameRate: 60,
            repeat: 0
        })

        
        this.ground = this.add.group();
        for(let i = 0; i < this.SCREEN_WIDTH; i += this.GROUND_SIZE) {
            let groundTile = this.physics.add.sprite(i, this.SCREEN_HEIGHT - 200, "ground").setOrigin(0,0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        this.character = this.physics.add.sprite(500, 500, "airbornespritesheet")
        .setDrag(this.DRAG, this.DRAG)
        .setOrigin(0.5, 0.6);

        this.character.body.setSize(140, 175);
        this.character.body.setOffset(110, 95);
        this.character.setCollideWorldBounds(true);
        this.physics.add.collider(this.character, this.ground, this.onCollide, null, this);

        this.input.keyboard.on('keydown', (event) => {
            this.handleInput(event.key, this.character);
        });
        
    }

    onCollide (character, ground) {
        if (character.anims.getName() != 'idle') {
            character.play("idle");
        }
    }

    update() {
        if (this.character.body.touching.none) {
            if (this.character.anims.getName() != 'airborne') {
            this.character.play("airborne");
            }
        }
    }
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
        height: 1080,
    },
    backgroundColor: "#000000",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },
    scene: [Scene1, Scene2, Scene3],
    title: "My Physics Game",
});

console.log("Game Goes Here");