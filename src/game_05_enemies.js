Game.enemies = [];

Game.enemy_stats = {
  lame_brain : {health: 6, speed: 70, attack: 'melee_1', damage: 1, movement: 'wonder', graphic: [220,44,32,40,0] }
}

Game.spawn_enemy = function(stats, x_pos, y_pos){
  var new_enemy = Game.utils.clone(stats);
  new_enemy.transform = {
    visible: true,
    position: {x: x_pos, y: y_pos, z: 1},
    rotation: {x: 0, y: 0, z: 0},
    scale: {x: 4, y: 4},
    offset: {x: new_enemy.graphic[0], y: new_enemy.graphic[1], r: new_enemy.graphic[4]},
    width: new_enemy.graphic[2],
    height: new_enemy.graphic[3]
  };
  new_enemy.vol = [0,0];
  new_enemy.col = 14;
  new_enemy.wonder = 0;
  new_enemy.standing = 500;
  new_enemy.chasing = false;
  new_enemy.attack_wind_up = 500;
  new_enemy.attack_wind_up_left = 500;
  Game.enemies.push(new_enemy);
  Game.graphics.draw_list.push(new_enemy.transform);
};

Game.spawn_enemy(Game.enemy_stats.lame_brain,500,100);

Game.update_enemies = function (delta){
  Game.enemies = Game.enemies.filter(function(mob){
    mob.chasing = (Game.utils.proximity(mob, Game.player) < 200);
    if (mob.chasing){
      if (Game.utils.proximity(mob,Game.player) < 20){
        mob.vol = [0, 0];
        mob.attack_wind_up_left -= delta * 1000;
        if (mob.attack_wind_up_left < 0){
          Game.utils.damage(Game.player,mob.damage);
          mob.attack_wind_up_left = mob.attack_wind_up;
        }
      } else {
        mob.vol = Game.utils.normalize(mob.transform.position.x, mob.transform.position.y, Game.player.transform.position.x, Game.player.transform.position.y);
      }
    }else if (mob.standing){
      mob.standing -= delta * 1000;
      if (mob.standing <= 0){
        mob.standing = 0;
        mob.vol = Game.utils.randomize_direction();
        mob.wonder = Math.random()*275+75;
      }
    }else if (mob.wonder){
      mob.wonder -= mob.speed * delta;
      if (mob.wonder <= 0){
        mob.wonder = 0;
        mob.vol = [0,0];
        mob.standing = Math.random()*250+500;
      }
    }
    mob.transform.position.x += (mob.vol[0]*mob.speed*delta);
    mob.transform.position.y += (mob.vol[1]*mob.speed*delta);
    return true;
  });
};

  