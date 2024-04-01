import { useState } from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackendService from "/src/BackendService";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "/src/store/appSlice";

const Form = styled.form`
  max-width: 330px;
  padding: 1rem;
`;

const FormFloating = styled.div`
  &:focus-within {
    z-index: 2;
  }
`

const FloatingInput = styled.input`
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`

const FloatingPassword = styled.input`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`

const Login = ({ }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setErrorMessage('')

    try {
      const res = await BackendService.logIn({
        username: username,
        password: password,
      });

      if (res.status !== 200) {
        setPassword("")
        setErrorMessage("The credentials are invalid.")
        setIsLoading(false)
        return;
      }

      const user = await res.json();
      dispatch(setCurrentUser(user))
      navigate("/c")
      // store.setCurrentUser(user);

      // const channelId = await store.init();

      // if (route.query.returnTo) {
      //   await router.push(route.query.returnTo);
      // } else {
      //   await router.push({ name: "channel", params: { channelId } });
      // }
    } catch (_) {
      setErrorMessage("Something went wrong.")
      setIsLoading(false)
    }
  }

  return (
    <div className="d-flex align-items-center w-100">
      <div className="form m-auto">
        <Form
          onSubmit={handleFormSubmit}
        >
          <img className="mb-4" src="/src/assets/logo.svg" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please log in</h1>

          <FormFloating className="form-floating">
            <FloatingInput
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              onChange={(e) => { setUsername(e.target.value) }}
            />
            <label htmlFor="floatingInput">Username</label>
          </FormFloating>
          <FormFloating className="form-floating">
            <FloatingPassword
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </FormFloating>

          <Button
            type="submit"
            color="primary"
            cssClasses="w-100 my-2 py-2"
            text={'Log in'}
            loading={isLoading}
            disabled={!username.length || !password.length}
          />
          {errorMessage &&
            <div className="text-danger">
              {errorMessage}
            </div>
          }
          <p className="mt-2">
            Or <Link to='/signup'>sign up</Link>.
          </p>
        </Form>
      </div>
    </div>
  );
};


export default Login;
