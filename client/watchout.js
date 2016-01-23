// start slingin' some d3 here.
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var randX = function () {return Math.floor(Math.random()* gameOptions.width);};
var randY = function () {return Math.floor(Math.random()* gameOptions.height);};

var board = d3.select("div.board").append("svg")
  .attr("width", gameOptions.width)
  .attr("height", gameOptions.height)
  .style("background-color", 'black');   

var enemies = board.selectAll("enemy")
  .data(d3.range(gameOptions.nEnemies))
  .enter()
  .append("circle").attr("class", "enemy")
  .attr('cx', randX)
  .attr('cy', randY)
  .attr('r', 10)
  .attr("fill", 'white');


var moveEnemies = function () {
  enemies.transition().duration(1000).ease("cubic-in-out")
  .attr('cx', randX).attr('cy', randY)
  .each("end", moveEnemies)
  .transition(1000);
};

var player = board.append('circle')
  .attr('class', 'player')
  .attr('cx', gameOptions.width*0.5)
  .attr('cy',gameOptions.height*0.5)
  .attr('r',5)
  .style("fill", 'red');

moveEnemies(enemies);


