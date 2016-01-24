//set up board
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 60,
};

var score = 0;
var highScore = score; 

var randX = function () {return Math.floor(Math.random()* gameOptions.width);};
var randY = function () {return Math.floor(Math.random()* gameOptions.height);};

var board = d3.select("div.board").append("svg")
  .attr("width", gameOptions.width)
  .attr("height", gameOptions.height)
  .style('display','block')
  .style('margin', 'auto');

board.append("filter")
  .attr({id: "rock", x:"0%", y:"0%", width:"100%", height:"100%"})
  .append("feImage").attr("xlink:href","asteroid.png");

board.append("filter")
  .attr({id: "player", x:"0%", y:"0%", width:"100%", height:"100%"})
  .append("feImage").attr("xlink:href","ufo.png");

var scoreIncrementer = function(){
  score++;
  highScore = highScore > score ? highScore : score; 
  
  var span = document.getElementById('highscore-number');
  var txt = document.createTextNode(highScore.toString());
  span.innerText = txt.textContent;

  var span2 = document.getElementById('score-number');
  var txt2 = document.createTextNode(score.toString());
  span2.innerText = txt2.textContent; 
};
setInterval(scoreIncrementer, 100);

//Set up player
var player = board.append('circle')
  .attr('class', 'player')
  .attr('cx', gameOptions.width*0.5)
  .attr('cy',gameOptions.height*0.5)
  .attr('r',10)
  .style("fill", 'red')
  .attr({filter : 'url(#player)'});

board.on("mousemove", function(){
  var mouse = d3.mouse(this);
  player.attr('cx', mouse[0]).attr('cy', mouse[1]);
});

//Set up enemies
var enemies = board.selectAll("enemy")
  .data(d3.range(gameOptions.nEnemies))
  .enter()
  .append("circle").attr("class", "enemy")
  .attr('cx', randX)
  .attr('cy', randY)
  .attr('r', 10)
  .attr({filter : 'url(#rock)'});

var moveEnemies = function () {
  enemies.transition().duration(1300).ease("cubic-in-out")
  .attr('cx', randX).attr('cy', randY)
  .each("end", moveEnemies)
  .transition(1000);
};
moveEnemies(enemies);

//set up collision check
var checkCollision = function(){ 
  var check = false;
  enemies.each(function(){
    var radiusSum = parseFloat(d3.select(this).attr('r')) + 10;

    var xDiff = d3.select(this).attr('cx') - player.attr('cx');
    var yDiff = d3.select(this).attr('cy') - player.attr('cy');

    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    
    if (separation < radiusSum) {
      score = 0;
    }

  });

}; 
d3.timer(checkCollision);

