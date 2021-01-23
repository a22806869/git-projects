const draggable_list=document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople =[
    'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

//Store list items
const listItems =[];

// console.log(listItems);
let dragStartIndex;

createList();


//Insert list items into DOM
function createList(){

    // 如果不使用展開運算子就會只印出一個陣列包含所有名字而無法迭代
    [...richestPeople]
        //這部分使順序變成隨機
    .map((a) =>({value:a, sort:Math.random()}))

    // 這邊使用sort來做排序sort大的網前擺
    // 這邊a.sort後面的sort部分是上面object的屬性不是方法要注意
    .sort((a,b) =>(a.sort-b.sort))

    // 只印出其中的value也就是名字的部分
    .map((a) =>a.value)
    .forEach((person, index)=>{
        // console.log(person);

        const listItem = document.createElement('li');

        listItem.setAttribute('data-index',index);

        // 為了讓排名的數字不是從零開始所以給它加一
        listItem.innerHTML = `
        <span class="number">${index+1}</span>
        <div class="draggable" draggable ="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i></div>`;


        listItems.push(listItem);

        // 把剛剛做好的li內容貼到DOM上
        draggable_list.appendChild(listItem);
    })

    // 這邊的事件處理的內容都在這個創造的li上面所以這樣處理
    addEventListeners();
}

// 這個func的目的在於交換跟drop區域的內容
//dragStartIndex這個變數設置在全域是因為整個轉換的過程會在drop那邊進行，這邊只是先抓取index而已
function dragStart(){

    // 這邊的this抓取的是div而我們要的是它外層的li
    // 所以使用closest("li")去抓取
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}

// 當拖曳的目標進入li時觸發class=over也就是變灰框框
function dragEnter(){
    this.classList.add("over")
}
// 當拖曳目標離開li時觸發，會拉掉class=over
function dragLeave(){
    this.classList.remove("over")
    
}

function dragOver(e){
    // 這邊做避免預設的狀況才有辦法使用swapItems這個函式不然會被一直提交
    e.preventDefault();
}

// 這邊的函式作用在於取的start,end的index並丟進去swapItems去作用
function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove("over");
}


function swapItems(fromIndex, toIndex){
    
    // 這邊會抓取到名字內容的div
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    console.log(itemOne);

    // 兩個互相appnedChild交換內容
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//確認是否是正確的順序(跟richestPeople作對比)
function checkOrder(){
    listItems.forEach((listItem, index) =>{
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });

}

check.addEventListener('click', checkOrder);