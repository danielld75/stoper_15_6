"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  _createClass(Stopwatch, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "controls" },
          React.createElement(
            "button",
            { onClick: this.start, className: "button", id: "start" },
            "start"
          ),
          React.createElement(
            "button",
            { onClick: this.stop, className: "button", id: "stop" },
            "stop"
          ),
          React.createElement(
            "button",
            { onClick: this.reset, className: "button", id: "reset" },
            "reset"
          ),
          React.createElement(
            "button",
            { onClick: this.catchTime, onDoubleClick: this.resetResults, className: "button",
              id: "catchTime" },
            "rezultaty"
          )
        ),
        React.createElement(
          "div",
          { className: "stopwatch" },
          this.state.display
        ),
        React.createElement("div", { className: "results" })
      );
    }
  }]);

  function Stopwatch() {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

    _this.running = false;
    _this.state = {
      display: '',
      results: []
    };
    _this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    _this.reset();
    _this.print(_this.time);
    _this.start = _this.start.bind(_this);
    _this.stop = _this.stop.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.catchTime = _this.catchTime.bind(_this);
    _this.resetResults = _this.resetResults.bind(_this);
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print(this.times);
    }
  }, {
    key: "print",
    value: function print() {
      this.setState({
        display: this.format(this.times)
      });
    }
  }, {
    key: "format",
    value: function format(times) {
      return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: "calculate",
    value: function calculate() {
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
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: "catchTime",
    value: function catchTime() {
      var _times = this.times,
          minutes = _times.minutes,
          seconds = _times.seconds,
          miliseconds = _times.miliseconds;

      this.results += "Minutes: " + minutes + " Seconds: " + seconds + " Miliseconds: " + miliseconds + " \n";
      document.querySelector('.results').innerText = this.results;
    }
  }, {
    key: "resetResults",
    value: function resetResults() {
      this.results = [];
      document.querySelector('.results').innerText = '';
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Stopwatch, null)
      );
    }
  }]);

  return App;
}(React.Component);

var app = React.createElement(App, null);
ReactDOM.render(app, document.getElementById('app'));
