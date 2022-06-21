import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");

form.addEventListener("submit", e => {
    e.preventDefault(); 
    const formElements = e.currentTarget.elements;
    let delay = formElements.delay.valueAsNumber;
    const step= formElements.step.valueAsNumber ;
    const position= formElements.amount.valueAsNumber;

    for (let i = 1; i <= position; i += 1) {
    createPromise(i, delay )
        .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); 
})
        .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); 
});
    delay += step;
    }
}   
);

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3; 
  setTimeout(() => {
    if (shouldResolve) {
  resolve ({ position, delay });
  } 
      reject ({ position, delay });
  }, delay);
});
}



