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
			$('.vnav-menu a[href*="#"]').click(function(){
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
				}
			});
			$("#modalvideo .vmodal-close").click(function(){
				videoBlockClear();
			});

		// Collapse
			$(".vcollapse-inner.active").children(".vcollapse-body").slideDown();
			$(".vcollapse-header").click(function(){
				$(this).parent().toggleClass(active);
				$(this).next().slideToggle("slow");
				$(this).closest(".vcollapse-wrap").children(".vcollapse-inner").not($(this).parent()).removeClass("active");
				$(this).closest(".vcollapse-wrap").children(".vcollapse-inner").children(".vcollapse-body").not($(this).next()).slideUp("slow");
			});


		// Tabs
			$('[data-func="tab"]').click(function(){
				
				// Tab links toggle class
					$(this).closest(".vtabs-list").children("li").removeClass(active);
					$(this).parent().addClass(active);

				// Show tab content
					var tabTarget = $(this).attr('data-target');
					$(tabTarget).addClass(active);
					$(".vtabs-content > div").not($(tabTarget)).removeClass(active);
				
			});


		// Develope
			// var widthDevice = $(window).width();
			// $(".development").html(widthDevice);
		// var remain_bv   = 477000;
		

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
		//console.log(remain);
		console.log( document.cookie );
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
      // if(remain <= 0){
      // }
    }, 1000);
});	