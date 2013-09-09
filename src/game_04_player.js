(function(){

  Game.player = {
    luck: 100,
    hp: 10,
    max_hp: 10,
    health_regen: 1,
    health_regen_time: 5000,
    speed: 200,
    col: 12,
    selected_attack: 'ranged',
    melee: {
      active: false,
      damage: 4,
      reach: 35,
      cooldown: 500,
      cooldown_left: 0,
      duration: 200,
      duration_left: 0
    },
    ranged: {
      damage: 3,
      speed: 750,
      cooldown: 500,
      cooldown_left: 0,
      ammo: 6,
      max_ammo: 6,
      reload_time: 5000,
      reload_time_left: 0
    },
    bomb: {
      active: false,
      damage: 10,
      col: 100,
      cooldown: 10000,
      cooldown_left: 0,
      duration: 200,
      duration_left: 0
    },
    transform: {
      visible: true,
      position: {x: 100, y: 100, z: 1},
      rotation: {x: 0, y: 0, z: 0.5},
      scale: {x: 4, y: 4},
      offset: {x: 0, y: 105, r: 1},
      width: 28,
      height: 21
    }
  }
  Game.graphics.draw_list[1].push(Game.player.transform);
  Game.player.die = function(){
    console.log(this.hp);
  }

  Game.update_player = function(P, delta){
    if (Game.input.keyboard.a){P.transform.position.x -= (P.speed * delta);}
    if (Game.input.keyboard.d){P.transform.position.x += (P.speed * delta);}
    if (Game.input.keyboard.w){P.transform.position.y -= (P.speed * delta);}
    if (Game.input.keyboard.s){P.transform.position.y += (P.speed * delta);}
    P.transform.rotation.z = Game.utils.point_to(P.transform.position.x-Game.graphics.camera.x , P.transform.position.y-Game.graphics.camera.y, Game.input.mouse.x, Game.input.mouse.y);
    if (P.transform.position.x < 40 + P.col){P.transform.position.x = 40 + P.col;}
    if (P.transform.position.x > 1240 - P.col){P.transform.position.x = 1240 - P.col;}
    if (P.transform.position.y < 40 + P.col){P.transform.position.y = 40 + P.col;}
    if (P.transform.position.y > 920 - P.col){P.transform.position.y = 920 - P.col;}
    //adjust the camera
    if (P.transform.position.x > 320 && P.transform.position.x < 960){ Game.graphics.camera.x = P.transform.position.x - 320;}
    if (P.transform.position.y > 240 && P.transform.position.y < 720){ Game.graphics.camera.y = P.transform.position.y - 240;}
    Game.utils.count_down(P.melee,'cooldown_left',delta);
    Game.utils.count_down(P.ranged,'cooldown_left',delta);
    Game.utils.count_down(P.bomb,'cooldown_left',delta);
    if (!P.ranged.reload_time_left){
      if (Game.input.mouse.right){ P.do_ranged(P);}  
    }else{
      P.ranged.reload_time_left -= delta * 1000;
      if (P.ranged.reload_time_left < 0){P.ranged.reload_time_left = 0;}
    }
    if (Game.input.mouse.left && !P.melee.cooldown_left){
      P.melee.cooldown_left = P.melee.cooldown;
      P.do_melee(P);
    }
    if (P.melee.active){P.update_melee(P, P.melee, delta);}
    if (Game.input.keyboard.space && !P.bomb.cooldown_left){
      P.bomb.cooldown_left = P.bomb.cooldown;
      P.do_bomb(P);
    }
    if (P.bomb.active){P.update_bomb(P.bomb, delta);}
    if (P.hp < P.max_hp){
      if ((P.health_regen_time -= delta * 1000) < 0){
        Game.utils.damage(P, -1);
        P.health_regen_time += 5000/P.health_regen;
      }
    }

    
  }


  Game.player.do_melee = function(P){
    P.melee.active = true;
    P.melee.transform.visible = true;
    P.melee.duration_left = P.melee.duration;
    Game.graphics.draw_list[2].push(Game.player.melee.transform);
  };

  var melee_offset_x, melee_offset_y;
  Game.player.update_melee = function(P, M, delta){
    Game.utils.count_down(M,'duration_left', delta);
    if (M.duration_left){
      // algin the rotation
      M.transform.rotation.z = P.transform.rotation.z;
      // align the position
      M.transform.position.x = melee_col_obj.transform.position.x = P.transform.position.x;
      M.transform.position.y = melee_col_obj.transform.position.y = P.transform.position.y;
      melee_offset_x = Math.cos(M.transform.rotation.z);
      melee_offset_y = Math.sin(M.transform.rotation.z);
      M.transform.position.x += melee_offset_x * M.transform.width;
      M.transform.position.y += melee_offset_y * M.transform.width;
      // check collision
      melee_col_obj.transform.position.x += melee_offset_x * M.reach;
      melee_col_obj.transform.position.y += melee_offset_y * M.reach;
      Game.enemies.map(function(E){
        if(Game.utils.collision(E,melee_col_obj)){Game.enemy_functions.do_damage.call(E,M.damage);}
      });      
    }else{
      M.active = false;
      M.transform.visible = false;
    }
  };

  Game.player.do_ranged = function(P){
    if (P.ranged.cooldown_left == 0){
        P.ranged.ammo--;
        Game.projectiles.push({
          source: P,
          power: P.ranged.damage,
          type: 'vector',
          speed: P.ranged.speed,
          vol: Game.utils.normalize(P.transform.position.x-Game.graphics.camera.x, P.transform.position.y-Game.graphics.camera.y, Game.input.mouse.x, Game.input.mouse.y),
          range: 250,
          transform: {
            visible: true,
            position: {x: P.transform.position.x, y: P.transform.position.y, z: 2},
            rotation: {x: 0, y: 0, z: 0.5},
            scale: {x: 4, y: 4},
            offset: {x: 14, y: 316, r: 1},
            width: 12,
            height: 13
          },
          col: 6
        });
        Game.graphics.draw_list[2].push(Game.projectiles[Game.projectiles.length-1].transform);
        if (P.ranged.ammo == 0){
          P.ranged.ammo = P.ranged.max_ammo;
          P.ranged.reload_time_left = P.ranged.reload_time;
        }
        P.ranged.cooldown_left = P.ranged.cooldown;
      }
  };

  Game.player.do_bomb = function(P){
    P.bomb.active = true;
    P.bomb.duration_left = P.bomb.duration;
    P.bomb.transform.position.x = P.transform.position.x;
    P.bomb.transform.position.y = P.transform.position.y;
  }
  Game.player.update_bomb = function(B, delta){
    Game.utils.count_down(B, 'duration_left', delta);
    if (!B.duration_left){
      B.active = false;
      Game.enemies.map(function(E){
        if(Game.utils.collision(E,B)){Game.enemy_functions.do_damage.call(E,B.damage);}
      });
    }
  };

  Game.player.melee.transform = {
    visible: true,
    position: {x: 100, y: 100, z: 2},
    rotation: {x: 0, y: 0, z: 0},
    scale: {x: 4, y: 4},
    offset: {x: 8, y: 364, r: 0},
    width: 24,
    height: 10
  };
  Game.player.bomb.transform = {
    visible: true,
    position: {x: 100, y: 100, z: 2},
    rotation: {x: 0, y: 0, z: 0},
    scale: {x: 4, y: 4},
    offset: {x: 8, y: 364, r: 0},
    width: 24,
    height: 10
  };
  var melee_col_obj = {
    col: 5,
    transform: {
      visible: true,
      position: {x: 100, y: 100, z: 2},
      rotation: {x: 0, y: 0, z: 0},
      scale: {x: 4, y: 4},
      offset: {x: 15, y: 278, r: 0},
      width: 8,
      height: 8
    }
  }

})();

