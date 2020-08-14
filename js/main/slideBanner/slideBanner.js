//***slideBanner 시작***
$(document).ready(function(){

    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    // var key = 'AIzaSyBOvFCJjGhROCVSgx-ir_F-fjNyUKWF6dM';
    var key = 'AIzaSyBUi4NF7udfrufp7iJ5qgCxCES8XOLok7I';

    var playlistId = 'PLfwNfduH1_mBzCB0d8hL23Ni0iwTxyKVm';
    var options = {
        part: 'snippet',
        key: key,
        maxResults : 14,
        playlistId : playlistId
    }

    var isAnimated = true;
    var $slideBanner_ul = $('#slideBanner .slideBanner_wrap ul');
    var $slideBanner_next = $('#slideBanner .next');
    var $slideBanner_prev = $('#slideBanner .prev');

    var version = navigator.userAgent;
    // console.log(version);

    if( !/trident/i.test(version)  ){
        slideBanner_rwd();
        loadData();
    
        $(window).on('resize', slideBanner_rwd);
    
        $slideBanner_ul.children('li').last().prependTo($slideBanner_ul);
    
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

    function loadData(){
        $.ajax({
            url: URL,
            dataType : 'jsonp',
            data : options
        })
    
        .success(function(data){
            // console.log('youtube:'+data);
            createList(data)
        })
        .error(function(){
            console.log('failed')
        })
    }

    function createList(data){
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

});
//***slideBanner 끝***