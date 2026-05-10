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
        this.MAX_VELOCITY = 800;

        // Level matrix
        this.level1 = [
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
        ["#", ".", ".", ".", "+", "+", "+", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "^", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
        ];
        this.level3 = [
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
    preload() {}
    create() {}
    update() {}

    handleInput(input, character, scene) {

        switch(input) {

            case("w"):
                // Gravity Up
                if (this.physics.world.gravity.y != -this.GRAVITY) {
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
                        // console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: 180,
                            duration: this.ONE_SECOND * 0.3
                        });
                    }

                    else {
                        // console.log(character.angle);
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
                        // console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: -270,
                            duration: this.ONE_SECOND * 0.3
                        });
                    }

                    else {
                        // console.log(character.angle);
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
                        // console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: 270,
                            duration: this.ONE_SECOND * 0.15
                        });
                    }

                    else {
                        // console.log(character.angle);
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

    onExit(character, centerX, centerY, startRadius, duration, scene) {

        character.body.enable = false;
        this.timer.paused = true;
        // this.input.keyboard.enabled = false;
        this.exit.play("exit");
        
        let orbit = {
            angle: 180,
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
                this.scene.start(scene);
            }
        });
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
                // if (level[y / this.GROUND_SIZE][x / this.GROUND_SIZE] == "#") {
                //     let groundTile = this.physics.add.sprite(x, y, "ground").setOrigin(0,0).setScale(0.5);
                //     groundTile.body.immovable = true;
                //     groundTile.body.allowGravity = false;
                //     this.ground.add(groundTile);
                // }
            }
        }
    }

    buildPlayer() {
        // Create player
        this.player = this.physics.add.sprite(this.PLAYER_START_X, this.PLAYER_START_Y, "idlespritesheet")
        .setScale(0.6)
        .setDrag(this.DRAG, this.DRAG)
        .setOrigin(0.5, 0.5)
        .setMaxVelocity(this.MAX_VELOCITY, this.MAX_VELOCITY);
        this.player.immovable = true;
        this.player.body.pushable = false;
        // this.player.body.moves = true;
        // this.player.body.setSize(170, 170);
        // this.player.body.setOffset(95, 95);
        this.player.setCollideWorldBounds(true);
        return this.player;
    }

    resetPlayer(player, x, y) {
        player.x = x;
        player.y = y
    }
}