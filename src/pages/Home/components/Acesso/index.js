import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";

import Media from '../../../../infra/constants/mediaBreackPoint'
import bgMsg from '../../../../../public/img/wb1.webp'
import bgAcesso from '../../../../../public/img/touro.webp'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import PropTypes from "prop-types";
import {Typography} from "@mui/material";

const acoes = {
    1: 'LOGIN',
    2: 'CADASTRO'
};


const Page = ({onAcessSuccess}) => {

    const [acao, setAcao] = useState(acoes["1"])

    useEffect(() => {}, [acao]);

    return(
        <Container>
            <SessionMsg>
                <Typography variant="h4" style={{fontFamily: 'cursive'}} gutterBottom component="div">
                    Regra nº1 nunca perca dinheiro.
                    <br/>
                    Regra nº2 nunca esqueça a regra nº1
                </Typography>
            </SessionMsg>
            <SessionAcesso>
                {
                    acao === 'LOGIN'
                    ? (<Login trocarAcao={() => setAcao(acoes["2"])}
                              onAcessSuccess={onAcessSuccess}
                        />)
                        : (<Cadastro trocarAcao={() => setAcao(acoes["1"])}
                                     onAcessSuccess={onAcessSuccess}
                        />)
                }
            </SessionAcesso>
        </Container>
    );

};

Page.propTypes = {
    onAcessSuccess: PropTypes.func,
};

Page.defaultProps = {
    onAcessSuccess: () => {},
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const SessionMsg = styled.section`
  order: 0;
  flex: 1;
  background-image: url(${bgMsg});
  background-position: center; //centraliza imagem
  background-size: cover; //imagem cobre toda área do div
  opacity: 0.75;
  z-index: 1;
  @media (max-width: ${Media.Mobile}) {
    display: none;
  }
`;

const SessionAcesso = styled.section`
  order: 1;
  flex: 1;
  background-image: url(${bgAcesso});
  background-position: center; //centraliza imagem
  background-size: cover; //imagem cobre toda área do div
  //opacity: 0.75;
  padding-top: 20px;
  padding-bottom: 20px;
`;


export default Page;
