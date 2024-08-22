import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import GetUserCourses from "../api/courses/GetUserCourse";

let languageCourses = []

const email = localStorage.getItem("email")
const role = localStorage.getItem("role")

let curentCourses = await GetUserCourses(email, role);
console.log(curentCourses)

<<<<<<< HEAD
// languageCourses = curentCourses.data.data
=======

>>>>>>> acbe9d927771bc94fe611895361efaa1625cc810
  

const CourseGrid = () => {
  languageCourses = curentCourses.data.data
  return (
    <Grid container spacing={5}>
      {languageCourses.map((product) => (
        <Grid item xs={12} sm={6} lg={4} key={product.id}>
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e2635' : '#f0f4f8',
              p: 3,
              borderRadius: '12px',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 6px rgba(0, 0, 0, 0.3)'
                : '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                  ? '0 6px 12px rgba(0, 0, 0, 0.4)'
                  : '0 6px 12px rgba(0, 0, 0, 0.15)',
              }
            }}
          >
            <Box
              sx={{
                overflow: 'hidden',
                borderRadius: '8px',
                mb: 2
              }}
            >
              <img
                src={product.thumbnail}
                alt={`Picture of ${product.course_name}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}>
                <Typography variant="h6" component="h4" sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#333',
                }}>
                  {product.course_name}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                color: (theme) => theme.palette.mode === 'dark' ? '#cbd5e0' : '#4a5568',
              }}>
                {product.description}
              </Typography>
              {/* <Typography variant="h5" sx={{
                fontWeight: 700,
                color: (theme) => theme.palette.mode === 'dark' ? '#48bb78' : '#38a169',
                mb: 2
              }}>
                ${product.price}
              </Typography> */}
              <Button
                variant="contained"
                fullWidth
                startIcon={<SchoolIcon />} // Use the Material-UI icon component
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#3182ce' : '#4299e1',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c5282' : '#3182ce',
                  },
                }}
              >
                View
              </Button>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseGrid;