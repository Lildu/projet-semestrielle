class Start extends Phaser.Scene {

    constructor() {
        super('start');
    }

    preload() {
        this.load.image('menuback', 'assets/images/menu.png');
        this.load.image('bouton', 'assets/images/square.png');
        this.load.spritesheet('menu', 'assets/images/tilesheet/finaux/tilsesheet-menu.png',{ frameWidth: 480, frameHeight: 270 });

    }

    create(){

        this.menu = this.add.sprite(0, 0, 'menuback').setOrigin(0, 0);
        this.menu.setScale(3.5)
        this.menu.anims.create({
            key: 'menuu',
            frames: this.menu.anims.generateFrameNumbers('menu', {start: 0, end: 299}),
            frameRate: 30,
            flipX: true,
            repeat: -1,
        });

        this.menu.play("menuu")





        const buttonStartSprite = this.add.image(50, 390, 'bouton')
            .setOrigin(0, 0)
            .setScale(0.5,0.2)
            .setAlpha(0.7);

        this.buttonStart = this.add.rectangle(buttonStartSprite.x, buttonStartSprite.y,350,150,0xffffff,0)
            .setOrigin(0,0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                this.scene.start('game')
            })
            .on('pointerover',function(){
                buttonStartSprite.setAlpha(1);
            })
            .on('pointerout',function(){
                buttonStartSprite.setAlpha(0.7);
            })

    }

}
