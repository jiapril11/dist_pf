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