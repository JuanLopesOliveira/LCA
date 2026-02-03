import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./register.module.css";
import { useState } from "react";

const userSchema = z.object({
  username: z.string().min(5, "Mínimo de 5 caracteres"),
  email: z.string().email("E-mail é obrigatório!"),
  password: z.string().min(6, "Mínimo de 6 caracteres!"),
});

type UserSchema = z.infer<typeof userSchema>;

export default function Register() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  async function handleSend(data: UserSchema) {
    try {
      const response = await fetch("https://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerResponse({ status: response.status, message: result.error });
        throw new Error(result.error);
      }

      setServerResponse({ status: response.status, message: result.success });
      // window.location.href = "/login"
    } catch (err) {
      throw err;
    }
  }

  const [serverResponse, setServerResponse] = useState<{
    status: number | "";
    message: string | "";
  } | null>();

  return (
    <div className={styles.mainDiv}>
      <div className={styles.registerPage}>
        <h1>Criar Conta</h1>

        <div className={styles.divForm}>
          <form onSubmit={handleSubmit(handleSend)}>
            <div className={styles.masterLabelsAndInputs}>
              <div className={styles.customLabelsAndInputs}>
                <label htmlFor="username">Nome</label>
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  min={6}
                />
              </div>
              {errors.username && <span>{errors.username.message}</span>}
            </div>

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
              <button>Criar</button>
            </div>

            <div className={styles.responseFromServer}>
              <span
                style={{
                  color: serverResponse?.status == 200 ? "green" : "red",
                }}
              >
                {serverResponse?.status} {serverResponse?.message}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
