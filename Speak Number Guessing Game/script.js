const msgEl = document.getElementById("msg");



//抓取使用者聲音的值capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    //檢查是否有音檔產生的值
    // console.log(msg);

    writeMessage(msg);
    // checkNumber(msg);
}

//write what user speaks to DOM
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>`;
}


//這邊+1因為Math.random*100數字只到99不會到100所以必須做這個動作
const randomNum = Math.floor(Math.random() * 100) + 1;

// 檢查隨機數字有無正常生成
// console.log(randomNum);

//引入聲音辨識進來window
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new SpeechRecognition();

//start recogniiton and game
recognition.start();


//speak result
recognition.addEventListener('result', onSpeak)