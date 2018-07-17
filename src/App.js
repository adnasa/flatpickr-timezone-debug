import "flatpickr/dist/themes/airbnb.css";
import moment from "moment-timezone";
import React, { Component } from "react";
import Flatpickr from "flatpickr";
// import logo from "./logo.svg";
import "./App.css";

// with GMT-0
const d = new Date();
const _now = d.toISOString();
const timeZone = "Europe/Berlin";
const locale = "en";

const getFormattedDate = value =>
  moment(value)
    .locale(locale)
    .format("L LT");

console.log("original dateTime", getFormattedDate(_now));
console.log(
  `original dateTime formatted to ${timeZone}: ${moment(_now)
    .tz(timeZone)
    .locale(locale)
    .format("L LT")}`
);

class App extends Component {
  state = {
    dateTime: _now,
    date: new Date()
  };
  componentDidMount() {
    const dateByMCTimeZoneMoment = moment(d)
      .tz(timeZone)
      .locale(locale);

    const dateByMCTimeZone = new Date(
      dateByMCTimeZoneMoment.year(),
      dateByMCTimeZoneMoment.month(),
      dateByMCTimeZoneMoment.date(),
      dateByMCTimeZoneMoment.hour(),
      dateByMCTimeZoneMoment.minute(),
      dateByMCTimeZoneMoment.second()
    );
    const options = {
      defaultDate: dateByMCTimeZone,
      formatDate: getFormattedDate,
      mode: "single",
      enableTime: true,
      // time_24hr: true,
      onChange: this.handleChange,
      wrap: true
    };
    this.flatpickr = new Flatpickr(this.refElement, options);
  }
  handleChange = ([value]) => {
    const nextFormattedDate = new Date(getFormattedDate(value));
    const nextDate = value;
    console.log(`next formatted date with system time zone => ${value}`);
    this.setState({
      dateTime: nextFormattedDate.toISOString(),
      date: nextDate
    });
  };
  getRef = node => {
    this.refElement = node;
  };
  getFormattedValue = value => getFormattedDate(value);
  render() {
    const dateByMCTimeZoneMoment = moment
      .tz(this.state.date, timeZone)
      .locale(locale);
    const dateByMCTimeZone = new Date(
      dateByMCTimeZoneMoment.year(),
      dateByMCTimeZoneMoment.month(),
      dateByMCTimeZoneMoment.date(),
      dateByMCTimeZoneMoment.hour(),
      dateByMCTimeZoneMoment.minute(),
      dateByMCTimeZoneMoment.second()
    );

    var tzoffset = dateByMCTimeZone.getTimezoneOffset() * 60000; // offset in milliseconds
    var localISOTime = new Date(dateByMCTimeZone - tzoffset).toISOString();

    console.log(
      // `toISOString with Moment: ${moment(this.state.dateTime)
      //   .locale(locale)
      //   .toISOString()}`,
      // `\ntoISOString with Moment (with timeZone): ${moment(this.state.dateTime)
      //   .tz(timeZone)
      //   .locale(locale)
      //   .toISOString()}`,
      // `\ntoISOString with 'Date': ${this.state.dateTime}`,
      this.state.date,
      this.state.date && this.state.date.toISOString(),
      localISOTime
    );
    return (
      <div className="app" ref={this.getRef}>
        <input
          data-input
          defaultValue={this.getFormattedValue(this.state.dateTime)}
        />
      </div>
    );
  }
}

export default App;
