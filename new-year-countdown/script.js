const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);



// 讓倒數時間可以更新
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // 把數字推到DOM上面
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
  year.innerText = currentYear + 1;
}

// 把loading畫面show出來
// 設定在一秒內移除loading畫面以及把flex屬性加回去countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

// 每秒更新一次
setInterval(updateCountdown, 1000);



//下方練習改寫成jQuery


// //這邊會得到2021主要處理每個新的一年的更新
// const currentYear = new Date().getFullYear();
// const nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// //把數字黏到DOM上面
// //這邊數字部分最後 取餘數是因為這邊計算的是倒數也就是得扣掉經過的時間
// function updateTimeToDOM() {

//   //這邊處理倒數的時間有多少秒
//   //currentTime,conuntDownNum,totalSeconds這三個變數必須放在updateTimeToDOM內部，時間才會更新!
//   const currentTime = new Date()
//   const conuntDownNum = nextYear - currentTime;
//   const totalSeconds = Math.floor(conuntDownNum / 1000)
//   const s = Math.floor(totalSeconds % 60);
//   const m = Math.floor(totalSeconds / 60 % 60);
//   const d = Math.floor(totalSeconds / 60 / 60 / 24);
//   const h = Math.floor(totalSeconds / 60 / 60 % 24)

//   $('#days').text(d < 10 ? '0' + d : d);
//   $('#hours').text(h < 10 ? '0' + h : h);
//   $('#minutes').text(m < 10 ? '0' + m : m);
//   $('#seconds').text(s < 10 ? '0' + s : s);
//   $('#year').text(currentYear);
// }

// setInterval(updateTimeToDOM, 1000);


// //這邊處理點擊重新整理後一秒鐘移除loading整個圖片
// //以及處理點擊重新整理後一秒鐘讓整個畫面顯示flex也就是重新顯示倒數框框回來(這邊我預設處理css部分為display:none轉圈一秒後改成flex)
// setTimeout(function () {
//   $('#loading').remove();
//   $('.countdown').css('display', 'flex')
// }, 1000);