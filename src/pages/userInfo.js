import React, { useEffect, useState } from 'react'
import Accordion from "../components/accordian"
import axios from 'axios'
import "../App.css"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormLabel, Typography } from '@mui/material';
import PaginatedView from '../components/pagination';

const url=process.env.REACT_APP_API_URL


const UserInfo = (props) => {

    const [userinfo, setUserInfo] = useState([])
    const [filter, setFilter] =useState({position:[] ,department:[]})
    const [distinctdepartments, setDistinctDepartments] = useState([])
    const [sortProperty, setSortProperty] = useState('');



    useEffect(() => {
        async function getusers() {
            const res = await axios.get(`${url}/user?page=1`)
            if(res.data?.success) setUserInfo(res.data.data)
            console.log(res.data.data)
            let res2 = await axios.get(`${url}/department`)
            setDistinctDepartments(res2.data)

        }
        getusers()
    }, [])
    

    function removeItemFromArray(array, itm){
        const index = array.indexOf(itm);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
        return array;
    }

    const filterHandler = async(e) => {
        e.preventDefault();
        props.setLoading(true);
        let res= await axios.get(`${url}/user?department=${filter.department.join(",")}&position=${filter.position.join(",")}` )
        props.setLoading(false);
        if(res.data?.data && res.data.success){
            props.setAlert({ enable: true, type: "success", message: "Filter applied successfully!" })
            setUserInfo(res.data.data)
        }
        else  props.setAlert({ enable: true, type: "error", message: res.data.data.message })
        setTimeout(() => {
            props.setAlert({ enable: false, type: "error" })
        }, 3000)
        // console.log(filter);
    }

    const sortHandler = (e) => {
        let sorted;
        if(e.target.value == "employeeName") sorted = userinfo.data.sort((a,b) => a[e.target.value.toLowerCase()] > b[e.target.value.toLowerCase()] ? 1 : a[e.target.value.toLowerCase()] < b[e.target.value.toLowerCase()] ? -1 : 0);
        else sorted = userinfo.data.sort((a,b) => a[e.target.value] - b[e.target.value]);
        setUserInfo({...Accordion, data: sorted});
        setSortProperty(e.target.value)
    }

    useEffect(() => {
    }, [sortProperty])
    


    return (
        <>
            <div className='info-box2'>
                <div className='sidebar2'>
                    <div className='inner-sidebar2'>
                        <FormLabel style={{ marginRight: "6rem", marginBottom: "1rem" }} id="demo-radio-buttons-group-label" >Department</FormLabel>
                        {
                            distinctdepartments.map((itm, indx) => {
                                return (
                                    <FormGroup onChange={(e)=>console.log(e)} key={indx+1}>
                                        <FormControlLabel control={<Checkbox onClick={(e)=>{e.target.checked ? filter.department.push(e.target.value) : removeItemFromArray(filter.department, e.target.value)}} />} label={itm} value={itm}/>
                                    </FormGroup>

                                )
                            })
                        }
                    </div>
                    <div className='inner-sidebar2'>
                        <FormLabel style={{ marginRight: "6rem", marginBottom: "1rem", marginTop: "2rem" }} id="demo-radio-buttons-group-label" >Position</FormLabel>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onClick={(e)=>{e.target.checked ? filter.position.push(e.target.value) : removeItemFromArray(filter.position, e.target.value)}} />} value={"Intern"} label="Intern" />
                            <FormControlLabel control={<Checkbox onClick={(e)=>{e.target.checked ? filter.position.push(e.target.value) : removeItemFromArray(filter.position, e.target.value)}} />} value={"Employee"} label="Employee" />
                        </FormGroup>
                    </div>
                    
                    <Button variant='contained' style={{ margin: "2rem 0" }} onClick={filterHandler}>APPLY</Button>

                </div>
                <div className='userinformation'>
                    {userinfo.data?.length ? <>
                        <div  className='selecttags'>
                        <select onChange={sortHandler}>
                                <option value={"SortBy"} label='SortBy' defaultValue={null} >SortBy</option>
                                <option value={"employeeName"}>Name</option>
                                <option value={"salary"}>Salary</option>
                                <option value={"age"}>Age</option>
                                <option value={"employeeId"}>Id</option>
                        </select>
                    </div>
                    {
                        userinfo.data?.map((itm) => {
                            return (<>
                                <div className='usercard'>
                                    <Accordion formdetails={props.formdetails} setFormDetails={props.setFormDetails} userinfo={userinfo} setUserInfo={setUserInfo} item={itm} alert={props.alert} setAlert={props.setAlert} setLoading={props.setLoading}/>
                                </div>
                            </>)
                        })

                    }
                    <div className='paginatedview'><PaginatedView filter={filter} users={userinfo} setUsers={setUserInfo} /></div>
                    </> : <div className='center-container'> <p>Employee information doesn't exist. Create One!</p></div>}
                </div>
            </div>
        </>
    )
}

export default UserInfo
