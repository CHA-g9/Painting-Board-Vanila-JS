const canvas = document.getElementById("jsCanvas");
let painting = false;

function stopPainting(event){
    painting = false;
} //painting = false를 여러번 선언하는 대신 이렇게 함수로 지정해버림.

function onMouseMove(event){
    //console.log(event); // 마우스가 캔버스 안에 올라갔을 때 인식하기
    //offset : 캔버스 부분에서 구한 좌표값.
    //client : 윈도우 전체 부분을 기준으로 한 좌표값.

    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x,y); // 캔버스 내부의 커서 위치 반환.
}

function onMouseDown(event){
    painting = True;
}

function onMouseUp(event){
    stopPainting();
    // line을 그릴 문제가 있음. 
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}

