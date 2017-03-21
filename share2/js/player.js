var x,
	sc = $(window).width() / 640,
	isPlay = false,
	progress = 0,
	i = 0,
	max = 0,
	value = 0,
	$cover = $('.cover'),

	$scale = $('#scale'),
    $playMusic = $('#play'),
	$voice = $('voice'),
	$music=$('#music'),
	music = $music.get(0)
	//js操作获得的是audio对象，jquery选择器获得的是jquery对象，0对象的才是对应的节点对象。所以不能直接使用jquery对象去操作。

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
	$(".header").addClass("animation")
	$scale.attr('max', music.duration);
	max = Math.round(music.duration);

	music.play();
	isPlay = true;
	x = setInterval(function() {
		progress = music.currentTime;
		$scale.val(progress);
		value = Math.round($scale.val());
		console.log("歌曲时长：" + max + "~~~~~~~现在的时间：" + value);
		/*判断歌曲是否播放结束*/

     var audio = document.getElementById("music")
          
//   audio.addEventListener('timeupdate',function(){
//       if (!isNaN(audio.duration)) {
         var progressValue = audio.currentTime / audio.duration * 560;
         var width = parseInt(progressValue) /20 + 'rem';
         
            $(".extent").text(width)
            $(".shadow").css("width",width);
//       }
//      })   
// 
		if (value == max) {
			console.log("播放结束");

		}
	}, 500);
};

$scale.on('change', function() {
//	$(".shadow").css({"width":value / 5 +'rem'})
	progress = $scale.val();
	music.currentTime = progress;
	
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
      
	