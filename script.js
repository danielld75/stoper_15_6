class Stopwatch extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="controls">
          <button onClick={this.start} className="button" id="start">start</button>
          <button onClick={this.stop} className="button" id="stop">stop</button>
          <button onClick={this.reset} className="button" id="reset">reset</button>
          <button onClick={this.catchTime} onDoubleClick={this.resetResults} className="button"
                  id="catchTime">rezultaty
          </button>
        </div>
        <div className="stopwatch">{this.state.display}</div>
        <div className="results"></div>
      </div>
    )
  }

  constructor() {
    super();
    this.running = false;
    this.state = {
      display: '',
      results: []
    };
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.reset();
    this.print(this.time);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.catchTime = this.catchTime.bind(this);
    this.resetResults = this.resetResults.bind(this);
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
    this.setState({
      display: this.format(this.times)
    })
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

class App extends React.Component {
  render() {
    return (
      <div>
        <Stopwatch/>
      </div>
    )
  }
}

const app = <App/>;
ReactDOM.render(app, document.getElementById('app'));