/**
 * Created by He on 2017/4/6.
 */
var Animation = {
    update: function( data ) {
        Animation.coins( data );
        Animation.box(data);
        Animation.mario( data );
        Animation.pipe1( data );
        Animation.pipe2( data );
    },

    coins: function( data ){
        data.body.coinArray.forEach( function( coin ){
           coin.currentState.animation(data);
        });
    },

    mario: function( data ){
        data.body.mario.currentState.animation(data);
    },

    box: function  ( data ){
        data.body.boxArray.forEach( function (box) {
            box.currentState.animation(data);
        });
    },

    pipe1: function  ( data ) {
        data.body.pipe1Array.forEach(function (pipe1) {
            pipe1.currentState.animation(data);
        });
    },

    pipe2: function  ( data ) {
        data.body.pipe2Array.forEach(function (pipe2) {
            pipe2.currentState.animation(data);
        });
    },
};