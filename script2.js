//게시판 구현을 위하여 get방식으로 보낸
//parameter값을 가져 오기 위하여 구현
function getParameter(name) {
    name = name
        .replace(/[\[]/, "\\[")
        .replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//페이지가 실행되면 그림이 돌아가면서 보이도록 구현
window.onload = function () {
    var count = 0;
    var image = document.getElementById('image');
    var frames = ['./img/1.png', './img/2.png', './img/3.png', './img/4.png', './img/5.png'];
    setInterval(function () {
        count %= frames.length;
        image.src = frames[count];
        count = count + 1;
    }, 50);
}



// //페이지가 준비되면 hiden클래스 들이 감춰지기 위하여 구현
$(document).ready(function () {
    //로그인이 미구현이기 때문에 클릭하면 경고창 출력
    $('.submit-btn').click(function () {
        alert("로그인 미구현");
    });
    //회원가입이 미구현이기때문에 클릭하면 경고창 출력
    $('.submit-signup').click(function () {
        alert("회원가입 미구현");
    });

    $('.hiden1').css('display', 'none');
    $('.hiden2').css('display', 'none');
});
//클릭을 하면 hiden클래스들의 display가 none이라면 block으로
//block이면 none으로 변경
function hidenView(hiden) {
    if (hiden == 1) {
        if ($('.hiden1').css('display') == "none") {
            $('.hiden1').css('display', 'block');
        } else {
            $('.hiden1').css('display', 'none');
        }
    } else if (hiden == 2) {
        if ($('.hiden2').css('display') == "none") {
            $('.hiden2').css('display', 'block');
        } else {
            $('.hiden2').css('display', 'none');
        }
    }
}


//게시물 작성을 위하여 구현
function save() {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (
        today.getMonth() + 1
    )).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var nowDate = year + "-" + month + "-" + day;
    //bord에 작성자, 제목, 내용, 날짜, 카테고리를 넣어줍니다.
    var bord = {
        writer: $("input[name=writer]").val(),
        title: $("input[name=title]").val(),
        text: $("textarea[name=text]").val(),
        date: nowDate,
        cat: getParameter("no")
    };
    //만약 작성자나 제목 내용이 비어있을때 저장되면 안되기 때문에 경고창 출력
    if (bord.writer === "" || bord.title === "" || bord.text === "") {
        alert("입력해주세요");
    } 
    //아니라면 sessionStorage에 저장되어있는 bordArray아이템을 가져옵니다.
    else {
        var arr = JSON.parse(sessionStorage.getItem("bordArry"));
        //만약 bordArray가 비어어있다면 arr에 Array를 만들어주고
        //bord를 넣어준후 sessionStorage에있는 bordArry아이템에 arr를 넣어주고
        //저장이 완료됨을 창을 띄워줍니다.
        if (!arr) {
            arr = new Array();
        }
        arr.push(bord);
        sessionStorage.setItem("bordArry", JSON.stringify(arr));
        alert("게시물이 저장되었습니다.");
    }
}

function bordView(){
    //해당 파라미터를 받아서 arr의 인덱스 값에 있는 내용을 출력
    var no = Number(getParameter("no"));
    var arr = JSON.parse(sessionStorage.getItem("bordArry"));
    document.write("<tr><td class=\"printtd\">제목</td>");
    document.write("<td>" + arr[no].title + "</td></tr>");

    document.write("<tr><td class=\"printtd\">작성자</td>");
    document.write("<td>" + arr[no].writer + "</td></tr>");
                           
    document.write("<tr><td class=\"printtd\">작성일</td>");
    document.write("<td>" + arr[no].date + "</td></tr>");
                            
    document.write("<tr><td class=\"printtd\">내용</td>");
    document.write("<td>" + arr[no].text + "</td></tr>");
}

//평가 게시판을 위하여 구현
function printEvaluation() {
    //게시판의 파라미터 값을 받아주고 sessionStorage에 저장된 bordArry를 가져옵니다.
    var no = Number(getParameter("no"));
    var arr = JSON.parse(sessionStorage.getItem("bordArry"));
    var cnt = 0,
        i = 0;
    //만약 arr이 있다면 arr의 카테고리가 1인것의 cnt를 세주고
    if (arr) {
        while (arr[i]) {
            if (arr[i].cat == 1) {
                cnt++
            }
            i++;
        }
    }
    //cnt가 1보다 작다면 평가 게시판이 비어있음을 html에 작성해줍니다.
    if (cnt < 1) {
        document.write("<tr><td colspan=\"4\">평가 게시판이 비어있습니다.</td></tr>");
    } 
    //cnt가 1보다 크다면 tr과 td태그를 생성하고 링크를 만들어주고
    //bordView.html에 get방식으로 클릭된 no를 보내고 이동합니다. 
    else {
        var i = 0;
        var cnt = 1;
        while (arr[i]) {
            if (arr[i].cat == 1) {
                document.write(
                    "<tr onclick=\"javascript:location.href='./bordView.html?no=" + i + "'\">"
                );
                document.write("<td>" + cnt + "</td>");
                document.write("<td>" + arr[i].title + "</td>");
                document.write("<td>" + arr[i].writer + "</td>");
                document.write("<td>" + arr[i].date + "</td>");
                document.write("</tr>");
                cnt++;
            }
            i++;
        }
    }

}

//이용규졍 게시판을 위하여 구현
function printAnnouncement() {
    //게시판의 파라미터 값을 받아주고 sessionStorage에 저장된 bordArry를 가져옵니다.
    var no = Number(getParameter("no"));
    var arr = JSON.parse(sessionStorage.getItem("bordArry"));
    var cnt = 0,
        i = 0;
    //만약 arr이 있다면 arr의 카테고리가 3인것의 cnt를 세주고
    if (arr) {
        while (arr[i]) {
            if (arr[i].cat == 3) {
                cnt++
            }
            i++;
        }
    }
    //cnt가 1보다 작다면 이용규정 게시판이 비어있음을 html에 작성해줍니다.
    if (cnt < 1) {
        document.write("<tr><td colspan=\"4\">이용규정이 비어있습니다.</td></tr>");
    } 
    //cnt가 1보다 크다면 tr과 td태그를 생성하고 링크를 만들어주고
    //bordView.html에 get방식으로 클릭된 no를 보내고 이동합니다. 
    else {
        var i = 0;
        var cnt = 1;
        while (arr[i]) {
            if (arr[i].cat == 3) {
                document.write(
                    "<tr onclick=\"javascript:location.href='./bordView.html?no=" + i + "'\">"
                );
                document.write("<td>" + cnt + "</td>");
                document.write("<td>" + arr[i].title + "</td>");
                document.write("<td>" + arr[i].writer + "</td>");
                document.write("<td>" + arr[i].date + "</td>");
                document.write("</tr>");
                cnt++;
            }
            i++;
        }
    }
}


//이용규졍 게시판을 위하여 구현
function printTrade() {
    //게시판의 파라미터 값을 받아주고 sessionStorage에 저장된 bordArry를 가져옵니다.
    var no = Number(getParameter("no"));
    var arr = JSON.parse(sessionStorage.getItem("bordArry"));
    var cnt = 0,
        i = 0;
    //만약 arr이 있다면 arr의 카테고리가 2인것의 cnt를 세주고
    if (arr) {
        while (arr[i]) {
            if (arr[i].cat == 2) {
                cnt++
            }
            i++;
        }
    }
    //cnt가 1보다 작다면 이용규정 게시판이 비어있음을 html에 작성해줍니다.
    if (cnt < 1) {
        document.write("<tr><td colspan=\"4\">매매 게시판이 비어있습니다.</td></tr>");
    } 
    //cnt가 1보다 크다면 tr과 td태그를 생성하고 링크를 만들어주고
    //bordView.html에 get방식으로 클릭된 no를 보내고 이동합니다. 
    else {
        var i = 0;
        var cnt = 1;
        while (arr[i]) {
            if (arr[i].cat == 2) {
                document.write(
                    "<tr onclick=\"javascript:location.href='./bordView.html?no=" + i + "'\">"
                );
                document.write("<td>" + cnt + "</td>");
                document.write("<td>" + arr[i].title + "</td>");
                document.write("<td>" + arr[i].writer + "</td>");
                document.write("<td>" + arr[i].date + "</td>");
                document.write("</tr>");
                cnt++;
            }
            i++;
        }
    }
}


//해당 카테고리에 맞는 form태그를 만들어주기 위해서 구현
function printform() {
    var num = getParameter("no");
    //받아온 파라미터 값이 1이라면 평가게시판으로
    if (num == 1) {
        document.write(
            "<form method=\"post\" action=\"./evaluation.html\"><p>작성자</p><input type=\"text" +
            "\" name=\"writer\" class=\"writer\"><p>제목</p><input type=\"text\" name=\"title" +
            "\" class=\"title\"><p>내용</p><textarea name=\"text\" class=\"text\"></textarea>" +
            "<p><button onclick=\"save()\">저장</button></p></form>"
        );
    } 
    //받아온 파라미터 값이 2라면 매매게시판으로
    else if (num == 2) {
        document.write(
            "<form method=\"post\" action=\"./trade.html\"><p>작성자</p><input type=\"text\" name=\"" +
            "writer\" class=\"writer\"></p><p>제목</p><input type=\"text\" name=\"title\" class=" +
            "\"title\"></p><p>내용</p><textarea name=\"text\" class=\"text\"></textarea></p><butt" +
            "on onclick=\"save()\">저장</button></form>"
        );
    } 
    //받아온 파라미터 값이 3이라면 이용규정으로 이동하는 form태그 작성
    else if (num == 3) {
        document.write(
            "<form method=\"post\" action=\"./announcement.html\"><p>작성자</p><input type=\"text\" " +
            "name=\"writer\" class=\"writer\"></p><p>제목</p><input type=\"text\" name=\"title\" " +
            "class=\"title\"></p><p>내용</p><textarea name=\"text\" class=\"text\"></textarea></p" +
            "><button onclick=\"save()\">저장</button></form>"
        );
    }

}

//플립버드와 같은 게임을 구현
function game1() {
    //canvas라는 id를 가진 객체를 불러와서 사용합니다.
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    //이미지를 객체를 만들어서 해당 이미지를 추가 시켜줍니다.
    var bird = new Image();
    var bg = new Image();
    var fg = new Image();
    var pipeNorth = new Image();
    var pipeSouth = new Image();

    bird.src = "./img/bird.png";
    bg.src = "./img/com.png";
    fg.src = "./img/jams.png";
    pipeNorth.src = "./img/pipeNorth.png";
    pipeSouth.src = "./img/pipeSouth.png";

    //해당 이미지의 좌표와 추락을 점수를 위해 선언
    var gap = 85;
    var constant;

    var bX = 10;
    var bY = 150;

    var gravity = 1.5;

    var score = 0;

    //키보드 입력을 받으면 moveUp함수를 실행
    document.addEventListener("keydown", moveUp);
    //이미지의 y축을 -25줍니다.
    function moveUp() {
        bY -= 25;
    }

    var pipe = [];

    pipe[0] = {
        x: cvs.width,
        y: 0
    };
    //이미지를 그리는 함수
    function draw() {

        ctx.drawImage(bg, 0, 0);
        //충돌되는 기둥을 캔버스에 그려주고 점수를 추가 기둥이 해당 위치를 넘가면 점수를 추가
        for (var i = 0; i < pipe.length; i++) {

            constant = pipeNorth.height + gap;
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

            pipe[i].x--;

            if (pipe[i].x == 125) {
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                });
            }

            if (pipe[i].x == 5) {
                score++;
            }

        }
        ctx.drawImage(fg, 0, cvs.height - fg.height);

        ctx.drawImage(bird, bX, bY);

        bY += gravity;
        //점수 출력을 하기위해 선언
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : " + score, 10, cvs.height - 20);
        //만약 충돌이 감지되면 confirm으로 재시작을 할것인지 물어보기
        if (bX + bird.width >= pipe[0].x && bX <= pipe[0].x + pipeNorth.width && (bY <= pipe[0].y + pipeNorth.height || bY + bird.height >= pipe[0].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            if (confirm("Score : " + score + "\n다시하시겠습니까?")) {
                location.reload();
            }
        } 
        //충돌이 아니라면 다시 그리기
        else {
            requestAnimationFrame(draw);
        }

    }
    draw();

}

//퍼즐 맞추기 게임을 위해 구현
function game2() {
    //문서가 준비되면 해당 배열을 랜덤으로 섞어줍니다.
    $(document).ready(function () {
        var numbers = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ];
        numbers.sort(() => Math.random() - 0.5);

        //img 넣어놓기
        for (var i = 1; i < 10; i++) {
            var img = '';
            img += '<div class="dragg_item" id="dragg_item' + numbers[i - 1] + '">';
            img += '<img src="./img/' + numbers[i - 1] + '.jpg">';
            img += '</div>'
            $('.dragg').append(img);
        }
        //div 넣어놓기
        for (var a = 1; a < 10; a++) {
            var div = '';
            div += '<div class="dropp' + a + '">';
            div += '</div>';
            $('.dropp').append(div);
        }

        //드래그 시작
        $('.dragg_item').draggable({helper: 'clone', zIndex: 100, scroll: false})

        for (var b = 1; b < 10; b++) {
            $('.dropp' + b).droppable({
                accept: '#dragg_item' + b,
                drop: function (event, ui) {
                    $(ui.draggable).fadeOut();
                    $(this)
                        .append(ui.draggable.clone())
                        .fadeIn();
                    if ($(".dropp img").length >= 9) {
                        if (confirm("게임에 승리하였습니다!\n 다시하시겠습니까?")) {
                            location.reload();
                        }
                    }
                }
            });
        }
    });

}

//자동차 클릭 게임을 위해 구현
function game3() {
    $(document).ready(function () {
        var count = 0;
        var timer;
        $(".start_btn").click(function () {
            $(".pedal_btn").fadeIn(1);
            $(".start_btn").fadeOut(1);
            $(".level").fadeOut(1);
            $(".ai_car").animate({
                "margin-left": "100%"
            }, parseInt($(".level").val()));
            timer = setTimeout(function () {
                alert("AI가 승리하였습니다!");
                location.reload();
            }, parseInt($(".level").val()));
        });
        //해당 버튼을 클릭하면 margin-left로 이미지를 미뤄줍니다.
        $(".pedal_btn").click(function () {
            $(".my_car").animate({
                "margin-left": "+=5%"
            }, 1);
            count++;
            if (count == 20) {
                clearTimeout(timer);
                alert("내가 승리하였습니다!");
                location.reload();
            }
        });
    });

}