// window.onload = function(e){

  /****  CONTENTS ****

   * UTILS_001
   * INITIAL_SETUP_002
   * INPUT_003
   * GRAPHICS_004
   * INPUT_EVENTS_005
   * PLAYER_006
   * ENEMY_STATS
   * GAME_LOOP_007
   * GAME_UPDATE_008
   * UPDATE_PLAYER_009
   * UPDATE_PROJECTILES_010
   * UPDATE_ENEMIES_011
   * GAME_DRAW_012
*/

  // if (typeof Game == 'undefined'){Game = {};}

  //UTILS_001
  // Game.utils = {};
  // Game.utils.add_default = function(_var, val){ if (typeof _var == 'undefined'){_var = val;}};
  // (function(){
  //   var x_dif, y_dif, a_tan, hyp;
  //   Game.utils.point_to = function(from_x, from_y, to_x, to_y){
  //     x_dif = to_x - from_x;
  //     y_dif = to_y - from_y;
  //     a_tan = Math.atan2(y_dif,x_dif);
  //     return a_tan;
  //   };
  //   Game.utils.normalize = function(from_x, from_y, to_x, to_y){
  //     x_dif = to_x - from_x;
  //     y_dif = to_y - from_y;
  //     hyp = (x_dif*x_dif)+(y_dif*y_dif);
  //     hyp = Math.sqrt(hyp);
  //     return [(x_dif/hyp),(y_dif/hyp)];
  //   }
  //   Game.utils.randomize_direction = function(){
  //     return  Game.utils.normalize(0,0,Math.random()*10-5,Math.random()*10-5);
  //   }
  //   Game.utils.proximity = function(from_x, from_y, to_x, to_y){
  //     x_dif = to_x - from_x;
  //     y_dif = to_y - from_y;
  //     return Math.sqrt((x_dif*x_dif)+(y_dif*y_dif));
  //   }
  // })();
  // (function(){
  //   var id = 0;
  //   Game.utils.assign_id = function(){return id++;};
  // })();
  // Game.utils.cool_off = function(obj, delta){
  //   obj.cooldown_left -= delta*1000;
  //   obj.cooldown_left =(obj.cooldown_left < 0)? 0 : obj.cooldown_left;
  // };
  // Game.utils.clone = function (obj) {
  //   if (null == obj || "object" != typeof obj) return obj;
  //   var copy = obj.constructor();
  //   for (var attr in obj) {
  //       if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  //   }
  //   return copy;
  // };
  


  // INITIAL_SETUP_002
  // Game.utils.add_default(Game.config, {});
  // Game.utils.add_default(Game.config.fps, 60);
  // Game.utils.add_default(Game.config.canvas_id, 'game_canvas');
  // Game.utils.add_default(Game.config.fps_counter_id, 'fps_counter');
  // Game.projectiles = [];
  // Game.enemies = []

  // INPUT_003
  // Game.input = {};
  // Game.input.keyboard = {};
  // Game.input.keyboard.a = false;
  // Game.input.keyboard.s = false;
  // Game.input.keyboard.d = false;
  // Game.input.keyboard.w = false;
  // Game.input.keyboard.space = false;
  // Game.input.mouse = {};
  // Game.input.mouse.x = 0;
  // Game.input.mouse.y = 0;
  // Game.input.mouse.mouse_down = false;
  // Game.input.keyboard.id_to_key = {'U+0041':'a', 'U+0053':'s', 'U+0044':'d', 'U+0057':'w', 'U+0020':'space'};

  // GRAPHICS_004
  // Game._time = (new Date).getTime();
  // Game.graphics = {};
  // Game.graphics.canvas = document.getElementById(Game.config.canvas_id);
  // Game.graphics.fps_counter = document.getElementById(Game.config.fps_counter_id);
  // Game.graphics.context = Game.graphics.canvas.getContext('2d');
  // Game.graphics.draw_list = [];
  // Game.graphics.image = document.createElement('img');
  // Game.graphics.image.src = 'images.png';

  // INPUT_EVENTS_005
  // window.addEventListener('mousedown',function(event){
  //   Game.input.mouse.mouse_down = true;
  // });
  // window.addEventListener('mouseup', function(event){
  //   Game.input.mouse.mouse_down = false;
  // });
  // Game.graphics.canvas.addEventListener('mousemove', function(event){
  //   Game.input.mouse.x = event.x - Game.graphics.canvas.offsetLeft;
  //   Game.input.mouse.y = event.y - Game.graphics.canvas.offsetTop;
  // });
  // window.addEventListener('keydown',function(event){
  //   // console.log(event.keyIdentifier);
  //   Game.input.keyboard[Game.input.keyboard.id_to_key[event.keyIdentifier]] = true;
  // });
  // window.addEventListener('keyup',function(event){
  //   Game.input.keyboard[Game.input.keyboard.id_to_key[event.keyIdentifier]] = false;
  // });

  // PLAYER_006
  // Game.player = {
  //   luck: 100,
  //   health: 10,
  //   health_regen: 1,
  //   speed: 200,
  //   selected_attack: 'ranged',
  //   melee: {
  //     damage: 4,
  //     reach: 10,
  //     cooldown: 500,
  //     cooldown_left: 0
  //   },
  //   ranged: {
  //     damage: 3,
  //     speed: 750,
  //     cooldown: 500,
  //     cooldown_left: 0,
  //     ammo: 6,
  //     max_ammo: 6,
  //     reload_time: 5000,
  //     reload_time_left: 0
  //   },
  //   bomb: {
  //     damage: 10,
  //     range: 25,
  //     cooldown: 10000,
  //     cooldown_left: 0
  //   },
  //   transform: {
  //     visible: true,
  //     position: {x: 100, y: 100, z: 1},
  //     rotation: {x: 0, y: 0, z: 0.5},
  //     scale: {x: 4, y: 4},
  //     offset: {x: 0, y: 0, r: 1},
  //     width: 40,
  //     height: 36
  //   }
  // }
  // Game.graphics.draw_list.push(Game.player.transform);

  // Game.spawn_enemy = function(stats, x_pos, y_pos){
  //   var new_enemy = Game.utils.clone(stats);
  //   new_enemy.transform = {
  //     visible: true,
  //     position: {x: x_pos, y: y_pos, z: 1},
  //     rotation: {x: 0, y: 0, z: 0},
  //     scale: {x: 4, y: 4},
  //     offset: {x: new_enemy.graphic[0], y: new_enemy.graphic[1], r: new_enemy.graphic[4]},
  //     width: new_enemy.graphic[2],
  //     height: new_enemy.graphic[3]
  //   };
  //   new_enemy.vol = [0,0];
  //   new_enemy.wonder = 0;
  //   new_enemy.standing = 500;
  //   new_enemy.chasing = false;
  //   Game.enemies.push(new_enemy);
  //   Game.graphics.draw_list.push(new_enemy.transform);
  // };

  // ENEMY_STATS
  // Game.enemy_stats = {
  //   lame_brain : {health: 6, speed: 70, attack: 'melee_1', damage: 1, movement: 'wonder', graphic: [220,44,32,40,0] }
  // }
  // Game.spawn_enemy(Game.enemy_stats.lame_brain,500,100);

  // GAME_LOOP_007
  // Game.run = (function() {
  //   var update_interval = 1000 / Game.config.fps;
  //   start_tick = next_tick = last_tick = (new Date).getTime();
  //   num_frames = 0;

  //   return function() {
  //     current_tick = (new Date).getTime();
  //     while ( current_tick > next_tick ) {
  //       delta = (current_tick - last_tick) / 1000;
  //       Game.update(delta);
  //       next_tick += update_interval;
  //       last_tick = (new Date).getTime();
  //     }

  //     Game.graphics.draw(Game.graphics.context);

  //     fps = (num_frames / (current_tick - start_tick)) * 1000;
  //     Game.graphics.fps_counter.textContent = Math.round(fps);
  //     num_frames++;
  //   }
  // })();

  // GAME_UPDATE_008
  // Game.update = function(delta){
  //   Game.update_player(Game.player, delta);
  //   Game.update_projectiles(delta);
  //   Game.update_enemies(delta);
    
  // };


  // UPDATE_PLAYER_009
  // Game.update_player = function(P, delta){
  //   if (Game.input.keyboard.a){P.transform.position.x -= (P.speed * delta);}
  //   if (Game.input.keyboard.d){P.transform.position.x += (P.speed * delta);}
  //   if (Game.input.keyboard.w){P.transform.position.y -= (P.speed * delta);}
  //   if (Game.input.keyboard.s){P.transform.position.y += (P.speed * delta);}
  //   P.transform.rotation.z = Game.utils.point_to(P.transform.position.x, P.transform.position.y, Game.input.mouse.x, Game.input.mouse.y);
  //   Game.utils.cool_off(P.melee,delta);
  //   Game.utils.cool_off(P.ranged,delta);
  //   Game.utils.cool_off(P.bomb,delta);
  //   if (Game.input.mouse.mouse_down){
  //     if (P[P.selected_attack].cooldown_left == 0){
  //       P[P.selected_attack].ammo--;
  //       Game.projectiles.push({
  //         source: P,
  //         power: P[P.selected_attack].damage,
  //         type: 'vector',
  //         speed: P[P.selected_attack].speed,
  //         vol: Game.utils.normalize(P.transform.position.x, P.transform.position.y, Game.input.mouse.x, Game.input.mouse.y),
  //         range: 250,
  //         transform: {
  //           visible: true,
  //           position: {x: P.transform.position.x, y: P.transform.position.y, z: P.transform.position.z},
  //           rotation: {x: 0, y: 0, z: 0.5},
  //           scale: {x: 4, y: 4},
  //           offset: {x: 4, y: 4, r: 1},
  //           width: 12,
  //           height: 12
  //         }
  //       });
  //       Game.graphics.draw_list.push(Game.projectiles[Game.projectiles.length-1].transform);
  //       if (P[P.selected_attack].ammo == 0){
  //         P[P.selected_attack].ammo = P[P.selected_attack].max_ammo;
  //         P[P.selected_attack].cooldown_left = P[P.selected_attack].reload_time;
  //       }else{
  //         P[P.selected_attack].cooldown_left = P[P.selected_attack].cooldown;
  //       }
  //       console.log('boom');
  //     }
  //   }
  // }


  // UPDATE_PROJECTILES_010
  // Game.update_projectiles = function (delta){
  //   Game.projectiles = Game.projectiles.filter(function(p){
  //     switch (p.type){
  //       case 'vector':
  //         p.transform.position.x += (p.vol[0]*p.speed*delta);
  //         p.transform.position.y += (p.vol[1]*p.speed*delta);
  //         p.range -= p.speed*delta;
  //         return p.transform.visible = (p.range > 0);
  //       break;
  //     }
  //   });
  // };

  // UPDATE_ENEMIES_011
  // Game.update_enemies = function (delta){
  //   Game.enemies = Game.enemies.filter(function(mob){
  //     mob.chasing = (Game.utils.proximity(mob.transform.position.x, mob.transform.position.y, Game.player.transform.position.x, Game.player.transform.position.y) < 200);
  //     if (mob.chasing){
  //       mob.vol = Game.utils.normalize(mob.transform.position.x, mob.transform.position.y, Game.player.transform.position.x, Game.player.transform.position.y);
  //     }else if (mob.standing){
  //       mob.standing -= delta * 1000;
  //       if (mob.standing <= 0){
  //         mob.standing = 0;
  //         mob.vol = Game.utils.randomize_direction();
  //         mob.wonder = Math.random()*275+75;
  //       }
  //     }else if (mob.wonder){
  //       mob.wonder -= mob.speed * delta;
  //       if (mob.wonder <= 0){
  //         mob.wonder = 0;
  //         mob.vol = [0,0];
  //         mob.standing = Math.random()*250+500;
  //       }
  //     }
  //     mob.transform.position.x += (mob.vol[0]*mob.speed*delta);
  //     mob.transform.position.y += (mob.vol[1]*mob.speed*delta);
  //     return true;
  //   });
  // };

  // GAME_DRAW_012
  // var image_loaded = false; // <-- this will be refactored
  // Game.graphics.draw = function(ctx){
  //   if (!image_loaded){if (Game.graphics.image.width){image_loaded = true;}}
  //   // Game.graphics.canvas.width = Game.graphics.canvas.width;
  //   ctx.clearRect(0, 0, Game.graphics.canvas.width, Game.graphics.canvas.height);
  //   var tX, tY, tR;
  //   Game.graphics.draw_list = Game.graphics.draw_list.filter(function(t){
  //     if (!t.visible){return false;}
  //     ctx.save();
  //     tX = t.position.x;
  //     tY = t.position.y;
  //     tR = t.rotation.z+(t.offset.r * -1.570796327);
  //     ctx.translate(tX,tY);
  //     ctx.rotate(tR);
  //     ctx.translate(-tX,-tY);
  //     ctx.drawImage(Game.graphics.image,t.offset.x,t.offset.y,t.width,t.height,t.position.x-(t.width/2),t.position.y-(t.height/2),t.width,t.height);  // <-- refactor
  //     ctx.restore();
  //     return true;
  //   });
  //   ctx.moveTo(100,0);
  //   ctx.lineTo(100,Game.graphics.canvas.height);
  //   ctx.moveTo(0,100);
  //   ctx.lineTo(Game.graphics.canvas.width, 100);
  //   ctx.moveTo(500,0);
  //   ctx.lineTo(500,Game.graphics.canvas.height);
  //   ctx.stroke();
  // };

  // if( window.webkitRequestAnimationFrame) {
  //   window.each_frame = function(cb) {
  //     var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
  //     _cb();
  //   };
  // } else if (window.mozRequestAnimationFrame) {
  //   window.each_frame = function(cb) {
  //     var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
  //     _cb();
  //   };
  // } else {
  //   window.each_frame = function(cb) {
  //     setInterval(cb, 1000 / Game.config.fps);
  //   }
  // }
  // window.each_frame(Game.run);
// };
