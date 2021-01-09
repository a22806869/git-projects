const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//設置好歌名給下面的src作抓取(song title)
const songs = ['hey', 'summer', 'ukulele'];

//設置檢索抓取選到的歌曲對應其images以及音檔
// keep track of song
let songIndex = 2;

//呼叫loadSong重置歌曲的名稱、images以及音檔
//Initiallly load song details into DOM
loadSong(songs[songIndex]);


//重置歌曲的名稱、images以及音檔(update song details)
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

//play song
function playSong() {

    // 增加play詞墜到musicContainer裡面就可以觸發css animation的動畫
    //讓cover旋轉以及專輯名稱進度條跳上來
    musicContainer.classList.add('play');

    //並且按下play後圖案會改成pause
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    // 這是audio的方法play可以直接撥放音檔
    audio.play();
}

//pause song
function pauseSong() {

    //去除play詞墜從musicContainer裡面就可以消除css animation的動畫
    //讓cover旋轉以及專輯名稱進度條 關閉
    musicContainer.classList.remove('play');

    //並且按下pause後圖案會改成play
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    // 這是audio的方法pause可以直接停止音檔
    audio.pause();
}

//上一首點擊之後要撥放上一首歌曲(Previous song)
function prevSong() {

    //每次按上一首songIndex要減一才會跑到上一首
    songIndex--;

    //這邊要判斷當songIndex減到0以下的時候
    // 要回到index2使用length-1也就是3-1=2
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    // 當歌曲轉換自然要更改重置歌曲的名字音檔以及歌名
    loadSong(songs[songIndex]);

    // 以及要直接撥放
    playSong();
}

//下一首點擊之後要撥放下一首歌曲(Next song)
function nextSong() {

    //每次按下一首songIndex要加一才會跑到下一首
    songIndex++;

    //這邊要判斷當songIndex加到超過歌曲長度-1時(也就是全部index都跑完了)
    // 要回到index=0也就是回到第一首
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    // 當歌曲轉換自然要更改重置歌曲的名字音檔以及歌名
    loadSong(songs[songIndex]);

    // 以及要直接撥放
    playSong();
}


// 使progress bar隨歌曲進度更新(update progress bar)
function updateProgress(e) {

    // 解構srcElement出其中的duration以及currentTime
    const {
        duration,
        currentTime
    } = e.srcElement; //duration是整首歌的時間currentTime是過了多久

    //相處之後可以得出現在的進度幾趴就可以轉換成width顯示在progress bar了
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//滑鼠點擊進度條移動(set progress bar)
function setProgress(e) {


    //this指向progress-container 所以它的width就是216
    const width = this.clientWidth;

    // 這個變數被指派了 滑鼠點擊progress-container身上的位置
    const clickX = e.offsetX;

    const duration = audio.duration; //音檔總時間

    //currentTime是指當下音檔的時間
    //progress bar的進度(是趴數)乘上音檔總時間 就是現在的進度!
    audio.currentTime = (clickX / width) * duration;

}




//event listeners

// 這邊的click用來確定現在的音檔狀態是撥放還是暫停
// 如果是撥放則暫停如果是暫停則撥放
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

//上一首下一首切換change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


//time/song update(讓進度條隨著音檔跑)
audio.addEventListener('timeupdate', updateProgress);

//處理porgressbar進度條滑鼠點哪邊去哪邊(click on progress bar)
progressContainer.addEventListener('click', setProgress)


//使用ended事件處理audio讓它結束時觸發，並且執行nextSong 函式(song end)
audio.addEventListener('ended', nextSong);