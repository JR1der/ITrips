import { Navigate, RouteProps } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { CreateDestinationPage } from "../pages/CreateDestinationPage/CreateDestinationPage";
import { CreateTripPage } from "../pages/CreateTripPage/CreateTripPage";
import { DestinationsPage } from "../pages/DestinationsPage/DestinationsPage";
import { EditDestinationPage } from "../pages/EditDestinationPage/EditDestinationPage";
import { EditTripPage } from "../pages/EditTripPage/EditTripPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { SingleDestinationPage } from "../pages/SingleDestinationPage/SingleDestinationPage";
import { SingleTripPage } from "../pages/SingleTripPage/SingleTripPage";
import { TripsPage } from "../pages/TripsPage/TripsPage";
import { WelcomePage } from "../pages/WelcomePage/WelcomePage";

export type RouteConfig = RouteProps & {
  path: string;
  isPrivate?: boolean;
  isPublic?: boolean;
  title?: string;
  order?: number;
  showOnlyOnMobile?: boolean;
  element: React.ReactNode;
};

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: null,
    order: 0,
  },
  {
    isPrivate: false,
    isPublic: true,
    path: "/welcome",
    element: <WelcomePage />,
    title: "Welcome",
    order: 0,
  },
  {
    isPrivate: true,
    isPublic: false,
    path: "/home",
    element: <HomePage />,
    title: "Home",
    order: 0,
  },
  {
    path: "/*",
    element: <Navigate to="/welcome" replace />,
    order: 9,
  },
  {
    path: "/login",
    isPublic: true,
    isPrivate: false,
    element: <LoginPage />,
    title: "Login",
  },
  {
    path: "/signup",
    isPublic: true,
    isPrivate: false,
    element: <RegisterPage />,
    title: "Register",
  },
  {
    path: "/destinations",
    element: <DestinationsPage />,
    index: true,
  },
  {
    path: "/destinations/create",
    isPublic: false,
    isPrivate: true,
    element: <CreateDestinationPage />,
    index: true,
  },
  {
    path: "/destinations/edit/:id",
    isPublic: false,
    isPrivate: true,
    element: <EditDestinationPage />,
    index: true,
  },
  {
    path: "/destinations/:id",
    element: <SingleDestinationPage />,
    index: true,
  },
  {
    path: "/trips/create",
    isPublic: false,
    isPrivate: true,
    element: <CreateTripPage />,
    index: true,
  },
  {
    path: "/trips",
    element: <TripsPage />,
    index: true,
  },
  {
    path: "/trips/:id",
    element: <SingleTripPage />,
    index: true,
  },
  {
    path: "/trip/edit/:id",
    isPublic: false,
    isPrivate: true,
    element: <EditTripPage />,
    index: true,
  },
];
