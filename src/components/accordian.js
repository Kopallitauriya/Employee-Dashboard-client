import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';

const url=process.env.REACT_APP_API_URL

export default function ControlledAccordions(props) {
    const [expanded, setExpanded] = React.useState(false);
    const navigate = useNavigate()
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    async function deleteHandler(e) {
        props.setLoading(true);
        let res = await axios.delete(`${url}/user/${e.target.id}`)
        props.setLoading(false);
        if (res.data.success) {
            let temp = props.userinfo.data.filter((itm)=>itm!=e.target.id)
            props.setUserInfo({...props.userinfo,data:temp})
            props.setAlert({ enable: true, type: "success", message: "Employee deleted successfully" })
        }
        else {
            props.setAlert({ enable: true, type: "error", message: res.data.message })
        }
        setTimeout(() => {
            props.setAlert({ enable: false, type: "error" })
        }, 3000)


    }
    async function updateHandler(e){
        e.preventDefault();
        let id=e.target.id
        let data = await props.userinfo.data.filter((itm)=>itm._id===id)
        await deleteHandler(e)
        data=data[0]
        console.log(data)
        props.setFormDetails({...props.formdetails, name:data.employeeName,email:data.email,phone:data.phoneNumber,department:data.department,position:data.position,age:data.age,salary:data.salary, id:data.employeeId
})
        // props.setFormDetails({...props.formdetails, employeeId:data.employeeId})
        // props.setFormDetails({...props.formdetails, age:data.age})
        // props.setFormDetails({...props.formdetails, salary:data.salary})
        // props.setFormDetails({...props.formdetails, position:data.position})
        // props.setFormDetails({...props.formdetails, department:data.department})
        // props.setFormDetails({...props.formdetails, phoneNumber:data.phoneNumber})
        // props.setFormDetails({...props.formdetails, email:data.email})
        navigate('/form')



    }
    
    

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Employee ID: {props.item.employeeId}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{props.item.employeeName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><strong>Email:</strong> {props.item.email}</Typography><br />
                    <Typography><strong>Phone:</strong> {props.item.phoneNumber}</Typography><br />
                    <Typography><strong>Age:</strong> {props.item.age}</Typography><br />
                    <Typography><strong>Department:</strong> {props.item.department}</Typography><br />
                    <Typography><strong>Position:</strong> {props.item.position}</Typography><br />
                    <Typography><strong>Salary:</strong> {props.item.salary}</Typography><br />
                    <Stack direction="row" spacing={2}>
                        <Button  className='button-filter2' id={props.item._id} onClick={updateHandler}  >Update</Button>
                        <Button className='button-filter3' onClick={deleteHandler}  sx={{ color: "red" }} id={props.item._id}>Delete</Button>
                    </Stack>

                </AccordionDetails>
            </Accordion>

        </div>
    );
}