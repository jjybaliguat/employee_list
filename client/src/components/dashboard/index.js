import React, {useEffect, useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import { FormContainer, FormGroup, FormInput, H1 } from '../login/LoginElements';
import { AddButton, DashboardContainer, MyTable, MyTableBody, MyTableCell, MyTableContainer, MyTableHead, MyTableRow } from './DashbaordElements';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Dashboard = () => {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [loggedin, setLoggedin] = useState(false)
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    function getLoggedinStat(){
        const token = localStorage.getItem('token')
        if(token){
          setLoggedin(true)
        }else{
          setLoggedin(false)
          window.location.href = '/'
        }
      }

      async function getallemployee() {
        await axios.get('http://localhost:5000/api/getallemployees').then((data) => {
             
        })
    }
    useEffect(() => {
        getLoggedinStat()
        getallemployee()
        console.log(employees)
    }, [])
  return (
    <>
    {loggedin && (
    <DashboardContainer>
        <H1>Welcome to Employee List</H1>
        <MyTableContainer component={Paper}>
        <AddButton variant="contained" onClick={handleOpen}>Add Employee</AddButton>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" 
                        variant="h6" component="h2">
                        Add Employee
                    </Typography>
                        <FormGroup>
                            <FormInput type='text' placeholder='Enter Employee name' />
                        </FormGroup>
                </Box>
            </Modal>

            <MyTable sx={{ minWidth: 650 }} aria-label="simple table">
                <MyTableHead>
                <MyTableRow>
                    <MyTableCell>Employee Name</MyTableCell>
                    <MyTableCell align="right"></MyTableCell>
                    <MyTableCell align="right"></MyTableCell>
                    <MyTableCell align="right"></MyTableCell>
                    <MyTableCell align="right"></MyTableCell>
                </MyTableRow>
                </MyTableHead>
                <MyTableBody>
                
                </MyTableBody>
            </MyTable>
        </MyTableContainer>
    </DashboardContainer>)}
    </>
  )
}

export default Dashboard