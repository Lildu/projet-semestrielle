class Player {


    constructor(scene) {
        let life =50;
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(50, -300,"dude");
        //this.player.setBounce(0.1);
        this.player.setScale(1);
        this.player.setFlipX(true);

        this.cam = this.scene.add.sprite(this.player.x, this.player.y+100,"square");
        this.cam.setScale(0.2)
        this.cam.setVisible(false)


        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.platforms);

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
        this.scene.physics.add.collider(this.player, this.scene.moves,this.force,null,this)
        this.enemi = this.scene.add.sprite(0, 0,"enemi");
        this.enemi.setScale(0.2);

        this.scene.tweens.add({
            targets: this.enemi,
            x: this.player.x,
            y: this.player.y,
            duration: 10000,
            ease: 'Power',
            repeat: 0,
            delay:0
        });
    }
    life(){
        this.player.life-=1;
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
        this.player.play('jump', true);

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
    tir(v,b){

        this.balle = this.scene.add.sprite(this.player.x, this.player.y,"square");
        this.balle.setDisplaySize(10,10);
        //this.scene.physics.add.collider(this.balle, this.scene.moves,this.life,null,this)
        this.scene.tweens.add({
            targets: this.balle,
            x: (this.player.x+15000)*v,
            y: (this.player.y+15000)*b,
            duration: 10000,
            ease: 'Power',
            repeat: 0,
            delay:0
        });
        if(this.balle.y < this.player.player.y-500 ){

            this.balle.destroy();
        }
        if(this.balle.y > this.player.player.y+500 ){

            this.balle.destroy();
        }
        if(this.balle.x < this.player.player.x-1000 ){

            this.balle.destroy();
        }
        if(this.balle.x > this.player.player.x+1000 ) {

            this.balle.destroy();
        }
    }


    gravitychange(g){
        this.player.setGravityY(g);
    }


    }


