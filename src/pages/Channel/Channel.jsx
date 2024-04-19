import Button from "src/components/Button";
import BackendService from "/src/BackendService";
import { useNavigate } from "react-router-dom";

const Channel = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await BackendService.logOut()

      if (res.status !== 204) {
        console.log("Error loggin out")
      }

      navigate('/login')

    } catch (e) {
      console.log("Something went wrong when logging you out...", e)
    }
  }

  return (
    <>
      <div>
        <Button
          onClick={handleLogout}
          color="primary"
          text={'Log out'}
        />
      </div>
    </>
  )

}

export default Channel;
