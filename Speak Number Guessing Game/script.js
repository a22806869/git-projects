const msgEl = document.getElementById("msg");

//抓取使用者聲音的值capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    //檢查是否有音檔產生的值
    // console.log(msg);

    writeMessage(msg);
    checkNumber(msg);
}

//write what user speaks to DOM
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>`;
}

// check msg against number
function checkNumber(msg) {
    const num = +msg;

    //確認是否是數字
    if (Number.isNaN(num)) {

        //這邊使用+=讓這邊的字串不會覆蓋掉wreiteMessage部分的文字
        msgEl.innerHTML += `
       <div>This is not a valid number</div>`;
        //使用return是因為
        return;
    }

    //確認範圍
    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 - 100</div>`;
        return;
    }

    //確認是否猜對
    if (num === randomNum) {
        document.body.innerHTML = `<h2>Congrats! You have guessed the number! <br>It was ${num}</h2><button class="play-again" id="play-again">Play Again</button>`
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgEl.innerHTML += '<div>GO HIGHER</div>';
    }
}

//這邊+1因為Math.random*100數字只到99不會到100所以必須做這個動作
const randomNum = Math.floor(Math.random() * 100) + 1;

//把答案呈現在頁面上以便確認功能
// console.log(randomNum);

// 檢查隨機數字有無正常生成
// console.log(randomNum);

//瀏覽器相容使用
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new SpeechRecognition();

//start recogniiton and game
recognition.start();


//speak result
recognition.addEventListener('result', onSpeak)

//當猜一次後(沒有答對)讓遊戲繼續
recognition.addEventListener('end', () => recognition.start());

//搭遊戲答對會出現reload按鈕設置事件click並且判斷其id是否為play-again是的話畫面reload
document.body.addEventListener('click', (e) => {

    // 因為這邊的id是只有答對後才出現所以抓取事件在整個body上面所以必須選取其中的target.id才有辦法明確的抓到這個按鈕
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
})