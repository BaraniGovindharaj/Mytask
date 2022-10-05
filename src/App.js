import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'
import { RiDeleteBinFill } from "react-icons/ri"
import { IoAddCircleSharp } from "react-icons/io5"
import { FaShoppingCart } from "react-icons/fa"

function App() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])
  const [checkcartitems, setcheck] = useState(false)
  const [price, setTotalprice] = useState('');
  const [totalitem, setTotalitem] = useState(0);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setData(res.data)
      })
  }, [])

  const handleclick = (id) => {
    let sum = 0;
    let value = data.map(item => {
      if (item.id === id) {
        item.addtocart = 1
      }
      return item
    })
    value.map(data => {
      if (data.addtocart) {
        sum += 1
      }
      setTotalitem(sum)
    })
    setData(value)
  }
  const handleadd = (id) => {
    var value = data.map(item => {
      if (item.id === id) {
        item.addtocart = item.addtocart + 1
      }
      return item
    })
    setData(value)
  }
  const handledelete = (id) => {
    var value = data.map(item => {
      if (item.id === id) {
        if (item.addtocart > 0) {
          item.addtocart = item.addtocart - 1
        } else {
          delete item.addtocart;
        }
      }
      return item
    })
    if (value.length === 0) {
      setCart([])
    }
    setData(value)
  }
  const cartitems = () => {
    let newarray = [];
    let sum = 0;
    setcheck(!checkcartitems)
    data.map(item => {
      if (item.addtocart) {
        newarray.push(item)
        sum += item.price * item.addtocart
      }
    })
    setTotalprice(sum)
    setCart(newarray)
  }
  return (
    <div className="App">
      <div className='header'>
        <span className='logo'>Store</span>
        <span className='iconn' onClick={() => cartitems()}><FaShoppingCart className="SearchIcon" /></span>
        <span className='badge'>{totalitem}</span>
      </div>
      {!checkcartitems ? (
        data.length > 0 &&
        <div className="grid-container">
          {data.map(value => (
            <div class="card">
              <img src={value.image} alt="Denim Jeans" style={{ width: 100 }} />
              <h4>{value.title}</h4>
              <p class="price">${value.price}</p>
              <p>{value.category}</p>
              {value.addtocart ?
                <div style={{ paddingBottom: 10 }}>
                  <span onClick={() => handledelete(value.id)}><RiDeleteBinFill className='mouse' style={{ color: 'red', width: 22, height: 22 }}/></span>&nbsp;
                  <span className='circle'>{value.addtocart}</span>&nbsp;
                  <span onClick={() => handleadd(value.id)}><IoAddCircleSharp className='mouse' style={{ width: 22, height: 22 }} /></span>
                </div>
                : <button onClick={() => handleclick(value.id)}>ADD TO CARD</button>}
            </div>
          ))}
        </div>
      ) : (
        cart.length > 0 ? (
          <div>
            <div className='container'>
              <span>TotalItems:{cart.length}</span><br />
              <span>Price:{price}</span><br />
              <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => alert("checkout successfully")}>Checkout</button>&emsp;<button onClick={() => setcheck(!checkcartitems)}>clear</button>
            </div>
            {cart.map(value => (
              <>
                {value.addtocart ? (
                  <div class="row">
                    <div class="column">
                      <img src={value.image} alt="Jeans" style={{ width: 100 }} />
                    </div>
                    <div class="column" >
                      <h4 >{value.title}</h4>
                      <p class="price">${value.price}</p>
                    </div>
                    <div class="column" style={{ paddingTop: 40 }}>
                      <span onClick={() => handledelete(value.id)}><RiDeleteBinFill className='mouse' style={{ color: 'red', width: 22, height: 22 }} /></span>&nbsp;
                      <span className='circle'>{value.addtocart}</span>&nbsp;
                      <span onClick={() => handleadd(value.id)}><IoAddCircleSharp className='mouse' style={{ width: 22, height: 22 }} /></span>
                    </div>
                  </div>
                ) : ""}
              </>
            ))}
          </div>
        ) : (
          <div className='container' style={{ marginTop: 250 }}>
            <span>Your Card is Empty</span><br />
            <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => setcheck(!checkcartitems)}>Back to shop</button>
          </div>

        )
      )}
    </div>
  );
}

export default App;