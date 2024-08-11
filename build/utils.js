"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundToOnePlace = exports.radToDeg = exports.getTimeSinceNewMoon = exports.getPhaseSlot = exports.getPercentIlluminated = exports.formatInterval = exports.forceNumber = exports.degToRad = void 0;
/*
 * Force a value into a number.
 */
var forceNumber = function forceNumber(n) {
  n = Number(n);
  if (isNaN(n) || typeof n === 'undefined') {
    n = 0;
  }
  return n;
};

/*
 * Convert degrees to radians.
 */
exports.forceNumber = forceNumber;
var degToRad = function degToRad(degrees) {
  return degrees * Math.PI / 180;
};
exports.degToRad = degToRad;
var radToDeg = function radToDeg(radians) {
  return radians * 180 / Math.PI;
};
exports.radToDeg = radToDeg;
var getPercentIlluminated = function getPercentIlluminated(moonPhase) {
  var percent = (1 - Math.cos(moonPhase)) / 2;
  return percent * 100;
};
exports.getPercentIlluminated = getPercentIlluminated;
var roundToOnePlace = function roundToOnePlace(n) {
  return Math.round(n * 10) / 10;
};

/*
 * Given the exact moon phase, return the broad bucket that this
 * phase is called in this interactive. This is used to keep the
 * phase dropdown up to date with the current scenario.
 *
 * The waning and waxing slots are larger than the others.
 *
 * Here's a visualization of moonPhase is represented. The circle
 * is the orbit of the moon around the sun - seen in MainView.
 * This is in degrees, but the moonPhase state value is in radians.
 * Units are interchangeable.
 *
 * The sun is to the left of the diagram, so at 0 degrees, the moon is
 * fully illuminated by the sun to the earth's perspective, making a
 * full moon.
 *
 *
 *                  90
 *
 *             . -- ~~~ -- .
 *         .-~               ~-.
 *        /                     \
 *       /         .____.        \
 *  180 |         /      \        |
 * -180 |        (  earth )       | 0
 *      |         \      /        |
 *       \          `---`        /
 *        \                     /
 *         `-.               .-'
 *             ~- . ___ . -~
 *
 *                  -90
 *
 *
 * New Moon, Full Moon, and the first and third quarters are more
 * specific, narrow events in reality, so these are represented by
 * only 5 degrees around this orbit. The waxing and waning phases
 * take up the rest of the orbit.
 */
exports.roundToOnePlace = roundToOnePlace;
var getPhaseSlot = function getPhaseSlot(moonPhase) {
  var phase = radToDeg(moonPhase);

  // New Moon
  if (Math.abs(phase - 180) < 5 || Math.abs(phase + 180) < 5) {
    return 180;
  }

  // First Quarter
  if (Math.abs(phase + 90) < 5) {
    return -90;
  }

  // Full Moon
  if (Math.abs(phase) < 5) {
    return 0;
  }

  // Third Quarter
  if (Math.abs(phase - 90) < 5) {
    return 90;
  }

  // Waxing Crescent
  if (Math.abs(phase + 135) < 45) {
    return -135;
  }

  // Waxing Gibbous
  if (Math.abs(phase + 45) < 45) {
    return -45;
  }

  // Waning Gibbous
  if (Math.abs(phase - 45) < 45) {
    return 45;
  }

  // Waning Crescent
  if (Math.abs(phase - 135) < 45) {
    return 135;
  }

  // error
  return null;
};

/*
 * Given the moon phase (some point along the moon's 360-degree
 * orbit), return the time, in hours, since it's been a New Moon (180
 * degrees).
 *
 * The moon's synodic period is 29.530589 days, or 708.734136 hours,
 * so that's how long it takes for the moon to complete its orbit
 * around the earth. So, this time interval can be computed with the
 * moonPhase value.
 */
exports.getPhaseSlot = getPhaseSlot;
var getTimeSinceNewMoon = function getTimeSinceNewMoon(phase) {
  return (phase + Math.PI) / (Math.PI * 2 / 708.734136);
};

/*
 * Given a time interval in hours, shorten it by displaying days and
 * hours.
 */
exports.getTimeSinceNewMoon = getTimeSinceNewMoon;
var formatInterval = function formatInterval(i) {
  var quotient = Math.floor(i / 24);
  var remainder = i % 24;
  var quotientPlural = quotient === 1 ? '' : 's';
  var remainderPlural = remainder === 1 ? '' : 's';
  if (quotient) {
    return "".concat(quotient, " day").concat(quotientPlural, ", ").concat(remainder, " hour").concat(remainderPlural);
  } else {
    return "".concat(remainder, " hour").concat(remainderPlural);
  }
};
exports.formatInterval = formatInterval;