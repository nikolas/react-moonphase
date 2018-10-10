"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _MoonPhaseView = _interopRequireDefault(require("./MoonPhaseView"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Main =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    var _this;

    _classCallCheck(this, Main);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Main).call(this, props));
    _this.state = {
      moonPhase: -1
    };
    return _this;
  }

  _createClass(Main, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "col-sm-6"
      }, _react.default.createElement("div", {
        className: "text-center"
      }, _react.default.createElement(_MoonPhaseView.default, {
        moonPhase: this.state.moonPhase,
        onMoonPhaseUpdate: this.onMoonPhaseUpdate.bind(this)
      })), _react.default.createElement("input", {
        type: "range",
        className: "form-control-range",
        name: "moonPhase",
        min: -Math.PI,
        max: Math.PI,
        step: 0.01,
        value: this.state.moonPhase,
        onChange: this.handleInputChange.bind(this)
      }));
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var target = event.target;
      var name = target.name;
      this.setState(_defineProperty({}, name, (0, _utils.forceNumber)(target.value)));
    }
  }, {
    key: "onMoonPhaseUpdate",
    value: function onMoonPhaseUpdate(phase) {
      this.setState({
        moonPhase: phase
      });
    }
  }]);

  return Main;
}(_react.default.Component);

document.addEventListener('DOMContentLoaded', function () {
  var domContainer = document.querySelector('#react-container');

  _reactDom.default.render(_react.default.createElement(Main, null), domContainer);
});