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

    // ANIMATION CONTROL VARIABLES
    var myAnimationRequest;
    var myAnimationInterval;

    // SHAPES PLACEHOLDER ARRAY
    var shape = [];
    var shapeType = 1; /* FROM 1 TO 7 */
    var shapeRotation = 1; /* FROM 1 TO 4 */

    var activeShape;
    var finishedShapes = [];

    // SETTING STARTING CANVAS SIZE
    var lineWidth = 12;

    canvas.width = blockSize*lineWidth;
    canvas.height = blockSize*15;

    function drawBlock(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, blockSize, blockSize);
        block = ctx.getImageData(0, 0, blockSize, blockSize);
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    drawBlock();

    // START AND RESET BUTTON SELECTORS
    var btnStart = document.querySelector('#btn-start');
        btnStart.addEventListener('click',function(){
        startGame('start');
    });

    // ADD CONTROLS
    document.addEventListener('keydown',function(event){
        if(event.key == 'ArrowRight'){
            direction = null;
            direction = 'right';
        }else if(event.key == 'ArrowLeft'){
            direction = null;
            direction = 'left';
        }else if(event.key == 'ArrowUp'){
            if(shapeRotation == 4){
                shapeRotation = 1;
            }else{
                shapeRotation++;
            }
        }else if(event.key == 'ArrowDown'){
            console.log('down');
        }else if(event.key == 0){
            clearTimeout(myAnimationInterval);
            cancelAnimationFrame(myAnimationRequest);
        }
    });

    function addShape(x,y,rotation){
        shape = [];

        let moveBottom = true;
        let moveLeft = true;
        let moveRight = true;

        direction = null;

        this.x = x;
        this.y = y;

        this.assemble = function(posX,posY){
            // LEFT GUN
            if(shapeType == 1 && shapeRotation == 1){
                shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX - blockSize * 2, y:posY});
            }
            else if(shapeType == 1 && shapeRotation == 2){
                shape.push({x:posX, y:posY});   shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX, y:posY - blockSize * 2});
            }
            else if(shapeType == 1 && shapeRotation == 3){
                shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX + blockSize * 2, y:posY});
            }
            else if(shapeType == 1 && shapeRotation == 4){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX, y:posY + blockSize * 2});
            }

            // RIGHT GUN
            else if(shapeType == 2 && shapeRotation == 1){
                shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX - blockSize * 2, y:posY});
            }
            else if(shapeType == 2 && shapeRotation == 2){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX, y:posY - blockSize * 2});
            }
            else if(shapeType == 2 && shapeRotation == 3){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX + blockSize * 2, y:posY});   shape.push({x:posX, y:posY + blockSize});
            }
            else if(shapeType == 2 && shapeRotation == 4){
                shape.push({x:posX, y:posY});   shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX, y:posY + blockSize * 2});
            }


            // RIGHT KINK
            else if(shapeType == 3 && shapeRotation == 1){
                shape.push({x:posX, y:posY});   shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX + blockSize, y:posY - blockSize});
            }
            else if(shapeType == 3 && shapeRotation == 2){
                shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX + blockSize, y:posY + blockSize});
            }
            else if(shapeType == 3 && shapeRotation == 3){
                shape.push({x:posX, y:posY});   shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX + blockSize, y:posY - blockSize});
            }
            else if(shapeType == 3 && shapeRotation == 4){
                shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX + blockSize, y:posY + blockSize});
            }

            // LEFT KINK
            else if(shapeType == 4 && shapeRotation == 1){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX - blockSize, y:posY - blockSize});
            }
            else if(shapeType == 4 && shapeRotation == 2){
                shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX + blockSize, y:posY - blockSize});
            }
            else if(shapeType == 4 && shapeRotation == 3){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX - blockSize, y:posY - blockSize});
            }
            else if(shapeType == 4 && shapeRotation == 4){
                shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX + blockSize, y:posY - blockSize});
            }

            // PYRAMID
            else if(shapeType == 5 && shapeRotation == 1){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX, y:posY - blockSize});
            }
            else if(shapeType == 5 && shapeRotation == 2){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX, y:posY + blockSize});
            }
            else if(shapeType == 5 && shapeRotation == 3){
                shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX - blockSize, y:posY});
            }
            else if(shapeType == 5 && shapeRotation == 4){
                shape.push({x:posX, y:posY});   shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX, y:posY - blockSize});
            }

            // BOX
            else if(shapeType == 6 && shapeRotation == 1){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX + blockSize, y:posY + blockSize});
            }
            else if(shapeType == 6 && shapeRotation == 2){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX + blockSize, y:posY + blockSize});
            }
            else if(shapeType == 6 && shapeRotation == 3){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX + blockSize, y:posY + blockSize});
            }
            else if(shapeType == 6 && shapeRotation == 4){
                shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX + blockSize, y:posY + blockSize});
            }

            // STICK
            else if(shapeType == 7 && shapeRotation == 1){
                shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX + blockSize * 2, y:posY});
            }
            else if(shapeType == 7 && shapeRotation == 2){
                shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX, y:posY + blockSize * 2});
            }
            else if(shapeType == 7 && shapeRotation == 3){
                shape.push({x:posX - blockSize, y:posY});   shape.push({x:posX, y:posY});   shape.push({x:posX + blockSize, y:posY});   shape.push({x:posX + blockSize * 2, y:posY});
            }
            else if(shapeType == 7 && shapeRotation == 4){
                shape.push({x:posX, y:posY - blockSize});   shape.push({x:posX, y:posY});   shape.push({x:posX, y:posY + blockSize});   shape.push({x:posX, y:posY + blockSize * 2});
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

            // CHECK CONTAINER LEFT
            if(moveBottom){
                for(let i = 0; i < shape.length; i++){
                    if(shape[i].x == 0){
                        moveLeft = false
                        break;
                    }else{
                        moveLeft = true;
                    };
                };
            }

            // CHECK CONTAINER RIGHT
            if(moveBottom){
                for(let i = 0; i < shape.length; i++){
                    if(shape[i].x == canvas.width - blockSize){
                        moveRight = false
                        break;
                    }else{
                        moveRight = true;
                    };
                };
            }

            // CHECK CONTAINER BOTTOM
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

            // MOVEMENT
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
                checkFinishedLine();
            }

            // RESETING MOVEMENT FOR NEXT UPDATE
            direction = null;
            moveLeft = true;
            moveRight = true;

            shape = [];
            this.assemble(this.x,this.y);

            // ADDING NEW SHAPE AFTER PLACING CURRENT
            if(!moveBottom){
                newShape();
            }
        };
    };

    // ADDING NEW SHAPE AFTER PLACING CURRENT
    function newShape(){
        shape = [];
        activeShape = [];
        shapeType = Math.floor(Math.random()*7)+1;
        shapeRotation = Math.floor(Math.random()*4)+1;
        activeShape.push(new addShape(blockSize*5,0));
        animate();
    }

    // START GAME
    function startGame(){

        // REMOVE START BUTTON AND TITLE
        btnStart.classList.add('d-none');
        document.getElementById('title').classList.add('d-none');

        activeShape = [];
        shapeType = Math.floor(Math.random()*7)+1;
        shapeRotation = Math.floor(Math.random()*4)+1;
        activeShape.push(new addShape(blockSize*5,0));
        animate();
    };

    // MAIN ANIMATION FUNCTION
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

    // CHECK FULL LINE
    function checkFinishedLine(){
        let taken = 0;
        for(let i = 0; i < finishedShapes.length; i++){
            for(let j = 0; j < finishedShapes[i].length; j++){
                if(finishedShapes[i][j].y == canvas.height - blockSize){
                    taken++;
                    if(taken == lineWidth){
                        console.log('full bottom line');
                        removeLine(finishedShapes[i][j].y);
                    }
                }
            }
        }
    }

    // REMOVE LINE
    function removeLine(deleteLineY){
        console.log(deleteLineY);
        console.log(finishedShapes);
        for(let i = 0; i < finishedShapes.length; i++){
            for(let j = 0; j < finishedShapes[i].length; j++){
                if(finishedShapes[i][j].y == deleteLineY){
                    finishedShapes[i].splice(j,1);
                }
            }
        }
    }

};
