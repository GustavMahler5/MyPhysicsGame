class MainMenu extends Controller {
    constructor(key) {
        super("Main Menu");
    }

    preload() {
        this.load.pack("main", "assets/pack.json");
    }
    create() {

        this.cameras.main.fadeIn(this.ONE_SECOND, 0, 0, 0);
        // this.player = this.add.sprite(this.SCREEN_WIDTH * 0.5, this.SCREEN_HEIGHT * 0.4, "wave")
        // .setScale(3)
        // .setOrigin(0.5, 0.5);

        this.add.text(
            this.SCREEN_WIDTH * 0.5, 
            this.SCREEN_HEIGHT * 0.3, 
            "Gravity")
            .setStyle({ fontSize: `128px`, color: '#7f00c9' })
            .setOrigin(0.5, 0.5);

        this.add.text(
            this.SCREEN_WIDTH * 0.5, 
            this.SCREEN_HEIGHT * 0.4, 
            "A Game by Jason Holtman")
            .setStyle({ fontSize: `64px`, color: '#7f00c9' })
            .setOrigin(0.5, 0.5);

        this.add.text(
            this.SCREEN_WIDTH * 0.5,
            this.SCREEN_HEIGHT * 0.5, 
            "Level 1: Spikes")
            .setStyle({ fontSize: `64px`, color: '#FFFFFF' })
            .setOrigin(0.5, 0.5)
            .setInteractive({ cursor: "pointer" })
            .on('pointerdown', () => this.scene.start("Spikes"));

        this.add.text(
            this.SCREEN_WIDTH * 0.5,
            this.SCREEN_HEIGHT * 0.6, 
            "Level 2: Triggers")
            .setStyle({ fontSize: `64px`, color: '#FFFFFF' })
            .setOrigin(0.5, 0.5)
            .setInteractive({ cursor: "pointer" })
            .on('pointerdown', () => this.scene.start("Triggers"));


        this.add.text(
            this.SCREEN_WIDTH * 0.5,
            this.SCREEN_HEIGHT * 0.7, 
            "Level 3: Inertia")
            .setStyle({ fontSize: `64px`, color: '#FFFFFF' })
            .setOrigin(0.5, 0.5)
            .setInteractive({ cursor: "pointer" })
            .on('pointerdown', () => this.scene.start("Inertia"));
        
    }
    update() {}
}