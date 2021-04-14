const countEl = document.getElementById('count');

function updateVisitCount() {
    fetch('https://api.countapi.xyz/update/github/githubBlog/?amount=1')
        .then(res => res.json())
        .then(res => {
            console.log(res);
            countEl.innerHTML = res.value;
        })
}

updateVisitCount();

// const countEl = document.getElementById('count');

// updateVisitCount();

// function updateVisitCount() {
//     fetch('https://api.countapi.xyz/update/github/githubBlog/?amount=1')
//         .then(res => res.json())
//         .then(res => {
//             countEl.innerHTML = res.value;
//         })
// }