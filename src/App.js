import './App.css';
import react from 'react';
// import logo from "../src/assets/demo-high-resolution-logo.png"
import Navbar from "../src/navbar.js"
import Filterbutton from "./filterbutton.js"
// import { Button } from '@mui/material';
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { GiBlackFlag } from "react-icons/gi";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import axios from 'axios';


const url = "http://localhost:8000"

const criteria = ["Intensity", "Likelihood", "Relevance", "Year", "Country", "Topics", "Region", "City"]
function App() {
  const [country, setCountry] = useState([])
  const [total, setTotal] = useState()
  const [sector, setSector] = useState([])
  const [source, setSource] = useState([])

  useEffect(() => {
    async function getAll() {
      let res = await axios.get(`${url}/country`)
      // console.log(res.data)
      setCountry(res.data)

      let response = await axios.get(`${url}/total`)
      // console.log(response.data)
      setTotal(response.data.length)

      let res2 = await axios.get(`${url}/sectors`)
      // console.log(res2.data)
      setSector(res2.data)

      let res3 = await axios.get(`${url}/source`)
      console.log(res3.data)
      setSource(res3.data)



    }
    getAll()

  }, [])



  return (
    <>
      <div className='container'>
        <div className='field'>

          <Navbar />

          <div className='dashboard'>
            <div className='sidebar'>
              <div className='filter-panel'>
                {criteria.map((itm) => {
                  return <Filterbutton itm={itm} />
                })}
              </div>
            </div>

            <div className='panel'>

              <div className='main-info-box'>
                <div className='heading-main-info'>
                  Growing statistics
                
                </div>
                <div className='outer-info-box'>
                  <div className='info-box'>
                    <FiUsers color="pink" fontSize="150px" className='icons' />
                    <div className='label-icons-box' style={{ marginLeft: "12px" }}>
                      <div className='label-icons'> Total<br /> Brands</div>
                      <div className='label-icons' ><strong>{total}</strong> </div>
                    </div>
                  </div>
                  <div className='info-box'>
                    <GiBlackFlag color="orange" fontSize="150px" className='icons' />
                    <div className='label-icons-box' style={{ marginLeft: "12px" }}>
                      <div className='label-icons'>Total <br />Countries</div>
                      <div className='label-icons'><strong>{country.length}</strong></div>
                    </div>
                  </div>
                  <div className='info-box'>
                    <LiaLayerGroupSolid color="orange" fontSize="150px" className='icons' />
                    <div className='label-icons-box' style={{ marginLeft: "12px" }}>
                      <div className='label-icons'>Sectors <br /> Provided</div>
                      <div className='label-icons'><strong>{sector.length - 1}</strong></div>
                    </div>
                  </div>
                  <div className='info-box'>
                    <LiaLayerGroupSolid color="orange" fontSize="150px" className='icons' />
                    <div className='label-icons-box' style={{ marginLeft: "12px" }}>
                      <div className='label-icons'>Sources </div>
                      <div className='label-icons'><strong>{source.length}</strong></div>
                    </div>
                  </div>
                </div>


              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
