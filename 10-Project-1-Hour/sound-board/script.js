const sounds = [
    'clapping',
    'boo',
    'gasp',

]

sounds.forEach((sound) => {
    const btn = document.createElement('button');
    btn.classList.add('btn');

    document.body.appendChild(btn);

    btn.innerText = sound;

    btn.addEventListener('click', () => {
        stopSounds()

        document.getElementById(sound).play();
    })
})

function stopSounds() {
    sounds.forEach((sound) => {
        const song = document.getElementById(sound);

        song.pause();
        song.currentTime = 0;
    })
}