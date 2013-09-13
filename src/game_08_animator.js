(function(){
  Game.animator = {};
  
  Game.animator.setup_animation = function (obj) {
    var new_obj = {};
    if (obj.type){
      switch (obj.type){
        case 'lame_brain':
        new_obj.looping = true;
        new_obj.loop_teirs = []
        new_obj.base_loop = [[0,73],[24,73],[0,73],[48,73]];
        new_obj.teir_width = 72;
        new_obj.frame_rate = 240;
        new_obj.frame_rate_left = 96;
        break;
        case 'stand_n_shoot':
        new_obj.looping = true;
        new_obj.loop_teirs = []
        new_obj.base_loop = [[0,0],[28,0],[0,0],[56,0]];
        new_obj.teir_width = 84;
        new_obj.frame_rate = 80;
        new_obj.frame_rate_left = 80;
        break;
        case 'back_stabber':
        new_obj.looping = true;
        new_obj.loop_teirs = []
        new_obj.base_loop = [[0,22],[20,22],[0,22],[40,22]];
        new_obj.teir_width = 60;
        new_obj.frame_rate = 100;
        new_obj.frame_rate_left = 100;
        break;
        case 'big_n_heavy':
        new_obj.looping = true;
        new_obj.loop_teirs = []
        new_obj.base_loop = [[64,40],[32,40],[0,40]];
        new_obj.teir_width = 96;
        new_obj.frame_rate = 70;
        new_obj.frame_rate_left = 50;
        break;
      }
    }
    new_obj.teir = 0;
    new_obj.loop_index = 0;
    new_obj.paused = false;
    return new_obj;
  }
  Game.animator.mob_update = function (mob,delta) {
    if (mob.animator.paused){return;}
    if (mob.animator.looping){
      Game.utils.count_down(mob.animator,'frame_rate_left',delta);
      if (!mob.animator.frame_rate_left){
        mob.animator.frame_rate_left = mob.animator.frame_rate;
        mob.animator.loop_index++;
        if (mob.animator.loop_index >= mob.animator.base_loop.length){mob.animator.loop_index = 0;}
        mob.transform.offset.x = mob.animator.base_loop[mob.animator.loop_index][0] + (mob.animator.teir * mob.animator.teir_width) ;
        mob.transform.offset.y = mob.animator.base_loop[mob.animator.loop_index][1];
      }
    }
  }
})();