class Player {


    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(50, -300,"dude");
        //this.player.setBounce(0.1);
        this.player.setScale(1);
        this.player.setFlipX(true);


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
    tir(v){

        this.balle = this.scene.add.sprite(this.player.x, this.player.y,"square");
        this.balle.setDisplaySize(10,10);

        this.scene.tweens.add({
            targets: this.balle,
            x: this.player.x+(15000*v),
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


    gravitystop(){

        this.player.setGravityY(0);
    }
    gravitynorm(){
        this.player.setGravityY(500);
    }

    }



