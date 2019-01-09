import React from 'react'
import { hot } from 'react-hot-loader'
import Characters from './Characters'
import './App.css'
import 'typeface-roboto'

import BackIcon from './BackIcon'
import InfoIcon from './InfoIcon'

import QR from "./images/QR.png"
import Bus from "./Bus.js"
import BusRegional from "./BusRegional.js"
import Train from "./Train.js"



class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
	          currentTime: new Date()
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

    MSToTime(s) {

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

        return pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
    }

    timeLeft() {
        var e = this.props.ticketValidityTime,
            t = this.state.currentTime.getTime() - this.props.purchased.getTime();
        return this.MSToTime(e - t)
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
		  purchased: new Date(),
      /*4.5e6 = 4,500,000 (75 min) */
      ticketValidityTime:  4.5e6
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

    render() {
        return (
	          <div>
                <div className="header-wrapper">
                    <BackIcon/>
                    <div className="header-text">Biljett</div>
                    <InfoIcon/>
                </div>

                <div className="tram-wrapper">
                    <Bus/>
                     <BusRegional/> 
                     <Train/> 
                </div>
                {/*<div className="tram-container-wrapper"><div className="tram-wrapper"></div></div>*/}
                <div className="ticket-body">
                    <img src={QR} alt="QR Code" className="QR-code"/>
                    <br/>
	                  <hr/>
			              <Time ticketValidityTime={this.state.ticketValidityTime}  purchased={this.state.purchased} />
                    <hr/>
                    <div className="ticket-info-wrapper">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <tr>Biljettyp</tr>
                                        <tr>1 UNGDOM</tr>
                                    </td>
                                    <td>
                                        <tr>Giltighet</tr>
                                        <tr>Zon 4+5</tr><tr style={{display: "table-cell", paddingLeft: "2vw", fontWeigth: "600"}}>75 min</tr>
                                    </td>
                                    {/* <td></td><td><tr height="20px"></tr><tr style={{position: "absolute",left: "60%",top: "84.3%"}}>75 min</tr></td> */}
                                </tr>
                                <br/>
                                <tr>
                                    <td>
                                        <tr>Pris</tr>
                                        <tr>64 kr</tr>
                                    </td>
                                    <td>
                                        <tr>Giltig t.o.m.</tr>
                                        <tr>{/*
                                                this.getFormattedDate(new Date(this.state.purchased.getTime() + this.state.ticketValidityTime))*/
                                            this.getFormattedDate(new Date(this.state.purchased.getTime() + this.state.ticketValidityTime))
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


const App = () => (
    <div>
        <Header/>
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
