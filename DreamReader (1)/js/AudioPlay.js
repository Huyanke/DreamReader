 /*语音播放*/
	var
	isPlay = false,
	progress = 0,
	duration = 0,
    $playAudio = $('.playimg'),
	$audio=$('.audio'),
	Audio = $audio.get(0);

/*播放*/
$playAudio.on('click', function() {
   	if (isPlay == false) {
		iplay();
	} else {
		nplay();
	}
});

 /*播放状态*/
 function iplay() {
	$(".playimg").hide();
	$(".play_eff").show();
	Audio.play();
	isPlay = true;
	x = setInterval(function() {
		progress = Audio.currentTime;
        duration = Audio.duration;

    /*判断歌曲是否播放结束*/
	 if (progress == duration) {

        $(".play_eff").hide();
		$(".playimg").show();
        Audio.pause();
	    isPlay = false;

	  }
	}, 500);
};


/*暂停状态*/
function nplay() {
	$(".play_eff").hide();
	$(".playimg").show();
	Audio.pause();
	isPlay = false;
	clearInterval(x);
};