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
        }

        // Build the level
        this.buildWorld(this.level1);

        // Create player
        this.player = this.buildPlayer();

        // Create collectable
        this.cream = this.createCollectable(this.CREAM_START_X, this.CREAM_START_Y);

        // Add timer for scene
        this.timer = this.time.addEvent({
            delay: this.ONE_SECOND * 0.2,
            loop: true,
        });
        this.text = this.add.text(100, 100, "Time: 0").setDepth(10);

        // Add exit for the scene
        this.exit = this.createExit(this.EXIT_START_X, this.EXIT_START_Y);

        this.block = this.physics.add.sprite(this.PLAYER_START_X + 2000, this.PLAYER_START_Y, 'block')
        .setDepth(10)
        .setScale(0.5)
        .setDrag(this.DRAG + 250, this.DRAG + 250);
        this.block.allowGravity = true;
        this.block.immovable = true;
        this.block.body.pushable = false;
        // this.block.body.moves = true;

        // Add colliders for the blocks
        this.physics.add.collider(this.block, this.ground);
        this.physics.add.collider(this.block, this.player);
        this.physics.add.collider(this.block, this.spikes);
        // this.physics.add.overlap(this.player, this.cream, this.onPickup);

        // Add colliders for player
        this.physics.add.collider(this.player, this.ground, () => this.onCollide(this.player));
        this.physics.add.collider(this.player, this.spikes, () => this.resetPlayer(this.player, this.PLAYER_START_X, this.PLAYER_START_Y));
        this.physics.add.overlap(this.player, this.cream, () => this.onPickup(this.cream));
        // this.physics.add.overlap(this.player, this.block, () => this.onCrush());
        this.physics.add.overlap(this.player, this.exit, 
            () => { this.onExit(
                this.player, 
                this.exit.x, 
                this.exit.y, 
                100, 
                this.ONE_SECOND * 2,
                "scene2") 
            });

        // Handle user inputs
        this.input.keyboard.on('keydown', (event) => {
            this.handleInput(event.key, this.player, "scene1");
            console.log((this.time.now / 1000).toFixed(2));
        });
        
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // this.onExit(sprite, this.EXIT_START_X, this.EXIT_START_Y, this.player, this.ONE_SECOND * 2);
    }

    setTimeScale(scale) {

    // Physics
    this.physics.world.timeScale = 1 / scale;

    // Tweens
    this.tweens.timeScale = scale;

    // Animations
    this.anims.globalTimeScale = scale;

    // Timers
    this.time.timeScale = scale;
}

    update() {
        if (this.player.body.touching.none) {
            if (this.player.anims.getName() != 'airborne') {
            this.player.play("airborne");
            }
        }
        if (!this.timer.paused) {
            let elapsed = (this.time.now) / 1000;
            this.text.setText(`Time: ${elapsed.toFixed(2)}`);
        }
        if (this.spaceBar.isDown) {
            this.setTimeScale(0.5);
        }
        else {
            this.setTimeScale(1)
        }
    }
}