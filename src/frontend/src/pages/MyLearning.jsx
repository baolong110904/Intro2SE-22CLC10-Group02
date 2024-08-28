import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Typography, Container, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import GetUserCourses from "../api/courses/GetUserCourse";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const MyLearning = () => {
  const [languageCourses, setLanguageCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    rating: null,
    topic: "all",
    subCategory: "all",
    language: "all",
  });

  // check if the user is logged in
  if (!email && !token) {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let currentCourses = await GetUserCourses(email, role);
        setLanguageCourses(currentCourses.data.data);
        setFilteredCourses(currentCourses.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [email, role]);

  useEffect(() => {
    applyFilters();
  }, [filters, languageCourses]);

  const applyFilters = () => {
    let result = languageCourses;

    if (filters.rating) {
      result = result.filter((course) => course.rating >= filters.rating);
    }

    if (filters.topic !== "all") {
      result = result.filter((course) => course.category === filters.topic);
    }

    if (filters.subCategory !== "all") {
      result = result.filter((course) => course.subCategory === filters.subCategory);
    }

    if (filters.language !== "all") {
      result = result.filter((course) => course.language === filters.language);
    }

    setFilteredCourses(result);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      rating: null,
      topic: "all",
      subCategory: "all",
      language: "all",
    });
  };

  return (
    <div>
      <Navbar />
      <Box mt={10} />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom mt={20} mb={4}>
          My Learning
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 2, p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <FilterListIcon sx={{ mr: 1 }} /> Filter
                </Typography>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <SortIcon sx={{ mr: 1 }} /> Sort by
                </Typography>
              </Box>
              
              <FormControl component="fieldset">
                <FormLabel component="legend">Ratings</FormLabel>
                <RadioGroup
                  aria-label="rating"
                  name="rating"
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", parseFloat(e.target.value))}
                >
                  {[4.0, 3.0, 2.0, 1.0].map((rating) => (
                    <FormControlLabel
                      key={rating}
                      value={rating}
                      control={<Radio />}
                      label={`${rating}.0 & up`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>

            <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 2, p: 2 }}>
              {["topic", "subCategory", "language"].map((filterType) => (
                <FormControl fullWidth key={filterType} sx={{ mb: 2 }}>
                  <FormLabel>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</FormLabel>
                  <Select
                    value={filters[filterType]}
                    onChange={(e) => handleFilterChange(filterType, e.target.value)}
                  >
                    <MenuItem value="all">All {filterType}s</MenuItem>
                    {filterType === "topic" && (
                      <MenuItem value="Language">Language</MenuItem>
                    )}
                    {filterType === "subCategory" &&
                      ["Pronunciation", "Words", "Composition"].map((sub) => (
                        <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                      ))}
                    {filterType === "language" &&
                      ["English", "Japanese"].map((lang) => (
                        <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              ))}
            </Box>

            <Button
              variant="outlined"
              fullWidth
              onClick={resetFilters}
              sx={{ mt: 2, mb: 4 }}
            >
              Reset Filters
            </Button>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
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
                        <Link to={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<SchoolIcon />}
                            sx={{
                              backgroundColor: (theme) =>
                                theme.palette.mode === "dark" ? "#3182ce" : "#4299e1",
                              color: "#ffffff",
                              "&:hover": {
                                backgroundColor: (theme) =>
                                  theme.palette.mode === "dark" ? "#2c5282" : "#3182ce",
                              },
                            }}
                          >
                            Start Learning
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    No courses available with the selected filters.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default MyLearning;