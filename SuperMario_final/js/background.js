/**
 * Created by ¿ÉÐÀ on 2017/4/12.
 */
var Background = function(){
    this.bgPos = 0;
    this.fgPos = 0;
    this.bgSpeed = 5;
    this.bgImg = document.getElementById("bgCanvas");
};

Background.prototype.update = function(){
    this.bgPos -= this.bgSpeed;
};

Background.prototype.render = function(){

};