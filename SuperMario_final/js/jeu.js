/**
 * Created by He on 2017/3/16.
 */
var Game = {
    init: function (){
        var bgCanvas = document.getElementById("bgCanvas");
        var fgCanvas = document.getElementById("fgCanvas");
        var marioCanvas = document.getElementById("marioCanvas");

        var canvas = {
            bgCanvas: bgCanvas,     //����һ�������ڻ����ϻ�ͼ�Ļ���
            fgCanvas: fgCanvas,
            marioCanvas: marioCanvas,
            bgCtx: bgCanvas.getContext("2d"),       // 2d����
            fgCtx: fgCanvas.getContext("2d"),
            marioCtx: marioCanvas.getContext("2d"),
        };

        var BGMusic = new Audio("audio/superMario.mp3"); //��������
        BGMusic.loop = true;                  //ѭ�����ű�������

        var marioSheet = new Image();         //mario��ͼƬ
        marioSheet.src = "images/mariosheet.png";

        var mapSheet = new Image();
        mapSheet.src = "images/mapsheet.png";

        var bgsheet = new Image();
        bgsheet.src = "images/background.png";

        var environment = new Image();
        environment.src = "images/environment.jpg";

        mapSheet.addEventListener("load", function(){   //��mario��ͼƬ����ȫ����
            var mapSheet = this;

            var data = {
                animationFrame: 0,
                marioSheet: marioSheet,
                mapSheet: mapSheet,
                bgSheet: bgsheet,
                environment: environment,
                canvas: canvas,
                BGMusic: BGMusic,
                gameState: "running",
            };

            data.BGMusic.play();
            var xml = new XMLHttpRequest();
            xml.addEventListener("readystatechange", function(ev){
                if( xml.status == 200 && xml.readyState == 4 ){
                    //window.obj = JSON.parse(xml.responseText);

                    Input.init(data);
                    Body.init(data, JSON.parse(xml.responseText));
                    Render.init(data);
                    Game.run(data);
                }
            });
            xml.open("get", "js/package.json", true);
            xml.send();

        });
    },

    run: function (data){
        var loop = function (){
            Game.input(data);
            Game.update(data);
            Game.render(data);
            Game.detection(data);

            data.animationFrame ++;

            if( data.gameState == "running" ){
                window.requestAnimationFrame(loop);//ˢ����Ļʱ�����ô˷��� ie:16,7ms
            } else if( data.gameState == "fail" ){
                var failSound = new Audio("audio/die2.mp3");
                data.BGMusic.pause();
                failSound.play();
                alert("Game over, you are failed!");
                Game.init();

            } else if( data.gameState == "win"){
                var gameFinishedSound = new Audio("audio/gameFinished.mp3");
                data.BGMusic.pause();
                gameFinishedSound.play();
                alert("Congratulations!");
                //Game.init();
            }

        };

        loop();
    },

    input: function(data){
        Input.update(data);
    },

    update: function(data){
        Animation.update(data);
        Movement.update(data);
        Environment.update(data);
        Physics.update(data);
    },

    render: function(data){
        Render.update(data);
    },

    detection: function (data) {
        Detection.update(data);
    }

};

Game.init();

