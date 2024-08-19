import axiosInstance from "../axios/customAxios"

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1"
const VIDEO_SDK_URL =
  process.env.REACT_APP_VIDEO_SDK_URL || "https://api.videosdk.live"
const VIDEO_SDK_TOKEN = process.env.REACT_APP_VIDEO_SDK_TOKEN

export const getToken = async () => {
  if (VIDEO_SDK_TOKEN && API_BASE_URL) {
    console.error("Error: Provide only ONE PARAMETER - either Token or Auth API")
  } else if (VIDEO_SDK_TOKEN) {
    return VIDEO_SDK_TOKEN
  } else if (API_BASE_URL) {
    console.log("API_BASE_URL", API_BASE_URL)
    // const res = await fetch(`${API_AUTH_URL}/hello-world`, {
    //   method: "GET",
    // });
    // console.log("res", res);
    // const { token } = await res.json();
    // return token;
    const response = await axiosInstance
      .get(`${API_BASE_URL}/video-sdk/token`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((err) => {
        console.error("Error: ", err)
      })

    console.log("response", response)
    const token = response.data.data.token
    console.log("token", token)

    return token
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"))
  }
}

export const createMeeting = async ({ token }) => {
  console.log("Token", token)

  const url = `${VIDEO_SDK_URL}/v2/rooms`
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  }

  const response = await fetch(url, options)
  const data = await response.json()

  if (data.roomId) {
    return { meetingId: data.roomId, err: null }
  } else {
    return { meetingId: null, err: data.error }
  }
}

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${VIDEO_SDK_URL}/v2/rooms/validate/${roomId}`

  console.log("Validate Meeting")

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  }

  const response = await fetch(url, options)

  if (response.status === 400) {
    const data = await response.text()
    return { meetingId: null, err: data }
  }

  const data = await response.json()

  if (data.roomId) {
    return { meetingId: data.roomId, err: null }
  } else {
    return { meetingId: null, err: data.error }
  }
}
