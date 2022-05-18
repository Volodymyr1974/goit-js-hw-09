import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
console.dir(formEl.elements);

let inputDelayValue = 0;
let inputStepValue = 0;
let inputAmountValue = 0;


formEl.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  inputDelayValue = Number(delay.value);
  inputStepValue = Number(step.value);
  inputAmountValue = Number(amount.value);
  
  if (inputDelayValue <= 0) {
    return;
  };

  for (let i = 1; i <= inputAmountValue; i+=1) {
    createPromise(i, inputDelayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    inputDelayValue += inputStepValue;
  };
  e.currentTarget.reset();
};



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

