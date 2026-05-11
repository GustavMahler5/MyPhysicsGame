class Scene1 extends Controller {
    constructor() {

        super("Tutorial");
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
        this.timeElapsed = this.add.text(100, 100, "Time: 0").setDepth(10);
        this.levelStartTime = this.time.startTime;

        // Add block
        this.block = this.physics.add.sprite(this.BLOCK_START_X, this.BLOCK_START_Y, 'block')
        .setDepth(10)
        .setScale(0.5)
        .setDrag(this.DRAG + 250, this.DRAG + 250)
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
            console.log((this.time.now / 1000).toFixed(2));

        });

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    setTimeScale(scale) {

        this.physics.world.timeScale = 1 / scale;
        this.tweens.timeScale = scale;
        this.anims.globalTimeScale = scale;
        this.time.timeScale = scale;

    }

    update() {

        if (this.player.body.touching.none) {

            if (this.player.anims.getName() != 'airborne') {

                this.player.play("airborne");

            }

        }

        if (!this.levelFinished) {

            let elapsed = (this.time.now - this.levelStartTime) / 1000;
            this.timeElapsed.setText(`Time: ${elapsed.toFixed(2)}`);

        }

        if (this.spaceBar.isDown) {

            this.setTimeScale(0.5);

        }

        else {

            this.setTimeScale(1);

        }
    }
}