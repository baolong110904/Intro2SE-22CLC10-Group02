import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

const languageCourses = [
    {
      id: 1,
      course_name: "Spanish for Beginners",
      description: "Learn the basics of the Spanish language, including vocabulary, grammar, and pronunciation, with real-life scenarios.",
      thumbnail: "https://example.com/spanish-thumbnail.jpg",
    },
    {
      id: 2,
      course_name: "French Essentials",
      description: "Master essential French phrases and grammar rules to communicate effectively in everyday situations.",
      thumbnail: "https://example.com/french-thumbnail.jpg",
    },
    {
      id: 3,
      course_name: "Mandarin Chinese Basics",
      description: "Start learning Mandarin Chinese with an emphasis on pronunciation, common phrases, and basic writing.",
      thumbnail: "https://example.com/mandarin-thumbnail.jpg",
    },
    {
      id: 4,
      course_name: "German for Travelers",
      description: "Get familiar with German language essentials, perfect for travelers looking to navigate Germany with confidence.",
      thumbnail: "https://example.com/german-thumbnail.jpg",
    },
    {
      id: 5,
      course_name: "Japanese Language and Culture",
      description: "Explore the Japanese language along with cultural nuances, focusing on conversational skills and etiquette.",
      thumbnail: "https://example.com/japanese-thumbnail.jpg",
    },
  ];
  

const CourseGrid = () => {
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
                Learn
              </Button>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseGrid;