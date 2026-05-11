"use strict";

class Controller extends Phaser.Scene {
    constructor(key) {

        super(key);
        this.SCREEN_WIDTH = 1920;
        this.SCREEN_HEIGHT = 1080;
        this.DRAG = 500;
        this.GROUND_SIZE = 60;
        this.GRAVITY = 1200;
        this.ONE_SECOND = 1000;
        this.MAX_VELOCITY = 1000;
        this.EXIT_ANIMATION_SPIN_RADIUS = 100;
        this.switches = 0;

        // Level matrices
        this.level1 = [
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "^", "^", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#", "#", "#", "#", "#", "#", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ">", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ">", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ">", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "+", "+", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", "#", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
        ["#", "#", "#", "#", "#", "#", ".", ".", "#", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", "#", ".", ".", ".", ".", ".", "#"],
        ["#", ">", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ">", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", ".", ".", ".", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ">", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", "^", "^", ".", ".", ".", ".", ".", ".", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
        ];

        this.level2 = [
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
        ["#", "+", "+", "+", "+", "+", "+", "+", "#", ".", "+", "+", "+", "+", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "<", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "<", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "<", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "<", "#"],
        ["#", ".", ".", ".", "#", "#", "#", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", "+", "+", "+", "+", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", "+", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", "#", "#", "#", "#", "#", ".", ".", ".", "#", "#", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", "#", "", ".", "#", "^", "^", "^", "^", "^", "^", ".", ".", ".", ".", ".", ".", "^", "^", "^", "^", "^", "^", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
        ];

        this.level3 = [
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
        ["#", ".", ".", ".", ".", "#", ">", "+", "+", "+", "+", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", "#", ">", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", "#", ">", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
        ["#", ".", ".", ".", ".", "#", ">", ".", ".", ".", ".", ".", "^", "^", "^", "^", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["#", ".", ".", ".", "#", "#", ">", ".", ".", ".", ".", "<", "#", "#", "#", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["#", "#", "#", "#", "#", ">", ".", ".", ".", ".", ".", "<", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["#", "#", "#", "#", ">", ".", ".", ".", ".", ".", "<", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["#", "#", "#", "#", ">", ".", ".", ".", ".", ".", "<", "#", ".", "#", "#", "#", ".", "#", "#", ".", "#", "#", ".", "#", "#", "#", ".", "#", "#", ".", "#", "#"],
        ["#", "#", "#", ">", ".", ".", ".", ".", ".", "<", "#", "#", ".", "#", ".", ".", ".", "#", ".", "#", ".", "#", ".", "#", ".", "#", ".", "#", ".", "#", ".", "#"],
        ["#", "#", "#", ">", ".", ".", ".", ".", ".", "<", "#", ".", ".", "#", ".", ".", ".", "#", ".", "#", ".", "#", ".", "#", "#", "#", ".", "#", ".", ".", ".", "#"],
        ["#", "#", ">", ".", ".", ".", ".", ".", "<", "#", "#", ".", ".", "#", "#", "#", ".", "#", ".", ".", ".", "#", ".", "#", ".", ".", ".", "#", ".", ".", ".", "#"],
        ["#", ">", ".", ".", ".", ".", ".", "<", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["#", ".", ".", ".", ".", ".", "<", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", "#", "#", "#", ".", "#", "#", "#", ".", ".", ".", ".", "."],
        ["#", ".", ".", ".", ".", ".", "<", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#", ".", "#", ".", "#", ".", ".", ".", ".", "."],
        ["#", ".", ".", ".", ".", ".", "<", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", "#", "#", "#", ".", "#", ".", "#", ".", ".", ".", ".", "."],
        ["#", ".", ".", ".", ".", "^", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", "#", ".", ".", ".", "#", ".", "#", ".", ".", ".", ".", "."],
        ["#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", "#", "#", "#", ".", "#", "#", "#", ".", ".", ".", ".", "."]
        ];

    }

    preload() {}
    create() {}
    update() {}

    handleInput(input, character, scene) {

        switch(input) {

            case("w"):

                // Gravity Up
                if (this.physics.world.gravity.y != -this.GRAVITY) {

                    this.switches++;

                    this.physics.world.gravity.y = -this.GRAVITY;
                    this.physics.world.gravity.x = 0;

                    this.upGravityFX = this.add.image(this.SCREEN_WIDTH * 0.47, this.SCREEN_HEIGHT * 0.7, "upgravity1")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);
                    
                    this.upGravityFX2 = this.add.image(this.SCREEN_WIDTH * 0.47, this.SCREEN_HEIGHT * 0.7, "upgravity2")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);

                    this.tweens.add({

                        targets: this.upGravityFX,
                        y: this.SCREEN_HEIGHT * 0.45,
                        alpha: 0,
                        duration: this.ONE_SECOND * 0.5,
                        repeat: 0,
                        onComplete: () => {

                            this.upGravityFX.destroy();

                        }

                    });

                    this.tweens.add({

                        targets: this.upGravityFX2,
                        y: this.SCREEN_HEIGHT * 0.35,
                        alpha: 0,
                        duration: this.ONE_SECOND * 0.5,
                        repeat: 0,
                        onComplete: () => {

                            this.upGravityFX2.destroy();

                        }

                    });

                    // Handle rotation direction
                    if (character.angle <= 90 && character.angle >= 0) {
                        
                        this.tweens.add({

                            targets: character,
                            angle: 180,
                            duration: this.ONE_SECOND * 0.3

                        });

                    }

                    else {
                        
                        this.tweens.add({

                            targets: character,
                            angle: -180,
                            duration: this.ONE_SECOND * 0.15

                        });

                    }
                }

                break;


            case("a"):

                // Gravity Left
                if (this.physics.world.gravity.x != -this.GRAVITY) {

                    this.switches++;

                    this.physics.world.gravity.x = -this.GRAVITY;
                    this.physics.world.gravity.y = 0;

                    this.leftGravityFX = this.add.image(this.SCREEN_WIDTH * 0.65, this.SCREEN_HEIGHT * 0.5, "leftgravity1")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);

                    this.leftGravityFX2 = this.add.image(this.SCREEN_WIDTH * 0.65, this.SCREEN_HEIGHT * 0.5, "leftgravity2")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);

                    this.tweens.add({

                        targets: this.leftGravityFX,
                        x: this.SCREEN_WIDTH * 0.45,
                        alpha: 0,
                        duration: this.ONE_SECOND * 0.5,
                        repeat: 0,
                        onComplete: () => {

                            this.leftGravityFX.destroy();

                        }

                    });

                    this.tweens.add({
                        targets: this.leftGravityFX2,
                        x: this.SCREEN_WIDTH * 0.35,
                        alpha: 0,
                        duration: this.ONE_SECOND * 0.5,
                        repeat: 0,
                        onComplete: () => {

                            this.leftGravityFX2.destroy();

                        }

                    });

                    // Handle rotation direction
                    if (character.angle >= -180 && character.angle <= -90) {
                        
                        this.tweens.add({

                            targets: character,
                            angle: -270,
                            duration: this.ONE_SECOND * 0.3

                        });

                    }

                    else {
                        
                        this.tweens.add({

                            targets: character,
                            angle: 90,
                            duration: this.ONE_SECOND * 0.15
                        });

                    }

                }

                break;


            case("s"):

                // Gravity Down
                if (this.physics.world.gravity.y != this.GRAVITY) {

                    this.switches++;

                    this.physics.world.gravity.y = this.GRAVITY;
                    this.physics.world.gravity.x = 0;

                    this.downGravityFX = this.add.image(this.SCREEN_WIDTH * 0.47, this.SCREEN_HEIGHT * 0.45, "downgravity1")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);
                    
                    this.downGravityFX2 = this.add.image(this.SCREEN_WIDTH * 0.5, this.SCREEN_HEIGHT * 0.35, "downgravity2")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);

                    this.tweens.add({

                        targets: this.downGravityFX,
                        y: this.SCREEN_HEIGHT * 0.7,
                        alpha: 0,
                        duration: this.ONE_SECOND * 0.5,
                        repeat: 0,
                        onComplete: () => {

                            this.downGravityFX.destroy();

                        }

                    });

                    this.tweens.add({

                        targets: this.downGravityFX2,
                        y: this.SCREEN_HEIGHT * 0.7,
                        alpha: 0,
                        duration: this.ONE_SECOND * 0.5,
                        repeat: 0,
                        onComplete: () => {

                            this.downGravityFX2.destroy();

                        }

                    });

                    this.tweens.add({

                        targets: character,
                        angle: 0,
                        duration: this.ONE_SECOND * 0.15

                    });

                }

                break;


            case("d"):

                // Gravity Right
                if (this.physics.world.gravity.x != this.GRAVITY) {

                    this.switches++;

                    this.physics.world.gravity.x = this.GRAVITY;
                    this.physics.world.gravity.y = 0;

                    this.rightGravityFX = this.add.image(this.SCREEN_WIDTH * 0.45, this.SCREEN_HEIGHT * 0.5, "rightgravity1")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);

                    this.rightGravityFX2 = this.add.image(this.SCREEN_WIDTH * 0.35, this.SCREEN_HEIGHT * 0.5, "rightgravity2")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);

                    this.tweens.add({

                        targets: this.rightGravityFX,
                        x: this.SCREEN_WIDTH * 0.6,
                        alpha: 0,
                        duration: this.ONE_SECOND * 0.5,
                        repeat: 0,
                        onComplete: () => {

                            this.rightGravityFX.destroy();

                        }

                    });

                    this.tweens.add({

                        targets: this.rightGravityFX2,
                        x: this.SCREEN_WIDTH * 0.6,
                        alpha: 0,
                        duration: this.ONE_SECOND * 0.5,
                        repeat: 0,
                        onComplete: () => {

                            this.rightGravityFX2.destroy();

                        }

                    });

                    
                    if (character.angle >= 90) {
                        
                        this.tweens.add({

                            targets: character,
                            angle: 270,
                            duration: this.ONE_SECOND * 0.15

                        });

                    }

                    else {
                        
                        this.tweens.add({

                            targets: character,
                            angle: -90,
                            duration: this.ONE_SECOND * 0.15

                        });

                    }

                }

                break;


            case("f"):

                this.physics.world.drawDebug = !this.physics.world.drawDebug;
                this.physics.world.debugGraphic.clear();
                break;


            case("r"):

                this.scene.start(scene);
                break;

        }

    }

    onExit(character, centerX, centerY, duration, scene, time, parTime, parSwitches) {

        character.body.enable = false;
        this.input.keyboard.enabled = false;
        this.exit.play("exit");
        
        let orbit = {

            angle: 180,
            radius: this.EXIT_ANIMATION_SPIN_RADIUS,
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
                character.setScale(orbit.scale);
                character.angle = orbit.angle + 90;

            },

            onComplete: () => {

                this.time.delayedCall(this.ONE_SECOND * 1.5, () => this.transition(scene, time, parTime, parSwitches));

            }

        });

    }

    transition(scene, time, parTime, parSwitches) {

        let box = this.add.rectangle(
            this.SCREEN_WIDTH / 2, 
            -400, 
            this.SCREEN_WIDTH * 0.6, 
            this.SCREEN_HEIGHT * 0.6, 
            0xFFFFFF)
            .setDepth(50)
            .setOrigin(0.5, 0.5);

        let text = this.add.text(
            this.SCREEN_WIDTH / 2,
            -400,
            `Time: ${time} seconds\nPar Time: ${parTime.toFixed(2)} Seconds\nSwitches: ${this.switches}\nPar Switches: ${parSwitches}\n\nNext Level: "${scene}"`)
            .setStyle({ fontSize: `56px`, color: '#000000' })
            .setDepth(51)
            .setOrigin(0.5, 0.5);

        this.tweens.add({

            targets: [box, text],
            x: this.SCREEN_WIDTH * 0.5,
            y: this.SCREEN_HEIGHT * 0.5,
            duration: this.ONE_SECOND * 0.5,
            ease:"Sine.easeOut",

            onComplete: () => this.time.delayedCall(this.ONE_SECOND, () => { 

                if (this.collected) {

                    this.add.sprite(box.x + 475, box.y - 225, "creamspritesheet").setDepth(55);
                    let confetti = this.add.sprite(box.x + 475, box.y - 225, "confetti").setDepth(54).setScale(2);
                    confetti.play("confetti");
                    confetti.once('animationcomplete', () => confetti.destroy())

                }

            })

        });

        this.input.on('pointerdown', () => this.scene.start(scene));
    }

    createCollectable(x, y) {

        this.cream = this.physics.add.sprite(x, y, "creamspritesheet")
        .setOrigin(1, 1)
        .setAngle(this.CREAM_ANGLE);

        this.cream.play("cream");
        this.cream.body.immovable = true;
        this.cream.body.allowGravity = false;

        this.tweens.add({

            targets: this.cream,
            angle: -this.CREAM_ANGLE,
            duration: this.ONE_SECOND,
            repeat: -1,
            ease: "linear",
            yoyo: true

        });

        return this.cream;
    }

    createExit(x, y) {

        this.exit = this.physics.add.sprite(x, y, "exitspritesheet")
        .setOrigin(0.5, 0.5)
        .setScale(1.5)
        .setDepth(-1);

        this.exit.body.immovable = true;
        this.exit.body.allowGravity = false;

        return this.exit;
    }

    onCollide(character) {

        if (character.anims.getName() != 'idle') {
            character.play("idle");
        }

    }

    onPickup(item) {

        this.collected = true;
        item.destroy();

    }

    buildWorld(level) {

        // Create ground from level matrix
        this.ground = this.add.group();
        this.spikes = this.add.group();

        for (let x = 0; x < this.SCREEN_WIDTH/* / this.GROUND_SIZE*/; x += this.GROUND_SIZE) {

            for (let y = 0; y < this.SCREEN_HEIGHT/* / this.GROUND_SIZE*/; y += this.GROUND_SIZE) {

                switch(level[y / this.GROUND_SIZE][x / this.GROUND_SIZE]) {

                    case("#"):
                        let groundTile = this.physics.add.sprite(x, y, "ground").setOrigin(0,0).setScale(0.5);
                        groundTile.body.immovable = true;
                        groundTile.body.pushable = false;
                        groundTile.body.allowGravity = false;
                        this.ground.add(groundTile);
                        break;


                    case("^"):
                        let spikeTileUp = this.physics.add.sprite(x, y, "spikeup").setOrigin(0,0).setScale(0.5);
                        spikeTileUp.body.immovable = true;
                        spikeTileUp.body.pushable = false;
                        spikeTileUp.body.allowGravity = false;
                        this.spikes.add(spikeTileUp);
                        break;


                    case(">"):
                        let spikeTileRight = this.physics.add.sprite(x, y, "spikeright").setOrigin(0,0).setScale(0.5);
                        spikeTileRight.body.immovable = true;
                        spikeTileRight.body.pushable = false;
                        spikeTileRight.body.allowGravity = false;
                        this.spikes.add(spikeTileRight);
                        break;


                    case("<"):
                        let spikeTileLeft = this.physics.add.sprite(x, y, "spikeleft").setOrigin(0,0).setScale(0.5);
                        spikeTileLeft.body.immovable = true;
                        spikeTileLeft.body.pushable = false;
                        spikeTileLeft.body.allowGravity = false;
                        this.spikes.add(spikeTileLeft);
                        break;


                    case("+"):
                        let spikeTileDown = this.physics.add.sprite(x, y, "spikedown").setOrigin(0,0).setScale(0.5);
                        spikeTileDown.body.immovable = true;
                        spikeTileDown.body.pushable = false;
                        spikeTileDown.body.allowGravity = false;
                        this.spikes.add(spikeTileDown);
                        break;


                    default:
                        // do nothing
                        break;
                        
                }
            }
        }
    }

    buildPlayer() {

        // Create player
        this.player = this.physics.add.sprite(this.PLAYER_START_X, this.PLAYER_START_Y, "idlespritesheet")
        .setScale(0.6)
        .setDrag(this.DRAG, this.DRAG)
        .setDepth(5)
        .setOrigin(0.5, 0.5)
        .setMaxVelocity(this.MAX_VELOCITY, this.MAX_VELOCITY);

        this.player.immovable = true;
        this.player.body.pushable = false;
        this.player.setCollideWorldBounds(true);

        return this.player;
    }

    resetPlayer(player, x, y) {

        player.x = x;
        player.y = y;
        player.setVelocityX(0);
        player.setVelocityY(0);

    }

}