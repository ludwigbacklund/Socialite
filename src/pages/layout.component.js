import React, {Component} from "react";
import {render} from "react-dom";

import Nav from '../common/nav.component.js'
import Footer from '../common/footer.component.js'

export default class Layout extends Component {
    render() {
        return(
            <div id="main-landing">
                <Nav/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}