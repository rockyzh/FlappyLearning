/**
 * Created by rocky on 11/06/2017.
 */


var HumanBird = function(json) {
    Bird.bind(this)(json);
}

for (var name in Bird.prototype) {
    if (Bird.prototype.hasOwnProperty(name)) {
        HumanBird.prototype[name] = Bird.prototype[name];
    }
}

var HumanGame = function(canvas) {
    Game.bind(this)(canvas);

    canvas.onmousedown = canvas.ontouchstart = function(e) {
        this.mouseDown = true;
        e.stopPropagation();
        e.preventDefault();
    }.bind(this);
    canvas.onmouseup = canvas.ontouchend = function(e) {
        this.mouseDown = false;
        e.stopPropagation();
        e.preventDefault();
    }.bind(this);
}

for (var name in Game.prototype) {
    if (Game.prototype.hasOwnProperty(name)) {
        HumanGame.prototype[name] = Game.prototype[name];
    }
}

HumanGame.prototype.start = function() {
    Game.prototype.start.bind(this)();

    var b = new HumanBird();
    this.birds.push(b)
    this.generation++;
}

HumanGame.prototype.updateBird = function(index, nextHoll) {
    Game.prototype.updateBird.bind(this)();

    var inputs = [
        this.birds[index].y / this.height,
        nextHoll
    ];

    if(this.mouseDown){
        this.birds[index].flap();
    }
}
