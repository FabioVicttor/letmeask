import copyImg from "../../assets/images/copy.svg";
import "./codigosala.scss";

type RoomCodeProps = {
  code: string;
};

export function CodigoSala(props: RoomCodeProps) {

  function copiarCodigoSalaToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copiarCodigoSalaToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar codigo da sala" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
