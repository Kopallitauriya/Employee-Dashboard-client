import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const url=process.env.REACT_APP_API_URL

export default function PaginatedView(props) {
    async function paginationHandler(e, page) {
        console.log(page)
        const departmentQuery = props.filter.department.join(',')
        const positionQuery = props.filter.position.join(',')

        const res = await axios.get(`${url}/user?page=${page}&department=${departmentQuery}&position=${positionQuery}`);
        const data = res.data.data
        console.log('>>>', data)
        props.setUsers(data)
    }
    return (
        <Stack spacing={2}>
            <Pagination
                onChange={paginationHandler}
                count={props.users.total_pages}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </Stack>
    );
}