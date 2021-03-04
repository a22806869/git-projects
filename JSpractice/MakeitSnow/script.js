setInterval(createSnowFlake, 50);

function createSnowFlake() {
    const snow_flake = document.createElement('i');
    snow_flake.classList.add('fas');
    snow_flake.classList.add('fa-snowflake');
    snow_flake.style.left = Math.random() * window.innerWidth + `px`;
    snow_flake.style.animationDuration = Math.random() * 3 + 2 + `s`; //數字會介於2~5之間
    snow_flake.style.opacity = Math.random(); //給的數字會介於1~0之間 做景深相關的特效
    snow_flake.style.fontSize = Math.random() * 10 + 10 + `px`; //做出不同大小

    document.body.appendChild(snow_flake);

    setTimeout(() => {
        snow_flake.remove();
    }, 5000)
}