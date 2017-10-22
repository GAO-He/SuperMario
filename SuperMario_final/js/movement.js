/**
 * Created by ¿ÉÐÀ on 2017/4/11.
 */
var Movement = {
    update: function( data ){
        Movement.mario( data );
    },

    mario: function( data ){
        data.body.mario.currentState.movement(data);
    }
};