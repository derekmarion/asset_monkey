import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState("");

  return (
    <Container>
      <Row style={{ textAlign: "center" }}>
        <h1>Asset Monkey(working title)</h1>
      </Row>
      <Navbar />
      <Outlet context={{ user, setUser }}/>
    </Container>
  );
}