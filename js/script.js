function init(){
    var container = document.querySelector(".container");
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // BLOCK PARAMETERS FOR BUILDING SHAPES
    var block;
    var blockSize = 20;

    // CONTROL VARIABLES
    var direction;

    // POSITIONING VARIABLES
    var takenBelow;
    var takenLeft;
    var takenRight;

    // SETTING STARTING CANVAS SIZE
    canvas.width = blockSize*24;
    canvas.height = blockSize*20;

    function drawBlock(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, blockSize, blockSize);
        block = ctx.getImageData(0, 0, blockSize, blockSize);
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    drawBlock();

    // ADD CONTROLS
    document.addEventListener('keydown',function(event){
        if(event.key == 'ArrowRight'){
            console.log('right');
            direction = null;
            direction = 'right';
        }else if(event.key == 'ArrowLeft'){
            console.log('left');
            direction = null;
            direction = 'left';
        }else if(event.key == 'ArrowUp'){
            console.log('rotate');

        }else if(event.key == 'ArrowDown'){
            console.log('down');
        }else if(event.key == 0){
            clearTimeout(myAnimationInterval);
            cancelAnimationFrame(myAnimationRequest);
        }
    });



    function leftGun(x,y){

        let moveBottom = true;
        let moveLeft = true;
        let moveRight = true;
        direction = null;

        this.x = x;
        this.y = y;

        this.assemble = function(posX,posY){
            if(shapeType == 1){
                shape.push({x:posX, y:posY});
                shape.push({x:posX + blockSize, y:posY});
                shape.push({x:posX + blockSize * 2, y:posY});
                shape.push({x:posX + blockSize * 2, y:posY + blockSize});
            }else if(shapeType == 2){
                shape.push({x:posX, y:posY});
                shape.push({x:posX, y:posY + blockSize});
                shape.push({x:posX, y:posY + blockSize * 2});
                shape.push({x:posX - blockSize, y:posY + blockSize * 2});
            }else if(shapeType == 3){
                shape.push({x:posX, y:posY});
                shape.push({x:posX, y:posY + blockSize});
                shape.push({x:posX + blockSize, y:posY});
                shape.push({x:posX + blockSize * 2, y:posY});
            }else if(shapeType == 4){
                shape.push({x:posX, y:posY});
                shape.push({x:posX + blockSize, y:posY});
                shape.push({x:posX, y:posY  + blockSize});
                shape.push({x:posX, y:posY  + blockSize * 2});
            }
            this.draw();
        };

        this.draw = function (posX,posY){
            for(let i = 0; i < shape.length; i++){
                ctx.putImageData(block,shape[i].x,shape[i].y);
            };
        };

        this.update = function(){

            // CLEAN CANVAS BEFORE UPDATE
            void ctx.clearRect(0, 0, canvas.width, canvas.height);

            // CHECKING POSITION OF ACTIVE SHAPE
            // CANVAS BOTTOM
            for(let i = 0; i < shape.length; i++){
                if(shape[i].y >= canvas.height - blockSize){
                    moveBottom = false
                    break;
                }else{
                    moveBottom = true;
                };
            };

            // CHECK BOTTOM
            if(moveBottom && finishedShapes.length > 0){
                for(let i = 0; i < shape.length; i++){
                    for(let x = 0; x < finishedShapes.length; x++){
                        for(let j = 0; j < finishedShapes[x].length; j++){
                            if(shape[i].y + blockSize == finishedShapes[x][j].y && shape[i].x == finishedShapes[x][j].x){
                                moveBottom = false;
                                break;
                            };
                        };
                    };
                };
            };

            // CHECK LEFT
            if(moveBottom && finishedShapes.length > 0){
                for(let i = 0; i < shape.length; i++){
                    for(let x = 0; x < finishedShapes.length; x++){
                        for(let j = 0; j < finishedShapes[x].length; j++){
                            if(shape[i].x - blockSize == finishedShapes[x][j].x && shape[i].y == finishedShapes[x][j].y){
                                moveLeft = false;
                                break;
                            };
                        };
                    };
                };
            };

            // CHECK RIGHT
            if(moveBottom && finishedShapes.length > 0){
                for(let i = 0; i < shape.length; i++){
                    for(let x = 0; x < finishedShapes.length; x++){
                        for(let j = 0; j < finishedShapes[x].length; j++){
                            if(shape[i].x + blockSize == finishedShapes[x][j].x && shape[i].y == finishedShapes[x][j].y){
                                moveRight = false;
                                break;
                            };
                        };
                    };
                };
            };

            // REDRAW FINISHED SHAPES
            for(let i = 0; i < finishedShapes.length; i++){
                for(let j = 0; j < finishedShapes[i].length; j++){
                    ctx.putImageData(block,finishedShapes[i][j].x, finishedShapes[i][j].y);
                }
            }

            if(moveBottom){
                if(direction == 'left' && moveLeft){
                    this.x -= blockSize;
                }else if(direction == 'right' && moveRight){
                    this.x += blockSize;
                }

                this.y += blockSize;
            }else{
                clearTimeout(myAnimationInterval);
                cancelAnimationFrame(myAnimationRequest);
                finishedShapes.push(shape);
            }

            // RESETING MOVEMENT FOR NEXT UPDATE
            direction = null;
            moveLeft = true;
            moveRight = true;

            shape = [];
            this.assemble(this.x,this.y);
        };
    };

    function createNewShape(){
        activeShape = [];
        activeShape.push(new leftGun(blockSize*5,0));
        animate();
    };

    // TESTING START
    document.addEventListener('click',function(){
        activeShape = [];
        shapeType = Math.floor(Math.random()*4)+1;
        activeShape.push(new leftGun(blockSize*5,0));
        animate();
    });

    var myAnimationRequest;
    var myAnimationInterval;

    // SHAPES PLACEHOLDER ARRAY
    var shape = [];
    var shapeType = 1; /* FROM 1 TO 4 */
    var finishedShapes = [];

    // MAIN ANIMATION FUNCTION
    function animate(){
        myAnimationInterval = setTimeout(
            function(){
                myAnimationRequest = requestAnimationFrame(animate);
            },
        100);

        // LOOP FOR UPDATING POSITION
        for(var i = 0; i < activeShape.length; i++){
            activeShape[i].update();
        };
    };
};
