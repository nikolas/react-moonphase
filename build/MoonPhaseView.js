"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var PIXI = _interopRequireWildcard(require("pixi.js"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var MoonPhaseView = /*#__PURE__*/function (_React$Component) {
  _inherits(MoonPhaseView, _React$Component);
  var _super = _createSuper(MoonPhaseView);
  function MoonPhaseView(props) {
    var _this;
    _classCallCheck(this, MoonPhaseView);
    _this = _super.call(this, props);
    _this.moon = null;
    _this.radius = 100.5;

    // width: 228, height: 215
    _this.center = new PIXI.Point(228 / 2, 215 / 2);
    return _this;
  }
  _createClass(MoonPhaseView, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var phaseSlot = (0, _utils.getPhaseSlot)(this.props.moonPhase);
      var timeSinceNewMoon = Math.round((0, _utils.getTimeSinceNewMoon)(this.props.moonPhase));
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("select", {
        className: "form-select",
        onChange: this.onMoonPhaseUpdate.bind(this),
        value: phaseSlot
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: 180
      }, "New Moon"), /*#__PURE__*/_react["default"].createElement("option", {
        value: -135
      }, "Waxing Crescent"), /*#__PURE__*/_react["default"].createElement("option", {
        value: -90
      }, "First Quarter"), /*#__PURE__*/_react["default"].createElement("option", {
        value: -45
      }, "Waxing Gibbous"), /*#__PURE__*/_react["default"].createElement("option", {
        value: 0
      }, "Full Moon"), /*#__PURE__*/_react["default"].createElement("option", {
        value: 45
      }, "Waning Gibbous"), /*#__PURE__*/_react["default"].createElement("option", {
        value: 90
      }, "Third Quarter"), /*#__PURE__*/_react["default"].createElement("option", {
        value: 135
      }, "Waning Crescent")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "mt-1",
        ref: function ref(thisDiv) {
          _this2.el = thisDiv;
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-center"
      }, (0, _utils.roundToOnePlace)((0, _utils.getPercentIlluminated)(this.props.moonPhase - Math.PI)), "% illuminated"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-center"
      }, "Time since new moon:"), /*#__PURE__*/_react["default"].createElement("div", {
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
      app.stage.addChild(this.rightShade);

      // When the moon is a crescent, use the opposite shade to
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
        if (phase > 0.25) {
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
        if (phase < 0.75) {
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
}(_react["default"].Component);
exports["default"] = MoonPhaseView;
MoonPhaseView.propTypes = {
  moonPhase: _propTypes["default"].number.isRequired,
  onMoonPhaseUpdate: _propTypes["default"].func
};