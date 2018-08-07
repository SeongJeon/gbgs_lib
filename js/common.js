/* -----------------------------------------------------------------
PC & MOBILE Class JAVASCRIPT
----------------------------------------------------------------- */
// 진입 모바일
if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){$("body").addClass("mobile");}
else{$("body").addClass("pc");}


/* -----------------------------------------------------------------
OPTION PLUG-IN FUNCTION
----------------------------------------------------------------- */
var gbgs = {
	// GNB
	gnbEvent : function(){
	},

	//footer
	footerEvent : function(){
		// Go to Selected site
		$(".footer-select .sel-type1").on("change", function(){
			if($("option:selected", this).val() == undefined || $("option:selected", this).val() == null || $("option:selected", this).val() == '') return false;

			var v = $("option:selected", this).val();
			window.open(v);
		});

		// Slick
		$('.footer-banner-zone .slider').slick({
			autoplay: true,
			autoplaySpeed: 3000,
			infinite: true,
			speed: 400,
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			cssEase: 'linear',
			accessibility: true,
			prevArrow: $(".footer-banner-zone .btn-prev"),
			nextArrow: $(".footer-banner-zone .btn-next"),
			responsive: [
			   {
			      breakpoint: 1320,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 1,
			        infinite: true,
			        dots: false
			      }
			   },
			   {
			      breakpoint: 768,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 1
			      }
			   }
			]
		});

		// Slick stop btn
		$('.footer-banner-zone .btn-stop').on('click', function(){
			var pauseBtn = $(this);
			if (pauseBtn.hasClass('paused')){
				$(".footer-banner-zone .slider").slick('slickPause');
				pauseBtn.removeClass('paused');
				pauseBtn.html('재생');
			} else {
				$(".footer-banner-zone .slider").slick('slickPlay');
				pauseBtn.addClass('paused');
				pauseBtn.html('정지');
			}
		});

	},

	asideEvent : function(){
		// Top btn
		var btn = $("#aside #btn-top");

		if($(window).scrollTop() > 30) btn.fadeIn(300);
		// click
		btn.on("click", function(){
			$("html,body").animate({"scrollTop": 0},300);
			return false;
		});
		// scroll
		$(window).scroll(function(){
			if($(window).scrollTop() > 30) btn.fadeIn(300);
			else btn.fadeOut(300);
		});

	},

	// TAB SHOW / HIDE
	tabEvent : function(tabName, hasClassName, contName, liName){
		if($(tabName).length < 1) return false;
		liName == undefined ? liName = "li" : liName;

		var curr = 0;

		// default
		$(contName).eq($(tabName).find("."+hasClassName).index()).show().siblings(contName).hide();

		// click
		$(tabName).find(liName).live("click", function(){
			if($(this).hasClass(hasClassName)) return false;

			curr = $(this).index();
			$(this).addClass(hasClassName).siblings().removeClass(hasClassName);
			$(contName).eq(curr).show().siblings(contName).hide();

			return false;
		});
	},

	// ACCORDION
	accordionEvent: function(accordionName, qName, aName, openClass, allGroupName){
		if($(accordionName).length < 1) return false;
		var spd = 300;

		$(accordionName).find(qName).live("click", function(){
			var _this = $(this).closest(accordionName);
			if(_this.hasClass(openClass)){ _this.find(aName).slideUp(spd); }
			else{
				_this.find(aName).slideDown(spd);
				_this.closest(allGroupName).siblings().find(aName).slideUp(spd);
			}
			_this.toggleClass(openClass).closest(allGroupName).siblings().find(accordionName).removeClass(openClass);
			return false;
		});
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
	},

	// on Toggle class
	onToggleEvent: function(){
		if($(".js-ontoggle").length < 1) return false;

		var box = $('.js-ontoggle');
		box.each(function(){
			var btn = $(this).find(".js-btn");

			btn.live("click", function(e){
				e.preventDefault;
				$(this).parent().addClass("on").siblings().removeClass("on");
			})
		})
	}
};


/* -----------------------------------------------------------------
MAIN JAVASCRIPT
----------------------------------------------------------------- */
var main_Js = (function(){
	if($("#container").hasClass("main") == false ) return false;

	// main to visual
	$('.main-visual-zone .slider').slick({
		autoplay:true,
		dots: true,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		ltr: true,
		cssEase: 'linear'
	});

	// main quick menu
	$('.main-quick-zone .quick-slider').slick({
		autoplay:false,
		dots: false,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		ltr: true,
		cssEase: 'linear',
		slidesToShow: 8,
		slidesToScroll: 1,
		responsive: [
		   {
		      breakpoint: 1320,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: false
		      }
		   }
		]
	});
})();


/* -----------------------------------------------------------------
FIXED PLUG-IN FUNCTION
----------------------------------------------------------------- */
// TAB FUNCTION
var plugin_tab = (function(){
	// TAB SHOW / HIDE
	function tabEvent(){
		var tabName = '.js-tab', hasClassName = '.current', contName = '.tab-contents', liName = '.li', curr = 0;

		if($(tabName).length < 1) return false;

		// default
		$(contName).eq($(tabName).find("."+hasClassName).index()).show().siblings(contName).hide();

		// click
		$(tabName).find(liName).live("click", function(){
			if($(this).hasClass(hasClassName)) return false;

			curr = $(this).index();
			$(this).addClass(hasClassName).siblings().removeClass(hasClassName);
			$(contName).eq(curr).show().siblings(contName).hide();

			return false;
		});
	}
})();

// ACCORDION
$(document).on("click", ".js-acco .btn-question", function(){
  var parentBox=$(this).closest("li"),
  qName = $(this), openClass = "open", aName = ".answer", spd=300;

	if(parentBox.hasClass(openClass)){ parentBox.find(aName).slideUp(spd); }
	else{
		parentBox.find(aName).slideDown(spd);
		parentBox.siblings().find(aName).slideUp(spd);
	}
	parentBox.toggleClass(openClass).siblings().removeClass(openClass);
	return false;
})


/* -----------------------------------------------------------------
DOCUMENT READY
----------------------------------------------------------------- */
$(document).ready(function(){
})


/* -----------------------------------------------------------------
LOAD
----------------------------------------------------------------- */
$(window).load(function(){
	//-------------------------------------------개발시 삭제
	$("header").load('/gbgs_lib/html/include/header.html', function(){
		gbgs.gnbEvent(); // gnb animation js
	});
	$("footer").load('/gbgs_lib/html/include/footer.html', function(){
		gbgs.footerEvent();
	});
	$("aside").load('/gbgs_lib/html/include/aside.html', function(){
		gbgs.asideEvent();
	});
	// ------------------------------------------개발시 삭제


	// 개발시 위 코드 삭제 후, 아래 코드 활성화 하시기 바랍니다.
	// gbgs.gnbEvent(); // gnb animation js
	// gbgs.footerEvent(); // footer js
	// gbgs.asideEvent(); // aside js

})