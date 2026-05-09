"use strict";

class Scene1 extends Controller {
    constructor() {
        super("scene1");
        this.PLAYER_START_X = 100;
        this.PLAYER_START_Y = 100;

        this.CREAM_START_X = 1800;
        this.CREAM_START_Y = 1000;
        this.CREAM_ANGLE = 5;
        this.collected = false;

        // Assume Origin(0.5, 0.5)
        this.EXIT_START_X = 1750;
        this.EXIT_START_Y = 375;
    }

    preload() {
        this.load.pack("main", "assets/pack.json");
    }

    create() {

        // Player cannot go beyond camera scope
        this.physics.world.setBoundsCollision();
        // this.image = this.physics.add.image(0, this.SCREEN_HEIGHT - 100, 'looking').setOrigin(0,0);
        // this.image.body.immovable = true;
        // this.image.body.allowGravity = false;

        // Create animations
        if (1) {
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
            this.anims.create({
                key: "cream",
                frames: this.anims.generateFrameNumbers("creamspritesheet", {
                    start: 0,
                    end: 4
                }),
                frameRate: 5,
                repeat: -1
            })
        }

        // Level matrix
        if (1) {
            this.level = [
            ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#", "#", "#", "#", "#", "#", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
            ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", "#", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
            ["#", "#", "#", "#", "#", "#", ".", ".", "#", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", "#", ".", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
            ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
            ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", "#", "#", "#", "#", "#", "#", "#"]
            ];
        }

        // Ground creation v1
        if (1){
        // for (let j = 0; j <= this.SCREEN_HEIGHT; j += this.SCREEN_HEIGHT - this.GROUND_SIZE) {
        //     for(let i = 0; i < this.SCREEN_WIDTH; i += this.GROUND_SIZE) {
        //         let groundTile = this.physics.add.sprite(i, j, "ground").setOrigin(0,0);
        //         groundTile.body.immovable = true;
        //         groundTile.body.allowGravity = false;
        //         this.ground.add(groundTile);
        //     }
        // }
        // for (let i = 0; i <= this.SCREEN_WIDTH; i += this.SCREEN_WIDTH - this.GROUND_SIZE) {
        //     for(let j = 0; j < this.SCREEN_HEIGHT; j += this.GROUND_SIZE) {
        //         let groundTile = this.physics.add.sprite(i, j, "ground").setOrigin(0,0);
        //         groundTile.body.immovable = true;
        //         groundTile.body.allowGravity = false;
        //         this.ground.add(groundTile);
        //     }
        // }
        }

        // Create ground from level matrix
        if (1) {
            this.ground = this.add.group();
            for (let x = 0; x < this.SCREEN_WIDTH/* / this.GROUND_SIZE*/; x += this.GROUND_SIZE) {
                for (let y = 0; y < this.SCREEN_HEIGHT/* / this.GROUND_SIZE*/; y += this.GROUND_SIZE) {
                    if (this.level[y / this.GROUND_SIZE][x / this.GROUND_SIZE] == "#") {
                        let groundTile = this.physics.add.sprite(x, y, "ground").setOrigin(0,0).setScale(0.5);
                        groundTile.body.immovable = true;
                        groundTile.body.allowGravity = false;
                        this.ground.add(groundTile);
                    }
                }
            }
        }


        // Create character
        this.character = this.physics.add.sprite(this.PLAYER_START_X, this.PLAYER_START_Y, "airbornespritesheet")
        .setScale(0.25)
        .setDrag(this.DRAG, this.DRAG)
        .setOrigin(0.5, 0.6);
        this.character.body.setSize(170, 170);
        this.character.body.setOffset(95, 95);
        this.character.setCollideWorldBounds(true);

        // Handle user inputs
        this.input.keyboard.on('keydown', (event) => {
            this.handleInput(event.key, this.character);
            console.log((this.time.now / 1000).toFixed(2));
        });

        // Create collectable
        this.cream = this.physics.add.sprite(this.CREAM_START_X, this.CREAM_START_Y, "creamspritesheet").setOrigin(1, 1);
        this.cream.play("cream");
        this.cream.body.immovable = true;
        this.cream.body.allowGravity = false;
        this.tween(this.cream, this.CREAM_ANGLE);

        // Add timer for scene
        this.timer = this.time.addEvent({
            delay: this.ONE_SECOND * 0.2,
            loop: true,
        });
        this.text = this.add.text(100, 100, "Time: 0").setDepth(10);

        // Add exit for the scene
        this.exit = this.physics.add.sprite(this.EXIT_START_X, this.EXIT_START_Y, "looking")
        .setOrigin(0.5, 0.5)
        .setScale(0.1)
        .setDepth(-1);
        this.exit.body.immovable = true;
        this.exit.body.allowGravity = false;

        // Add colliders for player
        this.physics.add.collider(
            this.character, 
            this.ground, 
            this.onCollide, 
            null, 
            this);

        this.physics.add.overlap(
            this.character, 
            this.cream, 
            this.onPickup, 
            null, 
            this);

        this.physics.add.overlap(
            this.character, 
            this.exit, 
            () => { this.onExit(
                this.character, 
                this.exit.x, 
                this.exit.y, 
                100, 
                this.ONE_SECOND * 2) 
            }, 
            null, 
            this);
        
        // this.onExit(sprite, this.EXIT_START_X, this.EXIT_START_Y, this.character, this.ONE_SECOND * 2);
    }

    onExit(character, centerX, centerY, startRadius, duration) {

        character.body.enable = false;
        this.timer.paused = true;
        // this.input.keyboard.enabled = false;
        
        let orbit = {
            angle: 0,
            radius: startRadius,
            scale: character.scale
        };

        this.tweens.add({
            targets: orbit,
            angle: 1080,
            radius: 0,
            scale: 0,
            duration: duration,
            ease: "Sine.easeIn",
            onUpdate: () => {
                let radians = Phaser.Math.DegToRad(orbit.angle);
                character.x = centerX + Math.cos(radians) * orbit.radius;
                character.y = centerY + Math.sin(radians) * orbit.radius;
                // console.log(character.x);
                // console.log(character.y);
                character.setScale(orbit.scale);
                character.angle = orbit.angle + 90;
            },
            onComplete: () => {
                // character.destroy();
                //this.scene.start("scene2");
            }
        });
    }
    
    tween(item, angle) {
        this.tweens.add({
            targets: item,
            angle: angle,
            duration: this.ONE_SECOND,
            repeat: 0,
            ease: "linear",
            onComplete: () => {
                if (item && item.active) { this.tween(item, -angle); }
            }
        });
    }

    onCollide(character, ground) {
        if (character.anims.getName() != 'idle') {
            character.play("idle");
        }
    }

    onPickup() {
        this.collected = true;
        this.cream.destroy();
    }

    update() {
        if (this.character.body.touching.none) {
            if (this.character.anims.getName() != 'airborne') {
            this.character.play("airborne");
            }
        }
        if (!this.timer.paused) {
            let elapsed = (this.time.now) / 1000;
            this.text.setText(`Time: ${elapsed.toFixed(2)}`);
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
    // backgroundColor: "#FFFFFF",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 1800
            }
        }
    },
    scene: [Scene1, Scene2, Scene3],
    title: "My Physics Game",
});

console.log("Game Goes Here");