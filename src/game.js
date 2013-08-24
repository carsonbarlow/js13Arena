
window.onload = function(e){
  if (typeof Game == 'undefined'){Game = {};}


  //utils
  Game.utils = {};
  Game.utils.add_default = function(_var, val){ if (typeof _var == 'undefined'){_var = val;}}

  // initial setup
  Game.utils.add_default(Game.config, {});
  Game.utils.add_default(Game.config.fps, 60);
  Game.utils.add_default(Game.config.canvas_id, 'game_canvas');

  Game._time = (new Date).getTime();

  Game.graphics = {};
  Game.graphics.canvas = document.getElementById(Game.config.canvas_id);
  Game.graphics.context = Game.graphics.canvas.getContext('2d');

  // GAME LOOP
  Game.game_loop = setInterval(function(){
    while ((new Date).getTime() > Game._time){
      Game._time += Game.config.fps;
      Game.update();
    } 
    Game.graphics.draw(Game.graphics.context);
  }, 1000/Game.config.fps);
  
  var tgo = {};
  Game.update = function(){
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

  Game.graphics.draw = function(ctx){
    Game.graphics.canvas.width = Game.graphics.canvas.width;
    ctx.fillRect(tgo.test_rect.x, tgo.test_rect.y, 50, 50);
  };
};