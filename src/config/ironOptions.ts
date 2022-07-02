import Environment from "constants/environment";
import environment from "config/environment";

export default {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "myapp_cookiename",
  cookieOptions: {
    secure: environment === Environment.production
  }
};
