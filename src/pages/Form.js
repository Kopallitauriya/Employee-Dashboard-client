import React, { useState } from 'react'
import "../App.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const url=process.env.REACT_APP_API_URL


const employeeObject = { name: "", id: "", salary: "", email: "", phone: "", age: "", department: "", position: "" }

const Form = (props) => {
   
    // const [Position, setAge] = React.useState('');

    const handleChange = (e) => {
        props.setFormDetails({ ...props.formdetails, position: e.target.value });
    };

    async function submitHandler(e) {
        e.preventDefault()
        console.log(props.formdetails)
        let res;
        try {
            res = await axios.post(`${url}/form`, props.formdetails)
            if (res?.data?.success) props.setAlert({ enable: true, type: "success", message: res.data.message })
            else props.setAlert({ enable: true, type: "error", message: res.data.message })
            props.setFormDetails(employeeObject)
        } catch (error) {
            props.setAlert({ enable: true, type: "error", message: error.message })
        }
        setTimeout(() => {
            props.setAlert({ enable: false, type: "error" })
        }, 3000)


    }

    return (
        <>
            <div className='container'>
                <div className=' form-field'>
                    <div className='form'>
                        <div className='form-area'>
                            <Card sx={{ minWidth: "100%", backgroundColor: "rgb(228, 245, 234)", display: "flex", flexDirection: 'column', alignItems: 'center', }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: "24px", textAlign: "center", marginBottom: "2rem" }} color="black">Employee Details</Typography>
                                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch', marginBottom: '1rem' }, }} noValidateautoComplete="off">
                                        <TextField className="Textfield" id="name" label="Employee Name" variant="standard" value={props.formdetails.name} onChange={(e) => props.setFormDetails({ ...props.formdetails, name: e.target.value })} />
                                        <TextField className="Textfield" id="id" label="Employee Id" variant="standard" value={props.formdetails.id} onChange={(e) => props.setFormDetails({ ...props.formdetails, id: e.target.value })} type='number'/>
                                    </Box>

                                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '52ch', marginBottom: '1rem' }, }} noValidateautoComplete="off">
                                        <TextField className="Textfield" id="email" label="E-mail" variant="standard" value={props.formdetails.email} onChange={(e) => props.setFormDetails({ ...props.formdetails, email: e.target.value })} type='email'/>
                                    </Box>

                                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '52ch' }, marginBottom: '1rem' }} noValidateautoComplete="off">
                                        <TextField style={{ width: '60%' }} id="phone" label="Phone Number" variant="standard" value={props.formdetails.phone} onChange={(e) => props.setFormDetails({ ...props.formdetails, phone: e.target.value })} />
                                        <TextField style={{ width: '32%' }} id="age" label="Age" variant="standard" value={props.formdetails.age} onChange={(e) => props.setFormDetails({ ...props.formdetails, age: e.target.value })} type='number'/>
                                    </Box>
                                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, marginBottom: '1rem' }} noValidateautoComplete="off">
                                        <TextField className="Textfield" id="department" label="Department" variant="standard" value={props.formdetails.department} onChange={(e) => props.setFormDetails({ ...props.formdetails, department: e.target.value })} />
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Position</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={props.formdetails.position}
                                                onChange={handleChange}
                                                label="Position"
                                            >
                                                <MenuItem value={"Intern"}  >Intern</MenuItem>
                                                <MenuItem value={"Employee"} >Employee</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </Box>
                                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '52ch' }, marginBottom: '1rem' }} noValidateautoComplete="off">
                                        <TextField className="Textfield" id="salary" label="Salary" variant="standard" value={props.formdetails.salary} onChange={(e) => props.setFormDetails({ ...props.formdetails, salary: e.target.value })} />
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button size="large" onClick={submitHandler}>Submit</Button>
                                </CardActions>
                            </Card>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form

