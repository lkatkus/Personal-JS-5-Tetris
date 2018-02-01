function init(){
    var container = document.querySelector(".container");
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // BLOCK PARAMETERS FOR BUILDING SHAPES
    var block;
    var blockSize = 20;

    // SETTING STARTING CANVAS SIZE
    canvas.width = blockSize*12;
    canvas.height = blockSize*20;

    function drawBlock(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, blockSize, blockSize);
        block = ctx.getImageData(0, 0, blockSize, blockSize);
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    drawBlock();

    var makeShape = {
        leftGun: function(x,y){
                console.log('leftGun');
                this.x = x;
                this.y = y;
                ctx.putImageData(block,this.x,this.y);
                ctx.putImageData(block,this.x+blockSize,this.y);
                ctx.putImageData(block,this.x+blockSize*2,this.y);
                ctx.putImageData(block,this.x+blockSize*2,this.y+blockSize);
        },
        rightGun: function(x,y){
            console.log('rightGun');
            this.x = x;
            this.y = y;
            ctx.putImageData(block,this.x,this.y);
            ctx.putImageData(block,this.x+blockSize,this.y);
            ctx.putImageData(block,this.x+blockSize*2,this.y);
            ctx.putImageData(block,this.x,this.y+blockSize);
        },
        stick: function(x,y){
            console.log('stick');
            this.x = x;
            this.y = y;
            ctx.putImageData(block,this.x,this.y);
            ctx.putImageData(block,this.x+blockSize,this.y);
            ctx.putImageData(block,this.x+blockSize*2,this.y);
            ctx.putImageData(block,this.x+blockSize*3,this.y);
        },
        box: function(x,y){
            console.log('box');
            this.x = x;
            this.y = y;
            ctx.putImageData(block,this.x,this.y);
            ctx.putImageData(block,this.x+blockSize,this.y);
            ctx.putImageData(block,this.x,this.y+blockSize);
            ctx.putImageData(block,this.x+blockSize,this.y+blockSize);
        },
        pyramid: function(x,y){
            console.log('pyramid');
            this.x = x;
            this.y = y;
            ctx.putImageData(block,this.x,this.y);
            ctx.putImageData(block,this.x+blockSize,this.y);
            ctx.putImageData(block,this.x+blockSize,this.y+blockSize);
            ctx.putImageData(block,this.x+blockSize*2,this.y);
        },
        rightKink: function(x,y){
            console.log('rightKink');
            this.x = x;
            this.y = y;
            ctx.putImageData(block,this.x,this.y+blockSize);
            ctx.putImageData(block,this.x+blockSize,this.y+blockSize);
            ctx.putImageData(block,this.x+blockSize,this.y);
            ctx.putImageData(block,this.x+blockSize*2,this.y);
        },
        leftKink: function(x,y){
            console.log('leftKink');
            this.x = x;
            this.y = y;
            ctx.putImageData(block,this.x,this.y);
            ctx.putImageData(block,this.x+blockSize,this.y);
            ctx.putImageData(block,this.x+blockSize,this.y+blockSize);
            ctx.putImageData(block,this.x+blockSize*2,this.y+blockSize);
        },
    };

    function leftGun(x,y){
        this.x = x;
        this.y = y;

        this.draw = function (posX,posY){
            // console.log('leftGun');

            // activeShape.push(ctx.putImageData(block,this.x,this.y);
            ctx.putImageData(block,posX,posY);
            // ctx.putImageData(block,this.x+blockSize,this.y);
            // ctx.putImageData(block,this.x+blockSize*2,this.y);
            // ctx.putImageData(block,this.x+blockSize*2,this.y+blockSize);
        },

        this.update = function(){

            void ctx.clearRect(0, 0, canvas.width, canvas.height);

            let positionTaken;
            let taken = {};


                // DRAW EXISTING SHAPES
                for(let i = 0, j = finishedShapes.length; i < j; i++){
                    this.draw(finishedShapes[i].x, finishedShapes[i].y);
                }

                // CHECK IF CURRENT POSITION IS FREE
                for(let i = 0, j = finishedShapes.length; i < j; i++){
                    if(this.x == finishedShapes[i].x && this.y == finishedShapes[i].y - blockSize){
                        console.log('TAKEN');
                        positionTaken = true;
                    }else{
                        console.log('FREE');
                        positionTaken = false;
                    }
                }

                // BOTTOM LINE
                if(this.y + blockSize >= canvas.height){
                    this.y = this.y;

                    // ADD POSITION TO TAKEN OBJECT
                    taken.x = this.x;
                    taken.y = this.y;
                    finishedShapes.push(taken);

                    console.log('BOTTOM');
                    clearTimeout(myAnimationInterval);
                    cancelAnimationFrame(myAnimationRequest);

                }else if(!positionTaken){
                    this.y += blockSize;
                    console.log('MOVING');

                }else if(positionTaken){
                    // ADD POSITION TO TAKEN OBJECT
                    taken.x = this.x;
                    taken.y = this.y;
                    finishedShapes.push(taken);
                    console.log("STOPED");
                    clearTimeout(myAnimationInterval);
                    cancelAnimationFrame(myAnimationRequest);
                }

            this.draw(this.x, this.y);
        }
    };


document.addEventListener('click',function(){
    console.log('shapesArr');
    activeShape = [];
    console.log(activeShape);
    console.log('finishedShapes ' + finishedShapes);
    activeShape.push(new leftGun(blockSize*5,0));
    animate();
})

    var myAnimationRequest;
    var myAnimationInterval;

    // SHAPES PLACEHOLDER ARRAY
    var shapesArr = [];
    var activeShape = [];
    var finishedShapes = [];


    function animate(){

        myAnimationInterval = setTimeout(
            function(){
                myAnimationRequest = requestAnimationFrame(animate);
            },
        200);

        // LOOP FOR UPDATING POSITION
        for(var i = 0; i < activeShape.length; i++){
            activeShape[i].update();
        };
    };

}
