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
		moEvent();
		pcEvent();

		// pc gnb
		function pcEvent(){
			var header=$("#header"), gnb = $("#gnb"), gnbbtn = gnb.find("h2 a"), depth = gnb.find(".depth"),
			spd = 200, _temp = false;

			gnbbtn.on("mouseenter", function(){
				$(this).closest("li").addClass("on").siblings().removeClass("on");
				if(_temp == true) return false;
				header.stop().css({"padding-bottom": "350px"},spd);
				depth.stop().show();
				_temp = true;
			});

			gnb.on("mouseleave", function(){
				depth.hide(0, function(){
					gnbbtn.closest("li").removeClass("on");
				});
				header.css({"padding-bottom": "0"});
				_temp = false;
			});
		}

		// mobile gnb
		function moEvent(){
			var openbtn = $(".btn-menu"), gnb = $("#m-gnb"), closebtn = gnb.find(".btn-close"), spd=300;

			// open btn
			openbtn.on("click", function(){
				$("html, body").css({"overflow": "hidden"});
				gnb.show(0, function(){
					gnb.animate({"opacity": 1}, spd);
					gnb.find("a").focus();
				});
			})
			// close btn
			closebtn.on("click", function(){
				gnb.hide(0, function(){
					gnb.css({"opacity": 0});
					openbtn.focus();
					$("html, body").css({"overflow": "inherit"});
				})
			})
		}
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
			slidesToShow: 5,
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
		// if
		if($("#container").hasClass("main")) $("#aside").css({"top":"720px"});

		// var
		var aside = $("#aside"), btn = aside.find("#btn-top"), top = aside.offset().top;

		// default
		if($(window).width() > 1329) { pcEvent(); }
		else { moEvent(); }

		// resize
		$(window).resize(function(){
			if($(window).width() > 1329) {
				// console.log("pc");
				pcEvent();
			}else {
				// conso/le.log("m");
				moEvent();
			}
		})

		function moEvent(){
			//default
			$(window).off("scroll");
			if($(window).scrollTop() > 30) btn.fadeIn(300);
			else btn.hide();
			// scroll
			$(window).on('scroll', function(){
				if($(window).scrollTop() > 30) btn.fadeIn(300);
				else btn.fadeOut(300);
			});
		}
		function pcEvent(){
			//default
			$(window).off("scroll");
			btn.show();
			if($(window).scrollTop() >= top - 20){aside.css({"position": "fixed", "top": "20px"}); }
			else{aside.css({"position": "absolute", "top": top+"px"}); }

			// scroll
			$(window).on('scroll', function(){
				if($(this).scrollTop() >= top - 20){
					aside.css({"position": "fixed", "top": "20px"});
				}else{
					aside.css({"position": "absolute", "top": top+"px"});
				}
			});
		}

		// Top button click
		btn.on("click", function(){
			$("html,body").animate({"scrollTop": 0},300);
			$("#header .outlnk-group .btn-home").focus();
			return false;
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
		$(tabName).find(liName).on("click", function(){
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
		        slidesToShow: 5,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: false
		      }
		   },
		   {
		      breakpoint: 770,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: false
		      }
		   },
		   {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: false
		      }
		   }
		]
	});

	// main notice zone
	$('.main-notice-zone .notice-slider').slick({
		vertical: true,
		autoplay:true,
		dots: false,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		prevArrow: $(".main-notice-zone .btn-prev"),
		nextArrow: $(".main-notice-zone .btn-next"),
		cssEase: 'linear'
	});

	// main notice zone
	$('.main-movie-zone .movie-slider').slick({
		ltr: true,
		autoplay:true,
		dots: false,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		prevArrow: $(".main-movie-zone .btn-prev"),
		nextArrow: $(".main-movie-zone .btn-next"),
		cssEase: 'linear',
		slidesToShow: 3,
		slidesToScroll: 1,
		accessibility: true,
		responsive: [
		   {
		      breakpoint: 1320,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: false
		      }
		   }
		]
	});

	// main banner zone
	$('.main-banner-zone .banner-slider').slick({
		ltr: true,
		autoplay:true,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		prevArrow: $(".main-banner-zone .btn-prev"),
		nextArrow: $(".main-banner-zone .btn-next"),
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		dots: true,
		appendDots: $(".banner-indicator"),
		dotsClass: 'count',
		customPaging: function (slider, i) {
		return  '<em>'+(i + 1) + '</em>/' + slider.slideCount;
		}
	});
})();


/* -----------------------------------------------------------------
FIXED PLUG-IN FUNCTION
----------------------------------------------------------------- */
// TAB FUNCTION
var plugin_tab = (function(){
	// TAB SHOW / HIDE
	var tabName = '.js-tab', hasClassName = 'current', contName = '.tab-contents', liName = 'li', curr = 0;

	if($(tabName).length < 1) return false;

	// default
	$(contName).eq($(tabName).find("."+hasClassName).index()).show().siblings(contName).hide();
	$(tabName).find("."+hasClassName).append("<span class='hidden'>현재 선택 탭</span>");

	// click
	$(tabName).find(liName).on("click", function(){
		if($(this).hasClass(hasClassName)) return false;

		curr = $(this).index();
		$(this).addClass(hasClassName).append("<span class='hidden'>현재 선택 탭</span>").siblings().removeClass(hasClassName).find(".hidden").remove();
		$(contName).eq(curr).show().siblings(contName).hide();

		return false;
	});
})();

// ACCORDION FUNCTION
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

// GALLERY TAB FUNCTION
var gallery_tab = function(){
	$(".gallery-info .tab li a").on("click", function(){
		var index = $(this).parent().index(),
			slider = $(".gallery-info .tab-con .tab-contents");
		$(".gallery-info .tab li").removeClass("on");
		$(this).parent().addClass("on");
		slider.removeClass("on")
		slider.eq(index).addClass("on");
		$('.slider').slick('setPosition');
		return false;
	});
	$('.slider.room').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  adaptiveHeight: true,
	  dotsClass: 'custom-paging',
		customPaging: function (slider, i) {
		return  (i + 1) + '/' + slider.slideCount;
		}
	});
}();

// LNB FUNCTION
var plugin_lnb = (function(){
	if($("#lnb .more").length < 1) return false;

	//default
	$("#lnb .more.on").find(".depth").show();

	// click
	var snb = $("#lnb .more h3 a"), spd = 200;

	snb.on("click", function(){
		var _this = $(this).closest("li");
		if(_this.hasClass("on")) {
			_this.removeClass("on").find(".depth").stop().slideUp(spd);
		} else{
			_this.addClass("on").find(".depth").stop().slideDown(spd);
			_this.siblings(".more").removeClass("on").find(".depth").stop().slideUp(spd);
		}

		return false;
	})
})();

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