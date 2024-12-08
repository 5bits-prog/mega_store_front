import style from "./opciones.module.css";
const OpcionesEstadisticas: React.FC = () => {
    return(
        <div className={style.container}>
            <button className={style.buttons}>VENTAS POR MES</button>
            <button className={style.buttons}>CLIENTES</button>

        </div>

    );

};
export default OpcionesEstadisticas;