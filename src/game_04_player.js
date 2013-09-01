Game.player = {
  luck: 100,
  health: 10,
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

Game.update_player = function(P, delta){
  if (Game.input.keyboard.a){P.transform.position.x -= (P.speed * delta);}
  if (Game.input.keyboard.d){P.transform.position.x += (P.speed * delta);}
  if (Game.input.keyboard.w){P.transform.position.y -= (P.speed * delta);}
  if (Game.input.keyboard.s){P.transform.position.y += (P.speed * delta);}
  P.transform.rotation.z = Game.utils.point_to(P.transform.position.x, P.transform.position.y, Game.input.mouse.x, Game.input.mouse.y);
  Game.utils.cool_off(P.melee,delta);
  Game.utils.cool_off(P.ranged,delta);
  Game.utils.cool_off(P.bomb,delta);
  if (Game.input.mouse.mouse_down){
    if (P[P.selected_attack].cooldown_left == 0){
      P[P.selected_attack].ammo--;
      Game.projectiles.push({
        source: P,
        power: P[P.selected_attack].damage,
        type: 'vector',
        speed: P[P.selected_attack].speed,
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
        }
      });
      Game.graphics.draw_list.push(Game.projectiles[Game.projectiles.length-1].transform);
      if (P[P.selected_attack].ammo == 0){
        P[P.selected_attack].ammo = P[P.selected_attack].max_ammo;
        P[P.selected_attack].cooldown_left = P[P.selected_attack].reload_time;
      }else{
        P[P.selected_attack].cooldown_left = P[P.selected_attack].cooldown;
      }
      console.log('boom');
    }
  }
}