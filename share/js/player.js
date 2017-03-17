
    var x,
	sc = $(window).width() / 640,
	isPlay = false,
	progress = 0,
	i = 0,
	max = 0,
	value = 0,
	$cover = $('.cover'),

	$scale = $('#points'),
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




		if (value == max) {
			console.log("播放结束");

		}
	}, 500);
};

$scale.on('change', function() {
	progress = $scale.val();
	music.currentTime = progress;
});

/*暂停状态*/
function nplay() {
	$('.stop').hide();
	$('.play').show();

	music.pause();
	isPlay = false;
	clearInterval(x);
	console.log(123);
};

setInterval(function() {
	$("#points").click(function() {
	  alert(1)
    })
},500)
