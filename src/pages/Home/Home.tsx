import { FormEvent, useState } from "react";
import { useHistory } from "react-router";

import ilustracaoImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button/Buttons";
import "../../styles/auth.scss";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

export function Home() {
  const [roomCode, setRoomCode] = useState("");
  const history = useHistory();

  const { user, signInWIthGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWIthGoogle();
    }
    history.push("/sala/nova");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Sala não existe");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("A sala foi finalizada.");
      return;
    }
    history.push(`/sala/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustracaoImg} alt="Ilustração" />
        <strong>Crie salas de perguntas ao vivo</strong>
        <p>Tere as dúvidas em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <button className="criar-sala" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie uma sala com o Google
          </button>
          <div className="separador">ou entre em uma sala</div>
          <form
            onSubmit={(event) => {
              handleJoinRoom(event);
            }}
          >
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => {
                setRoomCode(event.target.value);
              }}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
