/**
 * Created by He on 2017/3/26.
 */
var Input = {
    init: function( data ){
        var self = this;

        $(window).on("keydown", function(event){        //��ʱ��keyDown��function
            self.helpers.down[event.keyCode] = true;    //ÿ��ĳ������������
        });

        $(window).on("keyup", function(){
           delete self.helpers.down[event.keyCode];
           delete self.helpers.pressed[event.keyCode];
        });
    },

    update: function (data) {
        var mario = data.body.mario;

        // left: A
        if( Input.helpers.isDown(65) ){
            if( mario.vit_y === 0 ){
                mario.currentState = mario.states.walk;
            } else {        // jumping left
                if( mario.x < data.canvas.bgCanvas.width/2-100 && mario.pos >= 0){
                    mario.pos -= mario.vit_x;
                    //console.log(mario.y);
                }else{
                    mario.x -= mario.vit_x;
                    //console.log(mario.y);
                }
            }

            mario.direction = "left";
        }
        // right: D
        if( Input.helpers.isDown(68) ){
            if( mario.vit_y === 0 ){
                mario.currentState = mario.states.walk;
                //console.log(mario.x + mario.pos);
            } else {
                if( mario.x > data.canvas.bgCanvas.width/2 && mario.pos <= 7900 ){
                    mario.pos += mario.vit_x;
                    //console.log(mario.y);
                }else{
                    mario.x += mario.vit_x;
                    //console.log(mario.y);
                }
            }

            mario.direction = "right";
        }
        // jump: K
        if( Input.helpers.isPressed(75) ){
            mario.currentState = mario.states.jump;
        }

        // reservation of the keys
        // top: W
        if( Input.helpers.isDown(87) ){
            return ;
        }
        // bottom: S
        if( Input.helpers.isDown(83) ){
            return ;
        }
    },

    helpers: {
        isDown: function(code) {                 //�˼��Ƿ񱻰���
            return Input.helpers.down[code];
        },

        isPressed: function(code) {              //�˼��Ƿ񱻰�
            if (Input.helpers.pressed[code]){
                return false;
            }else if(Input.helpers.down[code]){
                return Input.helpers.pressed[code] = true;
            }

            return false;
        },

        down: {

        },

        pressed:{

        }
    }
};
