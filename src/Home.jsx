import { Link } from "react-router-dom";
const Home = () => (
  <>
    <h1>Home Page</h1>
    <Link to="/">Home</Link> | <Link to="/add-form">Form Demo</Link>
  </>
);
export default Home;
