//***member ***/
$(document).ready(function(){

    var $txtArea =  $('.members .agreement .essential textarea');
    var $required = $('.members .required');
    
    var $numberOnly = $('input:text[numberOnly]');

    $numberOnly.on('keyup', function(){
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    $('#join').on('submit', function(e){
        e.preventDefault();

        var agreed = $('#terms').is(':checked');
        var len = $('.required').length;
        var i = 0;
        var isRquired = false;
        var isPwd = false;
        var pwd = $('#pwd').val();
        var pwd2 = $('#pwd2').val();
        // var isGender = false;
        // var radio = $('input[name=gender]').is(':checked');

        $('.agreement textarea, .members input, .members td').removeClass('red');

        if(!agreed){
            console.log(agreed);
            alert('약관에 동의해주세요.');
            $txtArea.addClass('red');

        }else{

            //필수텍스트 입력사항 반복문으로 체크
            $required.each(function(index){
                var data = $(this).val();
                var txt = $(this).attr('placeholder');

                if(!data){//값이 없으면 0 -> false/ placeholder값 띄워주기
                    alert(txt);
                    $(this).addClass('red');
                }else{
                    i++;
                }
            });//require 반복문

            if(i==len){//required 와 i 갯수 총 4개이면 입력 완료
                isRquired = true;
            }

            //비밀번호 동일 값 체크
            if(pwd !== pwd2){
                alert('비밀번호를 동일하게 입력해주세요.')
                $('#pwd, #pwd2').addClass('red');
            }else{
                isPwd = true;
            }

            //라디오버튼 체크
            // if(!radio){
            //    alert('성별을 선택해주세요');
            //    $('input[name=gender').parent('td').addClass('red');
            // }else{
            //    isGender = true;
            // }
            
            //최종인증처리
            if(isRquired && isPwd){
                alert('회원가입이 완료되었습니다.');

                $required.val('');
                $('#terms').prop('checked', false);
                $('input[name=gender').prop('checked', false);
            }

        }//동의했을 때  else

    });

    /*
if(사용자가 약관을 체크하지 않을때){
    약관동의 경고창
    사용자 약관부분을 빨간색으로 강조
}else{
    그 다음 단계 인증절차
    필수 텍스트입력사항 (.required) 반복돌면서 체크--> isRequired = true;
    두개의 비밀번호값을 비교해서 같으면  --> isPwd = true;
    라디오 버튼 체크 --> isGender = true;
    isRequired , isPwd, isGender 의 값들이 모두 true 이면 회원인증 완료처리
}
*/
});
//***member ***/