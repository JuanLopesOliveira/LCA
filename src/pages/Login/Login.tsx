import styles from "./login.module.css";
import { any, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const userSchema = z.object({
    email: z.string().email("E-mail é obrigatório!"),
    password: z.string().min(6, "Mínimo de 6 caracteres!"),
  });

  type UserSchema = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  async function handleSend(data: UserSchema) {
    try {
      const response = await fetch("https://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      setServerResponse({ status: response.status, message: result.message });

      if (response.ok) {
        window.location.href = "/";
      }
    } catch (err: any) {
      setServerResponse({
        status: 500,
        message: err.message || "Internal Server Error",
      });
      throw err;
    }
  }

  const [serverResponse, setServerResponse] = useState<{
    status: number | "";
    message: string | "";
  } | null>(null);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.loginPage}>
        <h1>Login</h1>

        <div className={styles.divForm}>
          <form onSubmit={handleSubmit(handleSend)}>
            <div className={styles.masterLabelsAndInputs}>
              <div className={styles.customLabelsAndInputs}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email")} />
              </div>
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className={styles.masterLabelsAndInputs}>
              <div className={styles.customLabelsAndInputs}>
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  min={6}
                />
              </div>
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div className={styles.buttons}>
              <button>Entrar</button>
              <span>
                Não tem uma conta? <Link to="/register">Crie uma!</Link>
              </span>
            </div>

            <div className={styles.responseFromServer}>
              <h3
                style={{
                  color: serverResponse?.status == 200 ? "green" : "red",
                }}
              >
                {serverResponse?.status}:{" "}
                {serverResponse?.message !== "" && serverResponse?.message}
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
