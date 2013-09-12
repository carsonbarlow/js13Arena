(function(){
  Game.animator = {};
  
  Game.animator.setup_animation = function (obj) {
    var new_obj = {};
    if (obj.type){
      switch (obj.type){
        case 'lame_brain':
        new_obj.current_loop = [[],[],[]];
        break;
        case 'stand_n_shoot':
        break;
        case 'back_stabber':
        break;
        case 'big_n_heavy':
        new_obj.looping = true;
        new_obj.current_loop = [[64,40],[32,40],[0,40]];
        new_obj.frame_rate = 50;
        new_obj.frame_rate_left = 50;
        break;

      }
    }
    new_obj.loop_index = 0;
    return new_obj;
  }
  Game.animator.mob_update = function (mob,delta) {
    if (mob.animator.looping){
      Game.utils.count_down(mob.animator,'frame_rate_left',delta);
      if (!mob.animator.frame_rate_left){
        mob.animator.frame_rate_left = mob.animator.frame_rate;
        mob.animator.loop_index++;
        if (mob.animator.loop_index >= mob.animator.current_loop.length){mob.animator.loop_index = 0;}
        mob.transform.offset.x = mob.animator.current_loop[mob.animator.loop_index][0];
        mob.transform.offset.y = mob.animator.current_loop[mob.animator.loop_index][1];
      }
    }
  }
})();