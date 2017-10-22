/**
 * Created by He on 2017/4/14.
 */
var Detection = {
    update: function (data){
        Detection.mario( data );
    },

    mario: function (data){
        data.body.mario.gameDetection.detection(data);
    },
};