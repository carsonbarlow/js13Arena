
window.onload = function(e){
  if (typeof Game == 'undefined'){Game = {};}


  //utils
  Game.utils = {};
  Game.utils.add_default = function(_var, val){ if (typeof _var == 'undefined'){_var = val;}}

  // initial setup
  Game.utils.add_default(Game.config, {});
  Game.utils.add_default(Game.config.fps, 60);
  Game.utils.add_default(Game.config.canvas_id, 'game_canvas');

  // input
  Game.input = {};
  Game.input.keyboard = {};
  Game.input.keyboard.a = false;
  Game.input.keyboard.s = false;
  Game.input.keyboard.d = false;
  Game.input.keyboard.w = false;
  Game.input.keyboard.space = false;
  Game.input.mouse = {};
  Game.input.mouse.x = 0;
  Game.input.mouse.y = 0;
  Game.input.mouse.mouse_down = false;



  Game._time = (new Date).getTime();

  Game.graphics = {};
  Game.graphics.canvas = document.getElementById(Game.config.canvas_id);
  Game.graphics.context = Game.graphics.canvas.getContext('2d');

  Game.graphics.canvas.addEventListener('mousedown',function(event){
    console.log('mousedown');
  });
  Game.graphics.canvas.addEventListener('mouseup', function(event){
    console.log('mouseup');
  });
  Game.graphics.canvas.addEventListener('mousemove', function(event){
    console.log(event.screenX);
  });
  window.addEventListener('keydown',function(event){
    console.log(event.keyIdentifier);
  });
  window.addEventListener('keyup',function(event){
    // alert('key up!');
  });


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
    // initializing test rectangle
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