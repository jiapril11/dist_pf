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
    

//cookie
$(document).ready(function(){
    // console.log(document.cookie);
    initDOM_cookie();
    init_cookie();
    eventBinding_cookie();
});

var cookieData_arr;  
var $cookieBox;
var $clxBox;
var $headerr;
var scrollTop;

function initDOM_cookie(){
    cookieData_arr = document.cookie;
    $cookieBox = $('#cookie');
    $clxBox = $cookieBox.find('.clx_ck');
    $header = $('#header');
    $visual = $('#visual');
    scrollTop = $(window).scrollTop();
    window_wid = $('body').width();
}

function init_cookie(){
    if(cookieData_arr.indexOf('today=done')<0 && scrollTop < 60){
        //쿠키가 없을때 실행할 구문
        $cookieBox.show().addClass('on');
        $header.css({top: 60})
    }else if(cookieData_arr.indexOf('today=done')<0 && scrollTop > 60){
        $cookieBox.show().addClass('on');
        $header.css({top: 0})
    }else if(cookieData_arr.indexOf('today=done')>=0 && window_wid < 1179){
        $visual.animate({martinTop: '60px'})
        $header.css({top: 0})
    }else{
        $cookieBox.hide().removeClass('on');
        $header.css({top: 0})
    }

}

function eventBinding_cookie(){
    $clxBox.on('click', function(){

        if($('#no_ck').is(':checked')){
            setCookie('today', 'done', 1)
            // $.cookie('today', 'done', {expires: 1, path: '/'});
        }
        $cookieBox.stop().animate({top:-60},500).removeClass('on');
        $header.stop().animate({top : 0}, 500);
        if(window_wid < 1179){
            $visual.stop().css({marginTop: '60px'})
        }
    });
}

function setCookie(name, value, expiredDate){
    
    var today = new Date();
    // console.log('today: ' + today);
    var duedate = today.getDate() + expiredDate;
    // console.log('duedate: ' + duedate);
    today.setDate(duedate)
    // console.log(today.setDate(duedate));
    var result = today.toGMTString();
    // console.log('result: ' + result);

    document.cookie = name + '=' + value + '; path=/; expires=' + result + ';'
    }
//cookie
$(document).ready(function(){

    var version = navigator.userAgent;

    if( /trident/i.test(version)  ){
        $('body').addClass('oldIE');

        chgFlex();
        addNotice();
        createList();
    }

});

    function chgFlex(){
        $('.oldIE #brand .inner .wrap > article:nth-of-type(3) ul li > div').css({display: 'block'});

        $('.oldIE #brand .inner .wrap > article:nth-of-type(3) ul li > div .txt').css({width: '90%', position: 'absolute', left: '5%', bottom: '5%'})
    }

    function addNotice(){
        $('.oldIE #slideBanner h1').append(
            $('<h2>').text('Sorry, IE does not support Youtube, recommend you to use Chrome browser. Thanks!').css({fontSize: '14px', color: '#777', marginTop: '20px'})
        )
    }
    
    function createList(){
        for(var i = 0; i < 14; i++){
            $('.oldIE #slideBanner .slideBanner_wrap > ul').append(
                $('<li>').attr('data-index', i)
            )
        }
    }



   






    
 //***gnb  시작***
$(document).ready(function(){
	initDOM_header();

	cookieChk_header();
	gnb_rwd();
	resize_header();
	scroll_header();
	mouseEvent_header();
	focusEvent_header();
	skipNav_header();
	rwdMenu();

});

	var $skipNav;
	var $header;
	var $gnbLi_1depth;
	var $h1;
	var $util;
	
	var header_ht;
	var gnbBg_color;
	var speed;
	var max;
	var doneSub;

	var $allMenu;
	var $rwdGnb;
	var $allMenu_clx;

	var cookieClass;

function initDOM_header(){
	$skipNav = $('#skipNav a');

	$header = $('#header');
	$gnbLi_1depth = $('#gnb>li');
	$h1 = $header.find('h1>a');
	$util = $header.find('#util');

	header_ht = $header.height();
	gnbBg_color = $header.css('backgroundColor');
	speed = 500;
	max = 0;
	doneSub = true;
	
	//태블릿, 모바일
	$allMenu = $('.allMenu');
	$rwdGnb = $('#rwdGnb');
	$allMenu_clx = $rwdGnb.children('.clx');

	cookieClass = $('#cookie').hasClass('on');
}

function cookieChk_header(){
	if(cookieClass == true){
		$header.css({position: 'fixed', top: '60px', left: 0})
	}
	if(cookieClass == false){
		$header.css({position: 'fixed', top: '0px', left: 0})
	}
}

function resize_header(){
	$(window).on('resize', gnb_rwd);
}

function scroll_header(){
	$(window).on('scroll', function(){

		var scrollTop = $(window).scrollTop();
		// var header_po = $header.offset().top;
		cookieClass = $('#cookie').hasClass('on');
		
		if(scrollTop <= 60 && cookieClass == true){
			$header.css({position: 'fixed', top: '60px', left: 0, zIndex: 9, background: 'rgba(255, 255, 255, 1)'});
			$('.gnbBg').css({background: 'rgba(255, 255, 255, 1)'});
		}

		if(scrollTop > 60 && cookieClass == true){
			$header.css({position: 'fixed', top: '0px', left: 0, zIndex: 9, background: 'rgba(255, 255, 255, 0.9)'});
			$('.gnbBg').css({background: 'rgba(255, 255, 255, 0.9)'});
		}

		if(scrollTop < 60 && cookieClass == false){
			$header.css({position: 'fixed', top: '0', left: 0, zIndex: 9, background: 'rgba(255, 255, 255, 1)'});
			$('.gnbBg').css({background: 'rgba(255, 255, 255, 1)'});
		}
		
		if(scrollTop > 60 && cookieClass == false){
			$header.css({position: 'fixed', top: '0px', left: 0, zIndex: 9, background: 'rgba(255, 255, 255, 0.9)'});
			$('.gnbBg').css({background: 'rgba(255, 255, 255, 0.9)'});
		}

	});
}

function mouseEvent_header(){
	$gnbLi_1depth.on('mouseenter', function(){
		$(this).children('a').addClass('on');
	});

	$gnbLi_1depth.on('mouseleave', function(){
		$(this).children('a').removeClass('on');
	});
}

function focusEvent_header(){
	$gnbLi_1depth.children('a').on('focusin', function(){
		gnbDown(speed/2);
	});
	$gnbLi_1depth.last().children('ul').children('li').last().children('a').on('focusout', function(){
		gnbUp(speed);
	});
}

function skipNav_header(){
	$skipNav.on('focusin', function(){
		$(this).addClass('on');
	});
	$skipNav.on('focusout', function(){
		$(this).removeClass('on');
	});
}

function getHeight(){
	$gnbLi_1depth.each(function(){//2depth ul 중 가장 큰 높이값 찾기
		var $2depth_height = $(this).children('ul').height();
		max = Math.max($2depth_height, max);
	});
}

function setUlHeight(){
	//2depth의 높이가 모두 다르니 가장 큰 값으로 높이값 통일시켜주기
	$gnbLi_1depth.children('ul').height(max);
	$('.gnbBg').css({height : max + 80})
}

function gnbDown(speed){
	gnbBg_color = $header.css('backgroundColor');
	var isGnbBg = $('.gnbBg').length;
	if(!isGnbBg){
		$header.prepend(
			$('<div class="gnbBg">').css({
				width: '100%', height: max+80, position: 'absolute', top: header_ht, left: 0, borderTop: '1px solid rgba(0, 0, 0, 0.05)', boxSizing: 'border-box',background: gnbBg_color, zIndex: 1, display: 'none', boxShadow: '5px 5px 10px rgba(0,0,0,0.1)'
			})
		)
	}
	if(doneSub){
		doneSub = false;
		$gnbLi_1depth.children('ul').stop().slideDown(speed);
		$('.gnbBg').stop().slideDown(speed);
	}

}

function gnbUp(speed){
	$gnbLi_1depth.children('ul').stop().slideUp(speed);
	$('.gnbBg').stop().slideUp(speed, function(){
		$(this).remove();
		doneSub = true;
	});
}

function gnb_rwd(){
	var wid = $(window).width();

	//웹사이즈
	if(wid > 1179){
		$rwdGnb.hide();

		getHeight();
		setUlHeight();

		$header.on('mouseenter', function(){
			gnbDown(speed/2);
		})
	
		$header.on('mouseleave', function(){
			gnbUp(speed/2);
		})
	
	
	}else{ //타블렛이하

		$header.off();
		$h1.off();
		$util.off();

	}
}

function rwdMenu(){
	$allMenu.on('click', function(e){
		e.preventDefault();
		$rwdGnb.fadeIn(300, function(){
			$('body').css({overflowY: 'hidden'})
		}).bind('touchmove', function(e){
			e.preventDefault();
		});

	});

	$allMenu_clx.on('click', function(e){
		e.preventDefault();
		$rwdGnb.fadeOut(300);
		$('body').css({overflowY: 'auto'}).unbind('touchmove');
	})

}
//***gnb  끝***
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
//***slideBanner 시작***
$(document).ready(function(){

    initDOM_slideBanner()

    if( !/trident/i.test(version)  ){
        slideBanner_rwd();
        loadData_slideBanner();

        $slideBanner_ul.children('li').last().prependTo($slideBanner_ul);
    
        eventBinding_slideBanner();
    }
});

    var URL;
    var key;

    var playlistId;
    var options;

    var isAnimated;
    var $slideBanner_ul;
    var $slideBanner_next;
    var $slideBanner_prev;

    var version;

    function initDOM_slideBanner(){
        URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    // key = 'AIzaSyBOvFCJjGhROCVSgx-ir_F-fjNyUKWF6dM';
        key = 'AIzaSyBUi4NF7udfrufp7iJ5qgCxCES8XOLok7I';

        playlistId = 'PLfwNfduH1_mBzCB0d8hL23Ni0iwTxyKVm';
        options = {
            part: 'snippet',
            key: key,
            maxResults : 14,
            playlistId : playlistId
        }

        isAnimated = true;
        $slideBanner_ul = $('#slideBanner .slideBanner_wrap ul');
        $slideBanner_next = $('#slideBanner .next');
        $slideBanner_prev = $('#slideBanner .prev');

        version = navigator.userAgent;
    }

    function eventBinding_slideBanner(){
        $(window).on('resize', slideBanner_rwd);
    
        $('body').on('click', '#slideBanner li', function(){
            var video_id = $(this).attr('data-vid');
            create_popUp(video_id);
        });
    
        $('body').on('click', '.pop .close', function(){
            remove_popUp();
        })
    }

    function slideBanner_rwd(){
        var wid = $(this).width();
        
        if(wid > 1179) slideBanner_moving(10, 500);
        if(wid <= 1179 && wid > 539) slideBanner_moving(6, 500);
        if(wid <= 539) slideBanner_moving(3, 500);

    }//slideBanner_rwd

    function slideBanner_moving(showLi, speed){
        
        $slideBanner_ul.css({marginLeft : -100 / showLi + '%'});

        $slideBanner_next.off();
        $slideBanner_prev.off();

        $slideBanner_next.on('click', function(e){
            e.preventDefault();

            if(isAnimated){
                isAnimated=false;

                $slideBanner_ul.stop().animate({
                    marginLeft  : ((-100 / showLi) * 2) + '%'
                },speed, function(){
                    $(this).children('li').first().appendTo(this);
                    $(this).css({marginLeft : (-100 / showLi) + '%'})

                    isAnimated=true;
                });

            };//if
        });

        $slideBanner_prev.on('click', function(e){
            e.preventDefault();

            if(isAnimated){
                isAnimated= false;

                $slideBanner_ul.stop().animate({
                    marginLeft  : '0%'
                },speed, function(){
                    $(this).children('li').last().prependTo(this);
                    $(this).css({marginLeft : (-100 / showLi) + '%'})

                    isAnimated= true;
                });
            };//if
            
        });
    };//slideBanner_moving

    function loadData_slideBanner(){
        $.ajax({
            url: URL,
            dataType : 'jsonp',
            data : options
        })
    
        .success(function(data){
            // console.log('youtube:'+data);
            createList_slideBanner(data)
        })
        .error(function(){
            console.log('failed')
        })
    }

    function createList_slideBanner(data){
        $(data.items).each(function(index, item){
            var thumbnail = item.snippet.thumbnails.medium.url;
            var video_id = item.snippet.resourceId.videoId;
            var title = item.snippet.title;

            // console.log(index, item);
            title = title.replace('(playlist)', '');

            $('#slideBanner .slideBanner_wrap > ul')
            .append(
                $('<li>').attr('data-vid', video_id).css({backgroundImage : 'url(' + thumbnail})
                .append(
                    $('<p>').text(title)
                )
            )
            
        });
    }

    function create_popUp(id){
        $('body').append(
            $('<aside class="pop">')
                .css({
                    width: '28vmax', height : '40vh', padding: '40px 30px', boxSizing: 'border-box', position: 'fixed', bottom: 100, left: 0, zIndex: 9, backgroundColor: 'rgba(0,0,0,0.7)'
                })
                .append(
                    $('<iframe>')
                        .attr({
                            width: '100%', height: '100%', src: 'https://www.youtube.com/embed/'+id, frameborder: 0, allowfullscreen: true
                        }),
                    $('<span class="close">').text('close')
                        .css({
                            fontFamily: 'Playfair Display', fontSize: '14px', color: '#fff', position: 'absolute', top: 10, right: 20, cursor: 'pointer'
                        })
                )
                    
        )
    }

    function remove_popUp(){
        $('.pop').remove();
    }


//***slideBanner 끝***
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
$(document).ready(function(){
    
    initDOM_visual();
    initAnimation_visual()
    eventBinding_visual();
});

var toggleChk;
var h1;
var h2;
var p;

function initDOM_visual(){
    toggleChk = true;
    $h1 = $('#visual h1');
    $h2 = $('#visual h2');
    $p = $('#visual .inner > p');
}

function initAnimation_visual(){
    $h1.addClass('on');
    $h2.addClass('on');
    $p.addClass('on');
}

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