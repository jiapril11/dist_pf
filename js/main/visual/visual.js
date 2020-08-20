$(document).ready(function(){
    
    eventBinding_visual();

});

var toggleChk = true;

function eventBinding_visual(){
    
    $('.toggle').on('click', function(){

        var window_wid = $(window).width();
        var i = $(this).parent('article').index();
        var $this = $(this);

        if(toggleChk && window_wid > 1179){
            activeMotion_visual($this, i);
        }else{
            inactiveMotion_visual();
        }
        
    });
}

function activeMotion_visual(item, index){
    $('article').removeClass('on');
            $('.toggle').removeClass('on');
  
            $(item).parent('article').addClass('on');
            $(item).addClass('on');

            setTimeout(function(){
                $('article').eq(index).children('.txt').fadeIn(500);
                toggleChk = false;
            },500)

}

function inactiveMotion_visual(){
    $('article').removeClass('on');
    $('article').children('.txt').hide();
    
    setTimeout(function(){
        $('.toggle').removeClass('on');            
        toggleChk = true;
    },500)
}