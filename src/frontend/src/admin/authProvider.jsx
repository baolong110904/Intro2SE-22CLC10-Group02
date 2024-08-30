const API_BASE_URL = "http://20.243.0.237:8080/api/v1"
  // process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1"

const authProvider = {
  // login: async ({ email, password }) => {
  //   console.log('Attempting login...');
  //   const request = new Request(`${API_BASE_URL}/auth/login`, {
  //     method: 'POST',
  //     headers: new Headers({ 'Content-Type': 'application/json' }),
  //     body: JSON.stringify({ email, password }),
  //     credentials: 'include',
  //   });
  //   const response = await fetch(request);
  //
  //   if (response.status < 200 || response.status >= 300) {
  //     throw new Error(response.statusText);
  //   }
  //
  //   const data = await response.json();
  //   const { access_token, user } = data.data;
  //   localStorage.setItem('access_token', access_token);
  //   localStorage.setItem('email', user.email);
  // },

  logout: async () => {
    console.log("Attempting logout...")
    const request = new Request(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      body: JSON.stringify({ email: localStorage.getItem("email") }),
      credentials: "include",
    })
    const response = await fetch(request)

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText)
    }

    localStorage.removeItem("token")
    localStorage.removeItem("email")
  },

  checkError: ({ status }) => {
    console.log("Checking error...")
    if (status === 401 || status === 403) {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      return Promise.reject()
    }
    return Promise.resolve()
  },

  checkAuth: () => {
    console.log("Checking auth...")
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject()
  },

  getPermissions: () => {
    console.log("Getting permissions...")
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject()
    // return localStorage.getItem('role') ? Promise.resolve(localStorage.getItem('role')) : Promise.reject();
  },

  getIdentity: async () => {
    console.log("Getting identity...")
    const email = localStorage.getItem("email")

    if (!email) {
      return Promise.reject("No email found")
    }

    const request = new Request(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-AUTH-USER-EMAIL": email,
      }),
      credentials: "include",
    })

    const response = await fetch(request)

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    const user = data.data

    return Promise.resolve({
      id: user.email,
      fullName: `${user.first_name} ${user.last_name}`,
      avatar: user.avatar || "",
    })
  },
}

export default authProvider
