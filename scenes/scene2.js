class Scene2 extends Controller {
    constructor() {
        super("scene2");
        this.PLAYER_START_X = 100;
        this.PLAYER_START_Y = 900;

        this.CREAM_START_X = 400;
        this.CREAM_START_Y = 275;
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

        // Create player
        this.player = this.buildPlayer();

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

        this.block = this.physics.add.sprite(500, 500, 'block')
        .setDepth(10)
        .setScale(0.5)
        .setDrag(this.DRAG + 250, this.DRAG + 250)
        .setMaxVelocity(this.MAX_VELOCITY, this.MAX_VELOCITY);
        this.block.allowGravity = true;
        this.block.immovable = true;
        this.block.body.pushable = false;

        this.physics.add.collider(this.block, this.ground);
        this.physics.add.collider(this.block, this.player);
        this.physics.add.collider(this.block, this.spikes);

        this.physics.add.collider(this.player, this.ground, () => this.onCollide(this.player));
        this.physics.add.collider(this.player, this.spikes, () => this.resetPlayer(this.player, this.PLAYER_START_X, this.PLAYER_START_Y));
        this.physics.add.overlap(this.player, this.cream, () => this.onPickup(this.cream));
        this.physics.add.overlap(this.player, this.exit, 
            () => { this.onExit(
                this.player, 
                this.exit.x, 
                this.exit.y, 
                100, 
                this.ONE_SECOND * 2,
                "scene3") 
            });

        // Handle user inputs
        this.input.keyboard.on('keydown', (event) => {
            this.handleInput(event.key, this.player);
            console.log((this.time.now / 1000).toFixed(2));
        });
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
    }
}