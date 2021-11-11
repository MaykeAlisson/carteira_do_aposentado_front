import React, {useState} from "react";
import styled from "@emotion/styled";

import Media from '../../../../infra/constants/mediaBreackPoint'
import Login from './components/Login'
import Cadastro from './components/Cadastro'

const acoes = {
    1: 'LOGIN',
    2: 'CADASTRO'
};


const Page = () => {

    const [acao, setAcao] = useState(acoes["1"])

    return(
        <Container>
            <SessionMsg>
                <span>Msg descritiva sistema</span>
            </SessionMsg>
            <SessionAcesso>
                {
                    acao === 'LOGIN'
                    ? (<Login/>)
                        : (<Cadastro/>)
                }
            </SessionAcesso>
        </Container>
    );

};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SessionMsg = styled.section`
  order: 0;
  flex: 1;
  background-color: red;
  @media (max-width: ${Media.Mobile}) {
    display: none;
  }
`;

const SessionAcesso = styled.section`
  order: 1;
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
`;


export default Page;
