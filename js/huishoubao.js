

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
		$.getJSON("json/product.json",function(data){
			$("#rightbox .product").html("");
						for(var i=0;i<data[0].length;i++){
						var oli=$("<li  ><a href='javascript:;'><span>1</span><p>iPhone7 Plus</p></a></li>");
						oli.find("p").html(data[0][i].name);
						oli.find("span").html(data[0][i].id);
						if(i>=0&&i<=2)
						{
							oli.addClass("first");
						}
						$("#rightbox .product").append(oli);

						}
						var op=$("<p class='bottom'>O(∩_∩)O~已经看到最后了哦</p>");
						$("#rightbox .product").append(op);
						// var myScroll=new IScroll("#rightbox",{});
						myScroll1.refresh();
		});

		$("#aside li").bind('tap',function(){
			var index=$(this).index();

			$(this).addClass("li-active").siblings().removeClass("li-active");
			$.getJSON("json/product.json",function(data){
				for(var key in data){
					if(key==index)
					{
						$("#rightbox .product").html("");
						for(var i=0;i<data[key].length;i++){
						var oli=$("<li  ><a href='javascript:;'><span>1</span><p>iPhone7 Plus</p></a></li>");
						oli.find("p").html(data[key][i].name);
						oli.find("span").html(data[key][i].id);
						if(i>=0&&i<=2)
						{
							oli.addClass("first");
						}
						$("#rightbox .product").append(oli);
						
						
						}
						var op=$("<p class='bottom'>O(∩_∩)O~已经看到最后了哦</p>");
						$("#rightbox .product").append(op);
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
	},
	Search:function(){
		
		$("#header img").bind('tap',function(){
			$("#content").hide();
			$("#header .box").hide();
			$(this).hide();
			$("#search").show();
			$("#header .cancel").show();
			$("#content1").show();
		})
		
		$("#header .cancel").bind('tap',function(){
			$("#content").show();
			$("#header .box").show();
			$(this).hide();
			$("#search").hide();
			$("#header img").show();
			$("#content1").hide();
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











