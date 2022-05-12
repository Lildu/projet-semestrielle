class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        this.load.image('dude', 'assets/images/dude.png');
        this.load.image('square', 'assets/images/square.png');


        this.load.spritesheet('walk', 'assets/images/tilesheet/tilesheet-walk.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('idle', 'assets/images/tilesheet/tilesheet-idle.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('shield', 'assets/images/tilesheet/tilesheet-shield.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('sword', 'assets/images/tilesheet/tilesheet-sword2.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('up', 'assets/images/tilesheet/tilesheet-gun-up.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('midle', 'assets/images/tilesheet/tilesheet-gun-midle.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('down', 'assets/images/tilesheet/tilesheet-gun-down.png',{ frameWidth: 512, frameHeight: 512 });

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {




        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(1, 0.8);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        this.platforms = map.createStaticLayer('Sol', tileset);

        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();

        



        this.initKeyboard();
        this.cameras.main.startFollow(this.player.player,false);
    }

    initKeyboard(){

        this.player = new Player(this)
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.E:
                    console.log("oui")
                    me.player.gravitystop();
                    break;

                case Phaser.Input.Keyboard.KeyCodes.A:
                    console.log("oui")
                    me.player.gravitynorm();
                    break;
                case Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX:
                    console.log("oui")
                    me.player.tir(1);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR:
                    console.log("oui")
                    me.player.tir(-1);
                    break;



            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode){
            }


        });
    }

    update() {

        switch (true) {
            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                break;
            case this.cursors.left.isDown:

                if(this.cursors.left.shiftKey){
                    this.player.moveLeft(600);
                    break;
                }
                else{
                    this.player.moveLeft(300);
                }
                break;
            case this.cursors.right.isDown:
                if(this.cursors.right.shiftKey){
                    this.player.moveRight(600);
                    break;
                }
                else{
                    this.player.moveRight(300);
                }
                break;


            default:
                this.player.stop();
        }
    }
}