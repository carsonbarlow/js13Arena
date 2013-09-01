(function(){
  Game.projectiles = [];
  var active;
  Game.update_projectiles = function (delta){
    // console.log(Game.projectiles);
    Game.projectiles = Game.projectiles.filter(function(p){
      active = true;
      switch (p.type){
        case 'vector':
          p.transform.position.x += (p.vol[0]*p.speed*delta);
          p.transform.position.y += (p.vol[1]*p.speed*delta);
          p.range -= p.speed*delta;
        break;
      }

      for (var i = 0; i < Game.enemies.length; i++){
        if (Game.utils.collision(p,Game.enemies[i])){
          console.log('HIT!');
          active = false;
          break;
        }
      }
      if (p.range < 0){active = false;}
      return p.transform.visible = active;
    });
  };
})();