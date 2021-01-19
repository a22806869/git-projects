const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelector = document.getElementById('difficulty')

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

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {

        //當答案符合則顯示下一題題目
        addWordToDOM()

        //答對加分更新分數上去
        updateScore();

        //當答案符合則清空內容(clear)
        e.target.value = '';

        //當答案符合則時間加五秒
        time += 5;

        updateTime();
    }
})