import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios'
import "./App.css";


function Inventory(props) {
  const [spirits, setSpirits] = useState([])
  const [changeSort, setChangeSort] = useState(false)
  const [featureSpirits, setFeatureSpirits] = useState({})
  const [featureCategory, setFeatureCategory] = useState({})
  const [featurePrice, setFeaturePrice] = useState({})
  const [featureAmount, setFeatureAmount] = useState({})


  useEffect(() => {

    const getInventory = async () => {
      const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/spirits`;
      const response = await axios.get(airtableURL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      setSpirits(response.data.records)
    };
    getInventory();
  }, [])

  let price = spirits.map((spirit) => (spirit.fields.price))
  let amountFull = spirits.map((spirit) => spirit.fields.amountFull)
  let totalInventory = (price, amountFull) => {
    let total = 0;
    for (let i = 0; i < spirits.length; i++) {
      total += price[i] * amountFull[i]
    }
    return total
  }

  const sortBottle = () => {
    spirits.sort(function (a, b) {
      let textA = a.fields.bottle.toUpperCase();
      let textB = b.fields.bottle.toUpperCase();
      return ((textA < textB) ? -1 : (textA > textB) ? 1 : 0);
    })
    setChangeSort(!changeSort)
    setFeatureSpirits({ background: "rgba(255, 255, 255, 0.3)" })
    setFeatureCategory({})
    setFeaturePrice({})
    setFeatureAmount({})
  }

  const sortCategory = () => {
    console.log(spirits)

    spirits.sort(function (a, b) {
      let textA = a.fields.category.toUpperCase();
      let textB = b.fields.category.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    setChangeSort(!changeSort)
    setFeatureCategory({ background: "rgba(255, 255, 255, 0.3)" })
    setFeatureSpirits({})
    setFeaturePrice({})
    setFeatureAmount({})
  }

  const sortAmount = () => {
    console.log(spirits)
    spirits.sort((a, b) => {
      let targetA = a.fields.amountFull;
      let targetB = b.fields.amountFull;
      return targetA - targetB
    })
    setChangeSort(!changeSort)
    setFeatureAmount({ background: "rgba(255, 255, 255, 0.3)" })
    setFeatureCategory({})
    setFeaturePrice({})
    setFeatureSpirits({})
  }

  const sortPrice = () => {
    spirits.sort((a, b) => {
      let targetA = a.fields.price;
      let targetB = b.fields.price;
      return targetA - targetB

    })
    setChangeSort(!changeSort)
    setFeaturePrice({ background: "rgba(255, 255, 255, 0.3)" })
    setFeatureCategory({})
    setFeatureSpirits({})
    setFeatureAmount({})

  }


  return (
    <div>
      <Route path="/Inventory">
        <h1>Inventory</h1>
        <h2>Total inventory: <span id="total-inventory">${Math.round(totalInventory(price, amountFull))}</span></h2>
        <div className="inventory-table">

          <table className="inventory-columns">
            <tbody >
              <tr className="inventory-titles">

                <td className="title-cell" onClick={sortBottle}>Spirit</td>
                <td className="title-cell" onClick={sortCategory}>Category</td>
                <td className="title-cell" onClick={sortPrice}>Price</td>
                <td className="title-cell" onClick={sortAmount}>Amt.</td>
              </tr>

              {!spirits ? <h4>loading...</h4> : spirits.map((spirit) => (

                <tr>
                  <td style={featureSpirits} className="content-cell" key={spirit.fields.bottle}>
                    {spirit.fields.bottle}
                  </td>
                  <td style={featureCategory} className="content-cell" key={spirit.fields.category}>
                    {spirit.fields.category}
                  </td>
                  <td style={featurePrice} className="content-cell" key={spirit.fields.price}>
                    ${spirit.fields.price}
                  </td>
                  <td style={featureAmount} className="content-cell" key={spirit.fields.amountFull}>
                    {Math.round((spirit.fields.amountFull) * 100)}%
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Route>
    </div>
  )

}

export default Inventory; 