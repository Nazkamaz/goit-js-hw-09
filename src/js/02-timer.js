import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
// const inputData = document.querySelector('#datetime-picker');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
const daysField = document.querySelector('[data-days]');

let date = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    date = selectedDates[0];
    if (date <= options.defaultDate) {
            window.alert('Please choose a date in the future');
     
    }else
    startBtn.disabled = false;
  },
};
flatpickr('#datetime-picker', options);

function timer() {
  setInterval(() => {
    const ms = date.getTime() - new Date().getTime();
        daysField.textContent = convertMs(ms).days;
      hoursField.textContent = convertMs(ms).hours;
      minutesField.textContent = convertMs(ms).minutes;
      secondsField.textContent = convertMs(ms).seconds;
  }, 1000);
}
startBtn.addEventListener('click', timer);

function pad(value)
{
    return String(value).padStart(2, '0')
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));

  const hours = pad(Math.floor((ms % day) / hour));

  const minutes = pad(Math.floor(((ms % day) % hour) / minute));

  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(hoursField.textContent);
