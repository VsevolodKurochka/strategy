$(document).ready(function(){

		// Variables
		var body 							= $("body"),
				modalVisibility		= "showing-in",
				active 						= "active",
				backdrop 					= $("<div />", {
					class: "vmodal-backdrop"
				});

		// Menu
			$(window).scroll(function(){
				if($(window).scrollTop() > 100){
					$('.vnav-wrap-fixed').addClass('active');
				}else{
					$('.vnav-wrap-fixed').removeClass('active');
				}
			});
			$("[data-menu]").click(function(){
				var menu_href = $(this).attr("data-menu");
				//$(body).toggleClass('vnav-active');
				$(menu_href).toggleClass('vnav-active');
				//$("[data-menu]").not($(this)).removeClass(active);
				$(this).toggleClass(active);
			});
			$('.vnav a[href*="#"]').click(function(){
				var href = $(this).attr('href');
				$('body,html').animate({
					scrollTop: $(href).offset().top
				},2000);
				$("[data-menu]").removeClass(active);
				body.toggleClass(active);
				return false;
			});
			$(".vnav-text-toggle").click(function(){
				$(this).toggleClass(active);
				$(".vnav-text").toggleClass(active);
			});


		// Scroll to block
			$('.anchor').click(function(){
				var href = $(this).attr('href');
				$('body,html').animate({
					scrollTop: $(href).offset().top
				},2000);
				return false;
			});


		// Modal
			var videoBlock = $('#modalvideo .vmodal-video');
			function videoBlockClear(){
				videoBlock.html('');
			}
			function videoBlockIsShowing(){
				if($("#modalvideo").hasClass('showing-in')){
					videoBlockClear();
				}
			}
			$('[data-func="vmodal"]').click(function(){
				var thisTarget = $(this).attr("data-target");
				videoBlockIsShowing();
				if ( $(thisTarget).length > 0 ) {
					$('.vmodal').removeClass(modalVisibility)
					$(thisTarget).addClass(modalVisibility);
					body.addClass("vmodal-open").append(backdrop.addClass(modalVisibility));
				}else{
					console.log("No element with " + thisTarget + " name");
				}
			});
			$('[data-close="vmodal"]').click(function(){
				$(this).closest(".showing-in").removeClass(modalVisibility);
				backdrop.removeClass(modalVisibility);
				body.removeClass("vmodal-open");
			});
			$(window).click(function(e){
				if ( backdrop.length > 0 && $(e.target).is(".vmodal") ) {
					$(".showing-in").removeClass(modalVisibility);
					backdrop.removeClass(modalVisibility);
					videoBlockClear();
					body.removeClass("vmodal-open");
				}
			});


			// Video
			$('[data-video]').click(function(){
				var thisVideo = $(this).attr('data-video');
				var thisSource = $(this).attr('data-source');
				var thisTitle = $(this).attr('data-title');
				var output;
				videoBlockClear();
				if(thisTitle){
					$("#modalvideo .vmodal-title").text(thisTitle);
				}
				if( thisSource == 'youtube'){
					output = $('<iframe />', {
						class: 'vmodal-iframe',
						src: thisVideo + '?autoplay=1'
					}).appendTo('#modalvideo .vmodal-video');
				}else if(thisSource == 'uppod'){
					this.player = new Uppod({
						m:"video",
						uid:"videoplayer",
						file: thisVideo
					});
				}
			});
			$("#modalvideo .vmodal-close").click(function(){
				videoBlockClear();
			});

		function setCookie(name, value, options) {
		  options = options || {};

		  var expires = options.expires;

		  if (typeof expires == "number" && expires) {
		    var d = new Date();
		    d.setTime(d.getTime() + expires * 1000);
		    expires = options.expires = d;
		  }
		  if (expires && expires.toUTCString) {
		    options.expires = expires.toUTCString();
		  }

		  value = encodeURIComponent(value);

		  var updatedCookie = name + "=" + value;

		  for (var propName in options) {
		    updatedCookie += "; " + propName;
		    var propValue = options[propName];
		    if (propValue !== true) {
		      updatedCookie += "=" + propValue;
		    }
		  }

		  document.cookie = updatedCookie;
		}
		function getCookie(name) {
		  var matches = document.cookie.match(new RegExp(
		    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		  ));
		  return matches ? decodeURIComponent(matches[1]) : undefined;
		}
		setCookie('deadline', 477000);
		var remain = getCookie('deadline');
		function parseTime_bv(timestamp){
		    if (timestamp < 0) timestamp = 0;
		 
		    var day = Math.floor( (timestamp/60/60) / 24);
		    var hour = Math.floor(timestamp/60/60);
		    var mins = Math.floor((timestamp - hour*60*60)/60);
		    var secs = Math.floor(timestamp - hour*60*60 - mins*60); 
		    var left_hour = Math.floor( (timestamp - day*24*60*60) / 60 / 60 );
		 
		    $('span.afss_day_bv').text("0" + day);
		    $('span.afss_hours_bv').text(left_hour);
		 
		    if(String(mins).length > 1)
		        $('span.afss_mins_bv').text(mins);
		    else
		        $('span.afss_mins_bv').text("0" + mins);
		    if(String(secs).length > 1)
		        $('span.afss_secs_bv').text(secs);
		    else
		        $('span.afss_secs_bv').text("0" + secs);
		     
		}
		setInterval(function(){
      
      parseTime_bv(remain);
      remain = remain - 1;
    }, 1000);


    function Utils() {
		}
		Utils.prototype = {
		    constructor: Utils,
		    isElementInView: function (element, fullyInView) {
		        var pageTop = $(window).scrollTop();
		        var pageBottom = pageTop + $(window).height();
		        var elementTop = $(element).offset().top;
		        var elementBottom = elementTop + $(element).height();

		        if (fullyInView === true) {
		            return ((pageTop < elementTop) && (pageBottom > elementBottom));
		        } else {
		            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
		        }
		    }
		};
		var Utils = new Utils();
		var extraRow;
		function visibleElements(){
			var isElementInView = Utils.isElementInView($('.recepy-holidays'), false);
			$('.extra-row').each(function(){
				extraRow = Utils.isElementInView($(this), false);
				if(extraRow){
					$(this).addClass(active);
				}else{
					$(this).removeClass(active);
				}
			});
			if( isElementInView ){
				$('.recepy-holidays').css('filter', 'grayscale(0)').addClass(active);
			}else{
				$('.recepy-holidays').css('filter', 'grayscale(1)').removeClass(active);
			}
		}
		visibleElements();
		$(window).scroll(function(){
			visibleElements();
		});

    $('.sliderBig, .place-slider').slick({
    	swipeToSlide: true
    });
    $('#intro, #scene').parallax();
    function filterWho(){
    	$('.who-wrap').hide();
    	var text = $('.who-input').val();
    	console.log(text);
    	$('.who-wrap').each(function(){
    		if( $(this).text().toUpperCase().indexOf(text.toUpperCase()) != -1 ){
    			$(this).show();
    		}
    	});
    }

    $('.who-input').keypress(function(){
    	filterWho();
    });

    var mousemoveXray;
    $('.xray-slide').css('width', $(window).width());
    $('.xray-wrap').mousemove(function(e){
    	mousemoveXray = e.pageX;
    	$('.xray').css('width', mousemoveXray + 'px');
    });
});	