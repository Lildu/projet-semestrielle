class Player {


    constructor(scene) {

        this.nbclef=0







        let life;
        life=10;
        console.log(life);
        this.scene=scene
        this.cameras=scene


        //Création du player
        this.player = this.scene.physics.add.sprite(50, -300,"dude");
        //this.player.setBounce(0.1);
        this.player.setScale(0.3);
        this.player.setFlipX(true);

        //Création d'un objet qui suit le joueur, pour manipuler facilement la caméra
        this.cam = this.scene.add.sprite(this.player.x, this.player.y+50,"square");
        this.cam.setScale(0.2)
        this.cam.setVisible(false)




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

        // Création des enemis
        this.enemi = this.scene.physics.add.sprite(500, 0,"enemi");
        this.enemi.setScale(0.2)
        this.enemi.setGravity(0,-500)
        this.enemi.setVelocity(1)



        // COLIDER PLAYER //
        this.player.setCollideWorldBounds(false);

        this.scene.physics.add.collider(this.player, this.scene.moves,this.force,null,this)
        this.scene.physics.add.collider(this.player, this.scene.door,this.checkDoor, null, this);
        this.scene.physics.add.collider(this.player, this.scene.platforms);
        this.scene.physics.add.collider(this.enemi, this.scene.platforms);

        this.scene.physics.add.overlap(this.player,this.scene.clefSprite, this.addKey, null, this);
        this.scene.physics.add.collider(this.enemi, this.player, this.lifelost, null, this);

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
    lifelost(life){
        life-=1;
        console.log(life);
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
        this.balle.scene.physics.moveToObject(this.balle, this.point, 500);

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
    balledelete(balle){
        balle.destroy()
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

