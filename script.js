class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.results = [];
    this.reset();
    this.print(this.time);
  }
  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print(this.times);
  }
  print() {
    this.display.innerText = this.format(this.times);
  }
  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }
  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }
  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  stop() {
    this.running = false;
    clearInterval(this.watch);
  }
  catchTime() {
    const {minutes, seconds, miliseconds} = this.times;
    this.results += `Minutes: ${minutes} Seconds: ${seconds} Miliseconds: ${miliseconds} \n`;
    document.querySelector('.results').innerText = this.results;
  }
  resetResults() {
    this.results = [];
    document.querySelector('.results').innerText = '';
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

const stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'));

var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

var catchTimeButton = document.getElementById('catchTime');
catchTimeButton.addEventListener('click', () => stopwatch.catchTime());

var catchTimeButton = document.getElementById('catchTime');
catchTimeButton.addEventListener('dblclick', () => stopwatch.resetResults());

