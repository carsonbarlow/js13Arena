
window.onload = function(e){
  var canvas = document.getElementById('game_canvas');
  console.log(canvas.width);
  var ctx = canvas.getContext('2d');
  ctx.fillRect(50, 25, 150, 100);
  // canvas.width = canvas.width;
};