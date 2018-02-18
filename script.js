class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
  }

  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  getFormattedTime() {
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
  }

  calculate() {
    this.setState(prevState => {
      let { miliseconds, seconds, minutes } = prevState.times;
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
    clearInterval(this.state.watch);
  }

  catchTime() {
    this.setState(prevState => ({
      results: [this.getFormattedTime(), ...prevState.results]
    }));
  }

  resetResults() {
    this.setState({
      results: []
    });
  }
  
  render() {
    return (
      <div className="container">
        <div className="controls">
          <button className="button" onClick={this.start.bind(this)}>
            start
          </button>
          <button className="button" onClick={this.stop.bind(this)}>
            stop
          </button>
          <button className="button" onClick={this.reset.bind(this)}>
            reset
          </button>
          <button
            className="button"
            onClick={this.catchTime.bind(this)}
            onDoubleClick={this.resetResults.bind(this)}
          >
            rezultaty
          </button>
        </div>
        <div className="stopwatch">{this.getFormattedTime()}</div>
        <ul className="results">
          {this.state.results.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById("app"));
