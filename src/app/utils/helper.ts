import type { AxiosError } from "axios";

const getApiErrors = (error: AxiosError, title = "") => {
  const errorMessage = "backend.errors.apiErrorMessage";

  if ("Fetch User" === error.name) {
    return errorMessage;
  }
  if (!error.response) {
    if (error && error.config)
      console.error(title, `API ${error.config.url} not found`);
    else console.error(title, `API ${error} not found`);
    return errorMessage;
  }
  if (process.env.NODE_ENV === "development") {
    console.error(title, error.response.data);
    console.error(title, error.response.status);
    console.error(title, error.response.headers);
  }
  if (error.response.data && error.response.data.errors) {
    return error.response.data.errors;
  }

  return errorMessage;
};

export { getApiErrors }