# react-moonphase [![Build Status](https://travis-ci.org/nikolas/react-moonphase.svg?branch=master)](https://travis-ci.org/nikolas/react-moonphase) [![Greenkeeper badge](https://badges.greenkeeper.io/nikolas/react-moonphase.svg)](https://greenkeeper.io/)

Display lunar phase with React and Pixi.js

![Screenshot of moon phase](https://raw.githubusercontent.com/nikolas/react-moonphase/master/img/screenshot.png)

## Usage

* `npm install --save react-moonphase`


```
import MoonPhaseView from 'react-moonphase';

// ...

render() {
    return (
        <MoonPhaseView
            moonPhase={this.state.moonPhase}
            onMoonPhaseUpdate={this.onMoonPhaseUpdate.bind(this)} />
    );
}
```
