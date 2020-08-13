$(document).ready(function(){

    $(window).on('load', function(){
        console.log('loading done');
        $('#loading_bg').animate({
            opacity: 0
        }, 1000, function(){
            $(this).remove();
            // $('html, body').removeAttr('style');
        });
    });

});