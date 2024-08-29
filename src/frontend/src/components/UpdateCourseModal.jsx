import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UpdateCourseModal = ({ isOpen, onClose, onUpdate, courseId }) => {
    const [formData, setFormData] = useState({
        name: '',
        language: '',
        title: '',
        price: '',
        description: '',
        thumbnail: null // Set initial thumbnail as null for file upload
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            thumbnail: file // Set the selected file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        onUpdate(formData); // Pass the FormData to onUpdate handler
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Course</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="language-label">Choose Language</InputLabel>
                        <Select
                            labelId="language-label"
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            label="Choose Language" // Make sure to set the label here
                            required
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Japanese">Japanese</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="name"
                        label="Course Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="title"
                        label="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="price"
                        label="Price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                    />

                    {/* Label for file upload */}
                    <label style={{ marginTop: '1rem', display: 'block', fontWeight: 'bold' }}>
                        Upload Thumbnail
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginTop: '0.5rem' }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '1rem' }}
                    >
                        Update Course
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateCourseModal;
