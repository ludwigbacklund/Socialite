import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import Avatar from 'react-avatar';

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitterFname: null,
            submitterLname: null,
            timestamp: null,
            timeUnit: null,
            worker: null
        }
    }

    componentWillMount() {
        FB.database().ref('/users/' + this.props.submitterId).once('value', userData => {
            this.setState({
                submitterFname: userData.val().fname,
                submitterLname: userData.val().lname,
                avatar: <Avatar name={userData.val().fname + " " + userData.val().lname} size={32}/>
            });
            this.generateTimestamp(Date.now());
        }).catch(err => {
            console.log("ERROR Couldn't access submitter of message in Firebase: ", err)
        });
        this.startWorker();
    }

    //Converts a UNIX timestamp to a human-readable format like "15 sec ago", "3 min ago", "6 hours ago" or "2 days ago"
    generateTimestamp(currentDate) {
        var oneSecond = 1000;
        var oneMinute = 60 * 1000;
        var oneHour = 60 * 60 * 1000;
        var oneDay = 24 * 60 * 60 * 1000;

        var unit = oneSecond;
        var currentTimestamp = currentDate;
        var messageTimestamp = this.props.timestamp;
        var diff = currentTimestamp - messageTimestamp;

        (diff < oneMinute
            ? unit = oneSecond
            : ((diff < oneHour)
            ? unit = oneMinute
            : ((diff < oneDay)
            ? unit = oneHour
            : unit = oneDay)));

        this.setState({
            timestamp: Math.round(Math.abs((currentTimestamp - messageTimestamp) / (unit))),
            timeUnit: ((unit == oneSecond)
                ? 'sec'
                : ((unit == oneMinute)
                ? 'minutes'
                : ((unit == oneHour)
                ? 'hours'
                : ((unit == oneDay)
                ? 'days'
                : 'days'))))
        })
    }

    componentWillUnmount() {
        if (this.state.worker) {
            this.stopWorker();
        }
    }

    //Web worker start function to automatically update the timestamp of every message on a profile
    startWorker() {
        if (typeof(Worker) !== "undefined") {
            if (!this.state.worker) {
                var w = new Worker("/js/time-worker.js");
                this.setState({
                    worker: w
                });
            }
            w.onmessage = function (event) {
                this.generateTimestamp(event.data);
            }.bind(this);
        }
    }

    stopWorker() {
        this.state.worker.terminate();
        this.setState({
            worker: null
        });
    }

    render() {

        return(
            <div class="profile-message">
                <article class="media">
                    <figure class="media-left">
                        {this.state.avatar}
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>
                                    {this.state.submitterFname + " " + this.state.submitterLname}
                                </strong>
                                <br/>
                                {this.props.messageText}
                                <br/>
                                <small>{this.state.timestamp} {this.state.timeUnit} ago</small>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}