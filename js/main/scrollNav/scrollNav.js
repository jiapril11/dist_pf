//***scroll  시작***

$(document).ready(function(){
    var base = 300; 
        
    var $scrollNav = $('#scrollNav');

    var pos_header =0;
    var pos_intro = $('#intro').offset().top;
    var pos_mainCtt = $('#main_content').offset().top;
    var pos_tabMenu = $('#brand').offset().top;
    var pos_news = $('#news').offset().top;
    var pos_slideBanner = $('#slideBanner').offset().top;

    var positionArr = [pos_header, pos_intro, pos_mainCtt, pos_tabMenu, pos_news, pos_slideBanner];

    liSetting();
    
    var $scrollNav_li = $('#scrollNav>li');
    var $scrollNav_a = $('#scrollNav>li>a');

    var $topBtn = $('#top');

    var scrollTop;
    var wid;
    
    $(window).on('resize', function(){

        pos_header = 0;
        pos_intro = $('#intro').offset().top;
        pos_mainCtt = $('#main_content').offset().top;
        pos_tabMenu = $('#brand').offset().top;
        pos_news = $('#news').offset().top;
        pos_slideBanner = $('#slideBanner').offset().top;
    
        positionArr = [];
        positionArr = [pos_header, pos_intro, pos_mainCtt, pos_tabMenu, pos_news, pos_slideBanner];

        //top 버튼 활성화
        if(scrollTop < pos_slideBanner-base || wid > 1179){
            $topBtn.hide();
        }

        if(scrollTop >= pos_slideBanner-base && wid < 1180){
            $topBtn.fadeIn(500);
        }
    });

    $(window).on('scroll', function(){
        scrollTop = $(window).scrollTop();
        wid = $('body').outerWidth();

        if(scrollTop >= pos_header - base && scrollTop < pos_intro - base){
            $scrollNav_a.removeClass('on');
            $scrollNav_li.eq(0).children('a').addClass('on');
        }
        if(scrollTop >= pos_intro - base && scrollTop < pos_mainCtt - base){
            $scrollNav_a.removeClass('on');
            $scrollNav_li.eq(1).children('a').addClass('on');
        }
        if(scrollTop >= pos_mainCtt - base && scrollTop < pos_tabMenu - base){
            $scrollNav_a.removeClass('on');
            $scrollNav_li.eq(2).children('a').addClass('on');
            $('#main_content article').addClass('on');
        }
        if(scrollTop >= pos_tabMenu - base && scrollTop < pos_news - base){
            $scrollNav_a.removeClass('on');
            $scrollNav_li.eq(3).children('a').addClass('on');
        }
        if(scrollTop >= pos_news - base && scrollTop < pos_slideBanner - base){
            $scrollNav_a.removeClass('on');
            $scrollNav_li.eq(4).children('a').addClass('on');
        }

        if(scrollTop >= pos_slideBanner-base ){
            $scrollNav_a.removeClass('on');
            $scrollNav_li.eq(5).children('a').addClass('on');
        }

        //top 버튼 활성화
        if(scrollTop < pos_slideBanner-base || wid > 1179){
            $topBtn.hide();
        }

        if(scrollTop >= pos_slideBanner-base && wid < 1180){
            $topBtn.fadeIn(500);
        }
        
    });

    $scrollNav_a.on('click', function(e){
        e.preventDefault();
        var index = $(this).parents('li').index();
        var target = positionArr[index];
        $('html, body').stop().animate({scrollTop : target });

        // console.log(target);
        // console.log($('html, body').scrollTop());
    });

    $topBtn.on('click', function(){
        $('html, body').stop().animate({scrollTop : 0 },500);
    })

    function liSetting(){

        for(var i=0; i < positionArr.length; i++){
            $scrollNav.append(
                "<li><a href='#'></a></li>"
            )
        }

        $scrollNav.children('li').first().children('a').addClass('on');
    };

});
//***scroll  끝***