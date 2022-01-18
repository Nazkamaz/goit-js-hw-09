import Notiflix from 'notiflix';

const startBtn = document.querySelector('[type="submit"]');
const form = document.querySelector('.form');
// startBtn.disabled = true;

startBtn.addEventListener('click', onBtnSbm);

function onBtnSbm(elm) {
  elm.preventDefault();
  let position = 0;
  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);
  if(delay == '' || step == ''  || amount == ''){
return;
       // startBtn.disabled = false;
  }

  setTimeout(() => {
    setInterval(() => {
      if (position >= amount) {
        return;
      }
      position += 1;
      delay += step;
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, step);
  }, delay);
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    }
    reject({ position, delay });
  });
  return promise;
}
