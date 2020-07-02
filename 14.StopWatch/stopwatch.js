$(function(){
	var appMode=false;
	var timeCounter=0;
	var lapCounter=0;
	var action;
	var lapNbr=0;

	var timeMin, timeSec, timeCent, lapMin, lapSec, lapCent;
	
	hideShow("#start", "#lap");

	$("#start").click(function(){
		appMode=true;
		hideShow("#stop", "#lap");
		startAction();
	});

	$("#stop").click(function(){
		appMode=false;
		hideShow("#resume", "#reset");
		clearInterval(action);
	});

	$("#resume").click(function(){
		appMode=true;
		hideShow("#stop", "#lap");
		startAction();
	});

	$("#reset").click(function(){
		location.reload();
	});

	$("#lap").click(function(){
		lapNbr++;
		if (appMode){
			clearInterval(action);
			lapCounter = 0;
			addLap();
			startAction();
		}
	});








	//shows selected 2 buttons
	function hideShow(a,b){
		$(".ctr").hide();
		$(a).show();
		$(b).show();
	};
	//starts time counter
	function startAction(){
		action=setInterval(function(){
			timeCounter++;
			if (timeCounter==100*60*100){
				timeCounter = 0;
				lapCounter = 0;
			}
			lapCounter++;
			updateTime();
		}, 10)
	}
	//converts timecounter to min, sec and centisecs
	function updateTime(){
		timeMin = Math.floor(timeCounter/6000);
		timeSec = Math.floor((timeCounter%6000)/100);
		timeCent = (timeCounter%6000)%100;

		lapMin = Math.floor(lapCounter/6000);
		lapSec = Math.floor((lapCounter%6000)/100);
		lapCent = (lapCounter%6000)%100;

		$("#min").text(fmt(timeMin));
		$("#sec").text(fmt(timeSec));
		$("#cent").text(fmt(timeCent));

		$("#lapmin").text(fmt(lapMin));
		$("#lapsec").text(fmt(lapSec));
		$("#lapcent").text(fmt(lapCent));

	}

	//format number for 2 digit nbr
	function fmt(nbr){
		if (nbr<10){
			return "0"+nbr
		} else{
			return nbr
		}
	};

	function addLap(){
		var infos = "<div class='lap'>"+
						"<div class='lapNbr'>" +
							"Lap" + lapNbr +
						"</div>" +
						"<div class='lapTime'>" +
							fmt(lapMin)+":"+fmt(lapSec)+":"+fmt(lapCent) +
						"</div>"+
					"</div><p class='break'></p>";
		$(infos).prependTo("#laps");
		window.console.log($("#laps").html());
		clearInterval(action);
	};
});