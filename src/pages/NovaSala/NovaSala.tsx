import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ilustracaoImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import "../../styles/auth.scss";

import { Button } from "../../components/Button/Buttons";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";

export function NovaSala() {
  const { user } =  useAuth();
  const history = useHistory()
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    console.log(newRoom)

    if(newRoom.trim() === ""){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/sala/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => {
                setNewRoom(event.target.value);
              }}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
