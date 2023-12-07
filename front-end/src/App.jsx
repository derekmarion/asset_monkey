import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useState, useEffect } from 'react';

export default function App() {
  const [user, setUser] = useState("");
  const [userForNavbar, setUserForNavbar] = useState("");

  useEffect(() => {
    // Update the userForNavbar whenever the user state changes
    setUserForNavbar(user);
  }, [user]);

  return (
      <>
      <Row style={{ textAlign: "center" }}>
        <h1>Asset Monkey(working title)</h1>
      </Row>
      <Navbar user={userForNavbar} setUser={setUser} /> {/* Why doesn't this have access to user state natively? */}
      <Outlet context={{ user, setUser }}/>
      </>
  );
}