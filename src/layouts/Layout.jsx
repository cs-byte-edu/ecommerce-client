import { Outlet } from "react-router";
import { Header } from "../components/Header";
// import { Footer } from "../components/Footer";
import { useFetch } from "../hooks/useFetch";
import { Spiner } from "../components/Spiner";
// import { ErrorBoundary } from "../components/ErrorBoundary";
import { useEffect } from "react";
import { useBoundStore } from "../store";

const API_NAVIGATION_URL = import.meta.env.VITE_API_HEADER_NAV_URL;

export const Layout = () => {
  const { data: navigation, loading, error } = useFetch(API_NAVIGATION_URL);
  // const loadCart = useBoundStore((store) => store.loadCart);

  // useEffect(() => {
  //   loadCart();
  // }, []);
  // if (error)
  //   return <p className="text-red-500 text-2xl font-semibold">ERROR</p>;
  // if (loading) return <Spiner />;
  return (
    <>
      <Header navItems={navigation} />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
