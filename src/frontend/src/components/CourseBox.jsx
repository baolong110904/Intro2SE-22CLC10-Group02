import React, { useState, useEffect, useRef } from "react"
import { Box, Grid, Button, Typography } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import GetUserCourses from "../api/courses/GetUserCourse"
import { Link } from "react-router-dom"

const CourseGrid = () => {
  const [languageCourses, setLanguageCourses] = useState([])
  const email = localStorage.getItem("email")
  const role = localStorage.getItem("role")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let currentCourses = await GetUserCourses(email, role)
        console.log(currentCourses)
        setLanguageCourses(currentCourses.data.data)
      } catch (error) {
        console.error("Error fetching courses:", error)
      }
    }
    fetchCourses()
  }, [email, role])

  return (
    <Box>
      {
        <Grid container spacing={5}>
          {languageCourses.map((course) => (
            <Grid item xs={12} sm={6} lg={4} key={course.id}>
              <Box
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1e2635" : "#f0f4f8",
                  p: 3,
                  borderRadius: "12px",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                      : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 6px 12px rgba(0, 0, 0, 0.4)"
                        : "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    borderRadius: "8px",
                    mb: 2,
                  }}
                >
                  <img
                    src={course.image}
                    alt={`Picture of ${course.title}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "#fff" : "#333",
                    }}
                  >
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "#cbd5e0" : "#4a5568",
                    }}
                  >
                    {course.language}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "#cbd5e0" : "#4a5568",
                    }}
                  >
                    Meeting Id: {course.meetingRoomId}
                  </Typography>
                  <Link to={`/course/${course.id}`}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<SchoolIcon />}
                      sx={{
                        mt: 2,
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#3182ce" : "#4299e1",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#2c5282" : "#3182ce",
                        },
                      }}
                    >
                      Go to course
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      }
    </Box>
  )
}

export default CourseGrid
