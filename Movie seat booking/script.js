const container = document.querySelector('.container');
//querySelectorAll會把抓取到的物件轉成nodeList(類似array) 可以使用一些arrays methods
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//把儲存的資料放上去UI
populateUI();


// 這邊ticketPrice必須使用let指派變數因為票價會隨著電影不同改變(不過在這個部分的設置只是讓他初始化要在後面的事件監聽才會針對電影做價錢更改) 
//+的使用確保這邊出來的value為number
let ticketPrice = +movieSelect.value;



//Save selected movie index and price 儲存movie index以及price並放在localstorage
function setMovieData(movieIndex, moviePrice) { //這兩個參數代表(e.target.selectedIndex, e.target.value)

    //這部分因為moviePrice是字串所以不需要轉換 movieIndex使用上面不需要轉換成array 所以都沒有使用stringify
    //setItem使用鍵值對，傳上去localstorage
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



//計算幾個位置 以及 改變總金額 (Update total and count) 
function updateSelectedCount() {

    // 這邊會把所有使用者點擊變成藍色的座椅使用nodeList呈現出來(ps.如果不加上.row，會連標示區域那個藍色的座位一起抓進去，所以要記得加上去.row)
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //把藍色座位選取後出現的nodeList轉換成array (Copy seleted seats into array)
    //使用map方法印出array (Map through array)
    //並且使用indexOf方法回傳seat的索引(return a new array indexes)

    // 展開運算子(...)，這邊使用[...selectedSeats]代表把seletedSeats的值全部傳入進去[]讓他變成array
    //之後使用map印出每個一個藍色座位(被選擇的)之後返回從所有座位中使用搜尋檢索號碼(indexOf)
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //這邊的localstorage會創造一個鍵值對(key, value)在application的localstorage可以看到
    //注意這邊使用stringfy轉換成字串才能存在localstorage上面(鍵值名稱和值皆為字串型式)
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // 取得nodeList的長度也就是使用者點擊了幾次就可以知道了
    const selectedSeatsCount = selectedSeats.length;

    //這邊要改變作品下方那排的text所以使用innerTextx(You have selected 0 seats for a price of $0)
    count.innerText = selectedSeatsCount; //使用者點擊了幾次
    total.innerText = selectedSeatsCount * ticketPrice; //這邊乘上票價就是總金額
}



// 從localstorage取得儲存的資料以及填充回去UI(get data from localstorage and populate UI)

function populateUI() {

    //這邊使用parse把JSON資料轉換array回來，使用getItem到我們要使用的key也就是剛剛我們設定的'selectedSeats'並且指派給變數selectedSeats
    //往下做判斷式處理讓藍色座椅繼續留著，因為localstorage裡面儲存的資料符合條件
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    //如果array selectedSeats不為空以及selectedSeats.length大於0則跑下面判斷式
    if (selectedSeats !== null && selectedSeats.length > 0) {

        //把所有座位使用forEach一個個印出並且判斷每個座位的index號碼是否跟selectedSeats的一樣，如果一樣則執行加上selected這個class
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    //這邊跟上面做類似的事情，判斷selectedMovieIndex是否為空，不為空則執行重新賦值給selectedMovieIndex下拉式選單選取的電影index
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex; //這邊的selectedIndex是個方法取得select底下option tag的index
    }
}


// --------------------------

//電影選擇事件(Movie Select Event)

//使用change事件 當下拉式選單value改變並且在提交的時候觸發(完成更換電影主題的時候提交)，ticketPrice的內容變成當下選擇的value並且上(+)確保其為number
//這邊會觸發兩個function
//1. setMovieData會處理下拉式選單選到的電影的Index號碼以及價錢並且儲存在localstorage上
//2. updateSelectedCount 會因應選取的電影票價(value)去改變 消費總金額
movieSelect.addEventListener('change', e => {

    // 要讓下拉選單在選擇某個電影價錢(value)的情況下，同時更改讓updateSelectedCount 這個function 做的加總部分乘上去的tickePrice符合現在選擇的電影票價
    ticketPrice = +e.target.value;

    //這部分會取得當下選取座位的index號碼以及票價(value並且是字串)並且儲存在localstorage上
    setMovieData(e.target.selectedIndex, e.target.value); //這邊的selectedIndex是個方法取得select底下option tag的index

    //這邊呼叫updateSelectedCount function會改變當下選取的消費總金額因應選取的電影場次的不同(value的不同)
    updateSelectedCount();
})


// seat click event 這邊處理點擊座椅會有藍色特效
container.addEventListener('click', e => {

    // 如果點擊事件的class包含seat以及點擊事件的class不包含occupied才可以執行下方程式碼
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {

        // 這邊使用toggle才可以開關，點擊一次開第二次關(開關的過程是處理selected是否加上去)
        e.target.classList.toggle('selected');

        //呼叫updateSelectedCount function，會因應事件更新座位以及消費總金額
        updateSelectedCount();
    }
})


//initial count and total set(讓顯示座位數量以及總金額的部分重新整理後持續顯示)
//會直接顯示出這個function的內容而不需要經過事件觸發保持讓事件重新整理後持續顯示

updateSelectedCount();