import { CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { routes } from "./RouteConfig";

export const AppRoutes = () => {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />
      {routes.map((route, index) => {
        if (route.path === "/") return null;

        if (route.isPublic && isAuthenticated) {
          return (
            <Route
              key={index}
              path={route.path}
              element={<Navigate to="/home" replace />}
            />
          );
        }

        if (route.isPrivate) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                isAuthenticated ? (
                  route.element
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          );
        }

        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
};
