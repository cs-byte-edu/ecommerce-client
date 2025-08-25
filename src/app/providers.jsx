import { BrowserRouter } from "react-router";

export const Providers = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
  // return <BrowserRouter basename="/ecommerce-client">{children}</BrowserRouter>;
};
