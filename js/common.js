// 진입 모바일
if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	$("body").addClass("mobile");
}else{$("body").addClass("pc"); }


var gbgs = {
	// GNB
	gnbEvent: function(){
		
	},

	// LNB
	lnbEvent: function(){
		if($("#lnb .sub").length < 1) return false;

		var $lnb = $("#lnb"),
		$zone = $(".lnb-zone"),
		$top = $(".container-header"),
		_spd = 150;

		// default
		if($(".current .sub").length > 0) {
			if($(window).width() > 600) $zone.css({"margin-bottom": "60px"}).find(".current .sub").show();
		}

		// mouse

		$lnb.find(">li>a").on("mouseenter", function(){
			var _this = $(this).closest("li");
			if(_this.hasClass("over") || $(window).width() < 600) return false;

			if(_this.find(".sub").length > 0){
				_this.find(".sub").stop().slideDown(_spd);
				_this.siblings().find(".sub").hide();
				$zone.stop().animate({"margin-bottom": "60px"}, _spd);
			}else{
				$lnb.find(".sub").stop().slideUp(_spd);
				$zone.stop().animate({"margin-bottom": "0"}, _spd);
			}
			_this.addClass("over").siblings().removeClass("over");
		});

		$lnb.on("mouseleave", function(){
			$lnb.find(".over").removeClass("over");
			$lnb.find(".sub").slideUp(_spd);
			$zone.stop().animate({"margin-bottom": "0"}, _spd);
		});

		$(window).on("resize", function(){
			if($(window).width() > 600) return false;
			$zone.css({"margin-bottom": 0}).find('.over').removeClass("over");
			$lnb.find(".sub").hide();
		})
	},

	// TAB MENU
	tabEvent: function(e){
		var $this = $(e), html = "<span class='hidden'>현재 선택된 탭</span>";

		if($this.closest("li").hasClass("current")) return false;
		$this.after(html).closest("li").addClass("current").siblings().removeClass("current").find(".hidden").remove();
	},

	// SHOW HIDE MOUSE
	showhideEvent: function(groupName, btnName, showArea){
		var $group = $(groupName);
		$(btnName ,$group).on("mouseenter", function(){
			if($(this).parent().hasClass("over")) return false;
			$(this).parent().addClass("over").siblings().removeClass("over");

		})
		$group.on("mouseleave", function(){
			$group.find(".over").removeClass("over");

		})
	},

	// LAYER LOAD
	layerEvent: function(layerName){
		$.ajax({
			url:layerName,
			success: function(e){
				$("#wrap").append("<article></article>");
				$("article").html(e);
			}
		})
	},
	layerCloseEvent: function(e){
		$(e).closest("article").remove();
	}


};





$(document).ready(function(){
	// 메인 > 비쥬얼 슬라이드
	$('.main-slider .slider').slick({
		autoplay:true,
		dots: true,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		ltr: true,
		cssEase: 'linear'
	});
	// 메인 > 활동사진
	$('.gallery-slider .slider').slick({
		dots: false,
		infinite: true,
		speed: 400,
		ltr: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		cssEase: 'linear',
		responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 970,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
		]
	});

})



$(window).load(function(){
	//-------------------------------------------개발시 삭제
	// $("header").load('/gbgs_lib/html/include/header.html', function(){
	// });
	// $("footer").load('/gbgs_lib/html/include/footer.html');
	// ------------------------------------------개발시 삭제

	// 개발시 위 코드 삭제 후, 아래 코드 활성화 하시기 바랍니다. 

})


