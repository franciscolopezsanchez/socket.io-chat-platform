import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Login = ({ }) => {
  return (

    <div className="d-flex align-items-center w-100">
      <div className="form m-auto">
        <form >
          <img className="mb-4" src="/src/assets/logo.svg" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please log in</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <Button
            type="submit"
            color="primary"
            cssClasses="w-100 my-2 py-2"
            text={'Log in'}
          >
          </Button>

          {/* <div v-if="errorMessage" class="text-danger"> */}
          {/*   {{ errorMessage }} */}
          {/* </div> */}
          <p className="mt-2">
            Or <Link to='/signup'>sign up.</Link>
          </p>
        </form>

      </div>
    </div>
  );
};


export default Login;
