$(function(){
	Banner();
})
var i=0;
function Banner(){
	
	var timer=setInterval(Move,5000);	

	$("#box").bind('touchstart',function(){
		var touch1=event.touches[0].clientX;
		console.log(touch1);

		$(this).bind('touchend',function(){
			
			var touch2=event.changedTouches[0].clientX;
			var Width = document.documentElement.clientWidth;
			if(touch2<touch1)
			{
				
				clearInterval(timer);
				
				if(i>2)
				{
					i=2;
					return;
				}
				console.log("右滑");
				var MoveLength=i*Width;
				// $("#box ul").animate({"left":-MoveLength},1000,function(){});
				// $(".mark li").eq(i).addClass("now").siblings().removeClass("now");
				
				timer=setInterval(Move,5000);
			}
			else if(touch2>touch1)
			{
				
				
				console.log("左滑");
				clearInterval(timer);
				if(i>=3)
				{
					i=2;
				}
				i=i-1;
				if(i<0)
				{
					i=0;
				}
				var MoveLength=i*Width;
				console.log(i);
				
				
				
				timer=setInterval(Move,5000);
			}

		})
	});
}


function Move(){
	
	var Width = document.documentElement.clientWidth;
		i++;
		if(i>=3)
		{
			i=0;
		}
		console.log(i);
		var MoveLength=i*Width;
		
		$("#box ul").animate({"left":-MoveLength},1000,function(){});
		$(".swiper-pagination").find("span").eq(i).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
		
		
}