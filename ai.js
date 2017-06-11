/**
 * Created by rocky on 11/06/2017.
 */

var AIBird = function(json) {
    Bird.bind(this)(json);
}

for (var name in Bird.prototype) {
    if (Bird.prototype.hasOwnProperty(name)) {
        AIBird.prototype[name] = Bird.prototype[name];
    }
}

var Neuvol;
var AIGame = function(canvas) {
    Game.bind(this)(canvas);

    Neuvol = new Neuroevolution({
        population:50,
        network:[2, [2], 1],
    });

    this.gen = [];
}

for (var name in Game.prototype) {
    if (Game.prototype.hasOwnProperty(name)) {
        AIGame.prototype[name] = Game.prototype[name];
    }
}

AIGame.prototype.start = function() {
    Game.prototype.start.bind(this)();

    this.gen = Neuvol.nextGeneration();
    for(var i in this.gen){
        var b = new AIBird();
        this.birds.push(b)
    }
    this.generation++;
    this.alives = this.birds.length;
}

AIGame.prototype.updateBird = function(index, nextHoll) {
    Game.prototype.updateBird.bind(this)();

    var inputs = [
        this.birds[index].y / this.height,
        nextHoll
    ];

    var res = this.gen[index].compute(inputs);
    if(res > 0.5){
        this.birds[index].flap();
    }
}

AIGame.prototype.birdDead = function(index) {
    Neuvol.networkScore(this.gen[index], this.score);
}


AIGame.prototype.display = function(){
    Game.prototype.display.bind(this)();

    this.ctx.fillText("Alive : "+this.alives+" / "+Neuvol.options.population, 10, 100);
}