import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// pages
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { Layout } from "./layouts/layout";
import { Storage } from "./pages/Storage";
import { Bakery } from "./pages/Bakery";
import { Notification } from "./pages/Notification";
import { Messages } from "./pages/Messages";
import { Profile } from "./pages/Profile";
import { Message } from "./pages/Message";
import { Information } from "./pages/Complaint";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFound } from "./pages/NotFound/NotFound";
import { InstallApp } from "./utils";
import { useGetSingleUserQuery } from "./app/api";
import PWABadge from "./PWABadge";

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
