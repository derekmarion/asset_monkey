import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { LogOut } from "./Logout";

export const Navbar = ({ user, setUser }) => {

  return (
    <>
      {user ? (
        <Row style={{ display: "flex", justifyContent: "space-around" }}>
          <Link to="/">Home</Link>
          <LogOut user={user} setUser={setUser} />
        </Row>
      ) : (
        <>
          <Link to="/signup">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </>
  );
};

// App.jsx
{
  /* <nav>
  {user ? (
    <>
      <Link to="/home">Home</Link>
      <button onClick={logOut}>Log out</button>
    </>
  ) : (
    <>
      <Link to="/">Register</Link>
      <Link to="/login">Log In</Link>
    </>
  )}
</nav> */
}
