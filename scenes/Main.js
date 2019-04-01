class PlayGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    init() {
        this.gameState = {
            score: 0
        };
    }
    preload(){
        // this.load.image('red', gameOptions.asset_path+"red.png");
    }
    create(){
        this.gameOver = false;
        this.canActivateWallLower = true;
        this.canActivateWallUpper = true;
        this.canActivateWallRight = true;
        this.canActivateWallLeft = true;
        this.ballSpeed = gameOptions.ballStartSpeed;

        this.over = this.sound.add('over');
        this.go = this.sound.add('go');
        this.yes = this.sound.add('yes');

        this.scoreText = this.make.text({
            x: this.cameras.main.width / 2,
            y: this.cameras.main.height / 2,
            text: this.gameState.score,
            origin: 0.5,
            style: {
                fontSize: '80px',
                color: '#FFFFFF',
                radius: 2
            }
        }).setAlpha(0.1);

        if (this.gameState.highScore) {
            this.highScoreText = this.make.text({
                x: this.cameras.main.width / 2,
                y: this.cameras.main.height / 2 + 40,
                text: 'HighScore : ' + this.gameState.highScore,
                origin: 0.5,
                style: {
                    fontSize: '20px',
                    color: '#FFFFFF',
                    radius: 2
                }
            }).setAlpha(0.1);
        }

        this.wallGroup = this.physics.add.group();

        this.theBall = this.physics.add.image(game.config.width / 2, game.config.height * 4 / 5, "ball");
        this.theBall.body.setCircle(25)
        this.theBall.setBounce(1)

        this.particles = this.add.particles('red');

        this.emitter = this.particles.createEmitter({
            speed: 50,
            scale: { start: 0, end: 1 },
            blendMode: 'ADD'
        });

        this.leftWall=this.createWall(32, game.config.height / 2, 32, game.config.height - 96);
        this.rightWall=this.createWall(game.config.width - 32, game.config.height / 2, 32, game.config.height - 96);
        this.upperWall=this.createWall(game.config.width / 2, 32, game.config.width - 32, 32);
        this.lowerWall = this.createWall(game.config.width / 2, game.config.height - 32, game.config.width - 32, 32);
    //    
        this.input.on("pointerdown", this.activateWall, this);

        this.emitter.startFollow(this.theBall);
        this.physics.add.collider(this.theBall, this.wallGroup, function (ball, wall) {
            this.canActivateWallLower = true;
            this.canActivateWallUpper = true;
            this.canActivateWallRight = true;
            this.canActivateWallLeft = true;
            if (wall.x == this.lowerWall.x && wall.y == this.lowerWall.y) {
                this.ballSpeed += gameOptions.ballSpeedIncrease;
                let ballVelocity = this.physics.velocityFromAngle(Phaser.Math.Between(220, 320), this.ballSpeed);
                this.theBall.setVelocity(ballVelocity.x, ballVelocity.y);
                this.incrementScore();
            }
            if (wall.x == this.rightWall.x && wall.y == this.rightWall.y) {
                this.ballSpeed += gameOptions.ballSpeedIncrease;
                let ballVelocity = this.physics.velocityFromAngle(Phaser.Math.Between(220, 320), this.ballSpeed);
                this.theBall.setVelocity(ballVelocity.x, ballVelocity.y);
                this.incrementScore();
            }
            if (wall.x == this.leftWall.x && wall.y == this.leftWall.y) {
                this.ballSpeed += gameOptions.ballSpeedIncrease;
                let ballVelocity = this.physics.velocityFromAngle(Phaser.Math.Between(220, 320), this.ballSpeed);
                this.theBall.setVelocity(ballVelocity.x, ballVelocity.y);
                this.incrementScore();
            }
            if (wall.x == this.upperWall.x && wall.y == this.upperWall.y) {
                this.ballSpeed += gameOptions.ballSpeedIncrease;
                let ballVelocity = this.physics.velocityFromAngle(Phaser.Math.Between(-220, -320), this.ballSpeed);
                this.theBall.setVelocity(ballVelocity.x, ballVelocity.y);
                this.incrementScore();
            }
        }, null, this);
    }

    update() {
        
        if ((this.theBall.y > game.config.height || this.theBall.y < 0) && !this.gameOver) {
            this.playOver();
        }
    }
    createWall(posX, posY, width, height){
        let wall = this.physics.add.image(posX, posY, "wall");
        wall.displayWidth = width;
        wall.displayHeight = height;
        this.wallGroup.add(wall);
        wall.setImmovable();
        return wall;
    }
    activateWall(){
        if(this.theBall.body.speed == 0){
            let ballVelocity = this.physics.velocityFromAngle(Phaser.Math.Between(220, 320), this.ballSpeed)
            this.theBall.setVelocity(ballVelocity.x, ballVelocity.y);
            this.lowerWall.alpha = 0.1;
            this.upperWall.alpha = 0.1;
            this.leftWall.alpha = 0.1;
            this.rightWall.alpha = 0.1;
            this.lowerWall.body.checkCollision.none = true;
            this.upperWall.body.checkCollision.none = true;
            this.rightWall.body.checkCollision.none = true;
            this.leftWall.body.checkCollision.none = true;
            return;
        }
        if(this.canActivateWallLower){
            this.canActivateWallLower = false;
            this.lowerWall.alpha = 1;
            this.lowerWall.body.checkCollision.none = false;
            let wallEvent = this.time.addEvent({
                delay: gameOptions.wallDuration,
                callbackScope: this,
                callback: function(){
                    this.lowerWall.alpha = 0.1;
                    this.lowerWall.body.checkCollision.none = true;
                }
            });
        }

        if (this.canActivateWallUpper) {
            this.canActivateWallUpper = false;
            this.upperWall.alpha = 1;
            this.upperWall.body.checkCollision.none = false;
            let wallEvent = this.time.addEvent({
                delay: gameOptions.wallDuration,
                callbackScope: this,
                callback: function () {
                    this.upperWall.alpha = 0.1;
                    this.upperWall.body.checkCollision.none = true;
                }
            });
        }
        if (this.canActivateWallRight) {
            this.canActivateWallRight = false;
            this.rightWall.alpha = 1;
            this.rightWall.body.checkCollision.none = false;
            let wallEvent = this.time.addEvent({
                delay: gameOptions.wallDuration,
                callbackScope: this,
                callback: function () {
                    this.rightWall.alpha = 0.1;
                    this.rightWall.body.checkCollision.none = true;
                }
            });
        }
        if (this.canActivateWallLeft) {
            this.canActivateWallLeft = false;
            this.leftWall.alpha = 1;
            this.leftWall.body.checkCollision.none = false;
            let wallEvent = this.time.addEvent({
                delay: gameOptions.wallDuration,
                callbackScope: this,
                callback: function () {
                    this.leftWall.alpha = 0.1;
                    this.leftWall.body.checkCollision.none = true;
                }
            });
        }
    }
    

    // Event Increment Score
    incrementScore () {
        this.yes.play();
        this.gameState.score += gameOptions.score;
        this.scoreText.setText(this.gameState.score); 
    }

    // Event Game Over
    playOver () {
        this.over.play(); // game over sound
        this.gameOver = true;
        this.cameras.main.shake(800, 0.05);
        this.time.addEvent({
            delay: 800,
            callbackScope: this,
            callback: function(){
                this.scene.start("Boot", { highScore: this.gameState.score });
            }
        });
    }
}