const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

//canvas 사이즈 정하기 (pixel modifier)
canvas.height = 700; // px 쓰지 않음. 
canvas.width = 700;
//이걸 정하지 않으면 context 접근 범위를 알 수 없나봄.

// ctx의 default 정하기
ctx.strokeStyle = "#2c2c2c"; // 선에 적용할 색상이나 스타일 = 검정색
ctx.lineWidth = 2.5; // canvas 내부의 기본 선 굵기 지정 = 2.5

let painting = false;
let filling = false;


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

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
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