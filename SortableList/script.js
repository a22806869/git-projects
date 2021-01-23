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

console.log(listItems);
let dragStartIndex;

createList();


//Insert list items into DOM
function createList(){

    // 如果不使用展開運算子就會只印出一個陣列包含所有名字而無法迭代
    [...richestPeople]
    .map((a) =>({value:a, sort:Math.random()}))

    // 這邊a.sort後面的sort部分是上面object的屬性不是方法要注意
    .sort((a,b) =>(a.sort-b.sort))
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

    // 一次要附上多個事件監聽時可以這樣使用
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
function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove("over");
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