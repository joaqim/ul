import React from 'react'
import { hot } from 'react-hot-loader'
import Characters from './Characters'
import './App.css'


class Time extends React.Component {
constructor(props) {
super(props);
this.state = {
	currentTime: new Date()};
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

msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs + '.' + ms;
}

msToTime(s) {
	var t = parseInt(s / 1e3 % 60, 10),
	    n = parseInt(s / 6e4 % 60, 10),
	    r = parseInt(s / 36e4 % 24, 10);
	return r = r < 10 ? "0" + r : r, n = n < 10 ? "0" + n : n, t = t < 10 ? "0" + t : t, r + ":" + n + ":" + t

}
timeLeft() {
var e = this.props.ticketValidityTime,
t = this.state.currentTime.getTime() - this.props.purchased.getTime();
return this.msToTime(e - t)
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

    render() {
        return (
	<div>
            {/*<div className="tram-container-wrapper"><div className="tram-wrapper"></div></div>*/}
                <div className="header-wrapper">
                    <img src="static/media/back_button.png"/>
                    <div className="header-text">Biljett</div>
                </div>
                <div className="ticket-body">
                    <img src="/static/media/QR.png" alt="QR Code" className="QR-code"/>
	            <hr/>
			<Time ticketValidityTime={8e5}  purchased={this.state.purchased} />
                    <hr/>
                    <div className="ticket-info-wrapper"/>
<table>
<tbody>
<tr>
<td>
<tr>Biljettyp</tr>
<tr>1 UNGDOM</tr>
</td>
<td>
<tr>Giltighet</tr>
<tr>Zon 4+5</tr>
</td>
<td></td><td><tr height= "20px"></tr><tr>75 min</tr></td>

</tr>
</tbody>
</table>
                    <hr/>
                    <div className="random-string"/>JU2MRA27E======</div>
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
