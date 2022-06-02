class Player {


    constructor(scene) {

        //intialisation variable du player
        this.nbclef=0
        this.life =100
        this.repere=0
        this.lock=false




        console.log(this.life);
        this.scene=scene
        this.cameras=scene


        //Création du player
        this.player = this.scene.physics.add.sprite(0, 0,"dude");

        //this.player.setBounce(0.1);
        this.player.setScale(0.4);
        this.player.setFlipX(false);

        //Création d'un objet qui suit le joueur, pour manipuler facilement la caméra
        this.cam = this.scene.add.sprite(this.player.x, this.player.y+50,"square");
        this.cam.setScale(0.2)
        this.cam.setVisible(false)

        this.currentSaveX = this.player.x
        this.currentSaveY = this.player.y


//          ANIMATION               //
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('walk', {start: 0, end: 79}),
            frameRate: 60,
            flipX: true,
            repeat: 1,
        });
        this.scene.anims.create({
            key: 'menuu',
            frames: this.scene.anims.generateFrameNumbers('menu', {start: 0, end: 299}),
            frameRate: 60,
            flipX: true,
            repeat: 1,
        });

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('idle', {start: 0, end: 79}),
            frameRate: 60,
            flipX: true,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('walk', {start: 0, end: 79}),
            frameRate: 60,
            repeat:-1,
        });


        this.scene.anims.create({
            key: 'shoot',
            frames: this.scene.anims.generateFrameNumbers('shoot', {start: 0, end: 24}),
            frameRate: 30,
            repeat:-1,
        });
        this.scene.anims.create({
            key: 'PNJ',
            frames: this.scene.anims.generateFrameNumbers('Pnj', {start: 0, end: 79}),
            frameRate: 30,
            repeat:-1,
        });
        this.scene.anims.create({
            key: 'crash',
            frames: this.scene.anims.generateFrameNumbers('crash', {start: 0, end: 179}),
            frameRate: 30,
            repeat:-1,
            yoyo:true
        });
        this.scene.anims.create({
            key: 'sage',
            frames: this.scene.anims.generateFrameNumbers('sageanime', {start: 0, end: 29}),
            frameRate: 30,
            repeat:0,
        });
        this.scene.anims.create({
            key: 'soin',
            frames: this.scene.anims.generateFrameNumbers('soin', {start: 0, end: 17}),
            frameRate: 30,
            repeat:0,
        });
        this.scene.anims.create({
            key: 'boss',
            frames: this.scene.anims.generateFrameNumbers('boss', {start: 0, end: 209}),
            frameRate: 30,
            repeat:0,
            hideOnComplete:true,
        });
        this.scene.anims.create({
            key: 'bosspuissance',
            frames: this.scene.anims.generateFrameNumbers('boss', {start: 44, end: 209}),
            frameRate: 30,
            repeat:-1,
            yoyo:true
        });



        // CREATION PNG //
        this.creationPNG()

        // COLIDER PLAYER //
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.moves,this.force,null,this)
        this.scene.physics.add.collider(this.player, this.scene.door,this.checkDoor, null, this);
        this.scene.physics.add.collider(this.player, this.scene.platforms);
        this.scene.physics.add.overlap(this.player, this.scene.saave, this.actifSave,null,this);
        this.scene.physics.add.overlap(this.player,this.scene.clef, this.addKey, null, this);
        this.scene.physics.add.overlap(this.player,this.scene.soin,this.soins,null,this);


        /// ENEMI
        this.creationboss()


        this.creationenemi()

    }


    // Création des PNG
    creationPNG(){

        console.log("PNG1")
        this.PNG1 = this.scene.physics.add.sprite(14000, 0,"PNG");
        this.PNG1.setScale(0.9)
        this.PNG1.play('PNJ')
        this.PNG1.setAllowGravity=false
        this.PNG1.setImmovable(true)
        this.scene.physics.add.collider(this.PNG1, this.scene.platforms);

        this.scene.tweens.add({
            targets: this.PNG1,
            x: '-=450',
            duration: 10000,
            ease: 'linear',
            yoyo: true,
            repeat: -1,
            delay: 1000,
            flipX: true
        });



        this.PNG2 = this.scene.physics.add.sprite(18000, 350,"PNG");
        this.PNG2.setScale(0.9)
        this.PNG2.setAllowGravity=false
        this.PNG2.setImmovable(true)
        this.PNG2.play('PNJ')
        this.scene.physics.add.collider(this.PNG2, this.scene.platforms);
        this.scene.physics.add.overlap(this.PNG2, this.player, this.dialoguePNG, null, this);
        this.scene.tweens.add({
            targets: this.PNG2,
            x: '-=450',
            duration: 10000,
            ease: 'linear',
            yoyo: true,
            repeat: -1,
            delay: 1000,
            flipX: true
        });

        this.PNG3 = this.scene.physics.add.sprite(19000, 350,"PNG");
        this.PNG3.setScale(0.9)
        this.PNG3.setFlipX(true)
        this.PNG3.setAllowGravity=false
        this.PNG3.setImmovable(true)
        this.PNG3.play('PNJ')

        this.scene.tweens.add({
            targets: this.PNG3,
            x: '+=450',
            duration: 10000,
            ease: 'linear',
            yoyo: true,
            repeat: -1,
            delay: 1000,
            flipX: true
        });
        this.scene.physics.add.collider(this.PNG3, this.scene.platforms);
        this.scene.physics.add.overlap(this.PNG3, this.player, this.dialoguePNG, null, this);
        this.scene.physics.add.collider(this.scene.moves, this.scene.platforms)

        this.scene.sage.setScale(1.6)
        this.colidesage=this.scene.physics.add.sprite(18500,500,"square")
        this.colidesage.setVisible(false)
        this.colidesage.setScale(0.5)


        this.scene.physics.add.overlap(this.colidesage, this.player, this.dialoguesage, null, this);
        this.scene.physics.add.collider(this.colidesage, this.scene.platforms);




    }
    dialoguePNG(png, player){
        if(png===this.PNG1){
            png.setTexture('PNG')
            png.setAllowGravity=false
            png.setImmovable(true)
            this.scene.input.keyboard.on('keydown-ENTER', function () {
                png.setTexture('dude')
                console.log("AH te voila étranger")
            }, this);
        }
    }
    dialoguesage(square, player){

            this.scene.sage.play("sage")
            this.scene.sage.setTexture("sage-2")
            square.destroy()
            console.log("étranger tu vas être notre sauveur passe cette épreuve et bas le gardien en haut de cette tour, et tu trouveras ce que tu cherche.")


    }

    creationboss(){
        this.colideboss=this.scene.physics.add.sprite(74420,-8400,"square")
        this.colideboss.setVisible(false)
        this.colideboss.setScale(0.5)

        this.scene.physics.add.overlap(this.colideboss, this.player, this.actionboss, null, this);
        this.scene.physics.add.collider(this.colideboss, this.scene.platforms);


    }
    actionboss(square, player){
            this.scene.boss.play("boss")
            this.scene.boss.play("bosspuissance")

            square.destroy()
            console.log("Tu viens de signer ton arrêt de mort.")
            this.créationenmiboss()

    }

    créationenmiboss(){
        this.enemiboss = this.scene.physics.add.sprite(this.scene.boss.x-100, this.scene.boss.y-500,"enemi");
        this.enemiboss.setScale(0.2)
        this.enemiboss.setGravity(0,-500);
        this.enemiboss.setVelocity(1)


        this.scene.physics.add.collider(this.enemiboss, this.scene.platforms);
        this.scene.physics.add.overlap(this.enemiboss, this.player, this.lifelost, null, this);


        this.enemiboss2 = this.scene.physics.add.sprite(this.scene.boss.x+100, this.scene.boss.y-500,"enemi");
        this.enemiboss2.setScale(0.2)
        this.enemiboss2.setGravity(0,-500);
        this.enemiboss2.setVelocity(1)


        this.scene.physics.add.collider(this.enemiboss2, this.scene.platforms);
        this.scene.physics.add.overlap(this.enemiboss2, this.player, this.lifelost, null, this);

        this.enemiboss3 = this.scene.physics.add.sprite(this.scene.boss.x+400, this.scene.boss.y-500,"enemi");
        this.enemiboss3.setScale(0.2)
        this.enemiboss3.setGravity(0,-500);
        this.enemiboss3.setVelocity(1)


        this.scene.physics.add.collider(this.enemiboss3, this.scene.platforms);
        this.scene.physics.add.overlap(this.enemiboss3, this.player, this.lifelost, null, this);

        if(this.enemiboss.destroy(true) && this.enemiboss2.destroy(true) && this.enemiboss3.destroy(true)){
            this.colidebossEND=this.scene.physics.add.sprite(74420,-8400,"square")
            this.colidebossEND.setVisible(false)
            this.colidebossEND.setScale(0.5)

            this.scene.physics.add.overlap(this.colidebossEND, this.player, this.end, null, this);
            this.scene.physics.add.collider(this.colidebossEND, this.scene.platforms);
        }

    }
    end(){
        console.log("GG")
    }
    //soin +add vie
    soins(player, flower){
        console.log("OH")
        if (this.life<150){
            this.life+=20
            this.scene.soins.play()
            console.log("OH oui le soins")
            console.log(this.life)
            flower.disableBody()
            flower.play('soin',true)
            /**this.scene.input.keyboard.on('keydown-ENTER', function () {
                this.life=150;
                console.log("OH oui le soins")
                console.log(this.life)
                //flower.play('aniation tubes)
                flower.destroy()
            }, this);**/

        }
        if (this.life===150){
            console.log("j'ai le max ")
            console.log(this.life)

            /**
            this.scene.input.keyboard.on('keydown-ENTER', function () {
                console.log("")
                console.log(this.life)
                //flower.play('aniation tubes)
                flower.destroy()
            }, this);**/
        }

        else{

            //flower.play('aniation tubes)
        }
    }

    // Création des enemis
    creationenemi(){
        this.enemi = this.scene.physics.add.sprite(5000, 0,"enemi");
        this.enemi.setScale(0.2)
        this.enemi.setGravity(0,-500)
        console.log("enemi")
        this.enemi.setVelocity(1)
        this.scene.physics.add.collider(this.enemi, this.scene.platforms);

        console.log("enemi2")
        this.enemi2 = this.scene.physics.add.sprite(35700, -500,"enemi");
        this.enemi2.setScale(0.2)
        this.enemi2.setGravity(0,-500);
        this.enemi2.setVelocity(1)
        this.scene.tweens.add({
            targets: this.enemi2,
            x: '+=450',
            duration: 10000,
            ease: 'linear',
            yoyo: true,
            repeat: -1,
            delay: 1000,
            flipX: true
        });
        this.enemi3 = this.scene.physics.add.sprite(48645, -1000,"enemi");
        this.enemi3.setScale(0.2)
        this.enemi3.setGravity(0,-500);
        this.enemi3.setVelocity(1)
        this.scene.tweens.add({
            targets: this.enemi3,
            x: '+=450',
            duration: 10000,
            ease: 'linear',
            yoyo: true,
            repeat: -1,
            delay: 1000,
            flipX: true
        });

        this.enemi4 = this.scene.physics.add.sprite(56652, -450,"enemi");
        this.enemi4.setScale(0.2)
        this.enemi4.setGravity(0,-500);
        this.enemi4.setVelocity(1)
        this.scene.tweens.add({
            targets: this.enemi4,
            x: '+=450',
            duration: 10000,
            ease: 'linear',
            yoyo: true,
            repeat: -1,
            delay: 1000,
            flipX: true
        });

        this.enemi5 = this.scene.physics.add.sprite(61122, -680,"enemi");
        this.enemi5.setScale(0.2)
        this.enemi5.setGravity(0,-500);
        this.enemi5.setVelocity(1)
        this.scene.tweens.add({
            targets: this.enemi5,
            x: '+=450',
            duration: 10000,
            ease: 'linear',
            yoyo: true,
            repeat: -1,
            delay: 1000,
            flipX: true
        });
        this.enemi6 = this.scene.physics.add.sprite(68035, -780,"enemi");
        this.enemi6.setScale(0.2)
        this.enemi6.setGravity(0,-500);
        this.enemi6.setVelocity(1)
        this.scene.tweens.add({
            targets: this.enemi6,
            x: '+=450',
            duration: 10000,
            ease: 'linear',
            yoyo: true,
            repeat: -1,
            delay: 1000,
            flipX: true
        });



            this.scene.physics.add.collider(this.enemi2, this.scene.platforms);
            this.scene.physics.add.overlap(this.enemi2, this.player, this.lifelost, null, this);
            this.scene.physics.add.collider(this.enemi3, this.scene.platforms);
            this.scene.physics.add.overlap(this.enemi3, this.player, this.lifelost, null, this);
            this.scene.physics.add.collider(this.enemi4, this.scene.platforms);
            this.scene.physics.add.overlap(this.enemi4, this.player, this.lifelost, null, this);
            this.scene.physics.add.collider(this.enemi5, this.scene.platforms);
            this.scene.physics.add.overlap(this.enemi5, this.player, this.lifelost, null, this);
            this.scene.physics.add.collider(this.enemi6, this.scene.platforms);
            this.scene.physics.add.overlap(this.enemi6, this.player, this.lifelost, null, this);





    }

    //mouvement mis a jour sur la position du player
    mooveenemi(){
        if (this.repere==2){
            this.scene.tweens.add({
                targets: this.enemi,
                x: this.player.x,
                y: this.player.y,
                duration: 4000,
                ease: 'Each',
                repeat: 0,
                delay:0
            });

        }
        this.scene.tweens.add({
            targets: this.enemiboss,
            x: this.player.x,
            y: this.player.y,
            duration: 4000,
            ease: 'Each',
            repeat: 0,
            delay:0
        });
        this.scene.tweens.add({
            targets: this.enemiboss2,
            x: this.player.x,
            y: this.player.y,
            duration: 4000,
            ease: 'Each',
            repeat: 0,
            delay:0
        });
        this.scene.tweens.add({
            targets: this.enemiboss3,
            x: this.player.x,
            y: this.player.y,
            duration: 4000,
            ease: 'Each',
            repeat: 0,
            delay:0
        });



    }



    actifSave(player, save){
      //  save.destroy()
        save.setTexture("repere1")
        save.disableBody()
        /**
        this.actifRepere =this.scene.add.sprite(save.x+95, save.y+54,"repere1");

        this.actifRepere.setScale(0.1)
**/
        this.currentSaveX = player.x
        this.currentSaveY = player.y
        this.repere +=1;
        console.log(this.repere)
        this.scene.Repere.play()
    }


    checkDoor(player, door){
        if (this.nbclef>0){
            this.nbclef-=1;
            console.log(this.nbclef)
            door.setTexture('door-open')
            door.disableBody()
            door.setPosition((door.x-250),(door.y)-150)

        }
        else{
            console.log('il me manque une clef')
        }
    }

    addKey(player, key){

        console.log('key')
        key.destroy();
        this.nbclef+=1;
        console.log(this.nbclef)
        //this.clefSprite.disableBody(true,true)

    }
    lifelost(enemi,player){

        if (this.life<0){
            console.log('MUERTE!')
            this.resetlife()
        }
        else{
            this.life-=1;
            console.log(this.life);
        }
    }
    resetlife(){
        this.player.x=this.currentSaveX
        this.player.y=this.currentSaveY
        this.life=100
    }




    force(player,moves){
        if(player.body.touching.left || player.body.touching.right) {
            moves.setImmovable(false)
            this.pousse = true
        }
        if(player.body.touching.down){
            moves.setImmovable()
            this.player.body.blocked.down=true //ici on fais croire a phaser que le sprite est static pour pouvoir sauter dessus (uniquement valable pour utiliser la fonction onFloor())
        }
    }
    jump(){
        this.player.setVelocityY(-420);
        this.player.play('walk', true);
    }
    moveRight(v){

        this.player.setVelocityX(v);

        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}

        this.player.setFlipX(false);
    }
    moveLeft(v){
        this.player.setVelocityX(-v);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(true);
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }
    tir(){
        let pointer =this.scene.input.activePointer;
        this.point =this.scene.add.sprite(pointer.worldX, pointer.worldY,"square");
        this.point.setDisplaySize(10,10);
        this.point.setVisible(false)



        this.player.play('shoot', true);
        this.balle = this.scene.physics.add.sprite(this.player.x, this.player.y,"balle");
        this.balle.setScale(0.1)
        this.balle.setGravity(0,-500);
        this.balle.scene.physics.moveToObject(this.balle, this.point, 1000);

        this.scene.physics.add.overlap(this.balle, this.enemi,this.enemidelete, null ,this)
        this.scene.physics.add.overlap(this.balle, this.enemi2,this.enemidelete, null ,this)
        this.scene.physics.add.overlap(this.balle, this.enemi3,this.enemidelete, null ,this)
        this.scene.physics.add.overlap(this.balle, this.enemi4,this.enemidelete, null ,this)
        this.scene.physics.add.overlap(this.balle, this.enemi5,this.enemidelete, null ,this)
        this.scene.physics.add.overlap(this.balle, this.enemi6,this.enemidelete, null ,this)
        this.scene.physics.add.overlap(this.balle, this.enemiboss,this.enemidelete, null ,this)
        this.scene.physics.add.overlap(this.balle, this.enemiboss2,this.enemidelete, null ,this)
        this.scene.physics.add.overlap(this.balle, this.enemiboss3,this.enemidelete, null ,this)
        this.scene.physics.add.collider(this.balle, this.scene.moves,this.balledelete,null,this)
        //this.scene.physics.add.collider(this.balle, this.enemi, this.enemidelete())

    }
    gravitir(){
        let pointer =this.scene.input.activePointer;
        this.point =this.scene.add.sprite(pointer.worldX, pointer.worldY,"square");
        this.point.setDisplaySize(10,10);
        this.point.setVisible(false)



        this.player.play('shoot', true);
        this.balle = this.scene.physics.add.sprite(this.player.x, this.player.y,"balle2");
        this.balle.setScale(0.1)
        this.balle.setGravity(0,-500);
        this.balle.scene.physics.moveToObject(this.balle, this.point, 900);

        this.scene.physics.add.collider(this.balle, this.scene.moves, this.gravityEffect, null,this)

       // this.scene.physics.add.collider(this.balle, this.enemi2, this.enemidelete())

    }

    gravityEffect(balle, moves){
        balle.destroy()
        moves.setGravityY(-610)
        moves.setTexture('mouvableactif')

    }
    balledelete(balle,moves){
        balle.destroy()
        moves.setGravityY(1)
        moves.setTexture('mouvable')
    }

    enemidelete(enemi,balle){

        if ( this.player.x<10000){
            enemi.setX(5000)
            this.mooveenemi(enemi)

        }
        if(this.repere===3){
            enemi.destroy()
            console.log('delete')
        }
        else{
            balle.destroy()
        }

        //this.enemi.setVisible(false)

    }

    gravitychange(g){
        this.player.setGravityY(g);
    }


    update(){

        if (this.balle.x >=this.player.x+500 || this.balle.y>=this.player.y+500){
            this.balle.setVisible(false)
        }


    }


    }

