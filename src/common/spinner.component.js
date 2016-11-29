import React, {Component} from "react";
import {render} from "react-dom";

export default class Spinner extends Component {
    render() {
        return(
            <div id="spinner">
                <h1>Loading!</h1>
            </div>
        );
    }
}