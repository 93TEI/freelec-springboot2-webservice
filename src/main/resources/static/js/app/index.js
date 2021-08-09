// index.js의 첫문장에 var main = {...}라는 코드 선언 이유 :
// index라는 변수의 속성으로 function을 추가한 이유 :
// 브라우저의 스코프는 공용 공간으로 쓰이기 때문에 나중에 로딩된 js에 같은 이름의 function이 있다면
// 먼저 로딩된 js의 function을 덮어쓰게 된다. 여러 사람이 참여하는 프로젝트에서는 중복된 함수 이름이 자주 발생될 수 있기에
// 이런 문제를 피하려고 index.js만의 유효범위(스코프)를 만들어 사용함
// 방법은 var index란 객체를 만들어 해당 객체에서 필요한 function을 선언하는 것이다.
// 이렇게하면 index 객체 안에서만 function이 유효하기 때문에 다른 js와 겹칠 위험이 사라짐

// 다시 정리하자면,
//  이 코드를 보면 var main = { } 로 함수들을 묶어 놓은 것을 볼 수 있다.
//  그렇게 한 이유는 다른 JS 파일이 같은 이름의 함수를 가지고 있는 경우 나중에 로딩 된 함수로 덮어 씌워진다.
//  때문에 var index 객체를 만들어 해당 객체에서 필요한 모든 함수를 선언한다.
//  이렇게 하면 객체 안에서만 함수가 유효하기 때문에 겹칠 위험이 사라진다고 한다.

var main = {
    init : function(){
        var _this = this;
        $('#btn-save').on('click', function(){ //.on() : 바인딩한다
            _this.save();
        });
    },
    save : function(){
        var data = {
            title: $('#title').val(), // .val()은 값을 가져옴
            author: $('#author').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data) //  JSON.stringify() : JavaScript 값이나 객체를 JSON 문자열로 변환
        }).done(function(){
            alert('글이 등록되었습니다.');
            window.location.href = '/';     // 글 등록이 성공되면 메인페이지(/)로 이동함
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    }

};