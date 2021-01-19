const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.createElement('score');
const timeEl = document.createElement('time');
const endgameEl = document.createElement('end-game');
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

addWordToDOM();


//event lisenter

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {

        //當答案符合則顯示下一題題目
        addWordToDOM()

        //當答案符合則清空內容(clear)
        e.target.value = '';
    }
})