const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    document.body.style.background = randomBg();
    console.log(randomBg());
})

function randomBg() {
    // return `hsl(${Math.floor(Math.random()*360)}, 100%, 50%)`
    return `rgba(${Math.floor(Math.random()*100)}%, ${Math.floor(Math.random()*100)}%, ${Math.floor(Math.random()*100)}%, ${Math.floor(Math.random()*100)}%)`
}