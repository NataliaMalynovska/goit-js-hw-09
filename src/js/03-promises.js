import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submit = document.querySelector("button");
const form = document.querySelector(".form");

form.addEventListener("submit", e => {
    e.preventDefault(); 
    const formElements = e.currentTarget.elements;
    let delay = formElements.delay.valueAsNumber;
    const step= formElements.step.valueAsNumber ;
    const position= formElements.amount.valueAsNumber;

    for (let i = 0; i < position; i += 1) {
        delay += step;

      createPromise(i, delay )
        .then(({ position, delay }) => {
          console.log(position);
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); 
})
        .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); 
});
    }
}
);

function createPromise(p, delay) {
  return new Promise ((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3; 
  setTimeout(() => {
    if (shouldResolve) {
      resolve (`✅`)
  } 
      reject (`❌`)
  }, delay);
});
}



