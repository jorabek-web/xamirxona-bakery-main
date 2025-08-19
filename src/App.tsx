import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// pages
import { Layout } from "./layouts/layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { InstallApp } from "./utils";
import { useGetSingleUserQuery } from "./app/api";
import PWABadge from "./PWABadge";
import {
  Bakery,
  Information,
  Login,
  Main,
  Message,
  Messages,
  NotFound,
  Notification,
  Profile,
  Salaries,
  Storage,
} from "./pages";
export const App = () => {
  const { data: user } = useGetSingleUserQuery({});

  return (
    <Layout>
      <InstallApp />
      {user && <PWABadge />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Main />} />} />
        <Route
          path="/storage"
          element={<ProtectedRoute element={<Storage />} />}
        />
        <Route
          path="/bakery"
          element={<ProtectedRoute element={<Bakery />} />}
        />
        <Route
          path="/notification"
          element={<ProtectedRoute element={<Notification />} />}
        />
        <Route
          path="/messages"
          element={<ProtectedRoute element={<Messages />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/salaries"
          element={<ProtectedRoute element={<Salaries />} />}
        />
        <Route
          path="/message/:id"
          element={<ProtectedRoute element={<Message />} />}
        />
        <Route
          path="/information"
          element={<ProtectedRoute element={<Information />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};
