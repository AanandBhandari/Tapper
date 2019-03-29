// var WebFont = {
//     google: {
//         families: [ 'Montserrat', 'sans-serif' ]
//     }
// };

// (function() {
//     var wf = document.createElement('script');
//     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//     '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//     wf.type = 'text/javascript';
//     wf.async = 'true';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(wf, s);
// })();

class Boot extends Phaser.Scene{
    constructor(){
        super("Boot");
    }
    init(data) {
        this.gameState = {
            score: 0,
            highScore: data.highScore === null || data.highScore === undefined ? null : data.highScore
        };
    }
    preload(){
        
    }
    create(){
        //one second delay to make sure the fonts have loaded
        //9 times out of 10 you won't need this!
        // Phaser.Timer.SECOND, this.makeText, this
    	this.time.addEvent({
            delay: 1000,
            callback: this.makeText.bind(this)
        });
    }

    makeText() {

        if (this.gameState.highScore) {
            this.textValue = 'Highscore : ' + this.gameState.highScore;
        } else {
            this.textValue = 'Welcome';
        }

        this.welcomeText = this.make.text({
            x: this.cameras.main.width / 2,
            y: this.cameras.main.height / 2 - 50,
            text: this.textValue,
            origin: 0.5,
            style: {
                fontSize: '30px',
                color: '#FFFFFF',
                radius: 2
            }
        });
        this.welcomeText.font = "Montserrat";

        this.playAgain = this.make.text({
            x: this.cameras.main.width / 2,
            y: this.cameras.main.height / 2 + 50,
            text: 'Play Again',
            origin: 0.5,
            padding: {
                left: 20,
                right: 20,
                top: 5,
                bottom: 5
            },
            style: {
                fontSize: '40px',
                color: '#000000',
                backgroundColor: '#FFFFFF',
                radius: 2
            }
        });
        this.playAgain.font = "Montserrat";

        // make the text interactive
        this.playAgain.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, this.playAgain.width, this.playAgain.height), Phaser.Geom.Rectangle.Contains);

        this.playAgain.on('pointerdown', function(){
            this.play();
        }, this);  
    }

    play() {
        this.scene.start('Preload');
    }

    update(){
        
    }
}