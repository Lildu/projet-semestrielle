class Start extends Phaser.Scene {

    constructor() {
        super('start');
    }

    preload() {
        this.load.image('menuback', 'assets/images/menu.png');
        this.load.image('bouton', 'assets/images/square.png');
        this.load.spritesheet('menu', 'assets/images/tilesheet/finaux/tilsesheet-menu.png',{ frameWidth: 480, frameHeight: 270 });
        this.load.spritesheet('intro', 'assets/images/tilesheet/finaux/intro-tilsheet.png',{ frameWidth: 480, frameHeight: 270 });

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

        this.intro = this.add.sprite(0, 0, 'menuback').setOrigin(0, 0);
        this.intro.setScale(2)
        this.intro.setVisible(false)
        this.anims.create({
            key: 'intro',
            frames: this.anims.generateFrameNumbers('intro', {start: 0, end: 430}),
            frameRate: 30,
            repeat:0,
            hideOnComplete:true
        });



        const buttonStartSprite = this.add.image(50, 390, 'bouton')
            .setOrigin(0, 0)
            .setScale(0.5,0.2)
            .setAlpha(0.7);

        this.buttonStart = this.add.rectangle(buttonStartSprite.x, buttonStartSprite.y,350,150,0xffffff,0)
            .setOrigin(0,0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {

                this.scene.start('game')

                this.intro.setVisible(true)
                this.intro.play('intro')
            })
            .on('pointerover',function(){
                buttonStartSprite.setAlpha(1);
            })
            .on('pointerout',function(){
                buttonStartSprite.setAlpha(0.7);
            })

    }

}
