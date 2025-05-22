import { axiosInstance } from "@/api/axios";
import { Refine, AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  register: async (data) => {
    const res = await axiosInstance
        .post("auth/register",data)
        .then((res) => res.data);
        if (res) {
          localStorage.setItem("refine_user", JSON.stringify(res.data.user));
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  login: async (data) => {
    const res = await axiosInstance
    .post("auth/login",data)
    .then((res) => res.data);
    if (res) {
      localStorage.setItem("refine_user", JSON.stringify(res.data.user));
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  check: async () => {
    return localStorage.getItem("refine_user")
      ? {
          authenticated: true,
        }
      : {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Not authenticated",
          },
          logout: true,
          redirectTo: "/login",
        };
  },
  logout: async () => {
    localStorage.removeItem("refine_user");
    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getIdentity: async () => {
    const user = localStorage.getItem("refine_user")
    if(user){
      return JSON.parse(user)
    }
  },
  updatePassword: async (params) => {
    if (params.password) {
      //we can update password here
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  forgotPassword: async (params) => {
    if (params.username) {
      //we can send email with reset password link here
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  getPermissions: async (params) => {
    if (params) {
      // do some logic like for example you can get roles for specific tenant
      return ["admin"];
    }

    return ["admin"];
  },
};