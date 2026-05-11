class Credits extends Controller {
    constructor(key) {
        super("Credits");
    }

    preload() {
        this.load.pack("main", "assets/pack.json");
    }
    create() {

        this.cameras.main.fadeIn(this.ONE_SECOND, 0, 0, 0);
        this.player = this.add.sprite(this.SCREEN_WIDTH * 0.5, this.SCREEN_HEIGHT * 0.4, "wave")
        .setScale(5)
        .setOrigin(0.5, 0.5);

        this.add.text(
            this.SCREEN_WIDTH * 0.5, 
            this.SCREEN_HEIGHT * 0.75, 
            "Thanks for playing!")
            .setStyle({ fontSize: `128px`, color: '#FFFFFF' })
            .setOrigin(0.5, 0.5);

        this.time.delayedCall(this.ONE_SECOND * 3, () => {
            this.add.text(
            this.SCREEN_WIDTH * 0.5, 
            this.SCREEN_HEIGHT * 0.9, 
            "Click anywhere to play again!")
            .setStyle({ fontSize: `32px`, color: '#FFFFFF' })
            .setOrigin(0.5, 0.5),

            this.input.on('pointerdown', () => this.scene.start("Main Menu"));
        });
        
    }
    update() {}
}