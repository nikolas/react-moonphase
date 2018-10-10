import React from 'react';
import ReactDOM from 'react-dom';
import MoonPhaseView from './MoonPhaseView';
import {forceNumber} from './utils';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moonPhase: -1
        };
    }
    render() {
        return (
            <div className="col-sm-6">
                <div className="text-center">
                    <MoonPhaseView
                        moonPhase={this.state.moonPhase}
                        onMoonPhaseUpdate={this.onMoonPhaseUpdate.bind(this)} />
                </div>
                <input
                    type="range"
                    className="form-control-range"
                    name="moonPhase"
                    min={-Math.PI}
                    max={Math.PI}
                    step={0.01}
                    value={this.state.moonPhase}
                    onChange={this.handleInputChange.bind(this)} />
            </div>
        );
    }
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: forceNumber(target.value)
        });
    }
    onMoonPhaseUpdate(phase) {
        this.setState({moonPhase: phase});
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const domContainer = document.querySelector('#react-container');
    ReactDOM.render(<Main />, domContainer);
});
