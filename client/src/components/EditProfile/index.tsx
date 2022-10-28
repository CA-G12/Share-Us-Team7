import { FC, useState } from 'react'
import {
  Button, Typography, TextField, Box,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import { useFormik } from 'formik'
import * as yup from 'yup'
import IEditProfile from '../../interfaces/props/IEditProfile'
import IUserProfile from '../../interfaces/IUserProfile'
import { sx } from './style'
import './style.css'

const EditProfile:FC<IEditProfile> = ({ editUserData, userData }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3)
      .required('Username is required'),
    bio: yup
      .string()
      .nullable(),
    headerImg: yup
      .string()
      .nullable(),
    profileImg: yup
      .string()
      .nullable(),
    location: yup
      .string()
      .nullable(),
  })

  const initialValues = {
    username: userData?.username || '',
    bio: userData?.bio || '',
    profileImg: userData?.profileImg || '',
    headerImg: userData?.headerImg || '',
    location: userData?.location || '',
  }

  const handleSubmit = (values:Partial<IUserProfile>):void => {
    if (!values?.headerImg) {
      delete values?.headerImg
    }
    if (!values?.profileImg) {
      delete values?.profileImg
    }
    setOpen(false)
    editUserData(values)
  }

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  })

  return (
    <div className="edit-popup">
      <Button
        onClick={handleOpen}
        sx={{
          fontSize: 12,
          background: '#5C5858',
          color: '#fff',
          fontWeight: 600,
          padding: '0.3rem 1rem',
          textTransform: 'capitalize',
          position: 'absolute',
          right: '2rem',
          top: '0.5rem',
          '&:hover': {
            background: '#5C5858',
          },
        }}
      >
        Edit profile

      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={sx.container}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={sx.heading}
            >
              Edit Profile
            </Typography>
            <div className="inputs">
              <TextField
                label="username"
                id="outlined-size-small"
                size="small"
                name="username"
                sx={{ width: '100%' }}
                value={formik.values.username}
                error={formik.touched.username && Boolean(formik.errors.username)}
                onChange={formik.handleChange}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                fullWidth
                multiline
                label="biography"
                name="bio"
                InputProps={{
                  rows: 3,
                }}
                sx={{ width: '100%' }}
                value={formik.values.bio}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                onChange={formik.handleChange}
                helperText={formik.touched.bio && formik.errors.bio}
              />
              <TextField
                label="Profile picture"
                id="outlined-size-small"
                size="small"
                name="profileImg"
                sx={{ width: '100%' }}
                value={formik.values.profileImg}
                error={formik.touched.profileImg && Boolean(formik.errors.profileImg)}
                onChange={formik.handleChange}
                helperText={formik.touched.profileImg && formik.errors.profileImg}
              />
              <TextField
                label="Header picture"
                id="outlined-size-small"
                size="small"
                name="headerImg"
                sx={{ width: '100%' }}
                value={formik.values.headerImg}
                error={formik.touched.headerImg && Boolean(formik.errors.headerImg)}
                onChange={formik.handleChange}
                helperText={formik.touched.headerImg && formik.errors.headerImg}
              />
              <TextField
                label="Location"
                id="outlined-size-small"
                size="small"
                name="location"
                sx={{ width: '100%' }}
                value={formik.values.location}
                error={formik.touched.location && Boolean(formik.errors.location)}
                onChange={formik.handleChange}
                helperText={formik.touched.location && formik.errors.location}
              />
              <Button
                variant="contained"
                size="small"
                type="submit"
                sx={sx.editButton}
              >
                Edit profile
              </Button>
            </div>

          </Box>
        </form>

      </Modal>
    </div>
  )
}

export default EditProfile