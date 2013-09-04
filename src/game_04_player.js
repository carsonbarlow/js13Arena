Game.player = {
  luck: 100,
  hp: 10,
  max_hp: 10,
  health_regen: 1,
  speed: 200,
  selected_attack: 'ranged',
  melee: {
    damage: 4,
    reach: 10,
    cooldown: 500,
    cooldown_left: 0
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
    damage: 10,
    range: 25,
    cooldown: 10000,
    cooldown_left: 0
  },
  transform: {
    visible: true,
    position: {x: 100, y: 100, z: 1},
    rotation: {x: 0, y: 0, z: 0.5},
    scale: {x: 4, y: 4},
    offset: {x: 0, y: 0, r: 1},
    width: 40,
    height: 36
  }
}
Game.graphics.draw_list.push(Game.player.transform);
Game.player.die = function(){
  console.log(this.hp);
}

Game.update_player = function(P, delta){
  if (Game.input.keyboard.a){P.transform.position.x -= (P.speed * delta);}
  if (Game.input.keyboard.d){P.transform.position.x += (P.speed * delta);}
  if (Game.input.keyboard.w){P.transform.position.y -= (P.speed * delta);}
  if (Game.input.keyboard.s){P.transform.position.y += (P.speed * delta);}
  P.transform.rotation.z = Game.utils.point_to(P.transform.position.x, P.transform.position.y, Game.input.mouse.x, Game.input.mouse.y);
  Game.utils.cool_off(P.melee,delta);
  Game.utils.cool_off(P.ranged,delta);
  Game.utils.cool_off(P.bomb,delta);
  if (P.ranged.reload_time_left == 0){
    if (Game.input.mouse.mouse_down){
      P.do_ranged(P);
    }  
  }else{
    P.ranged.reload_time_left -= delta * 1000;
    if (P.ranged.reload_time_left < 0){P.ranged.reload_time_left = 0;}
  }
  
}


Game.player.do_ranged = function(P){
  if (P.ranged.cooldown_left == 0){
      P.ranged.ammo--;
      Game.projectiles.push({
        source: P,
        power: P.ranged.damage,
        type: 'vector',
        speed: P.ranged.speed,
        vol: Game.utils.normalize(P.transform.position.x, P.transform.position.y, Game.input.mouse.x, Game.input.mouse.y),
        range: 250,
        transform: {
          visible: true,
          position: {x: P.transform.position.x, y: P.transform.position.y, z: P.transform.position.z},
          rotation: {x: 0, y: 0, z: 0.5},
          scale: {x: 4, y: 4},
          offset: {x: 4, y: 4, r: 1},
          width: 12,
          height: 12
        },
        col: 6
      });
      Game.graphics.draw_list.push(Game.projectiles[Game.projectiles.length-1].transform);
      if (P.ranged.ammo == 0){
        P.ranged.ammo = P.ranged.max_ammo;
        P.ranged.reload_time_left = P.ranged.reload_time;
      }
      P.ranged.cooldown_left = P.ranged.cooldown;
    }
};



