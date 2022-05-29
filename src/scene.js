class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet3.png');

        this.load.image('dude', 'assets/images/dude.png');
        this.load.image('square', 'assets/images/square.png');
        this.load.image('mouvable', 'assets/images/mouvable.png');
        this.load.image('tube', 'assets/images/tube.png');
        this.load.image('clefs', 'assets/images/Key.png');
        this.load.image('doore', 'assets/images/door.png');
        this.load.image('enemi', 'assets/images/enemi.png');
        this.load.image('repere0', 'assets/images/repere-0.png');
        this.load.image('repere1', 'assets/images/repere-1.png');
        this.load.image('PNG', 'assets/images/PNG.png');


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

        this.three2 = map.createStaticLayer('three2', tileset);


        this.three = map.createStaticLayer('three', tileset);


        this.backfirst = map.createStaticLayer('back-first', tileset);
        this.lighte = map.createStaticLayer('light', tileset);



        this.platforms = map.createStaticLayer('Sol', tileset);


        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.flowers2 = map.createStaticLayer('flower2', tileset);



/**
        this.mouvable = this.physics.add.group({
            allowGravity: false,
            immovable: false
        });
        map.getObjectLayer('Mouvable').objects.forEach((Mouvable) => {
            const mouvableSprite = this.mouvable.create(Mouvable.x , Mouvable.y - Mouvable.height, 'mouvable').setOrigin(0);
        });

        //this.physics.add.collider(this.player.player, this.mouvable,pousser,null,this)
        this.physics.add.collider(this.mouvable,this.player.player)
       // this.physics.add.collider(this.mouvableSprite, this.);**/
        this.moves = this.physics.add.group({
            allowGravity: true,
            immovable: false
        });
        map.getObjectLayer('Mouvable').objects.forEach((move) => {
            this.moveSprite = this.moves.create(move.x, move.y - move.height, 'mouvable').setOrigin(0);


        });

        this.physics.add.collider(this.moves, this.moveSprite)
        this.physics.add.collider(this.moves, this.platforms)


        this.saave = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('save').objects.forEach((saves) => {
            this.saveSprite = this.saave.create(saves.x-100, saves.y - saves.height, 'repere0').setOrigin(0);
            this.saveSprite.setScale(0.1)
        });

        this.door = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('door').objects.forEach((dooor) => {
            this.doorSprite = this.door.create(dooor.x, dooor.y - dooor.height, 'doore').setOrigin(0);

        });

        this.clef = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('clef').objects.forEach((clefe) => {
            this.clefSprite = this.clef.create(clefe.x, clefe.y - clefe.height, 'clefs').setOrigin(0);

        });

        //this.physics.add.overlap(this.clefSprite, this.player.player, this.addKey(), null, this);
        this.flowers = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('flower').objects.forEach((flowe) => {
            this.flowerSprite = this.flowers.create(flowe.x, (flowe.y - flowe.height)-30, 'tube').setOrigin(0);

        });

        this.initKeyboard();
        this.cameras.main.startFollow(this.player.cam,false);
        this.cameras.main.zoom= 1.5;
        //this.physics.add.overlap(this.player.player, this.clef,this.addKey(),null,this)


        this.froont = map.createStaticLayer('front', tileset);
        this.froont2 = map.createStaticLayer('front2', tileset);

        this.fog = map.createStaticLayer('fog', tileset);

    }

    initKeyboard(){
        let tire=false;
        this.player = new Player(this)
        let me=this;

        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.E:
                    console.log("oui")
                    me.player.gravitychange(0);
                    break;

                case Phaser.Input.Keyboard.KeyCodes.A:
                    console.log("oui")
                    me.player.gravitychange(500);
                    me.moveSprite.setGravity(0,1000)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Z:

                    break;


                default:
                    me.player.player.play('idle',true)
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode){
                case Phaser.Input.Keyboard.KeyCodes.Z:

                    me.player.player.play('idle',true)

                    break;


                default:
                    me.player.stop();
                    break;
            }


        });
        this.input.mouse.disableContextMenu();
        this.input.on('pointerup', function (pointer) {

            if (pointer.leftButtonReleased())
            {
                console.log('Left Button was released');
                me.player.tir();
            }
            else if (pointer.rightButtonReleased())
            {
                me.player.gravitir()
                console.log('Right Button was released');
            }

        });

    }

    update() {

        this.player.cam.setX(this.player.player.x);
        this.player.cam.setY(this.player.player.y-125);
        this.player.mooveenemi()
        this.three2.scrollFactorX=1.005;
        this.froont.scrollFactorX=1.001;
        this.froont2.scrollFactorX=1.005;

        switch (true) {

            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                break;
            case this.cursors.left.isDown:

                if(this.cursors.left.shiftKey){
                    this.player.moveLeft(400);
                    break;
                }
                else{
                    this.player.moveLeft(200);
                }
                break;
            case this.cursors.right.isDown:
                if(this.cursors.right.shiftKey){
                    this.player.moveRight(400);
                    break;
                }
                else{
                    this.player.moveRight(200);
                }
                break;


            default:
                this.player.stop();

        }

    }
}