import '../App.css';
import react from 'react';
// import logo from "../src/assets/demo-high-resolution-logo.png"
import Navbar from "../components/navbar.js"
import Filterbutton from "../components/filterbutton.js"
// import { Button } from '@mui/material';
import Chart from "chart.js/auto";
import { CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { FiUsers } from "react-icons/fi";
import { GiBlackFlag } from "react-icons/gi";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import createDataSets from '../graphs/index.js';
import { BarChart } from '../graphs/BarChart.js';
import { BoxPlot } from '../graphs/BoxPlot.js';
import { BoxAndWiskers, BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
import { PieChart } from '../graphs/PieChart.js';



const url=process.env.REACT_APP_API_URL

Chart.register(
  CategoryScale,
  LinearScale,
  BoxPlotController,
  BoxAndWiskers,
  Title,
  Tooltip,
  Legend
);

const criteria = ["Intensity", "Likelihood", "Relevance", "Year", "Country", "Topics", "Region", "City"]
function App() {
  const [employee, setEmployee] = useState([])
  const [departments, setDepartments] = useState()
  const [intern, setIntern] = useState([])
  const [chartData, setChartData] = useState({});

  // const [source, setSource] = useState([])



  useEffect(() => {
    async function getall() {
      let res = await axios.get(`${url}/totalemployee`)
      setEmployee(res.data)
      let res2 = await axios.get(`${url}/department`)
      setDepartments(res2.data)
      let res3 = await axios.get(`${url}/totalintern`)
      setIntern(res3.data)
      const charts = await createDataSets();
      setChartData(charts);
    }
    getall()
  }, [])






  return (
    <>
      <div className='container'>
        <div className='field'>
          <div className='dashboard'>


            <div className='panel'>

              <div className='main-info-box'>
                <div className='heading-main-info'>
                  Growing statistics

                </div>
                <div className='outer-info-box'>
                  <div className='info-box'>
                    <FiUsers color="pink" fontSize="150px" className='icons' />
                    <div className='label-icons-box' style={{ marginLeft: "12px" }}>
                      <div className='label-icons'> Total <br /> Employees</div>
                      <div className='label-icons' ><strong>{employee?.length}</strong> </div>
                    </div>
                  </div>
                  <div className='info-box'>
                    <GiBlackFlag color="orange" fontSize="150px" className='icons' />
                    <div className='label-icons-box' style={{ marginLeft: "12px" }}>
                      <div className='label-icons'>Total <br />Intern</div>
                      <div className='label-icons'><strong>{intern?.length}</strong></div>
                    </div>
                  </div>
                  <div className='info-box'>
                    <LiaLayerGroupSolid color="orange" fontSize="150px" className='icons' />
                    <div className='label-icons-box' style={{ marginLeft: "12px" }}>
                      <div className='label-icons'>Departments</div>
                      <div className='label-icons'><strong>{departments?.length}</strong></div>
                    </div>
                  </div>
                  <div className='info-box'>
                    <LiaLayerGroupSolid color="orange" fontSize="150px" className='icons' />
                    <div className='label-icons-box' style={{ marginLeft: "12px" }}>
                      <div className='label-icons'>Worked with over <br /> 500+ companies </div>
                    </div>
                  </div>
                </div>


              </div>
              <div className='chart-box'>
                <div className='barchart'>
                  <div className='h2'>
                    <h2>Believes in </h2><h2>Talentent </h2><h2>employees</h2><br />

                  </div>
                  <div className='bargraph'>
                    <BarChart chartData={chartData?.age} />
                  </div>
                </div>
                <div className='piechart'>
                  <PieChart chartData={chartData?.departmentwiseEmployeeCount} />
                </div>
              </div>
              <div className='boxplot'>
                <div className='h2-2'>
                  <h2>Salary</h2><h2>Distribution </h2><br />

                </div>
                <BoxPlot chartData={chartData?.salary} />
              </div>

            </div>

          </div>

        </div>
      </div >
    </>
  );
}

export default App;
