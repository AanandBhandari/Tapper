let gameOptions = {
 
    // duration of the wall, in milliseconds
    wallDuration: 100,
 
    // ball start speed, in pixels/second
    ballStartSpeed: 500,
 
    // ball speed increase at each successful bounce, in pixels/second
    ballSpeedIncrease: 20,

    // All assets path
    asset_path: '/assets/',

    score: 2
}
window.onload = function() {
    let gameConfig = {
        width: 480,
        height: 640,
        scene: [ Boot, Preload, PlayGame, Over ],
        parent: 'app',
        backgroundColor: 0x222222,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}