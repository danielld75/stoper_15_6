"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
            { onClick: this.start.bind(this), className: "button" },
            "start"
          ),
          React.createElement(
            "button",
            { onClick: this.stop.bind(this), className: "button" },
            "stop"
          ),
          React.createElement(
            "button",
            { onClick: this.reset.bind(this), className: "button" },
            "reset"
          ),
          React.createElement(
            "button",
            { onClick: this.catchTime.bind(this), onDoubleClick: this.resetResults.bind(this), className: "button" },
            "rezultaty"
          )
        ),
        React.createElement(
          "div",
          { className: "stopwatch" },
          this.format()
        ),
        React.createElement(
          "ul",
          { className: "results" },
          this.state.results.map(function (item, index) {
            return React.createElement(
              "li",
              { key: index },
              item
            );
          })
        )
      );
    }
  }]);

  function Stopwatch() {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

    _this.state = {
      isRunning: false,
      display: '',
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
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
    value: function format() {
      var _state$times = this.state.times,
          miliseconds = _state$times.miliseconds,
          seconds = _state$times.seconds,
          minutes = _state$times.minutes;

      return pad0(minutes) + ":" + pad0(seconds) + ":" + pad0(Math.floor(miliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      if (!this.state.isRunning) {
        this.setState({
          isRunning: true,
          watch: setInterval(this.step.bind(this), 10)
        });
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.isRunning) return;
      this.calculate();
      this.print();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      this.setState(function (prevState) {
        var _prevState$times = prevState.times,
            miliseconds = _prevState$times.miliseconds,
            seconds = _prevState$times.seconds,
            minutes = _prevState$times.minutes;

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
            minutes: minutes,
            seconds: seconds,
            miliseconds: miliseconds
          }
        };
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({
        isRunning: false
      });
      clearInterval(this.watch);
    }
  }, {
    key: "catchTime",
    value: function catchTime() {
      var _this2 = this;

      this.setState(function (prevState) {
        return {
          results: [_this2.format()].concat(_toConsumableArray(prevState.results))
        };
      });
    }
  }, {
    key: "resetResults",
    value: function resetResults() {
      this.setState({
        results: []
      });
      this.reset();
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

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
