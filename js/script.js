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

        this.draw = function (){
            // console.log('leftGun');

            // activeShape.push(ctx.putImageData(block,this.x,this.y);
            ctx.putImageData(block,this.x,this.y);
            // ctx.putImageData(block,this.x+blockSize,this.y);
            // ctx.putImageData(block,this.x+blockSize*2,this.y);
            // ctx.putImageData(block,this.x+blockSize*2,this.y+blockSize);
        },

        this.update = function(){
            taken = {};
            let free = true;

            void ctx.clearRect(0, 0, canvas.width, canvas.height);

            for(let i = 0,j = finishedShapes.length; i < j; i++){
                if(this.y == finishedShapes[i].y){
                    console.log('taken');
                    free = false;
                }else{
                    console.log('free');
                }
            }

            if(this.y + blockSize >= canvas.height){
                this.y = this.y;
                console.log("NEED NEW SHAPE");
                cancelAnimationFrame(myAnimationRequest);

                taken.x = this.x;
                taken.y = this.y;
                finishedShapes.push(taken);
                console.log(finishedShapes);


            }else if(this.y >= canvas.height && !free){
                this.y = 0;
            }
            else{
                this.y += blockSize;
            }
            this.draw();
        }
    };




    var myAnimationRequest;

    // SHAPES PLACEHOLDER ARRAY
    var shapesArr = [];
    var activeShape = [];
    var finishedShapes = [];

    shapesArr.push(new leftGun(100,0));



    // shapesArr[0].update();


    function animate(){
        setTimeout(
            function(){
                myAnimationRequest = requestAnimationFrame(animate);
            },
        200);

        // LOOP FOR UPDATING POSITION
        for(var i = 0; i < shapesArr.length; i++){
            shapesArr[i].update();
        };
    };

    // animate();


}
