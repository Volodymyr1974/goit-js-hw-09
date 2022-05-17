const CHANGE_COLORS_DELAY = 1000;

const refs = {
 changeColor: document.querySelector('body'),
 startBtn: document.querySelector('button[data-start]'),
 stopBtn: document.querySelector('button[data-stop]'),
};

refs.stopBtn.setAttribute("disabled", "disabled");

let timerId = null;

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStoptBtn);

function onStartBtn() {
    refs.startBtn.setAttribute("disabled", "disabled");
    refs.stopBtn.removeAttribute("disabled");
    timerId = setInterval(() => {
        refs.changeColor.style.backgroundColor = `${getRandomHexColor()}`;
    }, CHANGE_COLORS_DELAY);
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStoptBtn() {
    clearInterval(timerId);
    refs.stopBtn.setAttribute("disabled", "disabled");
    refs.startBtn.removeAttribute("disabled");
};
