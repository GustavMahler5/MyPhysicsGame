class Controller extends Phaser.Scene {
    constructor(key) {
        super(key);
    }
    preload() {}
    create() {
        handleInput() {

        }
        this.input.keyboard.on('keydown-W', (event) => {
            console.log('The W key was pressed!');
            console.log(character.angle);
            // Gravity Up
            this.physics.world.gravity.y = -1000;
            this.physics.world.gravity.x = 0;
            if (character.angle <= 90 && character.angle >= 0) {
                console.log(character.angle);
                this.tweens.add({
                    targets: character,
                    angle: 180,
                    duration: 300
                });
                console.log('Rotate clockwise');
            }
            else {
                console.log(character.angle);
                this.tweens.add({
                    targets: character,
                    angle: -180,
                    duration: 300
                });
                console.log('Rotate counterclockwise');
            }
        });

        this.input.keyboard.on('keydown-A', (event) => {
            console.log('The A key was pressed!');
            console.log(character.angle);
            // Gravity Left
            this.physics.world.gravity.x = -1000;
            this.physics.world.gravity.y = 0;
            if (character.angle >= -180 && character.angle <= -90) {
                console.log(character.angle);
                this.tweens.add({
                    targets: character,
                    angle: -270,
                    duration: 300
                });
                console.log('Rotate clockwise');
            }
            else {
                console.log(character.angle);
                this.tweens.add({
                    targets: character,
                    angle: 90,
                    duration: 300
                });
                console.log('Rotate counterclockwise');
            }
        });

        this.input.keyboard.on('keydown-S', (event) => {
            console.log('The S key was pressed!');
            console.log(character.angle);
            // Gravity Down
            if (this.physics.world.gravity.y != 1000) {
                this.physics.world.gravity.y = 1000;
                this.physics.world.gravity.x = 0;
                this.tweens.add({
                        targets: character,
                        angle: 0,
                        duration: 300
                    });
            }
        });

        this.input.keyboard.on('keydown-D', (event) => {
            
            // Gravity Right
            if (this.physics.world.gravity.x != 1000) {
                this.physics.world.gravity.x = 1000;
                this.physics.world.gravity.y = 0;
                if (character.angle >= 90) {
                    console.log(character.angle);
                    this.tweens.add({
                        targets: character,
                        angle: 270,
                        duration: 300
                    });
                    console.log('Rotate clockwise');
                }
                else {
                    console.log(character.angle);
                    this.tweens.add({
                        targets: character,
                        angle: -90,
                        duration: 300
                    });
                    console.log('Rotate counterclockwise');
                }
            }
        });
    }
    update() {}
}