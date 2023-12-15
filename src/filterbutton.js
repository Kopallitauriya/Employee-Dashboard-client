import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons(props) {
  
    return (
        <Stack direction="row" spacing={2}>
            <Button  className='button-filter' sx={{ color: "black" }}>{props.itm}</Button>
        </Stack>
    );
}