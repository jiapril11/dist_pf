 //***gnb  시작***
 $(document).ready(function(){
   
	var $skipNav = $('#skipNav_sub a');

	var $header = $('#header_sub');
	var $gnbLi_1depth = $('#gnb>li');
	var $h1 = $header.find('h1>a');
	var $util = $header.find('#util');

	var header_ht = $header.height();
	var speed = 500;
	var max = 0;
	var doneSub =true;
	
	//태블릿, 모바일
	var $allMenu = $('.allMenu');
	var $rwdGnb = $('#rwdGnb_sub');
	var $allMenu_clx = $rwdGnb.children('.clx');

	gnb_rwd();

	$(window).on('resize', gnb_rwd);

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
		var isGnbBg = $('.gnbBg').length;
		if(!isGnbBg){
			$header.prepend(
				$('<div class="gnbBg">').css({
					width: '100%', height: max+80, position: 'absolute', top: header_ht, left: 0, borderTop: '1px solid rgba(255, 255, 255, 0.2)', boxSizing: 'border-box',background: '#151515', zIndex: 1, display: 'none'
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
		
			// $h1.on('mouseenter', function(){
			// 	gnbUp(speed/2);
			// });
		
			// $h1.on('mouseleave', function(){
			// 	gnbDown(speed/2);
			// });
			
			// $util.on('mouseenter', function(){
			// 	gnbUp(speed/2);
			// });
		
			// $util.on('mouseleave', function(){
			// 	gnbDown(speed/2);
			// });
		
		}else{ //타블렛이하

			$header.off();
			$h1.off();
			$util.off();

		}
	}


	//태블릿, 모바일 메뉴



	$allMenu.on('click', function(e){
		e.preventDefault();
		$rwdGnb.fadeIn(200);
	});

	$allMenu_clx.on('click', function(e){
		e.preventDefault();
		$rwdGnb.hide();
	})



});
//***gnb  끝***