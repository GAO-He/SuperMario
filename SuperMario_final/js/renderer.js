/**a
 * Created by He on 2017/3/16.
 */
var Render = {
    init: function(data){
        Render.helpers.drawBody(data.body.background, data.canvas.bgCtx);
    },

    update: function (data) {
        //���Ͻ����꣬���Rect��С
        data.canvas.bgCtx.clearRect(0, 0, data.canvas.bgCanvas.width, data.canvas.bgCanvas.height);

        Render.helpers.drawBody(data.body.background, data.canvas.bgCtx);
        //console.log(data.body.background.bgPos);
        //console.log(data.body.mario.x);

        data.canvas.marioCtx.clearRect(0, 0, data.canvas.marioCanvas.width, data.canvas.marioCanvas.height);

        data.canvas.fgCtx.clearRect( 0, 0, data.canvas.fgCanvas.width, data.canvas.fgCanvas.height);

        Render.helpers.drawBody(data.body.mario, data.canvas.marioCtx);

        Render.helpers.drawText(data.body.score, data.canvas.marioCtx);

        data.body.coinArray.forEach( function (coin) {
            Render.helpers.drawBody( coin, data.canvas.fgCtx );
        });

        data.body.boxArray.forEach( function (box) {
            Render.helpers.drawBody( box, data.canvas.fgCtx );
        });

        data.body.pipe1Array.forEach( function (pipe1) {
            Render.helpers.drawBody( pipe1, data.canvas.fgCtx );
        });

        data.body.pipe2Array.forEach( function (pipe2) {
            Render.helpers.drawBody( pipe2, data.canvas.fgCtx );
        });

    },

    helpers: {
        drawBody: function (body, ctx){     //context : bg, fg
            ctx.drawImage(body.sprite.img,
                    body.sprite.srcX, body.sprite.srcY,
                    body.sprite.srcW, body.sprite.srcH,
                    body.x, body.y,
                    body.w, body.h);
        },

        /*drawBody_fg: function(body, ctx){
            ctx.drawImage(body.sprite.img,
                    body.sprite.srcX, body.sprite.srcY,
                    body.sprite.srcW, body.sprite.srcH,
                    body.pos, body.y,
                    body.w,   body.h);
        },*/

        drawText: function( text, ctx){
            ctx.font = text.font;
            ctx.fillStyle = text.color;
            ctx.fillText( "COINS:" + " " + text.value, text.x, text.y );
        },
    }
};