function init(){
    var container = document.querySelector(".container");
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var canvasSize = canvas.getBoundingClientRect();

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
    var activeShape; /* FOR TRACKING ACTIVE SHAPE */
    var finishedShapes = []; /* FOR STORING PLACED BLOCK POSITION */

    // FOR SCORE KEEPING
    var score = 0;
    var scoreMultiply = 1;

    // SETTING STARTING CANVAS SIZE
    var lineWidth = 12;

    canvas.width = blockSize*lineWidth;
    canvas.height = blockSize*20;

    // BLOCK DRAWING FUNCTION
    function drawBlock(){
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, blockSize, blockSize);

        ctx.strokeStyle = 'grey';
        ctx.strokeRect(0, 0, blockSize, blockSize);

        block = ctx.getImageData(0, 0, blockSize, blockSize);
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // DRAWING SINGLE BLOCK
    drawBlock();

    // START AND RESET BUTTON SELECTORS
    var btnStart = document.querySelector('#btn-start');
        btnStart.addEventListener('click',function(){
        startGame('start');
    });

    // FOR DISPLAYING SCORE
    var scoreDisplay = document.querySelector('#scoreDisplay');

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

    // START GAME
    function startGame(){

        // REMOVE START BUTTON AND TITLE
        btnStart.classList.add('d-none');
        document.getElementById('title').classList.add('d-none');

        activeShape = [];
        shapeType = Math.floor(Math.random()*7)+1;

        // TESTING
        // shapeType = 6;

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

    // SHAPE OBJECT
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
                    moveBottom = false;
                    break;
                }else{
                    moveBottom = true;
                };
            };

            // CHECK CONTAINER LEFT
            if(moveBottom){
                for(let i = 0; i < shape.length; i++){
                    if(shape[i].x == 0){
                        moveLeft = false;
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
                        moveRight = false;
                        break;
                    }else{
                        moveRight = true;
                    };
                };
            }

            // CHECK BOTTOM
            if(moveBottom && finishedShapes.length > 0){
                for(let i = 0; i < shape.length; i++){
                    for(let j = 0; j < finishedShapes.length; j++){
                        if(shape[i].y + blockSize == finishedShapes[j].y && shape[i].x == finishedShapes[j].x){
                            moveBottom = false;
                            break;
                        };
                    };
                };
            };

            // CHECK LEFT
            if(moveBottom && finishedShapes.length > 0){
                for(let i = 0; i < shape.length; i++){
                    for(let j = 0; j < finishedShapes.length; j++){
                        if(shape[i].x - blockSize == finishedShapes[j].x && shape[i].y == finishedShapes[j].y){
                            moveLeft = false;
                            break;
                        };
                    };
                };
            };

            // CHECK RIGHT
            if(moveBottom && finishedShapes.length > 0){
                for(let i = 0; i < shape.length; i++){
                    for(let j = 0; j < finishedShapes.length; j++){
                        if(shape[i].x + blockSize == finishedShapes[j].x && shape[i].y == finishedShapes[j].y){
                            moveRight = false;
                            break;
                        };
                    };
                };
            };

            // REDRAW FINISHED SHAPES
            for(let i = 0; i < finishedShapes.length; i++){
                ctx.putImageData(block,finishedShapes[i].x, finishedShapes[i].y);
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

                // ADD FILLED BLOCKS TO FINISHED SHAPES ARRAY
                for(let i = 0; i < shape.length; i++){
                    finishedShapes.push(shape[i]);
                }

                if(finishedShapes.length > 10){
                    checkFinishedLine();
                }
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

        // TESTING
        // shapeType = 6;

        shapeRotation = Math.floor(Math.random()*4)+1;
        activeShape.push(new addShape(blockSize*5,0));
        animate();
    }

    // CHECK FULL LINE
    function checkFinishedLine(){

        // SORT ELEMENTS FROM LOWEST TO HIGHEST BY Y
        var sorted = finishedShapes.sort(function sorter(a, b) {
            return b.y > a.y ? 1
            : b.y < a.y ? -1
            : 0;
        });

        let takenOnLine = 0; /* PLACEHOLDER FOR CHECKING AMOUNT OF FILLED BLOCKS ON A SINGLE LINE. IF EQUAL TO LINEWIDTH, THE REMOVE */

        // CHECK OBJECT AMOUNT ON ONE LINE
        for(let i = 0; i < finishedShapes.length-1; i++){
            if(finishedShapes[i].y == finishedShapes[i+1].y && i+1<=finishedShapes.length-1){
                takenOnLine++;
                if(takenOnLine == lineWidth-1){
                    console.log('FULL LINE AT ' + finishedShapes[i].y);

                    score = Math.floor((score + lineWidth * 10) * scoreMultiply);
                    scoreMultiply = scoreMultiply * 1.1;

                    takenOnLine = 0;
                    let removedLineY = finishedShapes[i].y;

                    // REMOVE FILLED LINE
                    finishedShapes.splice(i+2-lineWidth,lineWidth);

                    // MOVE ALL BLOCKS ABOVE THE REMOVED LINE DOWN
                    for(let j = 0; j < finishedShapes.length; j++){
                        if(finishedShapes[j].y < removedLineY){
                            finishedShapes[j].y = finishedShapes[j].y + blockSize;
                        };
                    }

                    // RERUN FUNCTION IF MORE THEN ONE LINE FILLED
                    checkFinishedLine();

                    scoreDisplay.innerHTML = score; /* ADD SCORE TO DISPLAY */
                }
            }else{
                console.log('NO FULL LINES');
                takenOnLine = 0;
                scoreMultiply = 1; /* RESETING MULTIPLY */
            }
        }
    }

};
