class Controller extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.SCREEN_WIDTH = 1920;
        this.SCREEN_HEIGHT = 1080;
        this.DRAG = 300;
        this.GROUND_SIZE = 128;
    }
    preload() {
        this.load.pack("main", "assets/pack.json");
    }
    create() {}
    update() {}

    handleInput(input, character) {

        switch(input) {

            case("w"):
                // Gravity Up
                if (this.physics.world.gravity.y != -1000) {
                    this.physics.world.gravity.y = -1000;
                    this.physics.world.gravity.x = 0;

                    this.upGravityFX = this.add.image(this.SCREEN_WIDTH * 0.5, this.SCREEN_HEIGHT * 0.7, "upgravity1")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);
                    
                    this.upGravityFX2 = this.add.image(this.SCREEN_WIDTH * 0.5, this.SCREEN_HEIGHT * 0.7, "upgravity2")
                    .setAlpha(0.8)
                    .setDepth(-1)
                    .setScale(1.5);

                    this.tweens.add({
                        targets: this.upGravityFX,
                        y: this.SCREEN_HEIGHT * 0.45,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                        onComplete: () => {
                            this.upGravityFX.destroy();
                        }
                    });

                    this.tweens.add({
                        targets: this.upGravityFX2,
                        y: this.SCREEN_HEIGHT * 0.35,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                        onComplete: () => {
                            this.upGravityFX2.destroy();
                        }
                    });

                    // Handle rotation direction
                    if (character.angle <= 90 && character.angle >= 0) {
                        console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: 180,
                            duration: 300
                        });
                    }

                    else {
                        console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: -180,
                            duration: 150
                        });
                    }
                }
                break;


            case("a"):
                // Gravity Left
                if (this.physics.world.gravity.x != -1000) {
                    this.physics.world.gravity.x = -1000;
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
                        duration: 500,
                        repeat: 0,
                        onComplete: () => {
                            this.leftGravityFX.destroy();
                        }
                    });

                    this.tweens.add({
                        targets: this.leftGravityFX2,
                        x: this.SCREEN_WIDTH * 0.35,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                        onComplete: () => {
                            this.leftGravityFX2.destroy();
                        }
                    });

                    // Handle rotation direction
                    if (character.angle >= -180 && character.angle <= -90) {
                        console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: -270,
                            duration: 300
                        });
                    }

                    else {
                        console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: 90,
                            duration: 150
                        });
                    }
                }
                break;


            case("s"):
                // Gravity Down
                if (this.physics.world.gravity.y != 1000) {
                    this.physics.world.gravity.y = 1000;
                    this.physics.world.gravity.x = 0;

                    this.downGravityFX = this.add.image(this.SCREEN_WIDTH * 0.5, this.SCREEN_HEIGHT * 0.45, "downgravity1")
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
                        duration: 500,
                        repeat: 0,
                        onComplete: () => {
                            this.downGravityFX.destroy();
                        }
                    });

                    this.tweens.add({
                        targets: this.downGravityFX2,
                        y: this.SCREEN_HEIGHT * 0.7,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                        onComplete: () => {
                            this.downGravityFX2.destroy();
                        }
                    });

                    this.tweens.add({
                        targets: character,
                        angle: 0,
                        duration: 150
                    });
                }
                break;


            case("d"):
                // Gravity Right
                if (this.physics.world.gravity.x != 1000) {
                    this.physics.world.gravity.x = 1000;
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
                        duration: 500,
                        repeat: 0,
                        onComplete: () => {
                            this.rightGravityFX.destroy();
                        }
                    });

                    this.tweens.add({
                        targets: this.rightGravityFX2,
                        x: this.SCREEN_WIDTH * 0.6,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                        onComplete: () => {
                            this.rightGravityFX2.destroy();
                        }
                    });

                    
                    if (character.angle >= 90) {
                        console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: 270,
                            duration: 150
                        });
                    }

                    else {
                        console.log(character.angle);
                        this.tweens.add({
                            targets: character,
                            angle: -90,
                            duration: 150
                        });
                    }
                }
                break;


            case("f"):
                this.physics.world.drawDebug = !this.physics.world.drawDebug;
                this.physics.world.debugGraphic.clear();
        }
    }
}