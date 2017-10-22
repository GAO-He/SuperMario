/**
 * Created by He on 2017/3/16.
 */
var Body = {
    init: function (data, obj) {

        var background = new Body.helpers.Environment(data.bgSheet, 0, 0, 768, 600);
        //var background = new Body.helpers.Environment(data.mapSheet, this.bgPos, 0, 768, 600);

        var mario = new Body.helpers.Mario(data.marioSheet, 100, 100, 50, 70);    //mario��λ�úʹ�С

        var score = new Body.helpers.Score(300, 40);

        //var pipe = new Body.helpers.Pipe(-624, 432, 144, 168);

        var wallLocations = [];
        for (var i = 0; i < obj.nbrWalls; i++) {
            wallLocations[i] = obj.wallLocations[i];
        }

        var boxLocations = [];
        for (var i = 0; i < obj.nbrBoxes; i++) {
            boxLocations[i] = obj.boxLocations[i];
        }

        var coinLocations = [];     //for example
        for (var i = 0; i < obj.nbrCoins; i++) {
            coinLocations[i] = obj.coinLocations[i];
        }

        var pipe1Locations = [];
        for (var i = 0; i < obj.nbrPipes1; i++) {
            pipe1Locations[i] = obj.pipe1Locations[i];
        }

        var pipe2Locations = [];
        for (var i = 0; i < obj.nbrPipes2; i++) {
            pipe2Locations[i] = obj.pipe2Locations[i];
        }

        //ca depend
        data.body = {};

        data.body.background = background;
        data.body.score = score;
        data.body.mario = mario;
        data.body.coinArray = [];
        data.body.boxArray = [];
        data.body.pipe1Array = [];
        data.body.pipe2Array = [];
        data.body.wallArray = [];

        wallLocations.forEach(function (location) {
            data.body.wallArray.push(new Body.helpers.Wall(location[0], location[1], location[2], location[3]));
        });

        coinLocations.forEach(function (location) {
            data.body.coinArray.push(new Body.helpers.Coin(data.mapSheet, location[0], location[1], 30, 42));
        });                                                 //(img, location_x, location_y, size_w, size_h

        boxLocations.forEach(function (location) {
            data.body.boxArray.push(new Body.helpers.Box(data.mapSheet, location[0], location[1], 30, 42));
        });

        pipe1Locations.forEach(function (location) {
            data.body.pipe1Array.push(new Body.helpers.Pipe1(data.mapSheet, location[0], location[1], 60, 126));
        });

        pipe2Locations.forEach(function (location) {
            data.body.pipe2Array.push(new Body.helpers.Pipe2(data.mapSheet, location[0], location[1], 60, 66));
        });

    },

    helpers: {
        Sprite: function (img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        },

        Mario: function (img, x, y, w, h) {
            var self = this;
            this.type = "mario";
            this.jumpSound = new Audio("audio/jump.mp3");
            this.pipeIn = new Audio("audio/pipeIn_2.mp3");
            this.dieSound_1 = new Audio("audio/die1.mp3");
            this.dieSound_2 = new Audio("audio/die2.mp3");

            //this.sprite = new Body.helpers.Sprite(img, 0, 0, 50, 60);    //����mario
            //this.sprite = Body.helpers.Mario.spriteAnimations.standRight.frames[0];
            this.direction = "right";
            this.vit_x = 1.8 * 2;       //Mario vitess
            this.vit_y = 0;
            //this.coins = 0;

            this.pos = 0;     //la position absolue

            this.spriteAnimations = {

                moveLeft: {
                    frames: [new Body.helpers.Sprite(img, 50, 60, 50, 60),
                        new Body.helpers.Sprite(img, 0, 60, 50, 60),],
                    currentFrame: 0,
                },

                moveRight: {
                    frames: [new Body.helpers.Sprite(img, 50, 0, 50, 60),
                        new Body.helpers.Sprite(img, 0, 0, 50, 60),],
                    currentFrame: 0,
                },

                standLeft: new Body.helpers.Sprite(img, 0, 60, 50, 60),

                standRight: new Body.helpers.Sprite(img, 0, 0, 50, 60),

                jumpRight: new Body.helpers.Sprite(img, 100, 0, 50, 60),

                jumpLeft: new Body.helpers.Sprite(img, 100, 60, 50, 60),
            };

            this.states = {
                jump: {
                    movement: function (data) {
                        if (self.vit_y === 0) {             // while on the ground
                            var jumpSound = self.jumpSound.cloneNode();     //��¡����ڵ�
                            jumpSound.play();
                            self.vit_y -= 15;
                            //console.log(self.y);
                        }
                    },

                    animation: function (data) {
                        if (self.direction === "right") {
                            self.sprite = self.spriteAnimations.jumpRight;
                        } else {
                            self.sprite = self.spriteAnimations.jumpLeft;
                        }
                    },
                },

                fall: {
                    movement: function (data) {
                        if (self.vit_y === 0) {             // while on the ground
                            self.vit_y = 0.5;
                            console.log("fall");
                        }
                    },

                    animation: function (data) {
                        if (self.direction === "right") {
                            self.sprite = self.spriteAnimations.jumpRight;
                        } else {
                            self.sprite = self.spriteAnimations.jumpLeft;
                        }
                    },
                },

                stand: {
                    movement: function (data) {
                        //console.log(self.y);
                        //console.log("stand");
                        return;
                    },

                    animation: function (data) {
                        if (self.direction === "right") {
                            self.sprite = self.spriteAnimations.standRight;
                        } else {
                            self.sprite = self.spriteAnimations.standLeft;
                        }
                    },
                },

                walk: {
                    movement: function (data) {
                        if (self.direction === "right") {         // rightSide
                            if (self.x > data.canvas.bgCanvas.width / 2 && self.pos <= 7900) {
                                self.pos += self.vit_x;
                                //console.log(self.x);
                                //document.title=self.pos+430;         //pour voir coordonnés de x actuel
                            } else {
                                self.x += self.vit_x;
                            }
                        } else {         // otherwise leftSide
                            if (self.x < data.canvas.bgCanvas.width / 2 - 100 && self.pos >= 0) {
                                self.pos -= self.vit_x;
                                //console.log(self.pos);
                            } else {
                                self.x -= self.vit_x;
                            }
                        }
                    },

                    animation: function (data) {
                        if (self.direction === "right") {
                            if (data.animationFrame % 5 === 0) {
                                self.sprite = self.spriteAnimations.moveRight.frames
                                    [self.spriteAnimations.moveRight.currentFrame];
                                self.spriteAnimations.moveRight.currentFrame++;

                                if (self.spriteAnimations.moveRight.currentFrame == 2) {
                                    self.spriteAnimations.moveRight.currentFrame = 0
                                }
                            }
                        } else {
                            if (data.animationFrame % 5 === 0) {
                                self.sprite = self.spriteAnimations.moveLeft.frames
                                    [self.spriteAnimations.moveLeft.currentFrame];
                                self.spriteAnimations.moveLeft.currentFrame++;

                                if (self.spriteAnimations.moveLeft.currentFrame == 2) {
                                    self.spriteAnimations.moveLeft.currentFrame = 0
                                }
                            }
                        }
                    },

                },
            };
            this.currentState = self.states.stand;

            this.gameDetection = {
                detection: function (data) {
                    if (self.y >= 600) {
                        var dieSound = self.dieSound_1;
                        dieSound.play();
                        data.gameState = "fail";
                    } else if (self.x + self.pos >= 8300) {
                        data.gameState = "win";
                    }
                },
            };

            this.x = x;         //la postion relatif
            this.y = y;
            this.w = w;
            this.h = h;
            this.positionFinal = this.x + this.pos;
        },

        Environment: function (img, x, y, w, h) {
            var self = this;
            this.type = "environment";
            this.img = img;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.bgPos = 0;
            this.fgPos = 0;
            this.speed = 1.8 * 2;           //���Ʊ��������ı仯�ٶ�
            //this.sprite = new Body.helpers.Sprite(img, 128, 0, 32, 80);
            this.sprite = new Body.helpers.Sprite(img, 0, 0, 300, 224);

            this.spriteAnimations = {
                animation: function (data) {
                    if (data.animationFrame % 1 === 0) {             //every 7.69ms * 13
                        self.bgPos = data.body.mario.pos * 3.9 / 10;
                        self.sprite = new Body.helpers.Sprite(img, self.bgPos, 0, 300, 224);
                        //console.log(self.bgPos);
                    }
                }
            };
        },

        Coin: function (img, x, y, w, h) {    //����Ӳ��
            var self = this;
            this.type = "coin";
            this.sound = new Audio("audio/coin.mp3");
            // position absolute
            this.pos = x;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            //Ӳ����mapSheet�еĽ�ͼ
            this.sprite = new Body.helpers.Sprite(img, 0, 32.5, 15, 18); //
            this.spriteAnimations = {
                spin: {
                    frames: [new Body.helpers.Sprite(img, 0, 32.5, 15, 18), new Body.helpers.Sprite(img, 15, 32.5, 15, 18),
                        new Body.helpers.Sprite(img, 30, 32.5, 15, 18), new Body.helpers.Sprite(img, 45, 32.5, 15, 18)],
                    currentFrame: 0,
                }
            };

            this.state = {
                spinning: {
                    animation: function (data) {
                        if (data.animationFrame % 1 === 0) {
                            self.x = self.pos - data.body.mario.pos;
                            //console.log(self.x);
                        }
                        if (data.animationFrame % 13 === 0) {             //every 16.67ms * 13
                            self.sprite = self.spriteAnimations.spin.frames[self.spriteAnimations.spin.currentFrame];
                            self.spriteAnimations.spin.currentFrame++;
                            if (self.spriteAnimations.spin.currentFrame == 4) {
                                self.spriteAnimations.spin.currentFrame = 0;
                            }
                        }
                    }
                }
            };

            this.currentState = self.state.spinning;

        },

        Box: function (img, x, y, w, h) {
            var self = this;
            this.type = "wall";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.pos = x;
            this.sprite = new Body.helpers.Sprite(img, 0, 16, 16, 16); //
            this.spriteAnimations = {
                spin: {
                    frames: [new Body.helpers.Sprite(img, 0, 16, 16, 16), new Body.helpers.Sprite(img, 16, 16, 16, 16),
                        new Body.helpers.Sprite(img, 32, 16, 16, 16), new Body.helpers.Sprite(img, 48, 16, 16, 16)],
                    currentFrame: 0,
                }
            };

            this.state = {
                spinning: {
                    animation: function (data) {
                        if (data.animationFrame % 1 === 0) {
                            self.x = self.pos - data.body.mario.pos;
                            //console.log(self.pos);
                        }
                        if (data.animationFrame % 50 === 0) {             //every 7.69ms * 13
                            self.sprite = self.spriteAnimations.spin.frames[self.spriteAnimations.spin.currentFrame];
                            self.spriteAnimations.spin.currentFrame++;
                            if (self.spriteAnimations.spin.currentFrame == 4) {
                                self.spriteAnimations.spin.currentFrame = 0;
                            }
                        }
                    }
                }
            };

            this.currentState = self.state.spinning;
        },

        Score: function (x, y) {
            this.value = 0;
            this.x = x;
            this.y = y;
            this.font = "25px PixelEmulator";
            this.color = "white";
        },

        Wall: function (x, y, w, h) {
            var self = this;
            this.type = "wall";
            this.pos = x;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.spriteAnimations = {
                animation: function (data) {
                    if (data.animationFrame % 1 === 0) {             //every 7.69ms * 13
                        //self.Pos = data.body.mario.pos*3.9/10;
                        self.x = self.pos - data.body.mario.pos;
                        //console.log(self.x);
                    }
                }
            };
        },

        Pipe1: function (img, x, y, w, h) {
            var self = this;
            this.type = "wall";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.pos = x;
            this.sprite = new Body.helpers.Sprite(img, 160, 1, 30, 62);
            this.spriteAnimations = {
                spin: {
                    frames: [new Body.helpers.Sprite(img, 160, 1, 30, 62)],
                    currentFrame: 0,
                }
            };

            this.state = {
                spinning: {
                    animation: function (data) {
                        if (data.animationFrame % 1 === 0) {
                            self.x = self.pos - data.body.mario.pos;
                            //console.log(self.x);
                        }
                    }
                }
            };
            this.currentState = self.state.spinning;
        },

        Pipe2: function (img, x, y, w, h) {
            var self = this;
            this.type = "wall";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.pos = x;
            this.sprite = new Body.helpers.Sprite(img, 160, 1, 30, 31);
            this.spriteAnimations = {
                spin: {
                    frames: [new Body.helpers.Sprite(img, 160, 1, 30, 31)],
                    currentFrame: 0,
                }
            };

            this.state = {
                spinning: {
                    animation: function (data) {
                        if (data.animationFrame % 1 === 0) {
                            self.x = self.pos - data.body.mario.pos;
                            //console.log(self.x);
                        }
                    }
                }
            };
            this.currentState = self.state.spinning;
        },
    }

};