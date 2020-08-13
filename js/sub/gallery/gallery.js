$(document).ready(function(){

    //검색량 많은 이미지 호출하는 주소값
    var url_interests = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList';
    //특정 키워드를 통해 이미지를 검색,호출하는 주소값
    var url_search = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    //개인 키 값
    var key = '5f475de38e9943c3ae8aaf025a1ea3ea';

    var page_num = 1;
    var per_page = 30;
    var tags = '';
    var iso;
    var url = url_interests;

    var $gallery_ul = $('#imgs_gallery ul');
    var $btn = $('.gallery #search button');
    var $h2 = $('.gallery .inner #search h2');

    var $imgPop = $('.gallery .imgPop');
    var $imgPop_img = $imgPop.find('img');
    var $imgPop_clx = $imgPop.find('.closePop');

    var smallImg;
    var bigImg;

    $h2.text('The most interesting Image Top 30 by Flickr');

    ///로딩시 인기 이미지 업로딩
    call_data(url, key, page_num, per_page);
    
    //검색어 입력 후 검색 버튼 클릭 시
    $btn.on('click', function(e){
        e.preventDefault();

        url = url_search;
        tags = $('.searchTag').val(); //검색값 받아오기;
        page_num = 1;
        
        $h2.text('Image List: ' + tags);

        call_data(url, key, page_num, per_page, tags);

    })//btn click end
   
    //큰이미지 열기
    $('body').on('click', '#imgs_gallery ul li', function(e){
        e.preventDefault();

        var imgSrc = $(this).children('a').attr('href');

        $imgPop_img.attr('src', imgSrc);
        $imgPop.fadeIn();

    });

    //큰이미지 닫기
    $imgPop_clx.on('click', function(){
        $imgPop.fadeOut(function(){
            $imgPop_img.attr('src', '');
        });
    });

    //데이터 불러오기
    function call_data(url, key, page_num, per_page, tags){
        $.ajax({
            url : url, // 요청할 검색 주소
            dataType : 'json',
            data : {
                api_key : key,
                page: page_num,
                per_page: per_page,
                tags : tags, //검색할 태그명
                tagmode : 'any',
                privacy_filter : 5,
                format : 'json',
                nojsoncallback : 1
            }
        })

        .success(function(data){
            create_dom(data);
        })//success

        .error(function(){
            console.log('failed bring searched data')
        });
    }//call data

    //Dom 생성 함수
    function create_dom(data){
        $gallery_ul.parent().removeClass('on');
        $gallery_ul.empty();

        var items = data.photos.photo;
        console.log(items);

            $(items).each(function(){

                smallImg = 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'_m.jpg';
                bigImg = 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'_b.jpg';

                var titleLen = this.title.length;
                var title = '';
                if(titleLen > 17){
                    title = this.title.substring(0,17) + '...';
                }else{
                    title = this.title;
                }

                $gallery_ul.append(
                    $('<li>')
                        .append(
                            $('<a>').attr('href', bigImg)
                                .append(
                                    $('<img>').attr('src', smallImg)
                                )
                        )//li append
                        .append(
                            $('<h3>').text(title)
                        )//li append
                )//ul append

                setTimeout(function(){
                    isotopeImgArr('#imgs_gallery ul');

                    setTimeout(function(){
                        $gallery_ul.parent().addClass('on');
                    },500)
                },500)

            })//each

    }//create dom

    //isotope 정렬
    function isotopeImgArr(target){
        iso = new Isotope(target, {
            itemSelector : '#imgs_gallery ul li',
            columnWidth : '#imgs_gallery ul li',
            transitionDuration : '0.5s',
            percentPosition : true
        });
    }

});