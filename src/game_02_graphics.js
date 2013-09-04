  Game.graphics = {};
  Game.graphics.canvas = document.getElementById(Game.config.canvas_id);
  Game.graphics.fps_counter = document.getElementById(Game.config.fps_counter_id);
  Game.graphics.context = Game.graphics.canvas.getContext('2d');
  Game.graphics.draw_list = [];
  Game.graphics.image = document.createElement('img');
  Game.graphics.image.src = 'images.png';

  var image_loaded = false; // <-- this will be refactored
  Game.graphics.draw = function(ctx){
    if (!image_loaded){if (Game.graphics.image.width){image_loaded = true;}}
    // Game.graphics.canvas.width = Game.graphics.canvas.width;
    ctx.clearRect(0, 0, Game.graphics.canvas.width, Game.graphics.canvas.height);
    var tX, tY, tR;
    Game.graphics.draw_list = Game.graphics.draw_list.filter(function(t){
      if (!t.visible){return false;}
      ctx.save();
      tX = t.position.x;
      tY = t.position.y;
      tR = t.rotation.z+(t.offset.r * -1.570796327);
      ctx.translate(tX,tY);
      ctx.rotate(tR);
      ctx.translate(-tX,-tY);
      ctx.drawImage(Game.graphics.image,t.offset.x,t.offset.y,t.width,t.height,t.position.x-(t.width/2),t.position.y-(t.height/2),t.width,t.height);  // <-- refactor
      ctx.restore();
      return true;
    });
    // ctx.moveTo(100,0);
    // ctx.lineTo(100,Game.graphics.canvas.height);
    // ctx.moveTo(0,100);
    // ctx.lineTo(Game.graphics.canvas.width, 100);
    // ctx.moveTo(500,0);
    // ctx.lineTo(500,Game.graphics.canvas.height);
    // ctx.stroke();


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


