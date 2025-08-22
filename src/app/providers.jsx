import { BrowserRouter } from "react-router";

export const Providers = ({ children }) => {
  return <BrowserRouter basename="/ecommerce-client">{children}</BrowserRouter>;
};
