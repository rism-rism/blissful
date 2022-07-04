//PartsLoad
$(function() {
	$("#header").load("./header.html");
	$("#footer").load("./footer.html");
	$("#mainbody").load("./mainbody.html");
	$("#leftnavi").load("./leftnavi.html");
	$("#event").load("./event.html");
	$("#mainbody").load("./mainbody.html");
	$("#page_header").load("./page_header.html");
	$("#sp_header").load("./sp_header.html");
});

//繝上Φ繝舌�繧ｬ繝ｼ繝｡繝九Η繝ｼ
(function ($) {
	var $nav = $('#navArea');
	var $btn = $('.toggle_btn');
	var $mask = $('#mask');
	var open = 'open'; // class
	// menu open close
	$btn.on('click', function () {
		if (!$nav.hasClass(open)) {
		$nav.addClass(open);
		} else {
		$nav.removeClass(open);
		}
	});
	// mask close
	$mask.on('click', function () {
		$nav.removeClass(open);
	});
})(jQuery);

//謖�ｮ壽凾髢楢｡ｨ遉ｺ縺輔○繧�
$(".view_timer").each(function (index, target) {
	var startDate = $(this).attr("data-start-date");
	var endDate = $(this).attr("data-end-date");
	var nowDate = new Date();

	if (startDate) {
		startDate = new Date(startDate);
	} else {
		startDate = nowDate;
	}
	if (endDate) {
		endDate = new Date(endDate);
	}

	if (startDate <= nowDate && (!endDate || nowDate <= endDate)) {
		$(this).css('display', 'block');
	} else {
		$(this).remove();
	}
});
//--- 繝｡繝九Η繝ｼ繧ｯ繝ｪ繝�け縺励※髢矩哩縺励∪縺�
jQuery('.switch_').click(function() {
	if (jQuery(this).hasClass('op_')) {
		jQuery(this).removeClass('op_');
		jQuery('#gnav_search_box').slideUp();
	} else {
		jQuery(this).addClass('op_');
		jQuery('#gnav_search_box').slideDown();
	}
});

//--- 繝壹�繧ｸ繝医ャ繝励∈謌ｻ繧�
jQuery('#page_top a').click(function() {
	var speed = 500;
	var href= jQuery(this).attr("href");
	var target = jQuery(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top;
	position = position - 55;
	jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
	return false;
});

//--- �ｽi�ｽ闕橸ｿｽ�ｽ
if(jQuery('#sortbox_child').length){
	jQuery('.sort_switch_').click(function() {
		if (jQuery(this).hasClass('open_')) {
			jQuery(this).removeClass('open_');
			jQuery('#sortbox_child').slideUp();
		} else {
			jQuery(this).addClass('open_');
			jQuery('#sortbox_child').slideDown();
		}
	});
}


//繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺励◆繧峨繝倥ャ繝繝ｼ蝗ｺ螳壹＠縺ｾ縺�
jQuery( window ).on( 'scroll', function() {
	if ( 150 < jQuery( this ).scrollTop() ) { // 1000px莉･荳翫せ繧ｯ繝ｭ繝ｼ繝ｫ縺励◆繧�
	jQuery( '#global-nav' ).addClass( 'm_fixed' );
	} else {
	jQuery( '#global-nav' ).removeClass( 'm_fixed' );
	}
});

//繝壹�繧ｸ縺ｮ繝医ャ繝励∈謌ｻ繧�
$(window).scroll(function () {
	$('.shop_menu_btn').each(function () {
		var scroll = $(window).scrollTop();
		var amount = 100;
		if (scroll > amount) {
			$('.shop_menu_btn').addClass('show_insert_r');
		} else {
			$('.shop_menu_btn').removeClass('show_insert_r');
		}
	});
	$('#pageTop').each(function () {
		var scroll = $(window).scrollTop();
		var amount = 100;
		if (scroll > amount) {
			$('#pageTop').fadeIn();
		} else {
			$('#pageTop').fadeOut();
		}
	});
});
$('#pageTop').click(function () {
	$('html').animate({
		scrollTop: 1
	}, 500); //0.5驕伜�ﾂｰ邵ｺ莉｣窶ｻ郢晏現繝｣郢晏干竏郁ｬ鯉ｽｻ郢ｧ�ｽ
	return false;
});


//縺顔衍繧峨○髢峨§繧�
function toggle(number){
	document.getElementById("q" + number).addEventListener("click",function(){

		var toggle = document.getElementById("toggle" + number).className;
		if(toggle == "toggle_open"){
			document.getElementById("toggle" + number).className="toggle";
			document.getElementById("q" + number).className="h2_close";
			document.getElementById("open" + number).className="answer_close";
			return;
		};

		for(var i = 1; i < 37; i++) {
			if(i == number){
				document.getElementById("toggle" + i).className="toggle_open";
				document.getElementById("q" + i).className="h2_open";
				document.getElementById("open" + i).className="answer_open";
			}
			else {
				document.getElementById("toggle" + i).className="toggle";
				document.getElementById("q" + i).className="h2_close";
				document.getElementById("open" + i).className="answer_close";
			}
		}
	});
}
//縺顔衍繧峨○髢峨§繧九ヨ繧ｰ繝ｫ謨ｰ
for(var i = 1; i < 37; i++) {
	toggle(i);
}
	
