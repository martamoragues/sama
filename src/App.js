import React, { Component } from 'react';

import './App.css';

import {times28, times29, talks28, talks29, categories} from "./constants";

class App extends Component {
  render() {

    const talksByTime28 = {};
    const talksByTime29 = {};
    times28.forEach((time) => {
        talksByTime28[time] = [];
    });
    times29.forEach((time) => {
          talksByTime29[time] = [];
    });

    talks28.forEach((talk) => {
        if (!talksByTime28[talk.start]) {
            talksByTime28[talk.start] = [];
        }
        talksByTime28[talk.start][talk.category] = talk;
    });
    talks29.forEach((talk) => {
         if (!talksByTime29[talk.start]) {
             talksByTime29[talk.start] = [];
         }
         talksByTime29[talk.start][talk.category] = talk;
    });

    const isBreak = (time) => {
        return time === '11:00' || time === '13:10' || time === '15:50' || time === '17:45';
    };

    const getCell = (category, time, talksByTime) => {
        const talk = talksByTime[time][category];
        if(talk) {
          const title = talk.title;
          const position = talk.start === time ? 'start' : (talk.end === time ? 'end' : 'middle');
            return (
                <td className={`category-${category} position-${position}`}>
                   {talk.start === time ? title : ''}
                       <br></br>
                    <a href={talk.link} target="__blank">
                        <span className="speaker">{talk.speaker}</span>
                   </a>
                </td>
            );
        }
        return (<td></td>);
    };


    return (
      <div className="App">
        <header className="App-header">
            <div className="title-container">
                <img src="https://www.europeanwomenintech.com/hubfs/EUWIT-European-Women-in-Tech/images/logos/euwit-logo.png" className="App-logo" alt="logo" />
                <b className="title">28th of November</b>
            </div>
        </header>
        <div className="info"> *Click on the title link to know more about
            <img alt="logo" src="https://d1afx9quaogywf.cloudfront.net/sites/default/files/Logos/Twitter400x2302.png"/>and&nbsp;&nbsp;<img alt="logo" src="https://pndblog.typepad.com/.a/6a00e0099631d0883301bb09d01edf970d-800wi"/>&nbsp;&nbsp;the speakers
            <br></br>
            More information <a target="__blank" href="https://www.europeanwomenintech.com/">here</a>
            &nbsp; and in the <a target="__blank" href="https://ewit2018.blogspot.com/"> blog</a>
        </div>
        <div className="sama">

          <table className="table table-striped table-warning">
            <thead>
              <tr>
                  <th className="special-time">Time</th>
                {Object.keys(categories).map(category => (
                    <th className="categories-keys">{categories[category]}</th>
                ))}
              </tr>
            </thead>
            <tbody>

            {Object.keys(talksByTime28).map((time) => (
              <tr>
                <td className={`times ${isBreak(time) ? 'break' : ''}`}>{time}</td>
                      {Object.keys(categories).map(category =>
                          (time === "11:00" || time === "15:50"
                              ? <td className="break">Coffee Break</td>
                              : (time === "13:10")
                                  ? <td className="break">Lunch Break</td>
                                  : (time === "17:45")
                                    ? <td className="break">Networking Drinks</td>
                                    :getCell(category, time, talksByTime28)))}
              </tr>
            ))}

            </tbody>
          </table>
        </div>
          <div className="title-container-29">
              <img src="https://www.europeanwomenintech.com/hubfs/EUWIT-European-Women-in-Tech/images/logos/euwit-logo.png?t=1543333704301" className="App-logo" alt="logo" />
              <b className="title">29th of November</b>
          </div>
          <div className="sama">
              <table className="table table-striped table-warning">
                  <thead>
                  <tr>
                      <td className="special-time">Time</td>
                      {Object.keys(categories).map(category => (
                          <td className="categories-keys">{categories[category]}</td>
                      ))}
                  </tr>
                  </thead>
                  <tbody>

                  {Object.keys(talksByTime29).map((time) => (
                      <tr>
                          <td className={`times ${isBreak(time) ? 'break' : ''}`}>{time}</td>
                          {Object.keys(categories).map(category =>
                              (time === "11:00"
                                  ? <td className="break">Coffee Break</td>
                                  : (time === "13:10")
                                      ? <td className="break">Lunch Break</td>
                                      : (time === "15:50")
                                          ? <td className="break">End of Conference</td>
                                          :getCell(category, time, talksByTime29)))}
                      </tr>
                  ))}

                  </tbody>
              </table>
          </div>
          <div className="author">Made with ❤️ by SAMA</div>
      </div>


    );
  }
}

export default App;
