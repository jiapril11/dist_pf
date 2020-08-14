 //***gnb  시작***
$(document).ready(function(){
   
	var $skipNav = $('#skipNav a');

	var $header = $('#header');
	var $gnbLi_1depth = $('#gnb>li');
	var $h1 = $header.find('h1>a');
	var $util = $header.find('#util');

	var header_ht = $header.height();
	var gnbBg_color = $header.css('backgroundColor');
	var speed = 500;
	var max = 0;
	var doneSub =true;
	
	//태블릿, 모바일
	var $allMenu = $('.allMenu');
	var $rwdGnb = $('#rwdGnb');
	var $allMenu_clx = $rwdGnb.children('.clx');

	var cookieClass = $('#cookie').hasClass('on');

	if(cookieClass == true){
		$header.css({position: 'fixed', top: '60px', left: 0})
	}
	if(cookieClass == false){
		$header.css({position: 'fixed', top: '0px', left: 0})
	}

	gnb_rwd();

	$(window).on('resize', gnb_rwd);

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

	//1depth li
	$gnbLi_1depth.on('mouseenter', function(){
		$(this).children('a').addClass('on');
	});

	$gnbLi_1depth.on('mouseleave', function(){
		$(this).children('a').removeClass('on');
	});

	//탭키로 gnb 메뉴 열고/닫기
	$gnbLi_1depth.children('a').on('focusin', function(){
		gnbDown(speed/2);
	});
	$gnbLi_1depth.last().children('ul').children('li').last().children('a').on('focusout', function(){
		gnbUp(speed);
	});

	//skipNav 탭키 기능
	$skipNav.on('focusin', function(){
		$(this).addClass('on');
	});
	$skipNav.on('focusout', function(){
		$(this).removeClass('on');
	});
	
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


	//태블릿, 모바일 메뉴
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



});
//***gnb  끝***