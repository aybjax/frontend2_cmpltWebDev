$(function(){
	var paintErase = false;
	var brush = 1; //paint vs erase (-1 vs 1)
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var container = $("#canvasContainer");// document.getElementById("canvasContainer");
	var mouse = {x:0, y:0};

	context.lineWidth = 3;
	context.lineCap = "round";
	context.lineJoin = "round";


	if (localStorage.getItem("imgCanvas")!=null){
		var img = new Image();
		img.onload = function(){
			context.drawImage(img, 0,0);
		};
		img.src=localStorage.getItem("imgCanvas");
	}

	container.mousedown(function(event){
		paintErase = true;
		context.beginPath();
		mouse.x = event.pageX - this.offsetLeft;
		mouse.y = event.pageY - this.offsetTop;
		context.moveTo(mouse.x, mouse.y);
	})

	container.mousemove(function(event){
		mouse.x = event.pageX - this.offsetLeft;
		mouse.y = event.pageY - this.offsetTop;
		if (paintErase){
			if (brush==1){
				context.strokeStyle = $("#paintColor").val();
			} else {
				context.strokeStyle = "white";
			};
			context.lineTo(mouse.x, mouse.y);
			context.stroke();
		}
	})

	container.mouseup(function(){
		paintErase=false;
	})

	container.mouseleave(function(){
		paintErase=false;
	})

	$("#erase").click(function(){
		brush *=-1;
		$(this).toggleClass("eraseMode");
	})


	$("#reset").click(function(){
		context.clearRect(0,0, 800, 600);
		brush=1;
		$("#erase").removeClass("eraseMode");
	})

	$("#save").click(function(){
		if(typeof(localStorage)!=null){
			localStorage.setItem("imgCanvas", canvas.toDataURL());
		} else {
			window.alert("No local storage is supported by your browser");
		}
	})

	$("#slider").slider({
		min:5,
		max:30,
		slide: function(event, ui){
			$("#circle").height(ui.value);
			$("#circle").width(ui.value);
			context.lineWidth = ui.value;
		},
	});

		$("#paintColor").change(function(){
			$("#circle").css("background", $(this).val())
		})





	// var canvas = document.getElementById("canvas");
	// var context = canvas.getContext('2d');

	// //draw line
	// //declare new path
	// context.beginPath();

	// //lineWidth
	// context.lineWidth= 40; //px
	// context.strokeStyle = "black";
	// context.lineCap="round";
	// context.lineJoin="round";
	// //positioned context/start point
	// context.moveTo(50,50);

	// //draw line to new position
	// context.lineTo(200,200);

	// context.lineTo(400,100);

	// //make visible
	// context.stroke();
})