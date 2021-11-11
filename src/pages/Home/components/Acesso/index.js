import React from "react";
import styled from "@emotion/styled";

const Page = () => {

    return(
        <Container>
            <SessionMsg>
                <span>Msg descritiva sistema</span>
            </SessionMsg>
            <SessionAcesso>
                <h2>Login/Cadastro</h2>
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
