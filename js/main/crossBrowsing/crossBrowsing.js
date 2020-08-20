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



   






    