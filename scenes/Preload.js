class Preload extends Phaser.Scene{
    constructor(){
        super("Preload");
    }
    preload(){
        this.load.image("ball", gameOptions.asset_path+"ball.png");
        this.load.image("wall", gameOptions.asset_path+"wall.png");

        this.load.audio('go', gameOptions.asset_path+'audio/coin-gain.wav', {
            instances: 1
        });
        this.load.audio('over', gameOptions.asset_path+'audio/over.wav', {
            instances: 1
        });
        this.load.audio('yes', gameOptions.asset_path+'audio/yes.wav', {
            instances: 1
        });
    }
    create(){
        this.over = this.sound.add('over');
        this.go = this.sound.add('go');
        this.yes = this.sound.add('yes');
        this.scene.start('PlayGame');
    }
    update(){
        
    }
}