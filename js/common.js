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

	// TOP BTN
	topEvent : function(){
		var btn = $("#footer .btn-top");

		// default
		if($(window).scrollTop() > 30) btn.fadeIn(300);

		// click
		btn.live("click", function(){
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
	tabEvent : function(tabName, hasClassName, contName, liName){ //
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

	$('.main-slider .slider').slick({
		autoplay:true,
		dots: true,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		ltr: true,
		cssEase: 'linear'
	});
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
	$("footer").load('/gbgs_lib/html/include/footer.html');
	// ------------------------------------------개발시 삭제

	// 개발시 위 코드 삭제 후, 아래 코드 활성화 하시기 바랍니다.
	// gbgs.gnbEvent(); // gnb animation js

})