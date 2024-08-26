import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Grid,
  Button,
  Typography,
  Tab,
  Tabs,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Paper,
  TextField,
} from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import GetUserCourses from "../api/courses/GetUserCourse"
import DocumentCard from "./DocumentCard"
import GetCourseMaterials from "../api/courses/GetCourseMaterials"
import GetParticipants from "../api/courses/GetParticipants"
import UploadMaterials from "../api/courses/UploadMaterials"
import CircularProgress from "@mui/material/CircularProgress"

const CourseGrid = () => {
  const [languageCourses, setLanguageCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [documents, setDocuments] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const email = localStorage.getItem("email")
  const role = localStorage.getItem("role")
  const [participants, setParticipants] = useState([])
  const fileInputRef = useRef(null)
  const [documentTitle, setDocumentTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      handleUploadMaterial(file)
    }
  }

  const fetchParticipants = async () => {
    try {
      console.log(selectedCourse)
      const response = await GetParticipants(selectedCourse)
      setParticipants(response.data.data)
      console.log(response)
    } catch (error) {
      console.error("Error fetching participants:", error)
    }
  }

  const handleUploadMaterial = async (file) => {
    if (!documentTitle.trim()) {
      alert("Please enter a title for the document.")
      return
    }

    setIsLoading(true)
    try {
      console.log(file)
      const result = await UploadMaterials(file, selectedCourse, documentTitle)
      if (result && result.success) {
        await handleViewDocuments(selectedCourse)
        setDocumentTitle("")
      }
      console.log(result)
    } catch (error) {
      console.error("Error!", error)
    } finally {
      setIsLoading(false)
    }
    console.log("Upload Material clicked")
  }

  useEffect(() => {
    if (tabIndex === 1 && selectedCourse) {
      fetchParticipants()
    }
  }, [tabIndex, selectedCourse])

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
      setDocuments(courseDocuments.data)
    } catch (error) {
      console.error("Error fetching documents:", error)
    }
  }

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue)
  }

  return (
    <Box>
      {selectedCourse ? (
        <Box>
          <Typography variant="h4" component="h2" sx={{ mt: 3 }}>
            {selectedCourse.course_name} - Materials
          </Typography>

          <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="course tabs">
            <Tab label="Materials" />
            <Tab label="Participants" />
          </Tabs>

          {tabIndex === 0 && (
            <Box sx={{ mt: 2 }}>
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.publicId}
                  title={doc.title || ""}
                  link={doc.documentUrl}
                />
              ))}

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button variant="contained" onClick={() => setSelectedCourse(null)}>
                  Back to Courses
                </Button>

                {role === "TEACHER" && (
                  <TextField
                    sx={{ ml: 55 }}
                    label="Document Title"
                    variant="outlined"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                  />
                )}

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {role === "TEACHER" && (
                    <Button
                      variant="contained"
                      sx={{ ml: 2 }}
                      onClick={handleButtonClick}
                      disabled={isLoading || !documentTitle.trim()}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Upload Material"
                      )}
                    </Button>
                  )}
                </div>
              </Box>
            </Box>
          )}
          {tabIndex === 1 && (
            <Box sx={{ mt: 2 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>First name / Last name</TableCell>
                      <TableCell>Roles</TableCell>
                      <TableCell>Groups</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ mr: 2 }} src={participant.avatar} />
                            <Typography variant="body1">
                              {participant.first_name} {participant.last_name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {participant.role.map((role) => role.name).join(", ")}
                        </TableCell>
                        <TableCell>{participant.groups || "No groups"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      ) : (
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
      )}
    </Box>
  )
}

export default CourseGrid
