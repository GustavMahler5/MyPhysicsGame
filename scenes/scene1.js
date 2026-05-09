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
                    start: 0,
                    end: 20
                }),
                frameRate: 30,
                repeat: -1
            });
            this.anims.create({
                key: "airborne",
                frames: this.anims.generateFrameNumbers("airbornespritesheet", {
                    start: 8,
                    end: 18
                }),
                frameRate: 60,
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

        // Create character
        this.character = this.buildPlayer();

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

        this.block = this.physics.add.sprite(500, 500, 'block').setDepth(10).setScale(0.5);
        this.block.allowGravity = true;
        this.block.immovable = false;

        // Add colliders for the blocks
        this.physics.add.collider(this.block, this.ground);
        this.physics.add.collider(this.block, this.character);
        this.physics.add.collider(this.block, this.spikes);

        // Add colliders for player
        this.physics.add.collider(
            this.character, 
            this.ground, 
            this.onCollide, 
            null, 
            this);
        
        this.physics.add.collider(
            this.character, 
            this.spikes, 
            this.onCollide, 
            null, 
            this);

        this.physics.add.overlap(
            this.character, 
            this.cream, 
            this.onPickup, 
            null, 
            this);

        this.physics.add.overlap(
            this.character, 
            this.exit, 
            () => { this.onExit(
                this.character, 
                this.exit.x, 
                this.exit.y, 
                100, 
                this.ONE_SECOND * 2,
                "scene2") 
            }, 
            null, 
            this);

        // Handle user inputs
        this.input.keyboard.on('keydown', (event) => {
            this.handleInput(event.key, this.character);
            console.log((this.time.now / 1000).toFixed(2));
        });
        
        // this.onExit(sprite, this.EXIT_START_X, this.EXIT_START_Y, this.character, this.ONE_SECOND * 2);
    }

    update() {
        if (this.character.body.touching.none) {
            if (this.character.anims.getName() != 'airborne') {
            this.character.play("airborne");
            }
        }
        if (!this.timer.paused) {
            let elapsed = (this.time.now) / 1000;
            this.text.setText(`Time: ${elapsed.toFixed(2)}`);
        }
    }
}