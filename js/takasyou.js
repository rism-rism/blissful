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

//ハンバーガーメニュー
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

//指定時間表示させる
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
//--- メニュークリックして開閉します
jQuery('.switch_').click(function() {
	if (jQuery(this).hasClass('op_')) {
		jQuery(this).removeClass('op_');
		jQuery('#gnav_search_box').slideUp();
	} else {
		jQuery(this).addClass('op_');
		jQuery('#gnav_search_box').slideDown();
	}
});

//--- ページトップへ戻る
jQuery('#page_top a').click(function() {
	var speed = 500;
	var href= jQuery(this).attr("href");
	var target = jQuery(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top;
	position = position - 55;
	jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
	return false;
});

//--- �i�荞��
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


//スクロールしたら　ヘッダー固定します
jQuery( window ).on( 'scroll', function() {
	if ( 150 < jQuery( this ).scrollTop() ) { // 1000px以上スクロールしたら
	jQuery( '#global-nav' ).addClass( 'm_fixed' );
	} else {
	jQuery( '#global-nav' ).removeClass( 'm_fixed' );
	}
});

//ページのトップへ戻る
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
	}, 500); //0.5遘偵°縺代※繝医ャ繝励∈謌ｻ繧�
	return false;
});


//お知らせ閉じる
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
//お知らせ閉じるトグル数
for(var i = 1; i < 37; i++) {
	toggle(i);
}
	
