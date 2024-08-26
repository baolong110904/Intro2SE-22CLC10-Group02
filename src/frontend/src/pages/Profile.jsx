import React, { useEffect, useState } from "react"
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GetProfile from "../api/auth/GetProfile"
import { useNavigate } from "react-router-dom"
import UpdateAddress from "../api/auth/UpdateAddress"
import { MuiTelInput } from "mui-tel-input"
import GetAllCountries from "../api/country/GetAllCountries"
import ChangePassword from "../api/auth/ChangePassword"
import UpdateProfile from "../api/auth/UpdateProfile"
import UploadAvatar from "../api/auth/UploadAvatar"
import TextEditor from "../components/TextEditor"

const ProfileInformation = ({ profileData, onSave }) => {
  const [editedProfile, setEditedProfile] = useState({
    ...profileData,
    date_of_birth: profileData.date_of_birth || "",
  })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9._]{2,50}$/
    if (!regex.test(username)) {
      return "Username must be alphanumeric and have at least 2 characters and maximum 50 characters allow underscore, dot."
    }
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }

    if (name === "username") {
      const error = validateUsername(value)
      if (error) {
        setErrors((prev) => ({ ...prev, username: error }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const usernameError = validateUsername(editedProfile.username)
    if (usernameError) {
      setErrors((prev) => ({ ...prev, username: usernameError }))
      return
    }

    try {
      const result = await UpdateProfile(
        editedProfile.email,
        editedProfile.username,
        editedProfile.first_name,
        editedProfile.last_name,
        editedProfile.date_of_birth,
        editedProfile.gender,
        editedProfile.description,
      )
      if (result.success) {
        onSave(editedProfile)
        setSuccess("Profile updated successfully!")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      setError(`Failed to update profile: ${error.message}`)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        User Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={editedProfile.email}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            value={editedProfile.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="first_name"
            label="First Name"
            value={editedProfile.first_name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="last_name"
            label="Last Name"
            value={editedProfile.last_name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="date_of_birth"
            label="Date of Birth"
            type="date"
            value={editedProfile.date_of_birth}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={editedProfile.gender}
              label="Gender"
              onChange={handleChange}
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={5}
            value={editedProfile.description}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" gutterBottom>
          {success}
        </Typography>
      )}
      <Box mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!!errors.username}
        >
          Save Profile
        </Button>
      </Box>
    </Box>
  )
}

const AddressInformation = ({ address, onSave, email }) => {
  const [editedAddress, setEditedAddress] = useState({
    ...address,
    phone_number: address.phone_number || "",
    address_type: address.address_type || "",
    is_default: address.is_default || false,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditedAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePhoneChange = (value) => {
    setEditedAddress((prev) => ({
      ...prev,
      phone_number: value || "",
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const result = await UpdateAddress(
        email,
        editedAddress.phone_number,
        editedAddress.country,
        editedAddress.city,
        editedAddress.province,
        editedAddress.district,
        editedAddress.ward,
        editedAddress.address,
        editedAddress.address_type,
        editedAddress.is_default,
      )

      if (result.success) {
        onSave(editedAddress)
        setSuccess("Address saved successfully!")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error saving address:", error)
      setError(`Failed to save address: ${error.message}`)
    }
  }

  const [countries, setCountries] = useState([])
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await GetAllCountries()
        console.log("API response:", result)
        if (Array.isArray(result)) {
          setCountries(result)
        } else {
          console.error("Unexpected API response format:", result)
          setFetchError(true)
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error)
        setFetchError(true)
      }
    }
    fetchCountries()
  }, [])

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Address Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <MuiTelInput
            value={editedAddress.phone_number}
            onChange={(value) => handlePhoneChange(value)}
            defaultCountry="VN"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {fetchError ? (
            <TextField
              fullWidth
              name="country"
              label="Country"
              value={editedAddress.country || ""}
              onChange={handleChange}
            />
          ) : (
            <FormControl fullWidth>
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                value={editedAddress.country || ""}
                label="Country"
                onChange={handleChange}
                name="country"
              >
                {countries.map((country) => (
                  <MenuItem key={country.iso2} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
        {[
          // { name: 'country', label: 'Country' },
          { name: "city", label: "City" },
          { name: "province", label: "Province" },
          { name: "district", label: "District" },
          { name: "ward", label: "Ward" },
          { name: "address", label: "Address" },
        ].map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              fullWidth
              name={field.name}
              label={field.label}
              value={editedAddress[field.name] || ""}
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="address-type-label">Address Type</InputLabel>
            <Select
              labelId="address-type-label"
              name="address_type"
              value={editedAddress.address_type}
              label="Address Type"
              onChange={handleChange}
            >
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editedAddress.is_default}
                onChange={handleChange}
                name="is_default"
              />
            }
            label="Set as default address"
          />
        </Grid>
      </Grid>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" gutterBottom>
          {success}
        </Typography>
      )}
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Save Address
        </Button>
      </Box>
    </Box>
  )
}

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/
    if (!regex.test(password)) {
      return "Password must contain at least 8 characters, including uppercase, lowercase, and numbers."
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const email = localStorage.getItem("email")

    if (!email) {
      setError("User email not found. Please log in again!")
      return
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setError(passwordError)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match!")
      return
    }

    try {
      const result = await ChangePassword(
        email,
        oldPassword,
        newPassword,
        confirmPassword,
      )

      if (result.success) {
        setSuccess(result.data)
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setError(result.data.error || "Failed to change password!")
      }
    } catch (error) {
      setError("Wrong current password. Please try again!")
      console.error("Error changing password:", error)
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              helperText="Password must contain at least 8 characters, including uppercase, lowercase, and numbers."
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success.main" gutterBottom>
                {success}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              Change Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default function Profile() {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState("Information")
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const email = localStorage.getItem("email")

  if (!token || !email) {
    navigate("/login")
  }

  useEffect(() => {
    if (!token || !email) {
      navigate("/login")
      return
    }

    const fetchData = async () => {
      try {
        const data = await GetProfile(email)
        if (data.success) {
          setProfileData(data.data)
        } else {
          console.log("Error fetching profile data")
          navigate("/login")
        }
      } catch (error) {
        console.log("Error fetching profile data", error)
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [email, navigate, token])

  if (loading) {
    return (
      <div>
        <Navbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress size={100} />
        </Box>
        <Footer />
      </div>
    )
  }

  if (!profileData) {
    return null
  }

  const saveAddress = (newAddress) => {
    setProfileData((prevData) => ({
      ...prevData,
      address: newAddress,
    }))
  }

  const handleProfileUpdate = (updatedProfile) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...updatedProfile,
    }))
  }

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const result = await UploadAvatar(email, file)
        if (result.success) {
          setProfileData((prevData) => ({
            ...prevData,
            avatar: result.data.imageUrl,
          }))
          setIsAvatarDialogOpen(false)
        } else {
          console.error("Failed to upload avatar:", result.message)
        }
      } catch (error) {
        console.error("Error uploading avatar:", error)
      }
    }
  }

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case "Information":
        return (
          <ProfileInformation
            profileData={profileData}
            onSave={handleProfileUpdate}
          />
        )
      case "Address":
        return (
          <AddressInformation
            address={profileData.address}
            onSave={saveAddress}
            email={email}
          />
        )
      case "Password":
        return <PasswordChange />
      default:
        return null
    }
  }

  return (
    <div>
      <Navbar />
      <Box mt={10} />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Container
          maxWidth={false}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            padding: 0,
            margin: 0,
          }}
        >
          {/* Top Section: Avatar and Profile Details */}
          <Grid
            container
            alignItems="center"
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{
              backgroundColor: "rgb(29, 78, 216)",
              padding: "2rem",
              margin: 0,
            }}
            direction={{ xs: "column", sm: "row" }}
            textAlign={{ xs: "center", sm: "left" }}
          >
            {/* Left Section: Avatar, Name, and Details */}
            <Grid item xs={12} sm={8} md={7}>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems="center"
                ml={{ xs: 0, sm: 1, md: 7 }}
              >
                <Avatar
                  alt={profileData.first_name + " " + profileData.last_name}
                  src={profileData.avatar}
                  sx={{
                    width: { xs: 80, sm: 120 },
                    height: { xs: 80, sm: 120 },
                    marginBottom: { xs: "1rem", sm: 0 },
                    marginRight: { xs: 0, sm: "1.5rem" },
                  }}
                />
                <Box>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {profileData.first_name} {profileData.last_name}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent={{ xs: "center", sm: "flex-start" }}
                    alignItems="center"
                    mt={1}
                    mb={1}
                  >
                    <Chip
                      label={profileData.role[0].name}
                      size="small"
                      color="warning"
                    />
                    {/* <Chip label="Premium Member" size="small" color="warning" sx={{ marginLeft: '0.5rem' }} /> */}
                  </Box>
                  <Typography variant="body1" color="white">
                    {/* {profileData.date_of_birth} */}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Section: Buttons */}
            <Grid
              item
              xs={12}
              sm={4}
              md={5}
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "center", sm: "flex-end" }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems={{ xs: "center", sm: "flex-end" }}
                mr={{ xs: 0, sm: 1, md: 6 }}
                mt={{ xs: "1rem", sm: 0 }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    marginBottom: "1rem",
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                  onClick={() => setSelectedSection("Password")}
                >
                  Change Password
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                  onClick={() => setIsAvatarDialogOpen(true)}
                >
                  Change Avatar
                </Button>

                {/* Avatar Upload Dialog */}
                <Dialog
                  open={isAvatarDialogOpen}
                  onClose={() => setIsAvatarDialogOpen(false)}
                  PaperProps={{
                    style: {
                      borderRadius: "8px",
                      padding: "20px",
                      maxWidth: "400px",
                      width: "100%",
                    },
                  }}
                >
                  <DialogTitle
                    style={{
                      textAlign: "center",
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Upload New Avatar
                  </DialogTitle>
                  <DialogContent style={{ textAlign: "center" }}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      type="file"
                      onChange={handleAvatarUpload}
                    />
                    <label htmlFor="avatar-upload">
                      <Button
                        variant="contained"
                        component="span"
                        style={{
                          backgroundColor: "#1976d2",
                          color: "white",
                          padding: "10px 20px",
                          fontSize: "16px",
                          marginBottom: "20px",
                        }}
                      >
                        Choose Image
                      </Button>
                    </label>
                  </DialogContent>
                  <DialogActions
                    style={{ justifyContent: "center", padding: "0 20px 20px" }}
                  >
                    <Button
                      onClick={() => setIsAvatarDialogOpen(false)}
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        padding: "10px 20px",
                        fontSize: "16px",
                      }}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Section: Timeline and Content */}
          <Grid container spacing={6} mt={2}>
            {/* Timeline on the left */}
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: { xs: 2, sm: 4 },
                }}
              >
                <Timeline position="right">
                  {["Information", "Address", "Password"].map((section) => (
                    <TimelineItem key={section}>
                      <TimelineSeparator>
                        <TimelineDot />
                        {section !== "Password" && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent
                        onClick={() => setSelectedSection(section)}
                        sx={{
                          cursor: "pointer",
                          fontWeight:
                            selectedSection === section ? "bold" : "normal",
                          color:
                            selectedSection === section
                              ? "primary.main"
                              : "text.primary",
                        }}
                      >
                        {section}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Box>
            </Grid>

            {/* Content on the right */}
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <Box sx={{ padding: 2 }}>{renderSelectedSection()}</Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  )
}
