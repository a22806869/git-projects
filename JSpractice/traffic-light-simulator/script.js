const circles = document.querySelectorAll('.circle');
let activeLight = 0;

setInterval(changeLight, 1000);

function changeLight() {

    // 預設值是亮紅燈這行的用處在於取消red的class變回circle
    // circles[0] = red
    circles[activeLight].className = 'circle';
    activeLight++;

    if (activeLight > 2) {
        activeLight = 0;
    }

    const currenLight = circles[activeLight];
    currenLight.classList.add(currenLight.getAttribute('color'));
}