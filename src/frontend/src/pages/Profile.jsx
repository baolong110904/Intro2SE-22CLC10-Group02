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
  Radio,
  RadioGroup,
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

const ProfileInformation = ({ profileData }) => (
  <Box>
    <Typography variant="h6" gutterBottom>
      User Information
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>Username:</strong> {profileData.username}
        </Typography>
        <Typography>
          <strong>Email:</strong> {profileData.email}
        </Typography>
        <Typography>
          <strong>Full Name:</strong> {profileData.first_name}{" "}
          {profileData.last_name}
        </Typography>
        <Typography>
          <strong>Gender:</strong> {profileData.gender}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>Date of Birth:</strong> {profileData.date_of_birth}
        </Typography>
        <Typography>
          <strong>Description:</strong> {profileData.description}
        </Typography>
        {/* <Typography><strong>MFA Enabled:</strong> {profileData.is_mfa_enabled ? 'Yes' : 'No'}</Typography> */}
        <Typography>
          <strong>Account Created:</strong>{" "}
          {new Date(profileData.created_at).toLocaleString()}
        </Typography>
      </Grid>
    </Grid>
  </Box>
)

const AddressInformation = ({ address, onSave, email }) => {
  const [editedAddress, setEditedAddress] = useState({
    ...address,
    phone_number: address.phone_number || "", // Ensure phone_number is a string
    address_type: address.address_type || "",
    is_default: address.is_default || false,
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedAddress)
  }

  const [countries, setCountries] = useState([])
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await GetAllCountries()
        console.log("API response:", result) // Log the entire response
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically call an API to change the password
    console.log("Password change submitted")
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

  const saveAddress = async (newAddress) => {
    try {
      const result = await UpdateAddress(
        email,
        newAddress.phone_number,
        newAddress.country,
        newAddress.city,
        newAddress.province,
        newAddress.district,
        newAddress.ward,
        newAddress.address,
        newAddress.address_type,
        newAddress.is_default,
      )

      if (result.success) {
        setProfileData((prevData) => ({
          ...prevData,
          address: newAddress,
        }))
        alert("Address saved successfully!")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error saving address:", error)
      alert(`Failed to save address: ${error.message}`)
    }
  }

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case "Information":
        return <ProfileInformation profileData={profileData} />
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
              backgroundColor: "blue",
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
                    <Chip label={profileData.role[0].name} size="small" />
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
                >
                  Change Password
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                >
                  Edit Avatar
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Section: Timeline and Content */}
          <Grid container spacing={2} mt={2}>
            {/* Timeline on the left */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <Box sx={{ padding: 2 }}>{renderSelectedSection()}</Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  )
}
