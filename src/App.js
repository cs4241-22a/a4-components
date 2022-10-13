import { useState, useRef } from 'react'
import './App.css';

function App() {
  const [yourname, setYourname] = useState("")

  const [countryName, setCountryName] = useState("")
  const [cityName, setCityName] = useState("")
  const [date, setDate] = useState("")
  const [daysSpent, setDaysSpent] = useState("")

  const [tableItems, setTableItems] = useState([])

  const tlistRef = useRef(null)

  function updateTitle() {
    tlistRef.current.innerHTML = yourname + "'s Travel List";
  }

  function submitForm(e) {
    e.preventDefault();

    let json = {
      country_name: countryName,
      city_name: cityName,
      date: date,
      time_spent: daysSpent + ' days',
    };

    let body = JSON.stringify(json);

    fetch("/submit", {
      method: "POST",
      body,
    }).then((res) => {
      res.text().then((json) => {
        console.log("Body: ", body);

        setTableItems((prev) => {
          return [...prev, { countryName, cityName, date, daysSpent }]
        })

        console.log(json);
      });
    })
  }

  return (
    <>
      <h1 className="main">Travelia</h1>

      <form autoComplete="off" className="form">
        <div className="control">
          <h1>Label your name</h1>
        </div>
        <div className="control block-cube block-input">
          <input name="yourname" placeholder="Username" type="text" id="yourname" onChange={(e) => setYourname(e.currentTarget.value)} value={yourname} />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <button className="btn block-cube block-cube-hover" type="button">
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
          <div className="text" onClick={updateTitle}>Submit</div>
        </button>
      </form>

      <form autoComplete="off" className="form">
        <div className="control">
          <h1>Add destination</h1>
        </div>
        <div className="control block-cube block-input">
          <input name="countryName" placeholder="Country" type="text" id="countryName" value={countryName} onChange={(e) => setCountryName(e.currentTarget.value)} />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <div className="control block-cube block-input">
          <input name="cityName" placeholder="City" type="text" id="cityName" value={cityName} onChange={(e) => setCityName(e.currentTarget.value)} />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <div className="control block-cube block-input">
          <input name="date" type="date" id="date" value={date} onChange={(e) => setDate(e.currentTarget.value)} />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <div className="control block-cube block-input">
          <input name="timeSpent" placeholder="Days spent" type="text" id="timeSpent" value={daysSpent} onChange={(e) => setDaysSpent(e.currentTarget.value)} />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <button className="btn block-cube block-cube-hover" type="button" id="submit">
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
          <div className="text" onClick={submitForm}>Submit</div>
        </button>
      </form>

      <h2 id="tlist" ref={tlistRef}>My travel list</h2>

      <table id="travelList">
        <thead>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>Date Arrived</th>
            <th>Days spent</th>
          </tr>
          {tableItems.map((item, idx) => {
            return (
              <tr key={idx}>
                <th>{item.countryName}</th>
                <th>{item.cityName}</th>
                <th>{item.date}</th>
                <th>{item.daysSpent}</th>
              </tr>
            )
          })}
        </thead>
      </table></>
  );
}

export default App;
