import {
  KeyboardArrowDown,
  AccountCircle,
  ExitToApp,
  Person,
} from "@mui/icons-material";
import styles from "./UserNavbar.module.scss";
import Cookies from "universal-cookie";
import Router from "next/router";
import { useUserContext } from "@/context/UserContext";

export function UserNavbar() {
  const { user, setUser } = useUserContext();

  function handleUserLogout() {
    const cookies = new Cookies();
    cookies.remove("accessToken");
    setUser({
      email: "",
      first_name: "",
      last_name: "",
      pk: 0,
      username: "",
    });
    Router.push("/login");
  }

  return (
    <details className={styles["user-navbar"]}>
      <summary>
        <AccountCircle sx={{ fontSize: 32, color: "#0f6" }} />
        <strong>{user.first_name}</strong>
        <KeyboardArrowDown sx={{ fontSize: 18 }} />
      </summary>

      <ul>
        <li>
          <Person sx={{ fontSize: 20 }} />
          Perfil
        </li>
        <li onClick={handleUserLogout}>
          <ExitToApp sx={{ fontSize: 20 }} />
          Sair
        </li>
      </ul>
    </details>
  );
}
