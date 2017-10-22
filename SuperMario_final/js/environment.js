/**
 * Created by ¿ÉÐÀ on 2017/4/12.
 */
var Environment = {
    update: function( data ){
        Environment.background(data);
        Environment.wall(data);
    },

    background: function( data ){
        data.body.background.spriteAnimations.animation(data);
    },

    wall: function (data) {
        data.body.wallArray.forEach( function (wall) {
            wall.spriteAnimations.animation(data);
            //console.log("test");
        });
    },

};