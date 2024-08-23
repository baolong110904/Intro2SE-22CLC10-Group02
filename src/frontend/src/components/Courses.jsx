import React, { useState, useEffect } from "react"
import Footer from "./Footer"
import Navbar2 from "./Navbar2"
import GetAllCoursesService from "../api/courses/GetAllCoursesService"
import {
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material"
import getCart from "../api/courses/GetCoursesFromCart"
import addToCart from "../api/courses/AddCourseToCart"
import removeFromCart from "../api/courses/RemoveCourseFromCart"
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa"
import payMent from "../api/VN_Pay/Payment"
import { useNavigate } from "react-router-dom"

const Courses = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [language, setLanguage] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [products, setProducts] = useState([])
  const [courseName, setCourseName] = useState("")
  const [shouldFetch, setShouldFetch] = useState(true)
  const [cart, setCart] = useState([])
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const [isScrolled, setIsScrolled] = useState(false)
  const email = localStorage.getItem("email")

  useEffect(() => {
    const body = document.body
    if (isDarkMode) {
      body.classList.add("dark")
    } else {
      body.classList.remove("dark")
    }
  }, [isDarkMode])
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const handleAddToCart = async (product) => {
    try {
      const isProductInCart = cart.some((item) => item.id === product.id)
      if (!isProductInCart) {
        await addToCart(product, email)
        setCart((prevCart) => [...prevCart, product])
      } else {
        alert("This item was added to your cart before!")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleRemoveFromCart = async (itemId) => {
    await removeFromCart(itemId)
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const handlePayment = async () => {
    try {
      const result = await payMent(calculateTotalPrice())
      let url = result.data.data.url

      console.log(result)
      window.location.href = url
    } catch (error) {
      console.error("Payment failed:", error)
    }
  }

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible)
  }

  const handleSearch = (searchTerm) => {
    setFirstName(searchTerm)
  }

  const handleCourseName = (courseName) => {
    setCourseName(courseName)
  }

  const handleCategoryFilter = (language) => {
    setLanguage(language)
  }

  const handleMinPriceChange = (minPrice) => {
    setMinPrice(minPrice)
  }

  const handleMaxPriceChange = (maxPrice) => {
    setMaxPrice(maxPrice)
  }

  const applyFilters = () => {
    setShouldFetch(true)
  }

  useEffect(() => {
    async function fetchData() {
      if (shouldFetch) {
        try {
          const data = {
            firstName: firstName,
            courseName: courseName,
            language: language,
            minPrice: minPrice,
            maxPrice: maxPrice,
          }

          const result = await GetAllCoursesService(data)
          console.log(result)
          if (result.success === false) {
            // throw new Error(result.message);
            navigate("/")
          }
          setProducts(result.data)
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setShouldFetch(false)
        }
      }
    }
    fetchData()
  }, [shouldFetch, firstName, courseName, language, minPrice, maxPrice])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartItems = await getCart()
        if (cartItems && cartItems.data && cartItems.data.data) {
          setCart(cartItems.data.data)
        } else {
          console.log("Không có dữ liệu giỏ hàng hoặc dữ liệu không đúng định dạng")
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error)
      }
    }
    fetchCart()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    // <div
    //     className="relative overflow-y-auto inset-0 flex items-center justify-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-80 z-50"
    //     id="courses"
    // >
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <Navbar2
        userName="Bao Long"
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="fixed top-20 right-10">
        <button
          onClick={toggleCartVisibility}
          className="hover:bg-gray-100 rounded-full"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>
      <Grid container spacing={2}>
        {isCartVisible && (
          <div className="cart-dropdown">
            <h2>Cart Items</h2>
            {cart.length > 0 ? (
              <div>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                      <img src={item.thumbnail} alt={item.course_name} />
                      <div className="cart-item-info">
                        <span className="course-name">{item.course_name}</span>
                        <span className="course-price">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id, email)}
                        className="remove-cart-button"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{calculateTotalPrice()} VND</span>
                  <button
                    className="checkout-button"
                    onClick={() => handlePayment()}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        )}
        <Grid item xs={3}>
          <Box
            sx={{
              mt: 10,
              p: 4,
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 3, // Tăng cường độ bóng
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Filter Courses
            </Typography>

            {/* Search input */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Teacher's First Name
              </Typography>
              <TextField
                fullWidth
                id="teacher_name"
                name="teacher_name"
                placeholder="Teacher's First Name..."
                variant="outlined"
                size="small"
                onChange={(e) => handleSearch(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Course name
              </Typography>
              <TextField
                fullWidth
                id="course_name"
                name="course_name"
                placeholder="Course name..."
                variant="outlined"
                size="small"
                onChange={(e) => handleCourseName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
            </Box>

            {/* Category filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Language
              </Typography>
              <Select
                fullWidth
                displayEmpty
                onChange={(e) => handleCategoryFilter(e.target.value)}
                size="small"
                sx={{
                  "& .MuiSelect-select": {
                    padding: "10px 14px", // Tinh chỉnh khoảng cách nội dung
                  },
                }}
              >
                <MenuItem value="">All Languages</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
              </Select>
            </Box>

            {/* Price range filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Price Range
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  type="number"
                  placeholder="Min"
                  size="small"
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  sx={{ width: "48%", mr: 1 }} // Giảm khoảng cách giữa các trường nhập liệu
                />
                <Typography>-</Typography>
                <TextField
                  type="number"
                  placeholder="Max"
                  size="small"
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  sx={{ width: "48%" }}
                />
              </Box>
            </Box>

            {/* Apply filters button */}
            <Button
              variant="contained"
              fullWidth
              onClick={applyFilters}
              sx={{
                mt: 2,
                py: 1.5, // Tăng khoảng cách dọc
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                boxShadow: 2, // Thêm bóng cho nút
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box>
            <div className="container mx-auto px-4 min-h-screen">
              <hr className="my-4" />
              <div className="mt-20 p-4">
                <Grid container spacing={5}>
                  {products.map((product) => (
                    <Grid item xs={12} sm={6} lg={4} key={product.id}>
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
                            src={product.thumbnail}
                            alt={`Picture of ${product.course_name}`}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Box sx={{ p: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
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
                              {product.course_name}
                            </Typography>
                          </Box>
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
                                theme.palette.mode === "dark"
                                  ? "#cbd5e0"
                                  : "#4a5568",
                            }}
                          >
                            {product.description}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "#48bb78"
                                  : "#38a169",
                              mb: 2,
                            }}
                          >
                            {product.price} VND
                          </Typography>
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={
                              <svg
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            }
                            sx={{
                              mt: 2,
                              backgroundColor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "#3182ce"
                                  : "#4299e1",
                              color: "#ffffff",
                              "&:hover": {
                                backgroundColor: (theme) =>
                                  theme.palette.mode === "dark"
                                    ? "#2c5282"
                                    : "#3182ce",
                              },
                            }}
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to cart
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Courses
