$(function(){

	setTimeout(function(){

		okMovie();					 

	},5000);		   

});



function okMovie(){

	$("img").each(function(){

		if($(this).attr("src").match("_load")){

			$(this).attr("src",$(this).attr("src").replace("_load","_play_off"));

			//マウスオーバー追加

			$(this).mouseover(function(){

				$(this).attr("src",$(this).attr("src").replace("_off","_on"));

			}).mouseout(function(){

				$(this).attr("src",$(this).attr("src").replace("_on","_off"));

			});

		}

	})

}





var movieID = "voicePlayer";

var mainID = "";

var start = false;

var calentID = "";



function playMovie(ID,cl) {



	//再生状況確認

	if(calentID != "" && cl != calentID && start){

		//再生されているものと違うのクリック

		stopMovie();

		start = false;

	}





	//クリック直後

	if(start){

		start = false;

		return;

	}





	$("a").each(function(){

		if($(this).attr("href").match(cl)){

			$("img",$(this)).attr("src",$("img",$(this)).attr("src").replace("_play_off","_load"));

			$("img",$(this)).attr("src",$("img",$(this)).attr("src").replace("_play_on","_load"));

			//一時クラスを与えておく

			$("img",$(this)).addClass("onPlay");

		}

	});



	//flashキック

	startMovie(ID,cl);

}



function startMovie(ID,cl){

	calentID = cl;

	start = true;

	thisMovie(movieID).runchPlay(ID);

}



function stopMovie() {

	//映像ストップ

	$(".onPlay").unbind()

	chImage("stop");

	thisMovie(movieID).runchStop();



}





function thisMovie(movieName) {

    if (navigator.appName.indexOf("Microsoft") != -1) {

        return window[movieName];

    } else {

        return document[movieName];

    }

}





function loadComplete(){		

	//ロードコンプリート

	chImage("start");

	//onClick追加

	$(".onPlay").one("click",function(){ stopMovie(); });

}



function playComplete(){

	//映像再生終了

	start = false;

	calentID = "";

	chImage("stop");

}







function chImage(type){

	var el = $(".onPlay");



	if(type == "start"){

		$(el).attr("src",$(el).attr("src").replace("_load","_stop"));

	}else if(type == "stop"){

		$(el).attr("src",$(el).attr("src").replace("_load","_play_off"));

		$(el).attr("src",$(el).attr("src").replace("_stop","_play_off"));

		$(el).unbind("click");

		$(el).removeClass("onPlay");

	}

}