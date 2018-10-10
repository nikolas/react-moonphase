"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var PIXI = _interopRequireWildcard(require("pixi.js"));

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MoonPhaseView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MoonPhaseView, _React$Component);

  function MoonPhaseView(props) {
    var _this;

    _classCallCheck(this, MoonPhaseView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoonPhaseView).call(this, props));
    _this.moon = null;
    _this.radius = 100.5; // width: 228, height: 215

    _this.center = new PIXI.Point(228 / 2, 215 / 2);
    return _this;
  }

  _createClass(MoonPhaseView, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var phaseSlot = (0, _utils.getPhaseSlot)(this.props.moonPhase);
      var timeSinceNewMoon = Math.round((0, _utils.getTimeSinceNewMoon)(this.props.moonPhase));
      return _react.default.createElement("div", null, _react.default.createElement("select", {
        className: "form-control form-control-sm",
        onChange: this.onMoonPhaseUpdate.bind(this),
        value: phaseSlot
      }, _react.default.createElement("option", {
        value: 180
      }, "New Moon"), _react.default.createElement("option", {
        value: -135
      }, "Waxing Crescent"), _react.default.createElement("option", {
        value: -90
      }, "First Quarter"), _react.default.createElement("option", {
        value: -45
      }, "Waxing Gibbous"), _react.default.createElement("option", {
        value: 0
      }, "Full Moon"), _react.default.createElement("option", {
        value: 45
      }, "Waning Gibbous"), _react.default.createElement("option", {
        value: 90
      }, "Third Quarter"), _react.default.createElement("option", {
        value: 135
      }, "Waning Crescent")), _react.default.createElement("div", {
        className: "mt-1",
        ref: function ref(thisDiv) {
          _this2.el = thisDiv;
        }
      }), _react.default.createElement("div", {
        className: "text-center"
      }, (0, _utils.roundToOnePlace)((0, _utils.getPercentIlluminated)(this.props.moonPhase - Math.PI)), "% illuminated"), _react.default.createElement("div", {
        className: "text-center"
      }, "Time since new moon:"), _react.default.createElement("div", {
        className: "text-center"
      }, (0, _utils.formatInterval)(timeSinceNewMoon)));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var me = this;
      this.app = new PIXI.Application({
        width: this.center.x * 2,
        height: this.center.y * 2,
        forceCanvas: true
      });
      this.el.appendChild(this.app.view);
      this.app.loader.add('moon', 'img/moon.png');
      this.app.loader.load(function (loader, resources) {
        me.moon = resources.moon;
        me.draw();
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.moonPhase !== this.props.moonPhase) {
        this.drawPhase(this.leftShade, this.rightShade, this.convertPhase(this.props.moonPhase));
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.drawMoon(this.app);
      this.drawShades(this.app);
      this.drawPhase(this.leftShade, this.rightShade, this.convertPhase(this.props.moonPhase));
    }
  }, {
    key: "drawMoon",
    value: function drawMoon(app) {
      var moon = new PIXI.Sprite(this.moon.texture);
      app.stage.addChild(moon);
    }
  }, {
    key: "drawShades",
    value: function drawShades(app) {
      this.leftShade = new PIXI.Graphics();
      this.leftShade.pivot = this.center;
      this.rightShade = new PIXI.Graphics();
      this.rightShade.pivot = this.center;
      this.leftShade.beginFill(0x000000, 0.7);
      this.leftShade.arc(this.center.x * 2, this.center.y * 2, this.radius, Math.PI / 2, -Math.PI / 2);
      this.leftShade.endFill();
      app.stage.addChild(this.leftShade);
      this.rightShade.beginFill(0x000000, 0.7);
      this.rightShade.arc(this.center.x * 2, this.center.y * 2, this.radius, -Math.PI / 2, Math.PI / 2);
      this.rightShade.endFill();
      app.stage.addChild(this.rightShade); // When the moon is a crescent, use the opposite shade to
      // create a mask, with only the shade part of the moon clearly
      // visible. So, sometimes there are actually two moons on the
      // screen, you just can't tell.

      var hiddenMoon = new PIXI.Sprite(this.moon.texture);
      hiddenMoon.visible = false;
      app.stage.addChild(hiddenMoon);
      this.hiddenMoon = hiddenMoon;
    }
  }, {
    key: "drawPhase",
    value: function drawPhase(leftShade, rightShade, phase) {
      if (phase <= 0.5) {
        var scale = 1 - phase * 4;
        leftShade.scale.x = 1;
        leftShade.position.x = 0;
        rightShade.scale.x = scale;
        rightShade.position.x = this.center.x - scale * this.center.x;

        if (phase >= 0.25) {
          this.hiddenMoon.mask = this.rightShade;
          this.hiddenMoon.visible = true;
        } else {
          this.hiddenMoon.mask = null;
          this.hiddenMoon.visible = false;
        }
      } else {
        var _scale = -phase * 4 + 3;

        rightShade.scale.x = 1;
        rightShade.position.x = 0;

        if (phase <= 0.75) {
          this.hiddenMoon.mask = this.leftShade;
          this.hiddenMoon.visible = true;
          leftShade.scale.x = -_scale;
          leftShade.position.x = this.center.x - -_scale * this.center.x;
        } else {
          this.hiddenMoon.mask = null;
          this.hiddenMoon.visible = false;
          leftShade.scale.x = -_scale;
          leftShade.position.x = this.center.x - -_scale * this.center.x;
          rightShade.scale.x = 1;
          rightShade.position.x = 0;
        }
      }
    }
    /**
     * Get the moonPhase value that's used by the rest of the system
     * ready for the moon phase painter.
     *
     * moonPhase is offset by pi (its initial value is Math.PI, see
     * initial state in main.jsx), and also divide it by 2 * pi
     * because moonPhase is in radians and the moon phase painter
     * expects the phase to be a number between 0 and 1.
     */

  }, {
    key: "convertPhase",
    value: function convertPhase(moonPhase) {
      var phase = (moonPhase - Math.PI) / (Math.PI * 2);

      if (phase > 1) {
        return 0;
      }

      if (phase < 0) {
        return phase + 1;
      }

      return phase;
    }
  }, {
    key: "onMoonPhaseUpdate",
    value: function onMoonPhaseUpdate(e) {
      this.props.onMoonPhaseUpdate((0, _utils.degToRad)((0, _utils.forceNumber)(e.target.value)));
    }
  }]);

  return MoonPhaseView;
}(_react.default.Component);

exports.default = MoonPhaseView;
MoonPhaseView.propTypes = {
  moonPhase: _propTypes.default.number.isRequired,
  onMoonPhaseUpdate: _propTypes.default.func
};