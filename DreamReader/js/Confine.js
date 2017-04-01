/* 限制输入框字数*/
$(window).load(function(){

setTimeout(function() {
	words_deal();
},50)

})

$(".main_info").on("click",".out_modify",function() {
   words_deal();
})

   var str = $(".title").val().length;
   var source = $(".source").val().length;
   var summary = $(".summary").val().length;
function words_deal(){
     var str = $(".title").val();
     var len = 0;
    for (var i=0; i<str.length; i++) {
     var c = str.charCodeAt(i);
    //单字节加1
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
       len++;
          if(len>23){
        var num=$(".title").val().substr(0,23);
        $(".title").val(num);
     }
      else{
         $(".title").next().find(".textCount").text(0+$(".title").val().length);
       }
     }
     else {
      len+=2;

      if(len>23){
        var num=$(".title").val().substr(0,23);
        $(".title").val(num);
     }
      else{
         $(".title").next().find(".textCount").text(0+$(".title").val().length);
       }

     }
    }



}


//function words_deal(){
// var curLength = $(".title").val().length;
// var source = $(".source").val().length;
// var summary = $(".summary").val().length;
//
// if(curLength>23){
//      var num=$(".title").val().substr(0,23);
//      $(".title").val(num);
// }
// else{
//     $(".title").next().find(".textCount").text(0+$(".title").val().length);
// }
//
// if(source>23){
//      var num=$(".source").val().substr(0,23);
//      $(".source").val(num);
// }
// else {
//     $(".source").next().find(".textCount").text(0+$(".source").val().length);
// }
//
//  if(summary>450){
//      var num=$(".summary").val().substr(0,450);
//      $(".summary").val(num);
// }
// else {
//     $(".summary").next().next().find(".textCount").text(0+$(".summary").val().length);
// }
//}