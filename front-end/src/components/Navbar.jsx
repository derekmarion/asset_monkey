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
          <Link to="/inventory/all_items">Items</Link>
          <Link to="/inventory/create">Create Item</Link>
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