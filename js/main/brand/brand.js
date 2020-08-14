$(document).ready(function(){

    initDOM_brand('#brand');
    init_brand();

});

    var $wrap;
    var $banner;
    var $prev;
    var $next;
    var speed;
    var isAnimate_BI;

    function initDOM_brand(selector){
        $wrap = $(selector);
        $banner = $wrap.find('.banner');
        $prev = $wrap.find('.prev');
        $next = $wrap.find('.next');
        speed = 500;
        isAnimate_BI = true;
    }

    function init_brand(){
        responsive_brand();
        $(window).on('resize', responsive_brand);
    
        $banner.children('li').last().prependTo($banner);
    }

    function responsive_brand(){
        var wid = $(this).width();

        if(wid>=1180) resizing_brand(3);
        if(wid>=640 && wid<1180) resizing_brand(2);
        if(wid<640) resizing_brand(1);
    }

    function resizing_brand(num){
        
        $banner.css({marginLeft : (-100/num)+'%'});

        $prev.off();
        $next.off();

        $prev.on('click', function(e){
            e.preventDefault();

            if(isAnimate_BI){
                isAnimate_BI = false;

                $banner.animate({marginLeft : '0'}, speed, function(){
                    $(this).children('li').last().prependTo(this);
                    $(this).css({marginLeft : (-100/num)+'%'});

                    setTimeout(function(){
                        isAnimate_BI = true;
                    }, speed)
                });

            }
            
            
        });
    
        $next.on('click', function(e){
            e.preventDefault();
    
            if(isAnimate_BI){
                isAnimate_BI = false;

                $banner.animate({marginLeft : (-100/num) * 2 +'%'}, speed, function(){
                    $(this).children('li').first().appendTo(this);
                    $(this).css({marginLeft : (-100/num)+'%'});

                    setTimeout(function(){
                        isAnimate_BI = true;
                    }, speed)
                });
                
            }
            
        });
    }
    
