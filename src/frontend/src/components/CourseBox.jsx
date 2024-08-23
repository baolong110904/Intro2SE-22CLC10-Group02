import React, { useState, useEffect } from "react"
import {
  Box,
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import GetUserCourses from "../api/courses/GetUserCourse"
import DocumentCard from "./DocumentCard" // Import DocumentCard
import GetCourseMaterials from "../api/courses/GetCourseMaterials"

const CourseGrid = () => {
  const [languageCourses, setLanguageCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [documents, setDocuments] = useState([])

  const email = localStorage.getItem("email")
  const role = localStorage.getItem("role")

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

  const handleViewDocuments = async (course) => {
    try {
      setSelectedCourse(course)
      const courseDocuments = await GetCourseMaterials(course.id)
      console.log(courseDocuments)
      setDocuments(courseDocuments.data)
    } catch (error) {
      console.error("Error fetching documents:", error)
    }
  }

  return (
    <Box id="my-course">
      {selectedCourse ? (
        // Hiển thị tài liệu của khóa học được chọn
        <Box>
          <Button variant="contained" onClick={() => setSelectedCourse(null)}>
            Back to Courses
          </Button>
          <Typography variant="h4" component="h2" sx={{ mt: 3 }}>
            {selectedCourse.course_name} - Documents
          </Typography>
          <Box sx={{ mt: 2 }}>
            {documents.map((doc) => (
              <DocumentCard
                key={doc.publicId}
                title={doc.title}
                link={doc.documentUrl}
              />
            ))}
          </Box>
        </Box>
      ) : (
        // Hiển thị danh sách các khóa học
        <div>
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white">
            My courses
          </h2>
          <Grid container spacing={5} marginTop={1}>
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
                      src={course.thumbnail}
                      alt={`Picture of ${course.course_name}`}
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
                      {course.course_name}
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
                      {course.description}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<SchoolIcon />}
                      onClick={() => handleViewDocuments(course)}
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
                      View
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Box>
  )
}

export default CourseGrid
