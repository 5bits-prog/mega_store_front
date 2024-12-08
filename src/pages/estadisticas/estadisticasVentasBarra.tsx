import Grafico from "../../components/graficos/componenteGrafico";

const EstadisticasVentas: React.FC = () => {
    return(
        <Grafico labels={["Enero", "Febrero", "Marzo", "Abril", "Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]} data={[50,45,12,78,85,96,54,25,236,11,48,58]} title={["Ventas anuales"]} labelTitle={"Ventas del mes"}/>
    )
};

export default EstadisticasVentas;