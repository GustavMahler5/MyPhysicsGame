class Scene2 extends Controller {
    constructor() {

        super("Triggers");
        this.PLAYER_START_X = 100;
        this.PLAYER_START_Y = 875;

        this.CREAM_START_X = 400;
        this.CREAM_START_Y = 275;
        this.CREAM_ANGLE = 5;
        this.collected = false;

        // Assume Origin(0.5, 0.5)
        this.EXIT_START_X = 1325;
        this.EXIT_START_Y = 875;

        this.BLOCK_START_X = 1325;
        this.BLOCK_START_Y = 600;

        this.PAR_TIME = 45;
        this.PAR_SWITCHES = 30;

        this.DOOR_SPEED = 2;

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

        // Build World
        this.buildWorld(this.level2);

        // Create player
        this.player = this.buildPlayer();

        // Create collectable
        this.cream = this.createCollectable(this.CREAM_START_X, this.CREAM_START_Y);

        // Add exit for the scene
        this.exit = this.createExit(this.EXIT_START_X, this.EXIT_START_Y);

        // Add timer for scene
        this.levelStartTime = this.time.startTime;

        // Add a unique switch to this scene
        this.trigger = this.add.rectangle(
            this.PLAYER_START_X, 
            this.PLAYER_START_Y, 
            this.GROUND_SIZE * 2, 
            this.GROUND_SIZE * 2, 
            "0xff0000")
            .setDepth(-1)
            .setOrigin(0, 0);

        // this.doors = this.add.group();
        this.leftDoor = this.add.rectangle(
            this.EXIT_START_X - (this.GROUND_SIZE * 2.5),
            this.EXIT_START_Y,
            this.GROUND_SIZE * 0.5,
            this.GROUND_SIZE * 5,
            "0xff0000")
            .setDepth(-1);
        
        this.rightDoor = this.add.rectangle(
            this.EXIT_START_X + (this.GROUND_SIZE * 2.5),
            this.EXIT_START_Y,
            this.GROUND_SIZE * 0.5,
            this.GROUND_SIZE * 5,
            "0xff0000")
            .setDepth(-1);

        this.physics.add.existing(this.trigger, true);
        this.physics.add.existing(this.leftDoor, true);
        this.physics.add.existing(this.rightDoor, true);

        // Add block
        this.block = this.physics.add.sprite(this.BLOCK_START_X, this.BLOCK_START_Y, 'block')
        .setDepth(10)
        .setScale(0.5)
        .setDrag(this.DRAG + 150, this.DRAG + 150)
        .setMaxVelocity(this.MAX_VELOCITY, this.MAX_VELOCITY);

        this.block.allowGravity = true;
        this.block.immovable = true;
        this.block.body.pushable = false;

        // Add collider for block
        this.physics.add.collider(this.block, this.ground);
        this.physics.add.collider(this.block, this.player);
        this.physics.add.collider(this.block, this.spikes);
        this.physics.add.collider(this.block, this.leftDoor);
        this.physics.add.collider(this.block, this.rightDoor);
        this.physics.add.overlap(this.block, this.trigger);

        // Add collider for player
        this.physics.add.collider(this.player, this.ground, () => this.onCollide(this.player));
        this.physics.add.collider(this.player, this.spikes, () => this.resetPlayer(this.player, this.PLAYER_START_X, this.PLAYER_START_Y));
        this.physics.add.collider(this.player, this.leftDoor);
        this.physics.add.collider(this.player, this.rightDoor);
        this.physics.add.overlap(this.player, this.cream, () => this.onPickup(this.cream));
        this.physics.add.overlap(this.player, this.trigger);
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
                    "Inertia",              // Name of the next level
                    finalTime,              // Final time
                    this.PAR_TIME,          // Par time
                    this.PAR_SWITCHES       // Par switches
                
                )

            });

        // Handle user inputs
        this.input.keyboard.on('keydown', (event) => {

            this.handleInput(event.key, this.player);

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

        if (this.spaceBar.isDown) {

            this.setTimeScale(0.5);

        }

        else {

            this.setTimeScale(1);

        }

        if (this.physics.world.overlap(this.player, this.trigger) || this.physics.world.overlap(this.block, this.trigger)) {

            this.trigger.setFillStyle("0x1eff00");
            this.rightDoor.setFillStyle("0x1eff00");
            this.leftDoor.setFillStyle("0x1eff00");

            if (this.leftDoor.y < 1200) {

                this.leftDoor.y += this.DOOR_SPEED;
                this.rightDoor.y += this.DOOR_SPEED;
                this.leftDoor.body.updateFromGameObject();
                this.rightDoor.body.updateFromGameObject();

            }

        }

        else { // If nothing is overlapping the trigger

            this.trigger.setFillStyle("0xff0000");
            this.rightDoor.setFillStyle("0xff0000");
            this.leftDoor.setFillStyle("0xff0000");

            if (this.leftDoor.y > this.EXIT_START_Y) {

                this.leftDoor.y -= this.DOOR_SPEED;
                this.rightDoor.y -= this.DOOR_SPEED;
                this.leftDoor.body.updateFromGameObject();
                this.rightDoor.body.updateFromGameObject();

            }
        
        }

    }

}