import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";

const GATSBY_API_URL = process.env.GATSBY_API_URL

class AddEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {starttimeLong: '', endtimeLong: '', event: '', organizer: '', starttime: '', endtime: '', eventlocation: '', eventlanguage: '', address: '', link: '', description: '', email: ''};
  }

  handleForm = async e => {
    e.preventDefault();
    let formMessage = document.querySelector('.form-message');
    formMessage.innerHTML = ' ';
    try {
      await fetch(GATSBY_API_URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(this.state),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      formMessage.innerHTML = '<h3>Event submitted</h3>';
    } catch (error) {
      formMessage.innerHTML = '<h3>' + JSON.stringify(error) + '</h3>';
    }
    this.setState({starttimeLong: '', endtimeLong: '', event: '', organizer: '', starttime: '', endtime: '', eventlocation: '', eventlanguage: '', address: '', link: '', description: '', email: ''})
    document.getElementById('onlineevent').checked = false
  };

  handleFields = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnline = e => {
    if (document.getElementById('onlineevent').checked == true) {
      this.setState({
        eventlocation: 'Online',
        address: ''
      });
      document.getElementById('eventlocation').readOnly = true
      document.getElementById('address').readOnly = true
    } else {
      this.setState({
        eventlocation: ''
      });
      document.getElementById('eventlocation').readOnly = false
      document.getElementById('address').readOnly = false
    }
    
  };
  handleStartTime = date => {
    this.setState({
      starttime: moment(date).unix(),
      starttimeLong: date,
      endtime: moment(date).add(30, 'm').unix(),
      endtimeLong: moment(date).add(30, 'm').toDate(),
    });
    document.getElementById('endtimeLong').minDate = date
  };
  handleEndTime = date => {
    this.setState({
      endtime: moment(date).unix(),
      endtimeLong: date
    });
  };

  render() {
    return (
      <div id="main" className="alt">
        <section id="one">
            <div className="inner">
              <header className="major">
                <h1>Add a serverless event</h1>
              </header>
              <p>So you have a serverless event? Great! This is the place to submit your event. If your submitted event is approved 
                it will be listed alongside the others in the awesome list of serverless events.
              </p>
              <form id="addevent" onSubmit={this.handleForm}>
                <div className="field half first">
                    <label htmlFor="event">Event Title</label>
                    <input type="text" name="event" id="event" required onChange={this.handleFields} value={this.state.event} />
                </div>
                <div className="field half">
                    <label htmlFor="organizer">Organizer</label>
                    <input type="text" name="organizer" id="organizer" required onChange={this.handleFields} value={this.state.organizer} />
                </div>
                <div className="field half first">
                    <label htmlFor="starttimeLong">Start time ({moment.tz(moment.tz.guess()).zoneAbbr()})</label>
                    <DatePicker
                      name="starttimeLong"
                      id="starttimeLong"
                      className="starttimeLong"
                      selected={this.state.starttimeLong}
                      value={this.state.starttimeLong}
                      required
                      autoComplete="off"
                      todayButton="Today"
                      onChange={this.handleStartTime}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <input type="hidden" pattern="[0-9]*" name="starttime" id="starttime" required onChange={this.handleFields} value={this.state.starttime} />
                </div>
                <div className="field half">
                    <label htmlFor="endtimeLong">End time ({moment.tz(moment.tz.guess()).zoneAbbr()})</label>
                    <DatePicker
                      name="endtimeLong"
                      id="endtimeLong"
                      className="endtimeLong"
                      selected={this.state.endtimeLong}
                      value={this.state.endtimeLong}
                      required
                      autoComplete="off"
                      minDate={this.state.starttimeLong}
                      todayButton="Today"
                      onChange={this.handleEndTime}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <input type="hidden" pattern="[0-9]*" name="endtime" id="endtime" required onChange={this.handleFields} value={this.state.endtime} />
                </div>
                <div className="field half first">
                    <label htmlFor="onlineevent">Online event</label>
                    <input type="checkbox" id="onlineevent" name="onlineevent" onChange={this.handleOnline} />
                    <label htmlFor="onlineevent">This is an online event</label>
                </div>
                <div className="field half">
                    <label htmlFor="eventlocation">Location (Online or city, country)</label>
                    <input type="text" name="eventlocation" id="eventlocation" required onChange={this.handleFields} value={this.state.eventlocation} />
                </div>
                <div className="field full">
                    <label htmlFor="address">Venue and address (if not online)</label>
                    <input type="text" name="address" id="address" onChange={this.handleFields} value={this.state.address} />
                </div>
                <div className="field full">
                    <label htmlFor="link">Event link</label>
                    <input type="url" name="link" id="link" required onChange={this.handleFields} value={this.state.link} />
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" rows="2" maxlength="200" required onChange={this.handleFields} value={this.state.description} ></textarea>
                </div>
                <div className="field half first">
                    <label htmlFor="eventlanguage">Language</label>
                    <input type="text" name="eventlanguage" id="eventlanguage" required onChange={this.handleFields} value={this.state.eventlanguage} />
                </div>
                <div className="field half">
                    <label htmlFor="email">Submitters email</label>
                    <input type="email" name="email" id="email" required onChange={this.handleFields} value={this.state.email} />
                </div>
                <div>
                <ul className="actions">
                    <li><input type="submit" value="Submit Event" className="special" /></li>
                    <li><input type="reset" value="Clear" /></li>
                </ul>
                </div>
                <div className="form-message">
                  <h3> </h3>
                </div>
              </form>
            </div>
        </section>
    </div>
    )
  }
}

export default AddEventForm;