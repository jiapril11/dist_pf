//intro 
$(document).ready(function(){
    var $wrap = $('#intro');
    var $btn = $wrap.find('.btn>li');
    var $slide = $wrap.find('.slide');

    $btn.on('click', function(e){
        e.preventDefault();

        var i = $(this).index();

        $btn.removeClass('on');
        $(this).addClass('on');

        $slide.stop().animate({marginLeft : (-100 * i) + '%'}, 500);

        $slide.find('li').removeClass('on');
        $slide.find('li').eq(i).addClass('on')
    })
});
//intro