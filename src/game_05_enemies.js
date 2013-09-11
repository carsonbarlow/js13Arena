(function(){

  Game.enemies = [];

  Game.update_enemies = function (delta){
    Game.enemies = Game.enemies.filter(function(mob){
      if(!mob.active){return false;}
      mob.chasing = (Game.utils.proximity(mob, Game.player) < 200);
      if (mob.chasing){
        if (Game.utils.proximity(mob,Game.player) < 35){
          mob.vol = [0, 0];
          Game.utils.count_down(mob,'attack_wind_up_left',delta);
          if (!mob.attack_wind_up_left){
            Game.utils.damage(Game.player,mob.damage);
            mob.attack_wind_up_left = mob.attack_wind_up;
          }
        } else {
          mob.vol = Game.utils.normalize(mob.transform.position.x, mob.transform.position.y, Game.player.transform.position.x, Game.player.transform.position.y);
        }
      }else if (mob.standing){
        Game.utils.count_down(mob,'standing',delta);
        if (!mob.standing){
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
      if (mob.transform.position.x < 40 + mob.col){mob.transform.position.x = 40 + mob.col; mob.vol[0] *= -1;}
      if (mob.transform.position.x > 1240 - mob.col){mob.transform.position.x = 1240 - mob.col; mob.vol[0] *= -1;}
      if (mob.transform.position.y < 40 + mob.col){mob.transform.position.y = 40 + mob.col; mob.vol[1] *= -1;}
      if (mob.transform.position.y > 920 - mob.col){mob.transform.position.y = 920 - mob.col; mob.vol[1] *= -1;}
      return true;
    });

    Game.enemy_functions = {}
    Game.enemy_functions.do_damage = function(amount){
      Game.utils.damage(this, amount);
      if (!this.hp){
        Game.enemy_functions.die.call(this);
      }
    }


    Game.enemy_functions.die = function(){
      Game.bm.enemy_count--;
      this.active = false;
      this.transform.visible = false;
    }

  };

})();