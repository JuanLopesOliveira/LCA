import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { FaEye } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "../../../backend/utils/interfaces";

export function Profile() {
  function handleChangeEditMode() {
    setIsEditModeOn(false);
  }

  async function handleSend(data: EditedUserInfoSchema) {
    try {
      const response = await fetch("https://localhost:3001/getProfile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      setUserInfo(result);
      console.log();
    } catch (err: any) {
      throw new Error(
        "From front-end: " + err.message ? err.message : "Falha no fetch"
      );
    }
  }

  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(true);

  const [serverResponse, setServerResponse] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const editedUserInfoSchema = z.object({
    username: z.string().min(5, "Mínimo de 5 caracteres"),
    password: z.string().min(6, "Mínimo de 6 caracteres"),
  });

  type EditedUserInfoSchema = z.infer<typeof editedUserInfoSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditedUserInfoSchema>({
    resolver: zodResolver(editedUserInfoSchema),
  });

  useEffect(() => {}, []);

  return (
    <div className={styles.MainDivProfile}>
      <h2>Meu perfil</h2>

      <div className={styles.Infos}>
        <div className={styles.Email}>
          <h3>Email:</h3>
          <h3>teste@gmail.com</h3>
        </div>

        <form onSubmit={handleSubmit(handleSend)}>
          <div className={styles.Name}>
            <h3>Nome:</h3>
            <input
              type="text"
              className={styles.input}
              disabled={isEditModeOn}
              id="username"
              {...register("username")}
              min={5}
            />
          </div>
          {errors.username && <span>{errors.username.message}</span>}

          <div className={styles.Password}>
            <h3>Senha Atual:</h3>

            <input
              type="password"
              className={styles.input}
              disabled={isEditModeOn}
              id="password"
              {...register("password")}
              min={6}
            />
          </div>
          {errors.password && <span>{errors.password.message}</span>}

          {isEditModeOn || (
            <>
              <div className={styles.NewPasssword}>
                <h3>Nova senha: </h3>

                <input className={styles.input} type="password" />
              </div>

              <div className={styles.ConfirmNewPassword}>
                <h3>Confirmar nova senha: </h3>

                <input className={styles.input} type="password" />
              </div>
            </>
          )}

          <div className={styles.Buttons}>
            <button
              className={`styles.Button ${!isEditModeOn && styles.disabled}`}
              disabled={!isEditModeOn}
              onClick={handleChangeEditMode}
            >
              Editar
            </button>
            <button
              className={`styles.Button ${isEditModeOn && styles.disabled}`}
              disabled={isEditModeOn}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
