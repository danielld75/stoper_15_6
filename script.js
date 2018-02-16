class Stopwatch extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="controls">
          <button onClick={this.start.bind(this)} className="button">start</button>
          <button onClick={this.stop.bind(this)} className="button">stop</button>
          <button onClick={this.reset.bind(this)} className="button">reset</button>
          <button onClick={this.catchTime.bind(this)} onDoubleClick={this.resetResults.bind(this)} className="button">rezultaty</button>
        </div>
        <div className="stopwatch">{this.format()}</div>
        <ul className="results">{this.state.results.map((item, index) => <li key={index}>{item}</li>
        )}</ul>
      </div>
    )
  }

  constructor() {
    super();
    this.state = {
      isRunning: false,
      display: '',
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    }
  }

  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
    this.print(this.times);
  }

  print() {
    this.setState({
      display: this.format(this.times)
    });
  }

  format() {
    const { miliseconds, seconds, minutes } = this.state.times;
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
  }

  start() {
    if (!this.state.isRunning) {
      this.setState({
        isRunning: true,
        watch: setInterval(this.step.bind(this), 10)
      });
    }
  }

  step() {
    if (!this.state.isRunning) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.setState(prevState => {
      let {miliseconds, seconds, minutes} = prevState.times;
      miliseconds += 1;
      if (miliseconds >= 100) {
        seconds += 1;
        miliseconds = 0;
      }
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }
      return {
        times: {
          minutes,
          seconds,
          miliseconds
        }
      };
    });
  }

  stop() {
    this.setState({
      isRunning: false
    });
    clearInterval(this.watch);
  }

  catchTime() {
    this.setState(prevState => ({
      results: [this.format(), ...prevState.results]
    }));
  }

  resetResults() {
    this.setState({
      results: [],
    });
    this.reset();
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));