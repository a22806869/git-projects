const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    createNotifiction();
});


function createNotifiction() {
    const notif = document.createElement('div');

    notif.classList.add('toast');


};