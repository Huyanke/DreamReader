// JavaScript Document
/*****************数据改变  ul 不变*************/
//根据数据写入 li

clipInit = function (pageCon){
//	var pageCon = pageCons; //可更改
	 liTab=8;    //可更改
	 medCur=Math.ceil(liTab/2);

	var str="";
	str+="<ul>";
	str+="<li class='disbled' id='firstPage' onclick='FirstPage()'>首页</li>";
	str+="<li class='disbled' id='lastPage' onclick='LastPage()'>上一页</li>";
	str+="<div id='pageU' class='fl'>";
	if(liTab<=pageCon){
		for(var i=1;i<=liTab;i++){
			str+="<li id='clip"+i+"' onclick='pageInt(&#039;clip"+i+"&#039;,&#039;"+liTab+"&#039;,&#039;"+medCur+"&#039;)'>"+i+"</li>";
		}
	}else{
		for(var i=1;i<=pageCon;i++){
			str+="<li id='clip"+i+"' onclick='pageInt(&#039;clip"+i+"&#039;,&#039;"+pageCon+"&#039;,&#039;"+medCur+"&#039;)'>"+i+"</li>";
		}
	}
	str+="<li class='clear'></li>";
	str+="</div>";
	str+="<li class='BORDER' id='nextPage' onclick='NextPage()'>下一页</li>";
	str+="<li class='BORDER' id='endPage' onclick='EndPage()' style='border-right:1px solid #ccc'>尾页</li>";
	str+="<li class='clear'></li>";
	str+="</ul>";
	$(".Allclip").html(str);
	pageInt('clip1',pageCon,medCur);
}
//设置当点击的值小于预设固定值
//单击事件  选择页数

clipPage=function (cur,page){
	var str="";
	for(var i=1;i<=page;i++){
		var liId="clip"+i;
		if(cur==i){
			$("#"+liId).attr("class","curPage");
		}else{
			$("#"+liId).attr("class","BORDER");
		}
		$("#"+liId).text(i);
	}
	pageControl(cur);
    AllData (cur);
    ListData(cur);
    SearchData(cur);
}


//设置的中转站，根据获取的值更改操作
pageInt=function (obj,page,medCur){
	var value=parseInt($("#"+obj).text());
	if(value < medCur){
		clipPage(value,page);
	}else if(value >= medCur){
		clipPageMax(value,page,medCur);
	}

	var speed=200;//滑动的速度
    $('body,html').animate({ scrollTop: 0 }, speed);
    return false;

}
//设置当获取的值大于预设固定值
clipPageMax=function (cur,page,medCur){
	var str="";
	var startNum=cur-medCur+1;
	var maxPage=startNum+parseInt(page)-1;
	if(maxPage<pageCon){
		for(var i=1;i<=page;i++){
			var liId="clip"+i;
			if(medCur==i){
				$("#"+liId).attr("class","curPage");
			}else{
				$("#"+liId).attr("class","BORDER");
			}
			$("#clip"+i).text(startNum);
			startNum++;
		}
	}else{
		var end = new RegExp(/\d+$/);
		var page=parseInt(end.exec(page));
		var curT=cur-pageCon+page;
		var maxP=pageCon;
		for(var i=page;i>=1;i--){
			var liId="clip"+i;
			if(curT==i){
				$("#"+liId).attr("class","curPage");
			}else{
				$("#"+liId).attr("class","BORDER");
			}
			$("#"+liId).text(maxP);
			maxP--;
		}

	}

	pageControl(cur);
	AllData (cur);
	ListData(cur);
	SearchData(cur);
}


//首页，尾页，上一页，下一页 的样式
pageControl=function (cur){
	if(cur==1){
		$("#firstPage").attr("class","disbled");
		$("#lastPage").attr("class","disbled");
		$("#nextPage").attr("class","BORDER");
		$("#endPage").attr("class","BORDER");
	}else if(cur==pageCon){
		$("#firstPage").attr("class","BORDER");
		$("#lastPage").attr("class","BORDER");
		$("#nextPage").attr("class","disbled");
		$("#endPage").attr("class","disbled");
	}else{
		$("#firstPage").attr("class","BORDER");
		$("#lastPage").attr("class","BORDER");
		$("#nextPage").attr("class","BORDER");
		$("#endPage").attr("class","BORDER");
	}
}
//第一页 显示
FirstPage=function (){
	var forNum=parseInt(liTab);
	clipPage(1,forNum);
}
//尾页 显示
EndPage=function (){
	var maxV=parseInt(pageCon);
	clipPageMax(maxV,liTab,medCur);
}
//上一页 显示
LastPage=function (){
	var choice=$(".curPage").attr('id');
	var obj=$("#"+choice).prev().attr('id');
	pageInt(obj,liTab,medCur);
}
//下一页 显示
NextPage=function (){
	var choice=$(".curPage").attr('id');
	var obj=$("#"+choice).next().attr('id');
	pageInt(obj,liTab,medCur);
}



function AllData (cur){
//  pageCon = Math.ceil($(".checkAll").val() / 20 );
    PageData(cur);
}

PageData = function (cur){

    if(!$(".all_content").is(":hidden")){
     $.ajax({
	  type: 'get',
	  url: "http://localhost:3334/3oarticle?page="+cur+"&size=20",
//    url: "http://dreamwriter.webdev.com/App/oarticle",
	  dataType:'json',
	  success: function (data) {
	    Data(data)
	  },
	   error: function (msg) {
	        console.log(msg);
	    }
	  });

    }
  }


function ListData(cur) {
//console.log(cur)
  $(".content_list").each(function(index) {
  	if($(".content_list").eq(index).is(":visible")) {
        var show = $(this).find(".main_info ul").length;
          $(this).find(".main_info ul").hide();
          console.log(show)
          console.log(cur*20)
        for(var i = (cur-1)*20; i < cur*20;i++){
          $(this).find(".main_info ul").eq(i).show();
        }

    }
  })

}

function SearchData(cur){

   $(".search_info .main_info ul").hide();
    for(var s = (cur-1)*20; s<cur*20;s++){
       $(".search_info .main_info ul").eq(s).show();
    }

}
