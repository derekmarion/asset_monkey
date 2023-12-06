import Row from "react-bootstrap/esm/Row";
import { SignUp } from "../components/Signup";

export const Home = () => {
  return (
    <>
    <Row style={{ textAlign: "center", padding: "0 10vmin" }}>
      <p>
        <strong>Your Solution for Personal Asset Management</strong>
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil vitae
        aliquam at, sunt itaque dolore sapiente, pariatur rem, voluptatum veniam
        quia vero. Sint beatae ab impedit nam culpa officia autem.
      </p>
    </Row>
    <Row style={{ padding: "0 10vmin" }}>
      <SignUp />
    </Row>
    </>
  );
};

