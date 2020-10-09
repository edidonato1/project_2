import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Inventory from './Inventory';

function GrabBottle(props) {
  const [data, setData] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {

    const getInventory = async () => {
      const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/spirits`;
      const response = await axios.get(airtableURL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      setData(response.data.records)

    };
    getInventory();


  }, [])

  // Searching options: 
  //    // sort the items alphabetically by bottle name 
  //    //     // populate drop-down with the sorted list
  //    // use drop-down to select category
  //    //     // create event listener for onChange that accepts change of <select>
  //    //     // component.  set the value as the second argument for a second useEffect call

  // function getValues(list) {
  //   return list.map((bottle) => {
  //     setOptions(bottle)
  //   })
  // }



  return (
    <div>
      <Route path="/GrabBottle">
        <h1>Grab a Bottle</h1>
        <select>{
          data.map((item) =>
            <option value={item.fields.bottle}>{item.fields.bottle}</option>
          )}
        </select>
      </Route>
    </div>
  )
}

export default GrabBottle;