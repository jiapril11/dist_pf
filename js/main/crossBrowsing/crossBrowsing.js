$(document).ready(function(){

    var version = navigator.userAgent;

    if( /trident/i.test(version)  ){
        $('body').addClass('oldIE');

        chgFlex();
        loadData_IE()
    }

    function chgFlex(){
        $('.oldIE #brand .inner .wrap > article:nth-of-type(3) ul li > div').css({display: 'block'});

        $('.oldIE #brand .inner .wrap > article:nth-of-type(3) ul li > div .txt').css({width: '90%', position: 'absolute', left: '5%', bottom: '5%'})
    }

    function loadData_IE(){
        $.ajax({
            url: './data/slideBanner.json',
            dataType: 'json'
        })
        .success(function(data){
            $('.oldIE #slideBanner h1').append(
                $('<h2>').text('sorry, IE does not support Youtube, recommend you to use Chrome browser').css({fontSize: '14px', color: '#777', marginTop: '20px'})
            )
            $(data.data).each(function(index){
                $('.oldIE #slideBanner .slideBanner_wrap > ul').append(
                    $('<li>').attr('data-index', index)
                )

            });
        })
        .error(function(){
            console.log('oldIE loading data failed');
        })
    }
});






    