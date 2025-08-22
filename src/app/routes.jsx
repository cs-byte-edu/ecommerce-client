import { Routes, Route } from "react-router";
import { Layout } from "../layouts/Layout";
import { PageHome } from "../pages/PageHome";
import { PageSignIn } from "../pages/PageSignIn";
// import { AuthGuard } from "../components/AuthGuard";
// import PageCart from "../pages/PageCart";
// import { PageUser } from "../pages/PageUser";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PageHome />} />
        {/* <Route
          path="page-user"
          element={
            <AuthGuard>
              <PageUser />
            </AuthGuard>
          }
        />
        <Route
          path="cart"
          element={
            <AuthGuard>
              <PageCart />
            </AuthGuard>
          }
        /> */}
      </Route>
      <Route path="signin" element={<PageSignIn />} />
    </Routes>
  );
};
