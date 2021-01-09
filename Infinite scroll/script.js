const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

// 全域變數設置
let limit = 5; //每頁最多5篇文章(要設定到4或是5才會有辦法有scroll出現，不過這邊要看使用者的瀏覽器大小決定)
let page = 1; //default會是第一頁

//fetch posts from API
async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    const data = await res.json();

    return data;
}

//把取得得posts推到DOM上面也就是post區域(show posts in DOM)

//取得資料後做forEach並且貼上去postsContainer區
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
      `;

        postsContainer.appendChild(postEl);
    });
}

//show loader & fetch more posts
function showLoading() {
    loading.classList.add('show');

    // 這邊注意setTime的持續時間位置不要寫錯
    //一秒之後移除show class就可以把球球去掉
    setTimeout(() => {
        loading.classList.remove('show');

        // 這邊計時0.3秒後會讓page部分+1也就是會在往下生成下一頁五個posts會產生
        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

//篩選input輸入的內容(filter posts by input)
function filterPosts(e) {

    //要驗證的內容轉大寫比較方便
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    // 一樣為了驗證title,body全部轉大寫
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        // 判斷式使用indexOf判斷書入的內容term是否在title以及body裡面找不找的到，大於-1表示有找到則顯示原本的flex元素沒有則顯示none
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}


//在post-container區域貼上取得的posts(show initial posts)
showPosts();


//event listener

window.addEventListener('scroll', () => {

    //這邊因為作者不想一直打document.documentElement這段所以做解構
    //把這三個方法從其中拿出來直接做變數指派
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    //scrollTop是顯示從最上方到滑到的位置的距離
    //scrollHeight是posts的height
    //clientHeight回傳元素內部高度

    //一般來說scrollHeight = scrollTop + clientHeight
    // 所以當往下滑的距離超過原本卷軸也就是srollHeight 5的時候會觸發產生新的posts
    //不一定要放五放一也可以
    console.log(document.documentElement.scrollTop);
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

// 當filter被輸入內容就會觸發filterPosts function
filter.addEventListener('input', filterPosts);