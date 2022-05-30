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

        this.sage = this.scene.physics.add.sprite(18500, 350,"sage");
        //Création du player
        this.player = this.scene.physics.add.sprite(0, 0,"dude");

        //this.player.setBounce(0.1);
        this.player.setScale(0.3);
        this.player.setFlipX(true);

        //Création d'un objet qui suit le joueur, pour manipuler facilement la caméra
        this.cam = this.scene.add.sprite(this.player.x, this.player.y+50,"square");
        this.cam.setScale(0.2)
        this.cam.setVisible(false)

        this.currentSaveX = this.player.x
        this.currentSaveY = this.player.y


//          ANIMATION               //
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('walk', {start: 0, end: 119}),
            frameRate: 60,
            flipX: true,
            repeat: 1,
        });

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('idle', {start: 0, end: 119}),
            frameRate: 60,
            flipX: true,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('walk', {start: 0, end: 119}),
            frameRate: 60,
            repeat:-1,
        });


        this.scene.anims.create({
            key: 'midle',
            frames: this.scene.anims.generateFrameNumbers('midle', {start: 0, end: 5}),
            frameRate: 30,
            repeat:-1,
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
        this.scene.physics.add.overlap(this.player,this.scene.flowers, this.soins, null, this);


    }


    // Création des PNG
    creationPNG(){

        console.log("PNG1")
        this.PNG1 = this.scene.physics.add.sprite(14000, 0,"PNG");
        this.PNG1.setScale(0.9)
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
        this.scene.physics.add.collider(this.PNG2, this.scene.platforms);
        this.scene.physics.add.overlap(this.PNG2, this.player, this.dialoguePNG, null, this);
        this.PNG3 = this.scene.physics.add.sprite(19000, 350,"PNG");
        this.PNG3.setScale(0.9)
        this.PNG3.setFlipX(true)
        this.PNG3.setAllowGravity=false
        this.PNG3.setImmovable(true)
        this.scene.physics.add.collider(this.PNG3, this.scene.platforms);
        this.scene.physics.add.overlap(this.PNG3, this.player, this.dialoguePNG, null, this);
        this.scene.physics.add.collider(this.scene.moves, this.scene.platforms)

        this.sage.setScale(1.6)

        this.scene.physics.add.overlap(this.sage, this.player, this.dialoguesage, null, this);
        this.scene.physics.add.collider(this.sage, this.scene.platforms)
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
    dialoguesage(png, player){
        if(png===this.PNG1){
            png.setTexture('PNG')
            png.setAllowGravity=false
            png.setImmovable(true)
            this.scene.input.keyboard.on('keydown-ENTER', function () {
                png.setTexture('dude')
                console.log("étranger tu vas être notre sauveur passe cette épreuve et bas le gardien en haut de cette tour, et tu trouveras ce que tu cherche.")
            }, this);
        }
    }

    soins(player, flower){
        if (this.life<150){
            this.life=150
            console.log("OH oui le soins")
            console.log(this.life)
            flower.disableBody()
            flower.setTexture('')
            /**this.scene.input.keyboard.on('keydown-ENTER', function () {
                this.life=150;
                console.log("OH oui le soins")
                console.log(this.life)
                //flower.play('aniation tubes)
                flower.destroy()
            }, this);**/

        }
        if (this.life=150){
            console.log("j'ai le max mon frérot")
            console.log(this.life)
            /**
            this.scene.input.keyboard.on('keydown-ENTER', function () {
                console.log("j'ai le max mon frérot")
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
        if (this.repere===2){
            console.log("enemi")
            this.enemi = this.scene.physics.add.sprite(5000, 0,"enemi");
            this.enemi.setScale(0.2)
            this.enemi.setGravity(0,-500)
            this.enemi.setVelocity(1)
            this.scene.physics.add.collider(this.enemi, this.scene.platforms);
            this.scene.physics.add.collider(this.enemi, this.player, this.lifelost, null, this);
        }

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
        this.creationenemi()
    }


    checkDoor(player, door){
        if (this.nbclef>0){
            this.nbclef-=1;
            console.log(this.nbclef)
            door.destroy()
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




    mooveenemi(){
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
        this.player.setFlipX(true);
    }
    moveLeft(v){
        this.player.setVelocityX(-v);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(false);
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



        this.player.play('midle', true);
        this.balle = this.scene.physics.add.sprite(this.player.x, this.player.y,"square");
        this.balle.setDisplaySize(10,10);
        this.balle.setGravity(0,-500);
        this.balle.scene.physics.moveToObject(this.balle, this.point, 1000);

        this.scene.physics.add.overlap(this.balle, this.enemi,this.enemidelete, null ,this)
        this.scene.physics.add.collider(this.balle, this.scene.moves,this.balledelete,null,this)
        //this.scene.physics.add.collider(this.balle, this.enemi, this.enemidelete())

    }
    gravitir(){
        let pointer =this.scene.input.activePointer;
        this.point =this.scene.add.sprite(pointer.worldX, pointer.worldY,"square");
        this.point.setDisplaySize(10,10);
        this.point.setVisible(false)



        this.player.play('midle', true);
        this.balle = this.scene.physics.add.sprite(this.player.x, this.player.y,"square");
        this.balle.setDisplaySize(10,10);
        this.balle.setGravity(0,-500);
        this.balle.scene.physics.moveToObject(this.balle, this.point, 500);

        this.scene.physics.add.collider(this.balle, this.scene.moves, this.gravityEffect, null,this)
        //this.scene.physics.add.collider(this.balle, this.enemi, this.enemidelete())

    }

    gravityEffect(balle, moves){
        balle.destroy()
        moves.setGravityY(-610)

    }
    balledelete(balle,moves){
        balle.destroy()
        moves.setGravityY(1)
    }

    enemidelete(){
        console.log('delete')
        this.enemi.destroy()
        //this.enemi.setVisible(false)

    }

    gravitychange(g){
        this.player.setGravityY(g);
    }


    update(){
        console.log(this.player.x)
        if (this.balle.x >=this.player.x+500 || this.balle.y>=this.player.y+500){
            this.balle.setVisible(false)
        }


    }


    }

