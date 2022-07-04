$.ajaxPrefilter(function( options, original_Options, jqXHR ) {
  options.async = true;
});
function loadHtml(rootDir,htmlName,target,id) { // ルートディレクトリまでのパス、読み込むhtml名、はめ込み先ターゲットID
  $.ajax({
    beforeSend: function(xhr){
      xhr.overrideMimeType('text/html;charset=utf-8'); //文字化け防止、utf-8に変換
    },
    url: rootDir + htmlName + ".html",
    dataType: 'html',
    success: function(html){
      html = html.replace(/\{\$root\}/g, rootDir);
      if(id != undefined) html = $(html).find(id);
      $(target).html(html);
    }
  });
}





$(function() {
  $(".tabs a").click(function(){
    // 次に選択されたコンテンツを再表示する
    var target = $(this).attr("href");
    // 現在のcurrentクラスを削除
    $(".active").removeClass("active");

    $(this).closest("li").addClass("active");
    $($(this).attr("href")).addClass("active");
    return false;
  });
});

$(function() {
  $(document).on("click", ".menu_btn", function() {
    $(this).find(".menu-trigger").toggleClass("active");
    $("body").toggleClass("menu-open");
  });
  $(document).on("click", ".overlay", function() {
    $(".menu_btn").trigger("click");
  });
});

$(function() {
  $(document).on("click", ".menu_level_0 > li", function(e) {
    if(!$(e.target).closest("a").length) { //クリックした部分がアンカー以外だった場合、下層を表示
      var target = $(e.target).closest("li");
      if(target.find(".menu_level_1").length) {
        if(isSp()) {
          target.toggleClass("active");
          target.find(".menu_level_1").slideToggle();
        }
      }
      else {
        top.location.href = target.find("a").attr("href");
      }
    }
  });
});

$(function() {
  var searchbox = $(".search-box");
  searchbox.find("input").focusin(function(e) {
    searchbox.addClass("show_keyword");
  });
  $(window).scroll(function() {
    if(searchbox.hasClass("show_keyword")) {
      searchbox.removeClass("show_keyword");
    }
  });
  

});
$(document).on('click', function(e){
  if( $(e.target).closest('.search-box').length == 0 ){
    $(".search-box").removeClass("show_keyword");
  }
});

//$(function() {
//  if(isSp()) {
//    $(window).on('scroll', function() {
//      if($(this).scrollTop() > $(".top-panel").height()) {
//        $('.header_main').addClass('fixed');
//        $('#main').css("margin-top", $('.header_main').height() + 40);
//      }
//      else if($("body").hasClass("menu-open")) {
//
//      }
//      else {
//        $('.header_main').removeClass('fixed');
//        $('#main').attr("style","");
//      }
//    });
//  }
//});

function isSp() {
  var w =$(window).width();
  if(w > 767) {
    return false;
  }  
  return true;
}


$(function() {
  $(".lp_nav a").on("click", function() {
    var target = $(this).attr("data-target");
    var targetPos = $(target).offset().top;
    $("html, body").animate({scrollTop:targetPos},500,"swing");
    return false;
  });
});

$(function() {
  $(".lp_nav2 a").on("click", function() {
    var target = $(this).attr("data-target");
    var targetPos = $(target).offset().top;
    $("html, body").animate({scrollTop:targetPos},500,"swing");
    return false;
  });
});

$(function() {
  var pagetop = $("#pagetop");
  $(window).scroll(function() {
    if($(window).scrollTop() > 500) {
      pagetop.addClass("visible");
    }
    else {
      pagetop.removeClass("visible");
    }
  });

  
  pagetop.on("click", function() {
    $("html,body").animate({scrollTop:0}, "500", "swing");
  });
});



if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
