const btn = document.getElementById('btn');
const container = document.getElementById('container');


btn.addEventListener('click', () => {
    createNotifiction();
});


function createNotifiction() {
    const notif = document.createElement('div');

    notif.classList.add('toast');
    container.appendChild(notif);

    notif.innerText = 'this challenge is crazy'
    setTimeout(() => {
        notif.remove();
    }, 3000)
};