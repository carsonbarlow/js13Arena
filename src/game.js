
window.onload = function(e){
  var canvas = document.getElementById('game_canvas');
  var ctx = canvas.getContext('2d');
  var game_loop = setInterval(function(){
  while ((new Date).getTime() > game_time){
    game_time += 17;
    game_update();
  }
    
    game_draw();
  },17);

  var game_time = (new Date).getTime();
  var tgo = {};
  var game_update = function(){
    // initializing...
    if (typeof tgo.test_rect == 'undefined'){
      tgo.test_rect = {};
      tgo.test_rect.x = 0;
      tgo.test_rect.max_x = 200;
      tgo.test_rect.y = 50;
      tgo.test_rect.goLeft = false;
    }

    if (tgo.test_rect.goLeft){
      tgo.test_rect.x -= 1;
      if (tgo.test_rect.x <= 0){
        tgo.test_rect.goLeft = false;
      }
    }else{
      tgo.test_rect.x += 1;
      if (tgo.test_rect.x >= tgo.test_rect.max_x){
        tgo.test_rect.goLeft = true;
      }
    }
  };

  var game_draw = function(){
    canvas.width = canvas.width;
    ctx.fillRect(tgo.test_rect.x, tgo.test_rect.y, 50, 50);
  };
};