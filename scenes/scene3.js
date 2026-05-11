class Scene3 extends Controller {
    constructor() {

        super("Inertia");
        this.PLAYER_START_X = 1800;
        this.PLAYER_START_Y = 100;

        this.CREAM_START_X = 800;
        this.CREAM_START_Y = 200;
        this.CREAM_ANGLE = 5;
        this.collected = false;

        // Assume Origin(0.5, 0.5)
        this.EXIT_START_X = 200;
        this.EXIT_START_Y = 930;

        this.PAR_TIME = 4;
        this.PAR_SWITCHES = 2;

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

        // Build World
        this.buildWorld(this.level3);

        // Create player
        this.player = this.buildPlayer();

        // Create collectable
        this.cream = this.createCollectable(this.CREAM_START_X, this.CREAM_START_Y);

        // Add exit for the scene
        this.exit = this.createExit(this.EXIT_START_X, this.EXIT_START_Y);

        // Add timer for scene
        this.timeElapsed = this.add.text(100, 100, "Time: 0").setDepth(10);
        this.levelStartTime = this.time.startTime;

        // Create block
        this.block = this.physics.add.sprite(150, 200, 'block')
        .setDepth(10)
        .setScale(0.5)
        .setDrag(this.DRAG + 250, this.DRAG + 250)
        .setMaxVelocity(this.MAX_VELOCITY, this.MAX_VELOCITY);
        this.block.allowGravity = true;
        this.block.immovable = true;
        this.block.body.pushable = false;

        // Add collider for block
        this.physics.add.collider(this.block, this.ground);
        this.physics.add.collider(this.block, this.player);
        this.physics.add.collider(this.block, this.spikes);

        // Add collider for player
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
                    "Inertia",              // Name of the next level
                    finalTime,              // Final time
                    this.PAR_TIME,          // Par time
                    this.PAR_SWITCHES       // Par switches
                
                )  

            });

        // Handle user inputs
        this.input.keyboard.on('keydown', (event) => {

            this.handleInput(event.key, this.player);
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