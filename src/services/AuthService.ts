import api from "./api";

export default class AuthService {
  private axiosClient = api;

  async loginByGithub(code: string) {
    try {
      const response = await this.axiosClient.post("/auth/github/login/", {
        code,
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const response = await this.axiosClient.post("/token/refresh/", {
        refresh: refreshToken,
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}
