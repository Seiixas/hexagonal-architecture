import {
  StyledSignInContainer,
  StyledSignInLeft,
  StyledSignInRight,
} from "./signin.styles";

import signInImage from "../../assets/images/signin.png";
import hublocalImage from "../../assets/images/hublocal.png";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { useState } from "react";
import { api } from "../../api/api";
import { useSnackbar } from "notistack";
import { authenticateUserService } from "../../services/users/authenticate-user.service";
import { createUserService } from "../../services/users/create-user.service";

export function SignIn() {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [shouldSignUp, setShouldSignUp] = useState(false);

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!shouldSignUp) {
      return await authenticateUserService({
        data: { email, password },
        feedbackMessage: enqueueSnackbar,
      });
    }

    if (password !== repeatPassword) {
      return enqueueSnackbar("As senhas não conferem.", {
        variant: "error",
      });
    }

    return await createUserService({
      data: { name, email, password },
      feedbackMessage: enqueueSnackbar,
    });
  }

  function handleSwitchToSignUp() {
    setShouldSignUp((prev) => !prev);
    resetForm();
  }

  function resetForm() {
    setName("");
    setPassword("");
    setRepeatPassword("");
    setEmail("");
  }

  return (
    <StyledSignInContainer>
      <StyledSignInLeft>
        <img
          src={signInImage}
          alt="Homem branco de casa verde e uma blusa branca, segurando um tablet. Ao redor, vários ícones de redes sociais."
        />
        <article>
          <header>
            <h2>Junte-se a vários clientes satisfeitos.</h2>
          </header>
          <p>
            Cliente HubLocal ganha mais relevância, autoridade e visibilidade.
            Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!
          </p>
        </article>
      </StyledSignInLeft>
      <StyledSignInRight>
        <img
          src={hublocalImage}
          alt="Logo da empresa HubLocal escrito em azul, com detalhe em verde"
        />
        <form onSubmit={handleSignIn}>
          {shouldSignUp && (
            <>
              <label htmlFor="name">Nome</label>
              <Input onChange={(e) => setName(e.target.value)} id="name" />
            </>
          )}
          <label htmlFor="email">Email</label>
          <Input onChange={(e) => setEmail(e.target.value)} id="email" />
          <label htmlFor="password">Senha</label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
          {shouldSignUp && (
            <>
              <label htmlFor="repeat-password">Senha</label>
              <Input
                onChange={(e) => setRepeatPassword(e.target.value)}
                type="password"
                id="repeat-password"
              />
            </>
          )}
          <Button> {shouldSignUp ? "REGISTRAR" : "LOGIN"}</Button>
          <Button type="button" onClick={handleSwitchToSignUp} secondary={true}>
            {shouldSignUp ? "LOGAR" : "CRIAR CONTA"}
          </Button>
        </form>
      </StyledSignInRight>
    </StyledSignInContainer>
  );
}
