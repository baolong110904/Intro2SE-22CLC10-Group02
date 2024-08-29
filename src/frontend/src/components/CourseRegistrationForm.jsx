import React, { useState, useCallback } from 'react';
import { createMeeting, getToken } from '../api/videosdk/VideoSDKService';
import createCourse from '../api/courses/CreateCourse';

const CourseRegistrationForm = ({ onCourseAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        price: '',
        title: '',
        language: '',
    });
    const [meetingId, setMeetingId] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setMeetingRoom = useCallback(async () => {
        try {
            const token = await getToken();
            const response = await createMeeting({ token });
            console.log("Meeting created:", response);
            return response.meetingId;
        } catch (error) {
            console.error("Error creating meeting room:", error);
            setErrors(prevErrors => ({
                ...prevErrors,
                meetingRoomId: 'Không thể tạo phòng học. Vui lòng thử lại sau.'
            }));
            return null;
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price') {
            const regex = /^[0-9]*$/;
            if (regex.test(value) || value === '') {
                setFormData(prevState => ({ ...prevState, [name]: value }));
            }
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        const fields = ['name', 'description', 'startDate', 'price', 'title', 'language'];
        fields.forEach(field => {
            if (!formData[field]?.trim()) {
                newErrors[field] = `Vui lòng nhập ${field}`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                const newMeetingId = await setMeetingRoom();
                if (!newMeetingId) {
                    throw new Error("Failed to create meeting room");
                }
                setMeetingId(newMeetingId);
                console.log("Meeting ID set:", newMeetingId);

                const formDataToSend = {
                    ...formData,
                    startDate: new Date(formData.startDate).toISOString(),
                    meetingRoomId: newMeetingId,
                    price: parseInt(formData.price, 10),
                };
                console.log("Sending form data:", formDataToSend);
                const res = await createCourse(formDataToSend);
                console.log("Course created:", res);
                onCourseAdded();
                // Handle successful submission (e.g., show success message, redirect)
            } catch (error) {
                console.error('Error submitting form:', error);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    submit: 'Có lỗi xảy ra khi gửi form. Vui lòng thử lại.'
                }));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (

        <div className="form-container">
            <h2 className="form-title">Create Course Form</h2>
            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                    {errors.startDate && <span className="error">{errors.startDate}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price (VND):</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                    {errors.price && <span className="error">{errors.price}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Title:</label>
                    <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                    {errors.title && <span className="error">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="laguage">Language:</label>
                    <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choose Language</option>
                        <option value="English">English</option>
                        <option value="Japanese">Japanese</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                </button>
                {errors.submit && <span className="error">{errors.submit}</span>}
            </form>
        </div>
    );
};

export default CourseRegistrationForm;