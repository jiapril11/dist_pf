$(document).ready(function(){
    
    var toggleChk = true;

    $('.toggle').on('click', function(){

        var window_wid = $(window).width();
        var i = $(this).parent('article').index();

        if(toggleChk && window_wid > 1179){
            $('article').removeClass('on');
            $('.toggle').removeClass('on');
  
            $(this).parent('article').addClass('on');
            $(this).addClass('on');

            setTimeout(function(){
                $('article').eq(i).children('.txt').fadeIn(500);
                toggleChk = false;
            },500)

           
        }else{
            $('article').removeClass('on');
            $('article').children('.txt').hide();
            
            setTimeout(function(){
                $('.toggle').removeClass('on');            
                toggleChk = true;
            },500)
            
        }
        
    });


});