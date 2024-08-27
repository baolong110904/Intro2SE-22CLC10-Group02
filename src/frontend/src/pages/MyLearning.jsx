import { React, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import {
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material"
import GetUserCourses from "../api/courses/GetUserCourse"

const MyLearning = () => {
  const email = localStorage.getItem("email")
  const role = localStorage.getItem("role")
  const [languageCourses, setLanguageCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let currentCourses = await GetUserCourses(email, role)
        setLanguageCourses(currentCourses.data.data)
      } catch (error) {
        console.error("Error fetching courses:", error)
      }
    }
    fetchCourses()
  }, [email, role])

  return (
    <div>
      <Navbar />
      <Box mt={10} />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom mt={20}>
          My Learning
        </Typography>
        <Grid container spacing={2}>
          {languageCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card>
                <Box p={2}>
                  <Typography variant="h6" component="h2">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {course.description}
                  </Typography>
                  <Select label="Select Lesson" value={1} onChange={() => {}}>
                    <MenuItem value={1}>Lesson 1</MenuItem>
                    <MenuItem value={2}>Lesson 2</MenuItem>
                    <MenuItem value={3}>Lesson 3</MenuItem>
                  </Select>
                  <Button variant="contained" color="primary">
                    Start Learning
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  )
}

export default MyLearning
