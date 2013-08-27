window.onload = function(e){

  /****  CONTENTS ****

   * PLAYER_0001
   * GAME_LOOP_0002
   * GAME_DRAW_003



*/

  if (typeof Game == 'undefined'){Game = {};}

  //utils
  Game.utils = {};
  Game.utils.add_default = function(_var, val){ if (typeof _var == 'undefined'){_var = val;}}

  // initial setup
  Game.utils.add_default(Game.config, {});
  Game.utils.add_default(Game.config.fps, 60);
  Game.utils.add_default(Game.config.canvas_id, 'game_canvas');
  Game.utils.add_default(Game.config.fps_counter_id, 'fps_counter');

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
  Game.graphics.fps_counter = document.getElementById(Game.config.fps_counter_id);
  Game.graphics.context = Game.graphics.canvas.getContext('2d');
  Game.graphics.draw_list = [];
  Game.graphics.image = document.createElement('img');
  Game.graphics.image.src = 'images/player2.gif';

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

  // PLAYER_0001
  Game.player = {
    luck: 100,
    health: 10,
    health_regen: 1,
    speed: 200,
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
    },
    transform: {
      position: {x: 10, y: 10, z: 1},
      rotation: {x: 0, y: 0, z: 0 },
      scale: {x: 4, y: 4},
      offset: {x: 0, y: 0},
      width: 64,
      height: 64,
      image: 'player.gif'
    }
  }
  Game.graphics.draw_list.push(Game.player.transform);

  // GAME_LOOP_0002
  Game.run = (function() {
    var update_interval = 1000 / Game.config.fps;
    start_tick = next_tick = last_tick = (new Date).getTime();
    num_frames = 0;

    return function() {
      current_tick = (new Date).getTime();
      while ( current_tick > next_tick ) {
        delta = (current_tick - last_tick) / 1000;
        Game.update(delta);
        next_tick += update_interval;
        last_tick = (new Date).getTime();
      }

      Game.graphics.draw(Game.graphics.context);

      fps = (num_frames / (current_tick - start_tick)) * 1000;
      Game.graphics.fps_counter.textContent = Math.round(fps);
      num_frames++;
    }
  })();

  Game.update = function(delta){
    if (Game.input.keyboard.a){Game.player.transform.position.x -= (Game.player.speed * delta);}
    if (Game.input.keyboard.d){Game.player.transform.position.x += (Game.player.speed * delta);}
    if (Game.input.keyboard.w){Game.player.transform.position.y -= (Game.player.speed * delta);}
    if (Game.input.keyboard.s){Game.player.transform.position.y += (Game.player.speed * delta);}
  };

  // GAME_DRAW_003
  var image_loaded = false; // <-- this will be refactored
  Game.graphics.draw = function(ctx){
    if (!image_loaded){if (Game.graphics.image.width){image_loaded = true;}}
    // Game.graphics.canvas.width = Game.graphics.canvas.width;
    ctx.clearRect(0, 0, Game.graphics.canvas.width, Game.graphics.canvas.height);
    var tX, tY;
    Game.graphics.draw_list.map(function(t){
      ctx.save();
      tX = t.position.x + (t.width/2);
      tY = t.position.y + (t.height/2);
      ctx.translate(tX,tY);
      ctx.rotate(t.rotation.z);
      ctx.translate(-tX,-tY);
      ctx.drawImage(Game.graphics.image,t.offset.x,t.offset.y,t.width,t.height,t.position.x,t.position.y,t.width,t.height);  // <-- refactor
      ctx.restore();
    });
  };

  if( window.webkitRequestAnimationFrame) {
    window.each_frame = function(cb) {
      var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    window.each_frame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    window.each_frame = function(cb) {
      setInterval(cb, 1000 / Game.config.fps);
    }
  }
  window.each_frame(Game.run);
};
