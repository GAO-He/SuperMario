/**
 * Created by He on 2017/4/11.
 */
var Physics = {

    update: function ( data ) {
        Physics.helpers.gravity( data.body.mario );
        Physics.helpers.collisionDetection( data );
    },

    helpers: {
        gravity: function (body) {
            var g = 0.6;            //the acceleration of gravity is 0.6, very important!!
            body.vit_y += g;
            body.y += body.vit_y;
        },

        collisionDetection: function (data) {

            var mario = data.body.mario;

            var bodyCollistionDetection = function (body) {

                if (mario.x < body.x + body.w &&           //judge whether there is collision   //body - mario
                    mario.x + mario.w > body.x &&          //between mario and entity           //mario - body
                    mario.y < body.y + body.h &&                                                // body | mario
                    mario.y + mario.h > body.y                                                  // mario | body
                ) {

                    Physics.helpers.handleLeColision(data, body);

                }
            };

            data.body.coinArray.forEach(function (coin){
                bodyCollistionDetection(coin);
            });


            data.body.wallArray.forEach(function (wall) {
                bodyCollistionDetection(wall);
            });

            data.body.boxArray.forEach(function (box) {
                bodyCollistionDetection(box);
            });

            data.body.pipe1Array.forEach(function (pipe1) {
                bodyCollistionDetection(pipe1);
            });

            data.body.pipe2Array.forEach(function (pipe2) {
                bodyCollistionDetection(pipe2);
            });
        },


        handleLeColision: function (data, body) {        //how to deal with the collision
            var mario = data.body.mario;

            if(body.type === "coin"){
                var coinsArray = data.body.coinArray;
                var coinSound = body.sound.cloneNode();
                var index = coinsArray.indexOf(body);

                data.body.score.value ++;

                coinSound.play();
                coinsArray.splice(index, 1);            //delete the coins pointed
            }

            if (body.type === "wall") {
                // leftSide
                if (mario.x <= body.x && mario.y >= body.y - 30) {
                    mario.x = body.x - mario.w;
                } else

                // rightSide
                if (mario.x >= body.x && mario.y > body.y - 30) {
                    mario.x = body.x + body.w;
                } else

                // topSide
                if (mario.y <= body.y && (mario.x + mario.w) >= body.x + 10 &&
                    mario.x <= (body.x + body.w) - 10 && mario.vit_y > 0) {
                    mario.currentState = mario.states.stand;        //important!
                    mario.y = body.y - mario.h;
                    mario.vit_y = 0;
                } else

                //bottomSide
                if (mario.y - 50 >= body.y + body.h && (mario.x + mario.w) >= body.x + 10 &&
                    mario.x <= (body.x + body.w) - 10 && mario.vit_y < 0) {
                    mario.currentState = mario.states.fall;
                    mario.y = body.y + body.h;
                    mario.vit_y = 0.1;
                    console.log("falling");
                }
            }

            if(body.type === "pipeIn") {
                //left side pipe
                if(mario.x >= body.x - 10 && mario.x < body.x && mario.y >= body.y){
                    mario.x += 200;
                    mario.pipeIn.play();
                }
                //right side Pipe collision
                if (mario.x > body.x && mario.y >= body.y) {
                    mario.x = body.x + body.w;
                }
                // topSide
                if (mario.y <= body.y && (mario.x + mario.w) >= body.x + 10 &&
                    mario.x <= (body.x + body.w) - 10 && mario.vit_y >= 0) {
                    mario.currentState = mario.states.stand;
                    mario.y = body.y - mario.h;
                    mario.vit_y = 0;
                }
            }
        },
    },

};










