import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

  const refs = {
      inputEl: document.querySelector('#datetime-picker'),
      btnStartEl: document.querySelector('button[data-start]'),
      fieldEl: document.querySelector('.field'),
      daysEl: document.querySelector('span[data-days]'),
      hoursEl: document.querySelector('span[data-hours]'),
      minutesEl: document.querySelector('span[data-minutes]'),
      secondsEl: document.querySelector('span[data-seconds]'),
}

refs.btnStartEl.setAttribute("disabled", "disabled");

let  inputData = 0;
let timerId = null;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        inputData = selectedDates[0].getTime();
      console.log(inputData);
       if (inputData < new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
      return;
        };
        refs.btnStartEl.removeAttribute('disabled');
            
  },
};

flatpickr(refs.inputEl, options );

refs.btnStartEl.addEventListener('click', onStartTime);

function onStartTime() {
    if (timerId) {
        return;
    }
    timerId = setInterval(getCurrentTime, 1000);
       
};

function getCurrentTime() {
    const startTime = Date.now();
    const deltaTime = inputData - startTime;
    console.log(deltaTime);
    if (deltaTime < 0) {
        clearInterval(timerId);
        return;
    };

    const time = convertMs(deltaTime);
    console.log( time);   
    updateTimerMarkup(time);
};

function updateTimerMarkup({ days, hours, minutes, seconds }) {
  refs. daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}


function addLeadingZero(value) {
   return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

flatpickr(refs.inputEl, options );

