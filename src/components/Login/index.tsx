import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.scss";
import Logo from "/public/assets/logo.svg";
import { Email, GitHub } from "@mui/icons-material";

import { useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import AuthService from "@/services/AuthService";
import Cookies from "universal-cookie";

export function Login() {
  const router = useRouter();
  const { setUser } = useUserContext();

  useEffect(() => {
    if (router.query.code) {
      const authService = new AuthService();
      authService
        .loginByGithub(router.query.code as string)
        .then((response) => {
          if (response.status === 200) {
            const cookies = new Cookies();
            cookies.set("accessToken", response.data.access);
            setUser(response.data.user);
            router.push("/");
          }
        });
    }
  }, [router.query]);

  return (
    <div className={styles.login}>
      <div className={styles.login__main}>
        <h1 className={styles.login__main__logo}>
          <Image src={Logo} alt="logo" fill />
        </h1>
        <>
          <p className={styles.login__main__title}>Seja bem-vindo.</p>

          <button className={styles.login__main__button}>
            <Email sx={{ fontSize: 20, lineHeight: 20 }} />
            Gmail
          </button>

          <Link
            style={{ width: "100%", textDecoration: "none" }}
            href={process.env.NEXT_PUBLIC_GITHUB_LOGIN_URL as string}
          >
            <button className={styles.login__main__button}>
              <GitHub sx={{ fontSize: 20, lineHeight: 20 }} />
              Github
            </button>
          </Link>
        </>
      </div>
    </div>
  );
}
