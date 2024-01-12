import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Headling from "../../../components/Headling/Headling";
import { Input } from "../../../components/Input/Input";
import api from "../../../helpers/axios";
import styles from "./Login.module.css";
export type LoginForm = {
  username: {
    value: string;
  };
  password: {
    value: string;
  };
};

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ username: string; password: string }>();
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);
  const [error, setError] = useState<boolean>();

  const submit = async (data: { username: string; password: string }) => {
    try {
      setError(false);
      const { username, password } = data;
      const token = await api.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", token.data.accessToken);
      navigate("/posts");
    } catch (e) {
      setError(false);
    }
  };
  return (
    <div className={styles["login"]}>
      <Headling>Вход</Headling>

      <form className={styles["form"]} onSubmit={handleSubmit(submit)}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш username</label>
          <Input
            {...register("username", {
              required: { value: true, message: "Заполните login" },
            })}
            id="username"
            name="username"
            placeholder="username"
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            {...register("password", {
              required: { value: true, message: "Заполните password" },
            })}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <Button appearence="big">Вход</Button>
      </form>
      <div className={styles["links"]}>
        <div>Нет акканута?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
}
