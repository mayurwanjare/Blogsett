// Check if user is logged in
export const isLoggedIn = () => {
  const data = localStorage.getItem("data");
  try {
    return data !== null && JSON.parse(data).token !== undefined;
  } catch (e) {
    return false;
  }
};

// Store user data (e.g., token + user) in localStorage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  if (typeof next === "function") next();
};

// Remove user data from localStorage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  if (typeof next === "function") next();
};

// Get current user details
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  }else{
    return undefined;
  }
  
};

export const getToken = () => {
  if (isLoggedIn()) {
    try {
      const data = JSON.parse(localStorage.getItem("data"));
      return data?.token || null;
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};