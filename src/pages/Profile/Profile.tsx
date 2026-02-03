import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteProfileButton from "../../components/DeleteUserButton/DeleteUserButton";

export function Profile() {
  function handleChangeEditMode() {
    setUserInfo({
      username: "",
      password: "",
      email: userInfo!.email,
    });
    setIsEditModeOn(true);
  }

  async function getProfileInfo() {
    try {
      const response = await fetch("https://localhost:3001/getProfile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.json();
        setServerResponse(errorText.message);
        return;
      }

      const result = await response.json();
      setUserInfo({
        username: result.username,
        email: result.email,
        password: "°°°°°°",
      });
    } catch (err: any) {
      setServerResponse(err.message || "Falha no fetch");
      throw new Error("From front-end: " + err.message || "Falha no fetch");
    }
  }

  async function handleUpdateProfileInfos(data: EditedUserInfoSchema) {
    try {
      const response = await fetch("https://localhost:3001/editProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          currentPassword: data.currentPassword,
          newPassword: data.confirmNewPassword,
        }),
        credentials: "include",
      });

      const result = await response.json();
      setResponseFromServerAfterUpdate({
        message: result.message,
        messageColor: response.ok ? "GREEN" : "RED",
      });
      await getProfileInfo();
    } catch (err: any) {
      setResponseFromServerAfterUpdate({
        message: `Erro: ${err.message}`,
        messageColor: "RED",
      });
      throw err;
    }
  }

  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);

  const [serverResponse, setServerResponse] = useState<string>("");
  const [responseFromServerAfterUpdate, setResponseFromServerAfterUpdate] =
    useState<{ message: string; messageColor: "RED" | "GREEN" }>({
      message: "",
      messageColor: "RED",
    });
  const [userInfo, setUserInfo] = useState<{
    username: string;
    email: string;
    password: string;
  } | null>(null);

  const editedUserInfoSchema = z
    .object({
      username: z.string().min(5, "Mínimo de 5 caracteres"),
      currentPassword: z.string().min(6, "Mínimo de 6 caracteres"),
      newPassword: z.string().min(6, "Mínimo de 6 caracteres"),
      confirmNewPassword: z.string().min(6, "Mínimo de 6 caracteres"),
    })
    .refine((data) => data.confirmNewPassword === data.newPassword, {
      message: "As senhas não coincidem",
      path: ["confirmNewPassword"],
    });

  type EditedUserInfoSchema = z.infer<typeof editedUserInfoSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditedUserInfoSchema>({
    resolver: zodResolver(editedUserInfoSchema),
  });

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div className={styles.MainDivProfile}>
      {serverResponse == "" ? (
        <>
          <h2>Meu perfil</h2>

          <div className={styles.Infos}>
            <div className={styles.Email}>
              <h3>Email:</h3>
              <h3>{userInfo?.email}</h3>
            </div>

            <form onSubmit={handleSubmit(handleUpdateProfileInfos)}>
              <div className={styles.Name}>
                <h3>Nome:</h3>
                <input
                  type="text"
                  className={styles.input}
                  disabled={!isEditModeOn}
                  id="username"
                  {...register("username")}
                  min={5}
                  placeholder={userInfo?.username}
                />
              </div>
              <span className={styles.errors}>
                {errors.username && <span>{errors.username.message}</span>}
              </span>

              <div className={styles.Password}>
                <h3>Senha Atual:</h3>

                <input
                  type="password"
                  className={styles.input}
                  disabled={!isEditModeOn}
                  id="password"
                  placeholder={userInfo?.password}
                  min={6}
                  {...register("currentPassword")}
                />
              </div>

              {isEditModeOn && (
                <>
                  <div className={styles.NewPasssword}>
                    <h3>Nova senha: </h3>

                    <input
                      className={styles.input}
                      type="password"
                      id="newPassword"
                      disabled={!isEditModeOn}
                      {...register("newPassword")}
                    />
                  </div>
                  <span className={styles.errors}>
                    {errors.newPassword && errors.newPassword.message}
                  </span>

                  <div className={styles.ConfirmNewPassword}>
                    <h3>Confirmar nova senha: </h3>

                    <input
                      className={styles.input}
                      type="password"
                      id="confirmNewPassword"
                      disabled={!isEditModeOn}
                      {...register("confirmNewPassword")}
                    />
                  </div>
                  <span className={styles.errors}>
                    {errors.confirmNewPassword &&
                      errors.confirmNewPassword.message}
                  </span>
                </>
              )}

              <div className={styles.ButtonsAndResponse}>
                <div className={styles.Buttons}>
                  <button
                    className={`styles.Button ${
                      isEditModeOn && styles.disabled
                    }`}
                    disabled={isEditModeOn}
                    onClick={handleChangeEditMode}
                  >
                    Editar
                  </button>
                  <button
                    className={`styles.Button ${
                      !isEditModeOn && styles.disabled
                    }`}
                    disabled={!isEditModeOn}
                  >
                    Salvar
                  </button>

                  <DeleteProfileButton/>
                </div>
                <h4
                  className={styles[responseFromServerAfterUpdate.messageColor]}
                >
                  {responseFromServerAfterUpdate.message}
                </h4>
              </div>
            </form>
          </div>
        </>
      ) : (
        <span>{serverResponse}</span>
      )}
    </div>
  );
}
