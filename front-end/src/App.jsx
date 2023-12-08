import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useState, useEffect, useRef } from "react";
import { api } from "./utilities";
import { useNavigate, useLocation } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState("");
  const [userForNavbar, setUserForNavbar] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const lastVisited = useRef();

  const whoAmI = async () => {
    // Check if a token is stored in the localStorage
    let token = localStorage.getItem("token");
    if (token) {
      // If the token exists, set it in the API headers for authentication
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Fetch the user data from the server using the API
      let response = await api.get("users/info");
      // Check if the response contains the user data (email field exists)
      if (response.data.email) {
        // Set the user data in the context or state (assuming `setUser` is a state update function)
        setUser(response.data);
        // If the user is authenticated and there is a stored lastVisited page,
        // navigate to the lastVisited page; otherwise, navigate to the default homepage "/home"
        if (lastVisited.current) {
          navigate(lastVisited.current);
        } else {
          navigate("/home");
        }
      }
    } else {
      // If no token is found, navigate to the login page
      navigate("/login");
    }
  };

  // This useEffect block runs once when the component mounts (due to the empty dependency array [])
  // It calls the whoAmI function to check the user's authentication status and perform redirection accordingly
  useEffect(() => {
    whoAmI();
  }, []);

  // This useEffect block runs whenever the location (pathname) changes
  // It updates the lastVisited ref with the current location pathname
  // This allows the whoAmI function to access the lastVisited page for redirection if needed
  useEffect(() => {
    if (!user) {
      // If the user is not authenticated, update the lastVisited ref with the current location pathname
      lastVisited.current = location.pathname;
    }
  }, [location]);

  useEffect(() => {
    // Update the userForNavbar whenever the user state changes
    setUserForNavbar(user);
  }, [user]);

  return (
    <>
      <Row style={{ textAlign: "center" }}>
        <h1>Asset Monkey(working title)</h1>
      </Row>
      <Navbar user={userForNavbar} setUser={setUser} />{" "}
      {/* Why doesn't this have access to user state natively? */}
      <Outlet context={{ user, setUser }} />
    </>
  );
}
