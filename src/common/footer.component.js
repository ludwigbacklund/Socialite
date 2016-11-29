import React, {Component} from "react";
import {render} from "react-dom";

export default class Footer extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer class="footer">
                <div class="container">
                    <div class="content has-text-centered">
                        <p>
                            <strong>Socialite</strong> by <a href="http://backlund.io">Ludwig Bäcklund</a> and <a
                            href="http://lukasvikstrom.io">Lukas Vikström</a>.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}