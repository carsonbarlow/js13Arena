
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
  Game.input.keyboard.id_to_key = {'U+0041':'a', 'U+0053':'s', 'U+0044':'d', 'U+0057':'w', 'U+0020':'space'};

  // graphics
  Game._time = (new Date).getTime();
  Game.graphics = {};
  Game.graphics.canvas = document.getElementById(Game.config.canvas_id);
  Game.graphics.context = Game.graphics.canvas.getContext('2d');

  // input events
  window.addEventListener('mousedown',function(event){
    Game.input.mouse.mouse_down = true;
  });
  window.addEventListener('mouseup', function(event){
    Game.input.mouse.mouse_down = false;
  });
  Game.graphics.canvas.addEventListener('mousemove', function(event){
    Game.input.mouse.x = event.x - Game.graphics.canvas.offsetLeft;
    Game.input.mouse.y = event.y - Game.graphics.canvas.offsetTop;
  });
  window.addEventListener('keydown',function(event){
    // console.log(event.keyIdentifier);
    Game.input.keyboard[Game.input.keyboard.id_to_key[event.keyIdentifier]] = true;
  });
  window.addEventListener('keyup',function(event){
    Game.input.keyboard[Game.input.keyboard.id_to_key[event.keyIdentifier]] = false;
  });

  // player
  Game.player = {
    luck: 100,
    health: 10,
    health_regen: 1,
    speed: 50,
    melee: {
      damage: 4,
      reach: 10,
      cooldown: 500,
      cooldown_left: 0
    },
    ranged: {
      damage: 3,
      fire_rate: 400,
      ammo: 8,
      max_ammo: 8,
      reload_time: 5000,
      reload_time_left: 0
    },
    bomb: {
      damage: 10,
      range: 25,
      cooldown: 10000,
      cooldown_left: 0
    }
  }

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
    if (Game.input.keyboard.a){console.log(Game.player.health);}
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