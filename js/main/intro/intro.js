//intro 
$(document).ready(function(){
    
    initDOM_intro('#intro');
    eventBinding_intro();
});

var $wrap;
var $btn;
var $slide;

function initDOM_intro(selector){
    $wrap = $(selector);
    $btn = $wrap.find('.btn>li');
    $slide = $wrap.find('.slide');
}

function eventBinding_intro(){
    $btn.on('click', function(e){
        e.preventDefault();

        var i = $(this).index();

        $btn.removeClass('on');
        $(this).addClass('on');

        $slide.stop().animate({marginLeft : (-100 * i) + '%'}, 500);

        $slide.find('li').removeClass('on');
        $slide.find('li').eq(i).addClass('on')
    })
}
//intro