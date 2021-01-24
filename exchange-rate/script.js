// // 轉換匯率1(左上角)
// const currencyEl_one = document.getElementById("currency-one");

// // 匯率1的總計
// const amount_one = document.getElementById("amount-one");

// // 轉換匯率2(左下角)
// const currencyEl_two = document.getElementById("currency-two");

// // 匯率2的總計
// const amount_two = document.getElementById("amount-two");

// //抓取顯示匯率的綠色文字的div
// const rateEl = document.getElementById("rate");

// // 抓取交換匯率的按鈕
// const swap = document.getElementById("swap");

// // Fetch exchange rates and update the DOM
// // 取得匯率更新使用(fetch) 以及 把取得的資料更新DOM
// function calculate() {
//   // 抓取下拉式選單選到得value
//   const currency_one = currencyEl_one.value;
//   const currency_two = currencyEl_two.value;

//   // 使用這個網址只有更改最後面得國家名稱即可即使取得更新資料
//   fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
//     //取得JSON格式的資料回來
//     .then((res) => res.json())
//     .then((data) => {
//       // console.log(data);

//       //這邊資料抓取裡面的rates部分裡面的currency_two的value也就是你下拉式選單選到的值
//       const rate = data.rates[currency_two];

//       //把剛剛抓到的值放進去顯示匯率的div裡面並用ES6的字串串接方式擺入變數
//       //讓呈現的資料變成動態的
//       rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

//       // 找到的匯率乘上amount_one的value就是amount_two
//       amount_two.value = (amount_one.value * rate).toFixed(2);
//     });
// }

// //Event listeners

// // 這邊的currencyEl_one改變 1.匯率div顯示會改變 2.匯率2的總計會改變
// currencyEl_one.addEventListener("change", calculate);

// //匯率1的總計的改變要靠使用者輸入或者是使用箭頭去改變會影響匯率2的總計
// amount_one.addEventListener("input", calculate);

// //匯率的div會改變 匯率2的總計也會改變
// currencyEl_two.addEventListener("change", calculate);

// //隨著的值改變都會改變
// amount_two.addEventListener("input", calculate);

// // 這邊處理點擊則交換匯率1,2的值也就是下拉式選單的值對調並呼叫calculate()再修改全部的值
// swap.addEventListener("click", () => {
//   const temp = currencyEl_one.value;
//   currencyEl_one.value = currencyEl_two.value;
//   currencyEl_two.value = temp;
//   calculate();
// });

let currencyOne = $("#currency-one");
let amountOne = $("#amount-one");
let currencyTwo = $("#currency-two");
let amountTwo = $("#amount-two");

const swapBtn = $("#swap");
const showRate = $("#rate");

function calculate() {
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne.val()}`)
    .then((res) => res.json())
    .then((data) => {
      const currency = data["rates"];
      const rate = currency[`${currencyTwo.val()}`];
      amountTwo.val(rate * amountOne.val());

      showRate.text(`1${currencyOne.val()} = ${rate} ${currencyTwo.val()}`);
    });
}

// 秀出匯率在amount中間

//事件監聽部分當change的時候呼叫calculate函式
currencyOne.change(() => calculate());
amountOne.change(() => calculate());
currencyTwo.change(() => calculate());
amountTwo.change(() => calculate());

// 讓頁面一進來就呈現amount部分
calculate();
