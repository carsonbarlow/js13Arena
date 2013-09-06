(function () {

  Game.enemy_stats = [
    {type: 'lame_brain', hp: 6.0, speed: 70.0, attack: 'melee_1', damage: 1.0, movement: 'wonder', graphic: [220,44,32,40,0]},
    {type: 'stand_n_shoot', hp: 6.0, speed: 70.0, attack: 'melee_1', damage: 1.0, movement: 'wonder', graphic: [150,44,32,40,0]},
    {type: 'back_stabber', hp: 6.0, speed: 70.0, attack: 'melee_1', damage: 1.0, movement: 'wonder', graphic: [100,44,32,40,0]},
    {type: 'big_n_heavy', hp: 6.0, speed: 70.0, attack: 'melee_1', damage: 1.0, movement: 'wonder', graphic: [0,44,32,40,0]}
  ]

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
    new_enemy.max_hp = new_enemy.hp;
    new_enemy.vol = [0,0];
    new_enemy.col = 14;
    new_enemy.wonder = 0;
    new_enemy.standing = 500;
    new_enemy.chasing = false;
    new_enemy.attack_wind_up = 400;
    new_enemy.attack_wind_up_left = 400;
    Game.enemies.push(new_enemy);
    Game.graphics.draw_list.push(new_enemy.transform);
  };

  // Game.spawn_enemy(Game.enemy_stats[0],500,100);


  var type_distribution = [0.45, 0.2, 0.15, 0.1];
  var type_population = [10, 4, 2, 1];
  var wave_base = 20;
  // var mob_range = [5,20];
  Game.bm = {};
  var bm = Game.bm;
  bm.wave = 1;
  var pts;
  Game.bm.craft_enemy = function(obj, points){
    var enemy = Game.utils.clone(obj);
    switch (obj.type){
      case 'lame_brain':
      default:
        enemy.hp += Math.round(points * 0.5 /3 );
        enemy.speed += Math.round(points * 0.5 / 3);
        enemy.damage += Math.round(points * 0.34 / 3);
        break;
    }
    return enemy;
  };
  Game.bm.do_wave = function(pts){
    wave_base *= 1.08;
    // figure in luck meter...

    // distribute points...
    var e_ratio = [];
    var e_count = [];
    var e_ratio_total = 0;
    type_distribution.map(function(item){
      var et = Math.random()*100*item;
      e_ratio_total += et;
      e_ratio.push(et);
    });
    for(var i = 0; i < e_ratio.length; i++){
      e_ratio[i] = (e_ratio[i] / e_ratio_total) * wave_base;
      // number of mobs = points alloted to type / total points for round / type_distribution * type_population
      e_count[i] = Math.round(e_ratio[i]/wave_base/type_distribution[i]*type_population[i]);
      var crafted_enemy = Game.bm.craft_enemy(Game.enemy_stats[i],e_ratio[i]/e_count[i]);
      while (e_count[i]--){
        Game.spawn_enemy(crafted_enemy, 400,100);
      }
    };
  }

  Game.bm.do_wave();
})();