import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {
   
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "rgb(173, 219, 188)" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        // color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, color: "black" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, color: "black ", display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link className='link-button' to={"/"}>Panicle</Link>
                    </Typography>
                    
                    <MenuItem >
                        <Typography color="black" textAlign="center"><Link to={"/form"} className='link-button'>Create Employee</Link></Typography>
                       
                    </MenuItem>
                    <MenuItem >
                        <Typography color="black" textAlign="center"><Link to={"/user"} className='link-button' >Manage Employee</Link></Typography>
                    </MenuItem>
                    

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{color:"grey"}}/>
                        </SearchIconWrapper>
                        <StyledInputBase

                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}