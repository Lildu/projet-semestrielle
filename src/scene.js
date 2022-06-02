class scene extends Phaser.Scene {

    constructor() {
        super('game');
    }

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
        this.load.image('sage', 'assets/images/sage.png');
        this.load.image('sage-2', 'assets/images/sage-2.png');
        this.load.image('balle', 'assets/images/balle.png');
        this.load.image('balle2', 'assets/images/balle2.png');
        this.load.image('cloud', 'assets/images/cloud.png');
        this.load.image("door-open","assets/images/door-open.png")
        this.load.image("boss1","assets/images/boss.png")


        this.load.spritesheet('shield', 'assets/images/tilesheet/tilesheet-shield.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('sword', 'assets/images/tilesheet/tilesheet-sword2.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('midle', 'assets/images/tilesheet/tilesheet-gun-midle.png',{ frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('intro', 'assets/images/tilesheet/finaux/intro-tilsheet.png',{ frameWidth: 480, frameHeight: 270 });
        this.load.spritesheet('boss', 'assets/images/tilesheet/finaux/tilsesheet-boss.png',{ frameWidth: 720, frameHeight: 405 });
        this.load.spritesheet('menu', 'assets/images/tilesheet/finaux/tilsesheet-menu.png',{ frameWidth: 480, frameHeight: 270 });
        this.load.spritesheet('shoot', 'assets/images/tilesheet/finaux/shoot-tilsheet.png',{ frameWidth: 400, frameHeight: 400 });
        this.load.spritesheet('Pnj', 'assets/images/tilesheet/finaux/tilesheet-png.png',{ frameWidth: 400, frameHeight: 400 });
        this.load.spritesheet('sageanime', 'assets/images/tilesheet/finaux/tilesheet-sage.png',{ frameWidth: 1453, frameHeight: 395 });
        this.load.spritesheet('soin', 'assets/images/tilesheet/finaux/tile-soin.png',{ frameWidth: 405, frameHeight: 405 });
        this.load.spritesheet('crash', 'assets/images/tilesheet/finaux/tilsesheet-crash.png',{ frameWidth: 512, frameHeight: 288 });
        this.load.spritesheet('idle', 'assets/images/tilesheet/finaux/tilsesheet-idle.png',{ frameWidth: 400, frameHeight: 400 });
        this.load.spritesheet('walk', 'assets/images/tilesheet/finaux/tilsesheet-walk.png',{ frameWidth: 400, frameHeight: 400 });



        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {


        const backgroundImage = this.add.image(-1000, -3000, 'background').setOrigin(0, 0);
        backgroundImage.setScale(7.6, 2.5);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');

        this.back2 = map.createStaticLayer('back2', tileset);
        this.foog3 = map.createStaticLayer('fog3',tileset)
        this.back3 = map.createStaticLayer('back3', tileset);


        this.three3 = map.createStaticLayer('three3', tileset);
        this.three2 = map.createStaticLayer('three2', tileset);


        this.three = map.createStaticLayer('three', tileset);

        this.foog2 = map.createStaticLayer('fog2', tileset);


        this.backfirst = map.createStaticLayer('back-first', tileset);
        this.tour = map.createStaticLayer('tour', tileset);
        this.sage = this.add.sprite(18500, 800,"sage");

        this.lighte = map.createStaticLayer('light', tileset);



        this.platforms = map.createStaticLayer('Sol', tileset);

        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.flowers3 = map.createStaticLayer('flower3', tileset);




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
            this.saveSprite = this.saave.create(saves.x-100, (saves.y - saves.height)-500, 'repere0').setOrigin(0);
            this.saveSprite.setScale(0.1)
        });

        this.door = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('door').objects.forEach((dooor) => {
            this.doorSprite = this.door.create(dooor.x, dooor.y - dooor.height-100, 'doore').setOrigin(0);
            this.doorSprite.setScale(0.35)
        });

        this.clef = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('clef').objects.forEach((clefe) => {
            this.clefSprite = this.clef.create(clefe.x, clefe.y - clefe.height, 'clefs').setOrigin(0);

        });

        this.soin = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('soin').objects.forEach((soin) => {
            this.soinSprite = this.soin.create(soin.x, soin.y - soin.height-50, 'tube').setOrigin(0);
            this.soinSprite.setScale(0.3)

        });
        this.boss=this.add.sprite(74420,-8600,"boss1")
        this.boss.setScale(2)
        this.initKeyboard();
        this.cameras.main.startFollow(this.player.cam,false);
        this.cameras.main.zoom= 1.5;

        this.flowers2 = map.createStaticLayer('flower2', tileset);
        //this.physics.add.overlap(this.player.player, this.clef,this.addKey(),null,this)
        this.solee = map.createStaticLayer('sol2', tileset);
        this.vaisseau =this.add.sprite(-500,650,"")
        this.vaisseau.play('crash')





        this.fog = map.createStaticLayer('fog', tileset);


        this.froont = map.createStaticLayer('front', tileset);
        this.froont2 = map.createStaticLayer('front2', tileset);
        //this.physics.add.overlap(this.clefSprite, this.player.player, this.addKey(), null, this);


        this.froont3 = map.createStaticLayer('front3', tileset);
        this.froont4 = map.createStaticLayer('front4', tileset);

        /**
        this.particles = this.add.particles('leafemit');
        this.particles.createEmitter({
            follow:this.bonus,
            angle: { min: 1, max: 360 },
            scale: {start: 0.01, end: 0.1},
            speed: 10,
            gravityY: -1,
            lifespan: { min: 1, max: 200 },
            blendMode: 'ADD',
            alpha:1,
        });**/



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
        //console.log(this.player.player.x)
        //console.log(this.player.player.y)
        this.player.interfacelife()


        if(this.player.player.y >5000 || this.player.player.y<-5000){
            this.player.life=0
        }
        this.player.cam.setX(this.player.player.x);
        this.player.cam.setY(this.player.player.y-125);
        this.player.mooveenemi()
        this.back2.scrollFactorX=1.02;
        //this.foog3.scrollFactorX=1.1;
        this.back3.scrollFactorX=1.01;


        this.three2.scrollFactorX=1.005;
        this.three3.scrollFactorX=1.005;
        //this.three2.scrollFactorY=-1.005;
        //this.three3.scrollFactorY=-1.005;

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