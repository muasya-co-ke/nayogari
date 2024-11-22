export const baseUrl = "https://car-rental-api-production-2584.up.railway.app"

export const headers = {
    "Content-Type": "application/json",
};
export const userType = JSON.parse(localStorage.getItem("authData"))?.user?.user_type;
export const activeUser = JSON.parse(localStorage.getItem("authData"))?.user;

export const projectName = 'Quick Validate'