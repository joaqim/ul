import React from 'react'
import { hot } from 'react-hot-loader'
import Characters from './Characters'
import './App.css'
import 'typeface-roboto'

import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';


import BackIcon from './BackIcon'
import InfoIcon from './InfoIcon'

import QR from "./images/QR.png"
import Bus from "./Bus.js"
import BusRegional from "./BusRegional.js"
import Train from "./Train.js"

import bwip from 'bwip-js'
class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.option;
    }
}

String.random = function (length) {
	  let radom13chars = function () {
		    return Math.random().toString(16).substring(2, 15)
	  }
	  let loops = Math.ceil(length / 13)
	  return new Array(loops).fill(radom13chars).reduce((string, func) => {
		    return string + func()
	  }, '').substring(0, length)
}
function MSToMinOrDays(s) {
    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    var day = hrs >= 999999999 ? Math.floor((hrs + 24)/24) : Math.round(hrs / 24);
    return day ? day + " dagar" : pad(hrs * 60 + mins) + " min"

}

function MSToTime(s) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    var day = hrs >= 999999999 ? Math.floor((hrs + 24)/24) : Math.round(hrs / 24);
return day ? day + " dagar" : pad(hrs) + ':' + pad(mins) + ':' + pad(secs)

}
class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
	          currentTime: new Date(),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => { return this.tick() }, 1000)

    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick () {
        this.setState({
	          currentTime: new Date()
        })
    }

    timeLeft() {
        var e = this.props.ticketValidityTime,
            t = this.state.currentTime.getTime() - this.props.purchased.getTime();
        return MSToTime(e - t)
    }

    render() {
        return (
	          <div className="time-info-wrapper">
                <table>
                    <tbody>
                        <tr><td>Tid kvar</td></tr>
                        <tr><td>{this.timeLeft()}</td></tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class Header extends React.Component {

constructor(props) {
	super(props)
	this.state = {
		rndBytes: String.random(320),
		  purchased: new Date()
     	}
}

getPurchasedDate() {
	var t = this.state.purchased
	if (void 0 !== t && (t = t.replace(new RegExp('"', "g"), "")), t = new Date(t), isNaN(t.getTime()) || (new Date).getTime() - t.getTime() > e) {
	t = new Date;
	var n = (new Date).setDate(Date.now() + 1e3);
	this.setState(prevState => {
		  purchased = n;
	})
  }
}

    getFormattedDate(e) {
        return e.getFullYear() + "-" + ("0" + (e.getMonth() + 1)).slice(-2) + "-" + ("0" + e.getDate()).slice(-2) + " " + ("0" + e.getHours()).slice(-2) + ":" + ("0" + e.getMinutes()).slice(-2)
    }

    componentDidMount() {
	      bwip('mycanvas', {
            bcid:        'azteccode',       // Barcode type
            text:        String.random(450),    // Text to encode
            scale:       3,               // 3x scaling factor
            /* height:      10,              // Bar height, in millimeters */
            includetext: false,            // Show human-readable text
            textxalign:  'center',        // Always good to set this
        }, function (err, cvs) {
            if (err) {
                // Decide how to handle the error
                // `err` may be a string or Error object
		            console.log(err)
            } else {
                // Nothing else to do in this example...
            }
        });
	  }
    render() {
        return (
	          <div>
                <div className="header-wrapper">
                    <BackIcon/>
                    <div className="header-text">Biljett</div>
                    <InfoIcon/>
                </div>
                {/* <Switch>
                    {// <Route exact path="/" component={List} /> }
                    <Route path="/:option" component={TestComponent} />
                 </Switch>
                 */}
                <div className="tram-wrapper">
                    <Bus/>
                    <BusRegional/> 
                    <Train/> 
                </div>
                {/*<div className="tram-container-wrapper"><div className="tram-wrapper"></div></div>*/}
                <div className="ticket-body">
                    {/* <img src={QR} alt="QR Code" className="QR-code"/> */}
	                  <canvas className="QR-code" id="mycanvas"></canvas>
                    <br/>
	                  <hr/>
			              <Time ticketValidityTime={this.props.ticketValidityTime}  purchased={this.state.purchased} />
                    <hr/>
                    <div className="ticket-info-wrapper">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <tr>Biljettyp</tr>
                                        <tr>{this.props.ticketType}</tr>
                                    </td>
                                    <td>
                                                <tr>Giltighet</tr>
                                                <tr>{this.props.zone}</tr><tr style={{display: "table-cell", paddingLeft: "2vw", fontWeigth: "600"}}>{MSToMinOrDays(this.props.ticketValidityTime)}</tr>
                                    </td>
                                            {/* <td></td><td><tr height="20px"></tr><tr style={{position: "absolute",left: "60%",top: "84.3%"}}>75 min</tr></td> */}
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td>
                                                <tr>Pris</tr>
                                                <tr>{this.props.ticketPrice} kr</tr>
                                            </td>
                                            <td>
                                                <tr>Giltig t.o.m.</tr>
                                                <tr>{/*
                                                        this.getFormattedDate(new Date(this.state.purchased.getTime() + this.state.ticketValidityTime))*/
                                                    this.getFormattedDate(new Date(this.state.purchased.getTime() + this.props.ticketValidityTime))
                                                }</tr>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br/>
                            <br/>
	                      </div>
            </div>
        )
    }
}

/*4.5e6 = 4,500,000 (75 min) */
/* ticketValidityTime:  2.592e9, // 30 dagar  */
/* zone: "Alla zoner", */
/* ticketPrice: 880 */

const App = () => (
    <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route  path='/ul'
                        render={(props) =>
                            <Header
                                ticketValidityTime={4.5e6}
                                                   zone={"Zon 4+5"}
                                                   ticketType={"1 VUXEN"}
                                                   ticketPrice={64}
                                                   isAuthed={true}
                            />}
                />
    {console.log(process.env.PUBLIC_URL)}
                <Route exact path='/manad'
                       render={(props) =>
                           <Header
                               ticketValidityTime={2.592e9}
                                                  zone={"Alla zoner"}
                                                  ticketType={"1 VUXEN"}
                                                  ticketPrice={880}
                                                  isAuthed={true}
                           />}
    />
            </Switch>
        </BrowserRouter>


        {/* <Header
            ticketType={9001}
            ticketValidityTime={4.5e6}
            zone={"Zon 4+5"}
            ticketType={"1 VUXEN"}
            ticketPrice={64}
            /> */}
    </div>
)

{/* <div>
    <div class="header-wrapper">
    <div class="menu-wrapper">
    <img src="static/media/menu.png" alt class/>
    </div>
    <div class="header-text">Biljett</div>
    </div>
    <div class="ticket-body">
    <img src="/static/media/QR.png" alt="QR Code" class="QR-code"/>
    <hr/>
    <div class="time-info-wrapper">
    <table>
    <tbody>
    <tr>
    <td>Tid kvar</td>
    </tr>
    <tr>
    <th>00:1:15</th>
    </tr>
    </tbody>
    </table>
    </div>
    <hr/>
    <div class="ticket-info-wrapper"/>
    <hr/>
    <div class="random-string"/>
    </div>
    </div> */}


export default hot(module)(App)
