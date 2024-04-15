import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { useAuthContext } from "../context/AuthContext";

export default function SearchHeader() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);
  const {user, logout} = useAuthContext();

  return (
    <header>
      <Stack direction={'row'} sx={{alignItems: 'center'}}>
        <Grid container>
          <Grid item xs={3}>
            <Stack direction={'row'} spacing={1} alignItems="center">
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: '#212121', fontSize: 'large' }} />
              </IconButton>
              <YouTubeIcon sx={{ color: '#FF0000', fontSize: 'large' }} />
              <Typography variant="h6" sx={{fontWeight: 'bold', color: 'black', letterSpacing: '-0.5px'}}>Youtube</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Paper
              component="form" onSubmit={handleSubmit}
              sx={{ p:'2px 4px', display:'flex', alignItems:'center', width:'100%' }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="검색..."
                value={text} 
                onChange={e => setText(e.target.value)}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="button" sx={{ p: 1 }} aria-label="search" onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Stack direction='row' spacing={1} justifyContent='right' alignItems='center'>
              {user &&<Link to='/videos/record'>시청기록</Link>}
              {user && user.photoURL &&( <img src={user.photoURL} alt={user.displayName} height='32' style={{borderRadius: 100}}/>)} 
              {user && <p>{user.displayName}</p>}
              {user && <button onClick={logout}>로그아웃</button>}
              {!user && <Link to='/SignIn'>로그인</Link>}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Divider sx={{my: 1}} />
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>   {/*  사이드바 아이콘 부분      */}
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
            <Stack direction={'row'} spacing={1} alignItems="center">
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: '#212121', fontSize: 'large' }} />
              </IconButton>
              <YouTubeIcon sx={{ color: '#FF0000', fontSize: 'large' }} />
              <Typography variant="h6" sx={{fontWeight: 'bold', color: 'black', letterSpacing: '-0.5px'}}>Youtube</Typography>
            </Stack>
              </ListItemText>
          </ListItem>
          {/* Add more list items as needed */}
        </List>
      </Drawer>
    </header>
  )
}
