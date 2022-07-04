$(function (){
    var $chkbxFilter_all = $('#all');

    //絞り込まないボタンをクリック時にチェックボックスをオフにする
    $chkbxFilter_all.click(function() {
		  $(".sort").prop('checked',false);
		  $chkbxFilter_all.prop('checked',true);
    });

    //チェックボックスがクリックされた時の動作
    $("#filter input").click(function() {


        $.each($chkbxFilter_tags, function() {
            if($('#' + this).is(':checked')) {
                         $("#result " + $chkbxFilter_blocks + ":not(." + this + ")").addClass('hidden-not-' + this);
                }
            else if($('#' + this).not(':checked')) {
                         $("#result " + $chkbxFilter_blocks + ":not(." + this + ")").removeClass('hidden-not-' + this);
                }
        });


	});





    //チェックボックスがクリックされた時の動作
    $("#filter input").click(function() {


        $.each($chkbxFilter_tags, function() {
            if($('#' + this).is(':checked')) {
                         $($chkbxFilter_select + ":not(.s" + this + ")").addClass('selecter' + this);
                }
            else if($('#' + this).not(':checked')) {
                         $($chkbxFilter_select + ":not(.s" + this + ")").removeClass('selecter' + this);
                }
        });

	});





});
    
