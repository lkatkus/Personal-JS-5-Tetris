function init(){
    var container = document.querySelector(".container");
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // SETTING STARTING CANVAS SIZE
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;


    var block; /* BASIC BLOCK FOR FORM BUILDING */
    var blockSize = 20;


    function drawBlock(){
        console.log('drawBasic');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, blockSize, blockSize);
        block = ctx.getImageData(0, 0, blockSize, blockSize);
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawBlock();

    var makeShape = {
        leftGun: function(x,y){
            console.log('leftGun');
            ctx.putImageData(block,x,y);
            ctx.putImageData(block,x+blockSize,y);
            ctx.putImageData(block,x+blockSize*2,y);
            ctx.putImageData(block,x+blockSize*2,y+blockSize);
        },
        rightGun: function(x,y){
            console.log('rightGun');
            ctx.putImageData(block,x,y);
            ctx.putImageData(block,x+blockSize,y);
            ctx.putImageData(block,x+blockSize*2,y);
            ctx.putImageData(block,x,y+blockSize);
        },
        stick: function(x,y){
            console.log('stick');
            ctx.putImageData(block,x,y);
            ctx.putImageData(block,x+blockSize,y);
            ctx.putImageData(block,x+blockSize*2,y);
            ctx.putImageData(block,x+blockSize*3,y);
        },
        box: function(x,y){
            console.log('box');
            ctx.putImageData(block,x,y);
            ctx.putImageData(block,x+blockSize,y);
            ctx.putImageData(block,x,y+blockSize);
            ctx.putImageData(block,x+blockSize,y+blockSize);
        },
        pyramid: function(x,y){
            console.log('pyramid');
            ctx.putImageData(block,x,y);
            ctx.putImageData(block,x+blockSize,y);
            ctx.putImageData(block,x+blockSize,y+blockSize);
            ctx.putImageData(block,x+blockSize*2,y);
        },
        rightKink: function(x,y){
            console.log('rightKink');
            ctx.putImageData(block,x,y+blockSize);
            ctx.putImageData(block,x+blockSize,y+blockSize);
            ctx.putImageData(block,x+blockSize,y);
            ctx.putImageData(block,x+blockSize*2,y);
        },
        leftKink: function(x,y){
            console.log('leftKink');
            ctx.putImageData(block,x,y);
            ctx.putImageData(block,x+blockSize,y);
            ctx.putImageData(block,x+blockSize,y+blockSize);
            ctx.putImageData(block,x+blockSize*2,y+blockSize);
        },
    };

    makeShape.leftGun(100,0);
    makeShape.rightGun(100,50);
    makeShape.stick(100,100);
    makeShape.box(100,150);
    makeShape.pyramid(100,200);
    makeShape.rightKink(100,250);
    makeShape.leftKink(100,300);

}
