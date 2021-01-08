const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//這邊先設置這個dummy用作展示使用，之後會使用的是localstorage裡面存放的資料
// const dummyTransactions = [
//   {
//     id: 1,
//     text: "Flower",
//     amount: -20,
//   },
//   {
//     id: 2,
//     text: "Salary",
//     amount: 300,
//   },
//   {
//     id: 3,
//     text: "Book",
//     amount: -10,
//   },
//   {
//     id: 4,
//     text: "Camera",
//     amount: 150,
//   },
// ];

//從localstorage抓取資料使用getItem並且需要轉換格式使用JSON.parse轉回原本的物件不然原本是JSON格式不能使用
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

//判斷getItem得到的資料內容是否為空不是的話localStorageTransactions(我們存上去的內容)，是空的話則放入空的[]console.log的話可以看到
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

console.log(transactions);

//add transation submit後觸發的方法:加入新的交易資料
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,

      //注意這邊的amount出來必須是數字所以加上個+號
      amount: +amount.value,
    };

    //把新加入的一筆交易推進去原本的trasactions裡面
    transactions.push(transaction);

    //把收入或是消費的新的li呈現到History上面(也就是DOM)
    addTransactionDOM(transaction);

    //使balance, income, expense 數字可以即時更新
    updateValues();

    //當加入新的交易進去transactions裡面就要呼叫這裡就會更新localstorage
    updateLocalStorage();

    //當輸入完成之後恢復空白
    text.value = "";
    amount.value = "";
  }
}

//generate ID 取得隨機的ID

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

//add transactions to DOM  把收入或是消費的新的li呈現到History上面(也就是DOM)
function addTransactionDOM(transaction) {
  // get sign 取得正負號(+-)
  const sign = transaction.amount < 0 ? "-" : "+";

  //創造新的li要放進去收入或是花費
  const item = document.createElement("li");

  //add class base on value 把剛創造的li加上class但是做要判斷
  // 當transactions的值amount<0時放入minus,>0時放plus
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  //放入的字串用template string串接放入變數transacitons.text當作物品名稱
  //sign 表示正負
  //Math.abs(transactions.amount) 這段用數學方法取絕對值因為前面有sing判斷正負了
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
    // 使用onlick事件並且使用動態參數``包裹住transaction的id
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
    `;

  //appenChild item到list上面
  list.appendChild(item);
}

//update the balance, income and expense  讓balance, income and expense可以即時更新隨著新的交易產生
function updateValues() {
  // 這邊會創造出一個新的array裡面只有包含amount的值
  const amounts = transactions.map((transaction) => transaction.amount);

  // 加總所有的amount使用reduce也就是收入以及花費的的總數
  //acc代表總數 item代表每筆交易的內容金額
  //後方的toFixed代表取到小數點第幾位
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  //處理income部分的數字呈現
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  //處理expense部分的數字呈現
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  //把剛剛處理好的income,total,expense放到DOM裡面更新文字
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//remove transaction by id

function removeTransaction(id) {
  // 使用filter去做篩選出"沒有參數的輸入id的array"並且重新指派給transactions(原本的資料庫)
  // 就可以刪掉放入removeTransaction裡面的物件藉著他的id
  transactions = transactions.filter((transaction) => transaction.id !== id);

  // 刪除資料的時候也要更新localstorage
  updateLocalStorage();

  init();
}

//update localstorage transactions 更新localstorage裡面的transactions資料
function updateLocalStorage() {
  // 把transactions的資料用JSON字串化的格式丟上去localstorage
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Init app 啟動app

function init() {
  list.innerHTML = "";

  //把transactions裡面的資料每一筆都執行addTransactionDOM這個function
  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
