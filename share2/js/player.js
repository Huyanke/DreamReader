var 
    x,
	isPlay = false,
	progress = 0,
	val = 0,
	max = 0,
	$scale = $('#scale'),
    $playMusic = $('#play'),

	$music=$('#music'),
	music = $music.get(0)

/*播放*/


$playMusic.on('click', function() {
   	if (isPlay == false) {
		iplay();
	} else {
		nplay();
	}

});

/*播放状态*/
function iplay() {
	$('.stop').show();
	$('.play').hide();
	$(".header").addClass("animation");
	$scale.attr('max', music.duration);
    
	max = music.duration;
	music.play();
	isPlay = true;
    console.log(Math.round(max))
	x = setInterval(function() {
		progress = music.currentTime;
        duration = music.duration;
        

        val = progress * max/duration;
	  	$scale.val(val);

		console.log("歌曲时长：" + max + "~~~~~~~现在的时间：" + val);
		/*判断歌曲是否播放结束*/

  
         var progressValue = progress / duration * 560;
         var width = progressValue /20 - 0.15 + 'rem';

            /*已经播放进度*/
            $(".shadow").css("width",width);
  
       //  }
      //})   

	 if (val == max) {
		  console.log("播放结束");
          $(".header").removeClass("animation");
          $('.stop').hide();
	      $('.play').show();
          $(".shadow").css("width",0);
          $scale.val(0);
          music.pause();
	      isPlay = false;
	  }
	}, 500);
};

$scale.on('change', function() {

     val =  $scale.val();
     progress = val;
     music.currentTime = progress ;
    

});

/*暂停状态*/
function nplay() {

	$('.stop').hide();
	$('.play').show();
    $(".header").removeClass("animation")
	music.pause();
	isPlay = false;
	clearInterval(x);
	console.log(123);
};



