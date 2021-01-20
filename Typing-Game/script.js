const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty')

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;

//LS資料當不為空的時候存取剛剛存取的下拉式選單的值不然就顯示medium當作初始值
// init difficulty and set difficulty to value in LS or medium
let difiiculty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//把LS的紀錄的值放進去選單裡面直接重新賦值
// set difficulty select value
difficultySelect.value = difiiculty;


//當進入頁面就直接可以focous在input區域不需要移動鼠標過去(focous on text on start)
text.focus();

//每秒數一次(start counting down)
// 使用setInterval來每秒使用一次updateTime也就是更新時間
const timeInterval = setInterval(updateTime, 1000);

//隨機取陣列中物件的方法
function getRandomWord() {

    // 用random會隨機給1~0之間的數字乘上words的長度也就是個數再取整數就可以用來找words裡面的內容
    return words[Math.floor(Math.random() * words.length)];
}

//把剛剛抓出來的word的內容貼到DOM上面去(add word to DOM)
function addWordToDOM() {

    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//直接把數字加一因為函式放在判斷式中並且已經判斷答對了(update score)
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

//update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    if (time === 0) {
        // 當time===0時，把timeinterval消除就不會數到負數去了
        clearInterval(timeInterval);

        //結束遊戲(end game)
        gameOver();
    }
}

//做出遊戲結束時的頁面並且修改class為flex讓頁面可以呈現(game over show end screen)
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick = "location.reload()">Reload</button>`;

    endgameEl.style.display = "flex";
}

//這裡必須寫在外面呼叫第一次當作預設值
addWordToDOM();


//event lisenter

//typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {

        //當答案符合則顯示下一題題目
        addWordToDOM()

        //答對加分更新分數上去
        updateScore();

        //當答案符合則清空內容(clear)
        e.target.value = '';

        //對應當下的難度加時間
        if (difiiculty === 'hard') {
            time += 2;
        } else if (difiiculty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        // 最後更新時間
        updateTime();
    }
})

//讓難易度選擇區塊顯示或隱藏(settings btn click)
settingBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//當下拉式選單的值改變時存進去LS當下的diffuculty
// setting select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})