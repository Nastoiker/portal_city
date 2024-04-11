import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Headling from "../../../components/Headling/Headling";
import { Input } from "../../../components/Input/Input";
import api from "../../../helpers/axios";
import styles from "../Login/Login.module.css";
export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};
export function Register() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [error, setError] = useState<boolean>();
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<{ email: string; password: string; name: string }>();
  const submit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setError(true);
      const { name, email, password } = data;
      await api.post("/auth/register", {
        email,
        password,
        name,
        username: name,
        surname: "",
      });
      navigate("/auth/login");
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className={styles["login"]}>
      <Headling>Регистрация</Headling>
      <form className={styles["form"]} onSubmit={handleSubmit(submit)}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input
            id="email"
            {...register("email", {
              required: { value: true, message: "Заполните email" },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Введите  email",
              },
            })}
            name="email"
            placeholder="Email"
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            {...register("password", {
              required: { value: true, message: "Заполните пароль" },
            })}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div
          {...register("name", {
            required: { value: true, message: "Заполните login" },
          })}
          className={styles["field"]}
        >
          <label htmlFor="name">Ваше имя</label>
          <Input id="name" name="name" placeholder="Имя" />
        </div>
        <Button type="submit" appearence="big">
          Зарегистрироваться
        </Button>
        {error && "Ошибка"}
      </form>
      <div className={styles["links"]}>
        <div>Есть акканут?</div>
        <Link to="/auth/login">Войти</Link>
      </div>
    </div>
  );
}
