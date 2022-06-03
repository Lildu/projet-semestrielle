class scene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {

        this.load.audio('grotte','assets/son/grotte.wav');
        this.load.audio('soin','assets/son/soin.wav');
        this.load.audio('tir','assets/son/tir.wav');
        this.load.audio('tir2','assets/son/tir2.wav');
        this.load.audio('forest','assets/son/forest.wav');
        this.load.audio('pas','assets/son/pas.wav');
        this.load.audio('pas-int','assets/son/pas-int.wav');
        this.load.audio('repere','assets/son/repere.wav');
        this.load.audio('porte','assets/son/porte.wav');
        this.load.audio('alarme','assets/son/alarme.wav');




        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet3.png');

        this.load.image('dude', 'assets/images/dude.png');
        this.load.image('square', 'assets/images/square.png');
        this.load.image('mouvable', 'assets/images/mouvable.png');
        this.load.image('mouvableactif', 'assets/images/mouvable-actif.png');
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
        this.load.image("life1","assets/images/life1.png")
        this.load.image("life2","assets/images/life2.png")
        this.load.image("life3","assets/images/life3.png")


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
        this.load.spritesheet('text-sage', 'assets/images/tilesheet/finaux/text-sage.png',{ frameWidth: 480, frameHeight: 270 });
        this.load.spritesheet('text-boss', 'assets/images/tilesheet/finaux/text-boss.png',{ frameWidth: 480, frameHeight: 270 });
        this.load.spritesheet('click', 'assets/images/tilesheet/finaux/click.png',{ frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('enemi1', 'assets/images/tilesheet/finaux/tilesheet-enemi.png',{ frameWidth: 500, frameHeight: 281 });



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




        this.backfirst = map.createStaticLayer('back-first', tileset);
        this.tour = map.createStaticLayer('tour', tileset);
        this.foog2 = map.createStaticLayer('fog2', tileset);

        this.sage = this.add.sprite(18500, 800,"sage");
        this.flowers3 = map.createStaticLayer('flower3', tileset);
        this.lighte = map.createStaticLayer('light', tileset);



        this.platforms = map.createStaticLayer('Sol', tileset);

        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();




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
            immovable: true,
            visible: false
        });
        map.getObjectLayer('clef').objects.forEach((clefe) => {
            this.clefSprite = this.clef.create(clefe.x, clefe.y - clefe.height, 'clefs').setOrigin(0);
            this.clefSprite.setVisible(false)
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
        this.vaisseau.setScale(2)
        this.vaisseau.play('crash')






        this.froont3 = map.createStaticLayer('front3', tileset);
        this.froont4 = map.createStaticLayer('front4', tileset);

        this.fog = map.createStaticLayer('fog', tileset);



        this.froont2 = map.createStaticLayer('front2', tileset);
        this.froont5 = map.createStaticLayer('front5', tileset);
        this.froont = map.createStaticLayer('front', tileset);
        //this.physics.add.overlap(this.clefSprite, this.player.player, this.addKey(), null, this);


        this.posX=this.player.player.x
        this.posY=this.player.player.y

        this.creaSon()
        ///UI
        this.lifeui = this.add.sprite((this.player.cam.x), (this.player.cam.y),"life3");
        this.lifeui.setVisible(true);
    }
/**

        this.intro = this.add.sprite(0, 0, 'menuback').setOrigin(0, 0);
        this.intro.setScale(1)
        this.intro.setVisible(false)
        this.anims.create({
            key: 'intro',
            frames: this.anims.generateFrameNumbers('intro', {start: 0, end: 430}),
            frameRate: 30,
            repeat:0,
            hideOnComplete:true
        });
        this.colideIntro = this.add.sprite(-350, 650,"");
        this.colideIntro.setScale(2.5)
        this.physics.add.overlap(this.player.player,this.colideIntro,this.Intro(),null,this);




    }
    Intro(){
        this.colideIntro.play('intro')
        this.Alarmed.play()
    }
**/
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
                case Phaser.Input.Keyboard.LEFT:
                    this.Pas.play()
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
                me.Tir.play()
            }
            else if (pointer.rightButtonReleased())
            {
                me.player.gravitir()
                console.log('Right Button was released');
                me.Tir2.play()
            }

        });

    }
    //création son
    creaSon(){
        this.foret=this.sound.add('forest',{loop: true});
        this.foret.volume=0.05;
        this.grote=this.sound.add('grotte',{loop: true});
        this.grote.volume=1;
        this.soins=this.sound.add('soin',{loop: false});
        this.soins.volume=0.1;
        this.Pas=this.sound.add('pas',{loop: false});
        this.Pas.volume=0.1;
        this.Tir=this.sound.add('tir',{loop: false});
        this.Tir.volume=0.1;
        this.Tir2=this.sound.add('tir2',{loop: false});
        this.Tir2.volume=0.1;
        this.Repere=this.sound.add('repere',{loop: false});
        this.Repere.volume=0.1;
        this.Porte=this.sound.add('porte',{loop: false});
        this.Porte.volume=0.1;
        this.Alarmed=this.sound.add('alarme',{loop: false});
        this.Alarmed.volume=0.1;





        if(this.posX<10000){

            this.foret.play();
        }
        if(this.player.player.x>10000){

            this.grote.play();
        }

    }
    // gestion des sons
    gestionSon(){

        if(this.posX>10000){
            this.foret.stop();
        }
        if(this.posX>30000){
            this.grote.stop();
        }





    }

    interfacelife(){
        this.lifeui.x=(this.player.cam.x)
        this.lifeui.y=(this.player.cam.y)-275

        if(this.player.life<= 50){
            this.lifeui.setTexture('life1')
        }
        if(50<this.player.life<=100){


            this.lifeui.setTexture('life2')
        }
        if(this.player.life>100){


            this.lifeui.setTexture('life3')
        }
    }

    update() {
        //console.log(this.player.player.x)
        //console.log(this.player.player.y)

        this.interfacelife()
        this.posX=this.player.player.x
        this.posY=this.player.player.y

        //this.gestionSon()
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


        switch (true) {

            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()

                if(this.cursors.left.shiftKey &&this.cursors.right.isDown ){
                    this.player.jump()
                }
                if(this.cursors.left.shiftKey &&this.cursors.left.isDown ){
                    this.player.jump()
                }
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