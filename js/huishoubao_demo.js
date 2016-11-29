

$(function(){
	var myScroll = new IScroll('.leftbox', {  
	   
	});  
	// var myScroll=new IScroll("#rightbox",{});
	Nav.init();
});

var Nav={
	dom:{},
	init:function(){
		this.initdom();
		this.ChangeLi();
		this.Search();
		this.History();
	},
	initdom:function(){
		var dom=this.dom;
		dom.li=$("#aside li");
	},

	ChangeLi:function(){
		var myScroll1=new IScroll("#rightbox",{});
		var dom=this.dom;
		var page=$("#rightbox");
		page.index=1;
		var oid=0;
		$.getJSON("json/product.json",function(data){
			$("#rightbox .product").html("");
						for(var i=0;i<13*page.index;i++){
						var oli=$("<li  ><a href='javascript:;'><span>1</span><p>iPhone7 Plus</p></a></li>");
						oli.find("p").html(data[0][i].name);
						oli.find("span").html(data[0][i].id);
						if(i>=0&&i<=2)
						{
							oli.addClass("first");
						}
						$("#rightbox .product").append(oli);

						}
						// var op=$("<p class='bottom'>O(∩_∩)O~已经看到最后了哦</p>");
						// $("#rightbox .product").append(op);
						// var myScroll=new IScroll("#rightbox",{});
						myScroll1.refresh();
		});

		$("#aside li").bind('tap',function(){
			myScroll1.scrollTo(0,0);
			
			var index=$(this).index();
			page.index=1;
			oid=index;
			$(this).addClass("li-active").siblings().removeClass("li-active");
			$.getJSON("json/product.json",function(data){
				for(var key in data){
					if(key==index)
					{
						$("#rightbox .product").html("");
						for(var i=0;i<13*page.index;i++){
						var oli=$("<li  ><a href='javascript:;'><span>1</span><p>iPhone7 Plus</p></a></li>");
						oli.find("p").html(data[key][i].name);
						oli.find("span").html(data[key][i].id);
						if(i>=0&&i<=2)
						{
							oli.addClass("first");
						}
						$("#rightbox .product").append(oli);
						
						}
						// var op=$("<p class='bottom'>O(∩_∩)O~已经看到最后了哦</p>");
						// $("#rightbox .product").append(op);
						// var myScroll=new IScroll("#rightbox",{});
						myScroll1.refresh();
						
					}
//					else if(key==index)
//					{
//						
//						$("#rightbox .product").html("");
//						for(var i=0;i<data[key].length;i++){
//						var oli=$("<li  ><a href='javascript:;'><span>1</span><p>iPhone7 Plus</p></a></li>");
//						oli.find("p").html(data[key][i].name);
//						oli.find("span").html(data[key][i].id);
//						if(i>=0&&i<=3)
//						{
//							oli.addClass("first");
//						}
//						$("#rightbox .product").append(oli);
//
//						}
//						var myScroll=new IScroll("#rightbox",{});
//						
//						
//					}


				}
				
				
			})

		})
		myScroll1.on('scrollStart',function(){
			$(".lazy_img").removeClass("f-dn");
			$(".bottom").addClass("f-dn");
			
			
		})


		myScroll1.on('scrollEnd',function(){
		
			if(this.y<this.maxScrollY+40)
			{
				
				page.index++;
				
				// var odiv=$("<div class='lazy_img'><span></span><span></span><span></span></div>")
				// $("#rightbox .product").append(odiv);
				$.getJSON("json/product.json?time="+new Date().getTime(),function(data){
					
					if(data[oid]!=null)
					{

					
					if($(".product li").length>=data[oid].length)
				{
					// myScroll1.scrollTo(0, myScroll1.maxScrollY+44);
					
					$(".bottom").removeClass("f-dn");
					$(".lazy_img").addClass("f-dn");

					// myScroll1.scrollTo(0,myScroll1.maxScrollY+44);
					setTimeout(function(){
						// $(".bottom").addClass("f-dn");
						// 	$(".lazy_img").removeClass("f-dn");
						// $(".bottom").addClass("f-dn");
						myScroll1.scrollTo(0,myScroll1.maxScrollY+44,200);
						$(".lazy_img").removeClass("f-dn");
						$(".bottom").addClass("f-dn");
					},500);
					// $(".scroll").css("transform","translate(0px, -440px) translateZ(0px)");
					return;

				}
				
				
				for(var i=13*(page.index-1);i<13*page.index;i++)
				{
					// console.log(i,data[oid].length-1);
					if(i>=data[oid].length)
					{
						myScroll1.refresh();
						
						
						
						return;
					}
					var oli=$("<li  ><a href='javascript:;'><span>1</span><p>iPhone7 Plus</p></a></li>");
					oli.find("p").html(data[oid][i].name);
					oli.find("span").html(data[oid][i].id);
					if(i>=0&&i<=2)
					{
						oli.addClass("first");
					}
					$("#rightbox .product").append(oli);
						
					}
					
				
					myScroll1.refresh();
						
					



				
				
				}
			})
			}
		})

	},
	Search:function(){


		
		$("#header img").bind('tap',function(){
			// $("#content").hide();
			// $("#header .box").hide();
			// $(this).hide();
			// $("#search").show();
			// $("#header .cancel").show();
			// $("#content1").show();
			// console.log('jlkjlk');
			// console.log(1111321321);

			window.history.pushState(true,null,null);

			window.onpopstate();
		})


		window.onpopstate=function(){
			console.log(history.state);
			if(history.state)
			{
				$("#content").hide();
				$("#header .box").hide();
				$("#header img").hide();
				$("#search").show();
				$("#header .cancel").show();
				$("#content1").show();
			}
			else
			{
				console.log(1);
				$("#content").show();
				$("#header .box").show();
				$("#header .cancel").hide();
				$("#search").hide();
				$("#header img").show();
				$("#content1").hide();
			}
		}
		
		$("#header .cancel").bind('tap',function(){
			// $("#content").show();
			// $("#header .box").show();
			// $(this).hide();
			// $("#search").hide();
			// $("#header img").show();
			// $("#content1").hide();
			console.log(12);
			// console.log(history.state);
			window.history.back();
		})
	},
	
	History:function(){
		var visitedarr=new Array();
		$("#search input").blur(function(){
			if(localStorage.getItem("history"))
			{
				visitedarr=localStorage.getItem("history");
				visitedarr=JSON.parse(visitedarr);
				
			}
			
			var obj={};
			if(!$(this).val())
			{
				return;
			}
			$("#content1  ul.ul-1").html("");
			obj.value=$(this).val();
			visitedarr.push(obj);
			visitedarr=JSON.stringify(visitedarr);
			localStorage.setItem("history",visitedarr);
			var j=0;
			visitedarr=JSON.parse(visitedarr);
			for(var i=visitedarr.length-1;i>=0;i--)
			{
				
				j++;
				var oli=$("<li class='li"+j+"'></li>");
				
			
				oli.html(visitedarr[i].value);
				$("#content1  ul.ul-1").append(oli);
				if(j==4)
				{
					break;
				}
				
			}
			
		})
		
		if(localStorage.getItem("history"))
		{
			$("#content1  ul.ul-1").html("");
			visitedarr=localStorage.getItem("history");
			visitedarr=JSON.parse(visitedarr);
			var j=0;
			for(var i=visitedarr.length-1;i>=0;i--)
			{
				j++;
				var oli=$("<li class='li"+j+"'></li>");
				
			
				oli.html(visitedarr[i].value);
				$("#content1  ul.ul-1").append(oli);
				if(j==4)
				{
					break;
				}
				
			}
		}
		
		$("#content1 .h_one .delete").tap(function(){
			localStorage.removeItem("history");
			$("#content1  ul.ul-1").html("");
			visitedarr=[];
		})
	}

}













