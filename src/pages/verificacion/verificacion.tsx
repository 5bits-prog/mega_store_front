import styled from 'styled-components';
import style from './verificacion.module.css';

// Definición del componente StyledWrapper
const StyledWrapper = styled.div`
    display: flex;
    gap: 8px;
`;
const CodigoVerificacion = () => {
    return (
        <StyledWrapper>
        <form className={style.verif}>
            <span className={style.mainHeading}>Código de verificación</span>
            <p className={style.otpSubheading}>Te enviamos un código de verificación al mail registrado.</p>
            <div className={style.inputContainer}>
                <input required maxLength={1} type="text" className={style.otpinput} id="otp-input1" />
                <input required maxLength={1} type="text" className={style.otpinput} id="otp-input2" />
                <input required maxLength={1} type="text" className={style.otpinput} id="otp-input3" />
                <input required maxLength={1} type="text" className={style.otpinput} id="otp-input4" /> 
                <input required maxLength={1} type="text" className={style.otpinput} id="otp-input5" /> 
                <input required maxLength={1} type="text" className={style.otpinput} id="otp-input6" /> 
            </div>
            <button className={style.verifyButton} type="submit">Verificar</button>
            <button className={style.exitBtn}>×</button>
            <p className={style.resendNote}>¿No recibiste el código? <button className="resendBtn">Reenviar Código</button></p>
        </form>
        </StyledWrapper>
    );
    }

export default CodigoVerificacion;


