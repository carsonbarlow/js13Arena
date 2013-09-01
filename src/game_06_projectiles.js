Game.projectiles = [];
Game.update_projectiles = function (delta){
  Game.projectiles = Game.projectiles.filter(function(p){
    switch (p.type){
      case 'vector':
        p.transform.position.x += (p.vol[0]*p.speed*delta);
        p.transform.position.y += (p.vol[1]*p.speed*delta);
        p.range -= p.speed*delta;
        return p.transform.visible = (p.range > 0);
      break;
    }
  });
};