import { FC, useState } from 'react'
import {
  useNavigate, useSearchParams, useLocation, createSearchParams,
} from 'react-router-dom'

import './style.css'
import {
  Typography, Paper, IconButton, InputBase, FormControl,
  Select, MenuItem, SelectChangeEvent, Button,
} from '@mui/material'

import logo from './logo.jpg'

const Navbar:FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [event, setEvent] = useState<string>('event')
  const [inputValue, setInputValue] = useState<string>('')
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams()

  const handleSearch = ():void => {
    if (location.pathname !== '/search') {
      navigate({
        pathname: '/search',
        search: `${createSearchParams({ category: event, q: inputValue })}`,
      })
    } else {
      setSearchParams({
        category: event,
        q: inputValue,
      })
    }
  }
  const handleChange = (e: SelectChangeEvent):void => setEvent(e.target.value as string)
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
        >
          SHARE US
        </Typography>
      </div>
      <div className="search">
        <Paper
          component="form"
          name="input"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 500,
            height: 30,
            background: 'transparent',
            border: 0,
            outline: 0,
            boxShadow: 0,
          }}
        >
          <FormControl sx={{ width: 80 }}>
            <Select
              sx={{
                height: 31, fontSize: 12, borderRadius: '5px 0 0 5px',
              }}
              className="select"
              size="small"
              value={event}
              onChange={handleChange}
              displayEmpty
              name="category"
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem sx={{ fontSize: 12 }} selected value="event">event</MenuItem>
              <MenuItem sx={{ fontSize: 12 }} value="friends">friends</MenuItem>
              <MenuItem sx={{ fontSize: 12 }} value="hashtags">hashtags</MenuItem>
            </Select>
          </FormControl>
          <InputBase
            placeholder="Search here"
            value={inputValue}
            name="input"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <IconButton
            type="button"
            aria-label="search"
            className="search-btn"
            onClick={handleSearch}
          >
            search
          </IconButton>
        </Paper>
      </div>
      <div className="register">
        <button type="button" className="login">Login</button>
        <Button className="signup-btn">Sign Up</Button>
      </div>
    </header>

  )
}

export default Navbar
