import React from 'react';
import PropTypes from 'prop-types';
import * as PIXI from 'pixi.js';
import {
    forceNumber, degToRad, getPercentIlluminated,
    roundToOnePlace, getPhaseSlot, getTimeSinceNewMoon, formatInterval
} from './utils';

export default class MoonPhaseView extends React.Component {
    constructor(props) {
        super(props);
        this.moon = null;
        this.radius = 100.5;

        // width: 228, height: 215
        this.center = new PIXI.Point(228 / 2, 215 / 2);
    }
    render() {
        const phaseSlot = getPhaseSlot(this.props.moonPhase);
        const timeSinceNewMoon = Math.round(
            getTimeSinceNewMoon(this.props.moonPhase));
        return <div>
                <select className="form-select"
                        onChange={this.onMoonPhaseUpdate.bind(this)}
                        value={phaseSlot}>
                    <option value={180}>New Moon</option>
                    <option value={-135}>Waxing Crescent</option>
                    <option value={-90}>First Quarter</option>
                    <option value={-45}>Waxing Gibbous</option>
                    <option value={0}>Full Moon</option>
                    <option value={45}>Waning Gibbous</option>
                    <option value={90}>Third Quarter</option>
                    <option value={135}>Waning Crescent</option>
                </select>
                <div className="mt-1"
                     ref={(thisDiv) => {this.el = thisDiv}} />
                <div className="text-center">
                    {
                        roundToOnePlace(getPercentIlluminated(
                            this.props.moonPhase - Math.PI))
                    }% illuminated
                </div>
                <div className="text-center">Time since new moon:</div>
                <div className="text-center">
                    {formatInterval(timeSinceNewMoon)}
                </div>
        </div>;
    }
    componentDidMount() {
        const me = this;

        this.app = new PIXI.Application({
            width: this.center.x * 2,
            height: this.center.y * 2,
            forceCanvas: true
        });
        this.el.appendChild(this.app.view);

        this.app.loader.add('moon', 'img/moon.png');

        this.app.loader.load((loader, resources) => {
            me.moon = resources.moon;
            me.draw();
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.moonPhase !== this.props.moonPhase) {
            this.drawPhase(this.leftShade, this.rightShade,
                           this.convertPhase(this.props.moonPhase));
        }
    }
    draw() {
        this.drawMoon(this.app);
        this.drawShades(this.app);
        this.drawPhase(this.leftShade, this.rightShade,
                       this.convertPhase(this.props.moonPhase));
    }
    drawMoon(app) {
        const moon = new PIXI.Sprite(this.moon.texture);
        app.stage.addChild(moon);
    }
    drawShades(app) {
        this.leftShade = new PIXI.Graphics();
        this.leftShade.pivot = this.center;
        this.rightShade = new PIXI.Graphics();
        this.rightShade.pivot = this.center;

        this.leftShade.beginFill(0x000000, 0.7);
        this.leftShade.arc(this.center.x * 2, this.center.y * 2,
                           this.radius, Math.PI / 2, -Math.PI / 2);
        this.leftShade.endFill();
        app.stage.addChild(this.leftShade);

        this.rightShade.beginFill(0x000000, 0.7);
        this.rightShade.arc(this.center.x * 2, this.center.y * 2,
                            this.radius, -Math.PI / 2, Math.PI / 2);
        this.rightShade.endFill();
        app.stage.addChild(this.rightShade);

        // When the moon is a crescent, use the opposite shade to
        // create a mask, with only the shade part of the moon clearly
        // visible. So, sometimes there are actually two moons on the
        // screen, you just can't tell.
        const hiddenMoon = new PIXI.Sprite(this.moon.texture);
        hiddenMoon.visible = false;
        app.stage.addChild(hiddenMoon);
        this.hiddenMoon = hiddenMoon;
    }
    drawPhase(leftShade, rightShade, phase) {
        if (phase <= 0.5) {
            const scale = 1 - (phase * 4);
            leftShade.scale.x = 1;
            leftShade.position.x = 0;
            rightShade.scale.x = scale;
            rightShade.position.x = this.center.x - (scale * this.center.x);

            if (phase > 0.25) {
                this.hiddenMoon.mask = this.rightShade;
                this.hiddenMoon.visible = true;
            } else {
                this.hiddenMoon.mask = null;
                this.hiddenMoon.visible = false;
            }
        } else {
            const scale = -phase * 4 + 3;

            rightShade.scale.x = 1;
            rightShade.position.x = 0;

            if (phase < 0.75) {
                this.hiddenMoon.mask = this.leftShade;
                this.hiddenMoon.visible = true;
                leftShade.scale.x = -scale;
                leftShade.position.x = this.center.x - (-scale * this.center.x);
            } else {
                this.hiddenMoon.mask = null;
                this.hiddenMoon.visible = false;
                leftShade.scale.x = -scale;
                leftShade.position.x =  this.center.x - (-scale * this.center.x);
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
    convertPhase(moonPhase) {
        const phase = (moonPhase - Math.PI) / (Math.PI * 2);
        if (phase > 1) {
            return 0;
        }
        if (phase < 0) {
            return phase + 1;
        }
        return phase;
    }
    onMoonPhaseUpdate(e) {
        this.props.onMoonPhaseUpdate(
            degToRad(forceNumber(e.target.value))
        );
    }
}

MoonPhaseView.propTypes = {
    moonPhase: PropTypes.number.isRequired,
    onMoonPhaseUpdate: PropTypes.func
};
