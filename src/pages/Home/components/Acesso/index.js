import React, {useState} from "react";
import styled from "@emotion/styled";

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
                    ? (<h2>Login</h2>)
                        : (<h2>Cadastro</h2>)
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
`;

const SessionAcesso = styled.section`
  order: 1;
  flex: 1;
  background-color: blueviolet;
`;


export default Page;
