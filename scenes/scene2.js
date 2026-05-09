class Scene2 extends Controller {
    constructor() {
        super("scene2");
        this.PLAYER_START_X = 100;
        this.PLAYER_START_Y = 900;

        this.CREAM_START_X = 400;
        this.CREAM_START_Y = 200;
        this.CREAM_ANGLE = 5;
        this.collected = false;

        // Assume Origin(0.5, 0.5)
        this.EXIT_START_X = 1325;
        this.EXIT_START_Y = 800;
    }

    preload() {
        this.load.pack("main", "assets/pack.json");
    }

    create() {

        // Build World
        this.buildWorld(this.level2);

        // Create character
        this.character = this.buildPlayer();

        // Create collectable
        this.cream = this.createCollectable(this.CREAM_START_X, this.CREAM_START_Y);

        // Add exit for the scene
        this.exit = this.createExit(this.EXIT_START_X, this.EXIT_START_Y);

        // Add timer for scene
        this.timer = this.time.addEvent({
            delay: this.ONE_SECOND * 0.2,
            loop: true,
        });
        this.text = this.add.text(100, 100, "Time: 0").setDepth(10);

        this.block = this.physics.add.sprite(500, 500, 'block').setDepth(10).setScale(0.5);
        this.block.allowGravity = true;
        this.block.immovable = false;

        this.physics.add.collider(this.block, this.ground);
        this.physics.add.collider(this.block, this.character);

        this.physics.add.collider(
            this.character, 
            this.ground, 
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
                "scene3") 
            }, 
            null, 
            this);

        // Handle user inputs
        this.input.keyboard.on('keydown', (event) => {
            this.handleInput(event.key, this.character);
            console.log((this.time.now / 1000).toFixed(2));
        });
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