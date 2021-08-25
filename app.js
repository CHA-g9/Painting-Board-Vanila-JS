//const는 절대 변할 수 없는 변수.
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const quiz = document.getElementById("jsQuiz");
const showBtn = document.getElementById('jsShownHide');
const lines = timer.querySelector('#lines');

const INITIAL_COLOR = "#2c2c2c";
const text = new Array('감자', '파인애플', '멋쟁이사자처럼', '여름방학', '과자', '스터디','꿈','구석','확신','감기','상','배구','모자','동화','계곡','아기');

//canvas 사이즈 정하기 (pixel modifier)
canvas.height = 700; // px 쓰지 않음. 
canvas.width = 700;
//이걸 정하지 않으면 context 접근 범위를 알 수 없나봄.

// 캔버스 자체의 배경색 미리 지정
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);
// 이러는 이유는 배경색을 추가하지 않으면 저장시에 배경이
// 투명해지기 때문.

// ctx의 default 정하기
ctx.strokeStyle =  INITIAL_COLOR; // 선에 적용할 색상이나 스타일 = 검정색
ctx.lineWidth = 2.5; // canvas 내부의 기본 선 굵기 지정 = 2.5
ctx.fillStyle = INITIAL_COLOR;

// ctx.fillStyle = "blueviolet"; // 이걸로 색상 지정
// ctx.fillRect(100,100,100,100); 
// stroke style 적용 못함, x,y, 가로길이, 세로길이

let painting = false;
let filling = false;
let startQuiz = true;
let textShow = true;

function stopPainting(event){
    painting = false;
} //painting = false를 여러번 선언하는 대신 이렇게 함수로 지정해버림.

function startPainting(event){
    painting = true;
    // true, false 는 무조건 소문자로!
}

function onMouseMove(event){
    //console.log(event); // 마우스가 캔버스 안에 올라갔을 때 인식하기
    //offset : 캔버스 부분에서 구한 좌표값.
    //client : 윈도우 전체 부분을 기준으로 한 좌표값.

    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y); // 캔버스 내부의 커서 위치 반환.

    //path라는 선으로 그림을 그림.
    //클릭을 기준으로 선의 시작과 끝을 만듦.
    //클릭 사이는 전부 path로 움직임 그림을 표현한다.
    if(!painting){
        ctx.beginPath(); // 클릭하지 않고 마우스를 움직이면 선의 시작점을 찾음.
        ctx.moveTo(x,y); // 그리고 시작점이 될 곳으로 좌표를 항상 움직여 둠.
    } else {
        // 클릭해서 그리기 시작하면 선을 그리기 시작하는 것.
        ctx.lineTo(x,y); // 이전 좌표에서 지금 좌표까지 선을 그리고(모든 무빙에 아주 작은 선 생성.)
        ctx.stroke(); // 그것이 캔버스에 나타나도록 '눈에 보이는' 선을 긋는다.
    }
}
/*
function onMouseDown(event){
    painting = True;
}
*/
function onMouseUp(event){
    stopPainting();
    // line을 그릴 문제가 있음. 
}

//console.log(colors) // HTMLcollection 반환
//console.log(Array.from(colors)) // 이렇게 하면 각 요소를 배열로 반환
//왜 배열이어야 하는가? 그래야 이 안에서 forEach로 색을 고를 수 있다.
function handleColorclick(event){
    // 그려지는 선의 색상 조정하기
    // console.log(event.target.style.backgroundColor);
    // 색을 클릭하면 그 부분의 CSS 값이 출력됨.(style까지)
    //우리가 필요한 것은 background color 뿐.(backgroundcolor 추가)
    const color = event.target.style.backgroundColor;
    
    //context의 색상 변경이 필요함. 따라서 ctx 변수의 속성을 변경해줌.
    ctx.strokeStyle = color;
    ctx.fillStyle = color;


}

function handleRange(event){
    // 그려지는 선의 두께 조절하기.
    // console.log(event.target.value); 
    // 위와 같이 두께를 가져오는 명령 console.log로 먼저 확인
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeclick(event){
    if (filling == true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasclick(event){
    if (filling){
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
}

function handleCM(event){
    console.log(event);
    // 이렇게 하면 우클릭을 할 때 마다 콘솔에 로그 찍힘.
    event.preventDefault();
    // preventDefalut() 속성을 추가하면 우클릭 방지됨. 

}

function handleSave(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement('a'); 
    // image 상수에 만들어진 URL이 a 태그 씌워짐.
    link.href = image;
    // 다운로드할 링크로 연결하는 것.
    link.download = "지환그림판[🌺]"; 
    // download는 a 태그의 속성. 
    //연결 대신 다운로드를 하는 것. 
    //다운로드 대상을 무슨 이름으로 저장할 것인가를 지정함.
    link.click();
    // 링크를 클릭해서 다운로드 되도록 가상의 클릭 실행.
    //console.log(link); 확인용 코드

}
// 여기서부터는 제가 창작한 캐치마인드용 코드입니다.

//랜덤한 문제 출제하기
function getRandomtext(event){
    var index = Math.floor(Math.random() * text.length);
    var quizText = text[index];
    //alert(quizText);
    document.getElementById('text_test').innerText = quizText;
    // 중복제거를 위해 출제한 단어 제거
    text.splice(index, 1);
    console.log(text);
    // 단어가 전부 사라지면?
    if  (text.length == 0){
        alert("게임 끝!");
    }
}

//출제한 문제 보이기 & 숨기기 - 토글기능 활용
function ShoworHide(event){
    if(textShow){
        document.getElementById('text_test').style.display = 'none';
        showBtn.innerText = "show";
        textShow = false;
    } else {
        document.getElementById('text_test').style.display = 'block';
        showBtn.innerText = "hide";
        textShow = true;
    }
    
}

// 타이머 함수

// for(let i = 0; i < 30; i++) {
//   const line = document.createElement('div');
//   line.classList.add('line');
//   line.style.transform = 'rotate(${i*6}deg)';

//   if (i%5 == 0) {
//     line.classList.add('thick')
//   }
//   lines.append(line);
// }

// const fins = timer.querySelector('#fins');
// const endTime = 40;

// for (let min=0; min<endTime; min++) {
//   for (let sec=0; sec<60; sec++) {
//     const remainFin = document.createElement('div');
//     remainFin.classList.add('fin');
//     const deg = min*6+sec*0.1;
//     remainFin.style.transform = `rotate(${-deg}deg)`
//     fins.append(remainFin);
//   }
// }


if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasclick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorclick));
// 각 색깔 부분에 handleColorclick을 적용하는 코드!
// 색을 배열로 접근 가능하게 만든 것이 키.

if (range){
    //range 존재 여부 확인
    range.addEventListener("input", handleRange);
}

if (mode){
    mode.addEventListener("click", handleModeclick);
}

//canvas가 이미지를 만들어주므로 다운로드와 저장은 이미 내장된 기능임.
if (saveBtn){
    saveBtn.addEventListener('click', handleSave);

}

if(startQuiz){
    quiz.addEventListener("click", getRandomtext);
    showBtn.addEventListener("click", ShoworHide);
}
