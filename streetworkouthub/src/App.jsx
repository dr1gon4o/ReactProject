import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Sidebar from "./components/Sidebar";
import Weather from "./pages/Weather";
import Aichat from "./pages/Aichat";
import Search from "./pages/Search";
import Maps from "./pages/Maps";
import Calendar from "./pages/Calendar";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";


function App() {
  return (
    <AuthProvider>
      <div id="app">
      <Header />
      <Sidebar className="header-style" />
      <main className="container mt-4 mb-5 fade-in">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/posts/:id" element={<Details />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/welcome"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />

          <Route path="/search" element={<Search />} />

          <Route 
            path="/aichat" 
            element={
              <PrivateRoute>
                <Aichat />
                </PrivateRoute>
            } 
          />

          <Route path="/weather" element={<Weather />} />

          <Route path="/maps" element={<Maps />} />

          <Route path="/calendar" element={<Calendar />} />

          <Route path="/about" element={<About />}/>

          <Route path="/contact" element={<Contact />}/>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </main>
      <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
