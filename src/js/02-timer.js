import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const clockFase = document.querySelectorAll(".value")
const onStartBtn= document.querySelector("button[data-start]");
const clockDays = document.querySelector("span[data-days]")
const clockHours = document.querySelector("span[data-hours]")
const clockMin = document.querySelector("span[data-minutes]")
const clockSec = document.querySelector("span[data-seconds]")


onStartBtn.setAttribute("disabled", "disabled");

let selectedTime = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
        Notify.failure("Please choose a date in the future"); 
        return
    } 
      onStartBtn.removeAttribute("disabled", "disabled");
      selectedTime = selectedDates[0];
    },  
  }; 
flatpickr("#datetime-picker", options);



const timer = {
  intervalId: null, 
  isActive: false,
  

  start() {
    if (this.isActive) {
      return
    }
    
    this.isActive = true;
    this.intervalId = setInterval(() => { 
    const delta = selectedTime - new Date();
    const { days, hours, minutes, seconds } = convertMs(delta);
    
    clockDays.textContent = days;
    clockHours.textContent = hours;
    clockMin.textContent = minutes;
    clockSec.textContent = seconds;
    console.log(selectedTime - new Date());
    if(delta <= 1000) {
      clearInterval(this.intervalId);
      console.log("ПЕРЕМОГА");
    }
  }, 1000) 
  },

}
onStartBtn.addEventListener("click", (event) => {
  timer.start();
})

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      return { days, hours, minutes, seconds };
     
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

