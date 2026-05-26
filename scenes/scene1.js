class Scene1 extends Controller {
    constructor() {

        super("Spikes");
        this.PLAYER_START_X = 100;
        this.PLAYER_START_Y = 100;

        this.CREAM_START_X = 1800;
        this.CREAM_START_Y = 1000;
        this.CREAM_ANGLE = 5;
        this.collected = false;

        // Assume Origin(0.5, 0.5)
        this.EXIT_START_X = 1750;
        this.EXIT_START_Y = 375;

        this.BLOCK_START_X = 200;
        this.BLOCK_START_Y = 900;

        this.PAR_TIME = 25;
        this.PAR_SWITCHES = 17;

        this.levelFinished = false;

    }

    preload() {
        this.load.pack("main", "assets/pack.json");
    }

    create() {

        // Clear debugging tools
        this.physics.world.drawDebug = !this.physics.world.drawDebug;
        this.physics.world.debugGraphic.clear();

        // Player cannot go beyond camera scope
        this.physics.world.setBoundsCollision();

        // Create animations
        if (1) {

            this.anims.create({

                key: "idle",
                frames: this.anims.generateFrameNumbers("idlespritesheet", {
                    start: 1,
                    end: 9
                }),
                frameRate: 5,
                repeat: -1,
                
            });

            this.anims.create({

                key: "airborne",
                frames: this.anims.generateFrameNumbers("airbornespritesheet", {
                    start: 0,
                    end: 2
                }),
                frameRate: 15,
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

            this.anims.create({

                key: "exit",
                frames: this.anims.generateFrameNumbers("exitspritesheet", {
                    start: 0,
                    end: 11
                }),
                frameRate: 30,
                repeat: 0

            })

            this.anims.create({

                key: "confetti",
                frames: this.anims.generateFrameNumbers("confettispritesheet", {
                    start: 0,
                    end: 4
                }),
                frameRate: 5,
                repeat: 0

            })

        }

        // Build the level
        this.buildWorld(this.level1);

        // Create player
        this.player = this.buildPlayer();

        // Create collectable
        this.cream = this.createCollectable(this.CREAM_START_X, this.CREAM_START_Y);

        // Add exit for the scene
        this.exit = this.createExit(this.EXIT_START_X, this.EXIT_START_Y);

        // Create timer
        this.levelStartTime = this.time.startTime;

        // Add tutorial text
        this.tutorialText = this.add.group();
        this.addTutorialText(100, 100, "WASD: Shift Gravity");
        this.addTutorialText(300, 400, "Space: Half Time");
        this.addTutorialText(1600, 100, "Exit");
        this.addTutorialText(200, 800, "Avoid Spikes");
        this.addTutorialText(1450, 800, "Collect Me!");

        this.tutorialText.setAlpha(0);

        this.tweens.add({
            targets: this.tutorialText.getChildren(),
            alpha: 1,
            duration: this.ONE_SECOND,
            delay: this.ONE_SECOND
        });

        // Let the text collide with the ground and spikes!
        this.physics.add.collider(this.tutorialText, this.ground);
        this.physics.add.collider(this.tutorialText, this.spikes);

        // Add block
        this.block = this.physics.add.sprite(this.BLOCK_START_X, this.BLOCK_START_Y, 'block')
        .setDepth(10)
        .setScale(0.5)
        .setDrag(this.DRAG + 150, this.DRAG + 150)
        .setMaxVelocity(this.MAX_VELOCITY, this.MAX_VELOCITY);;

        this.block.allowGravity = true;
        this.block.immovable = true;
        this.block.body.pushable = false;

        // Add colliders for the blocks
        this.physics.add.collider(this.block, this.ground);
        this.physics.add.collider(this.block, this.player);
        this.physics.add.collider(this.block, this.spikes);

        // Add colliders for player
        this.physics.add.collider(this.player, this.ground, () => this.onCollide(this.player));
        this.physics.add.collider(this.player, this.spikes, () => this.resetPlayer(this.player, this.PLAYER_START_X, this.PLAYER_START_Y));
        this.physics.add.overlap(this.player, this.cream, () => this.onPickup(this.cream));
        this.physics.add.overlap(this.player, this.exit, 
            () => { 

                if (this.levelFinished) return;
                this.levelFinished = true;

                let finalTime = ((this.time.now - this.levelStartTime) / 1000).toFixed(2);

                this.onExit(

                    this.player,            // The player
                    this.exit.x,            // Where the exit is on the x axis
                    this.exit.y,            // Where the exit is on the y axis
                    this.ONE_SECOND * 2,    // Duration of the animation
                    "Triggers",             // Name of the next level
                    finalTime,              // Final time
                    this.PAR_TIME,          // Par time
                    this.PAR_SWITCHES       // Par switches
                         
                )

            });


        // Handle user inputs
        this.input.keyboard.on('keydown', (event) => {

            this.handleInput(event.key, this.player, "scene1");

        });

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    setTimeScale(scale) {

        this.physics.world.timeScale = 1 / scale;
        this.tweens.timeScale = scale;
        this.anims.globalTimeScale = scale;
        this.time.timeScale = scale;

    }

    addTutorialText(x, y, text) {

        let myText = this.add.text(x, y, `${text}`)
        .setDepth(1)
        .setStyle({ fontSize: `48px`, color: '#FFFFFF' });

        this.physics.add.existing(myText, false);
        myText.allowGravity = true;
        this.tutorialText.add(myText);

    }

    update() {

        if (this.player.body.touching.none) {

            if (this.player.anims.getName() != 'airborne') {

                this.player.play("airborne");

            }

        }

        if (this.spaceBar.isDown) {

            this.setTimeScale(0.5);

        }

        else {

            this.setTimeScale(1);

        }
    }
}