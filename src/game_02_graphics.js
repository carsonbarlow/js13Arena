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
    ctx.moveTo(100,0);
    ctx.lineTo(100,Game.graphics.canvas.height);
    ctx.moveTo(0,100);
    ctx.lineTo(Game.graphics.canvas.width, 100);
    ctx.moveTo(500,0);
    ctx.lineTo(500,Game.graphics.canvas.height);
    ctx.stroke();
  };