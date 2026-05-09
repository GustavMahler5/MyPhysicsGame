"use strict";

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
        default: "arcade",
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