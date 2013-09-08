  Game.graphics = {};
  Game.graphics.canvas = document.getElementById(Game.config.canvas_id);
  Game.graphics.fps_counter = document.getElementById(Game.config.fps_counter_id);
  Game.graphics.context = Game.graphics.canvas.getContext('2d');
  Game.graphics.draw_list = [];
  Game.graphics.image = document.createElement('img');
  Game.graphics.image.src = 'sprites.png';
  Game.graphics.camera = {x:0,y:0};
  // Game.graphics.bg_canvas = document.createElement('canvas');
  // Game.graphics.bg_canvas.width = Game.graphics.canvas.width;

  var image_loaded = false; // <-- this will be refactored
  Game.graphics.draw = function(ctx){
    if (!image_loaded){if (Game.graphics.image.width){image_loaded = true;}}
    // Game.graphics.canvas.width = Game.graphics.canvas.width;
    ctx.clearRect(0, 0, Game.graphics.canvas.width, Game.graphics.canvas.height);

    //BACKGROUND
    for (var by = 0; by < 24; by++){
      for (var bx = 0; bx < 32; bx++){
        if (by == 0 || by == 23 || bx == 0 || bx == 31){
          ctx.drawImage(Game.graphics.image,4,389,56,56,bx*40-Game.graphics.camera.x,by*40-Game.graphics.camera.y,40,40);
        }else{
          ctx.drawImage(Game.graphics.image,4,244,25,25,bx*40-Game.graphics.camera.x,by*40-Game.graphics.camera.y,40,40);
        }
      }
    }
    var tX, tY, tR;
    Game.graphics.draw_list = Game.graphics.draw_list.filter(function(t){
      if (!t.visible){return false;}
      ctx.save();
      tX = t.position.x-Game.graphics.camera.x;
      tY = t.position.y-Game.graphics.camera.y;
      tR = t.rotation.z+(t.offset.r * -1.570796327);
      ctx.translate(tX,tY);
      ctx.rotate(tR);
      ctx.translate(-tX,-tY);
      ctx.drawImage(Game.graphics.image,t.offset.x,t.offset.y,t.width,t.height,(t.position.x-(t.width/2))-Game.graphics.camera.x,(t.position.y-(t.height/2))-Game.graphics.camera.y,t.width,t.height);
      ctx.restore();
      return true;
    });

    //UI
    //HP:
    ctx.save();
    ctx.strokeStyle = '#555555 4px solid';
    ctx.font = "bold 20px sans-serif";

    ctx.fillStyle = '#F2392C';
    ctx.fillRect(50,10,Game.player.hp/Game.player.max_hp*200,20);
    ctx.strokeRect(50,10,200,20);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText("HEALTH:   "+Game.player.hp, 85, 27);

    //AMMO:
    ctx.fillStyle = '#968E59'
    if (Game.player.ranged.reload_time_left){
      ctx.fillRect(300,10,200 - Game.player.ranged.reload_time_left/Game.player.ranged.reload_time*200,20);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillText("RELOADING...", 335, 27);
    }else{
      ctx.fillRect(300,10,Game.player.ranged.ammo/Game.player.ranged.max_ammo*200,20);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillText("AMMO:   "+Game.player.ranged.ammo, 335, 27);
    }
    ctx.strokeRect(300,10,200,20);

    ctx.restore();

  };


