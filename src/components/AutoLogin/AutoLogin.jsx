import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "src/BackendService"
import { useEffect } from "react";
import { autoLogin } from "src/store/appSlice";
import { useDispatch } from "react-redux";


const AutoLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    dispatch(autoLogin({ currentPath, navigate }))
  }, [])

  socket.on("connect_error", (err) => {
    if (err.context?.status === 401) {
      socket.disconnect();
      navigate("/login")
    }
  });

  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      navigate("/login")
    }
  });

  return null;
}

export default AutoLogin
