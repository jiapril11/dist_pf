window.onload = function(){

    //표시할 지역의 경도, 위도, 줌레벨 설정하여 인스턴스 생성
    var mapContainer = document.getElementById('map'); 
    var mapOption = { 
        center: new kakao.maps.LatLng(37.572550,126.975888), 
        level: 4 
    };
    var map = new kakao.maps.Map(mapContainer, mapOption); 



    //좌표값과 마커이미지 갯수만큼 반복을 돌며 마커생성하고 버튼 이벤트 연결
    var markerOptions = [
        {
            title: '본사',
            latlng: new daum.maps.LatLng(37.572550,126.975888),
            imgSrc : 'img/flag.png',
            imgSize : new daum.maps.Size(150,150),
            imgPos : {offset: new kakao.maps.Point(75, 75)},
            button : document.getElementById('branch1')
        },
        {
            title: '농장',
            latlng: new daum.maps.LatLng(33.3616649,126.3890908),
            imgSrc : 'img/flag.png',
            imgSize : new daum.maps.Size(150,150),
            imgPos : {offset: new kakao.maps.Point(75, 75)},
            button : document.getElementById('branch2'),
        }

    ];

    for(var i=0; i<markerOptions.length; i++){
        new daum.maps.Marker({
            map : map,
            position : markerOptions[i].latlng,
            title : markerOptions[i].title,
            image : new daum.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
        });    

        (function(index){
            markerOptions[index].button.onclick = function(){
                moveTo(markerOptions[index].latlng);
                console.log(index);
            }
        })(i);        
    }    

    function moveTo(target){
        var moveLatLan = target;
        map.setCenter(moveLatLan);
        return false;
    }
   

    //스카이뷰 컨트롤 표시
    var mapTypeControl = new daum.maps.MapTypeControl();
    map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);


    //줌 컨트롤 표시
    var zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.BOTTOMRIGHT);


    //드래그기능 활성화
    setDraggable(true);           
    function setDraggable(draggable) {
        map.setDraggable(draggable);    
    }


    //줌기능 활성화
    setZoomable(false);
    function setZoomable(zoomable) {          
        map.setZoomable(zoomable);    
    }


    //버튼클릭시 교통정보 표시    
    var t_on = document.getElementById('t_on');
    var t_off = document.getElementById('t_off');

    t_on.onclick = function(){
        map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
        return false;
    }
    t_off.onclick = function(){
        map.removeOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC); 
        return false;
    } 

//교통정보량 클래스 on
    $('#t_on').on('click', function(){
        $('#traffic li').removeClass('on');
        $(this).addClass('on');
    });
    
    $('#t_off').on('click', function(){
        $('#traffic li').removeClass('on');
        $(this).addClass('on');
    });
    
//본사/농장 클래스 on
    $('#branch1').on('click', function(){
        $('#branch th').removeClass('on');
        $(this).addClass('on');
    });
    
    $('#branch2').on('click', function(){
        $('#branch th').removeClass('on');
        $(this).addClass('on');
    });




}