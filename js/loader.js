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
