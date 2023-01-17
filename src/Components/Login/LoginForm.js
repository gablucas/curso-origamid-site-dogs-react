import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css'; // Pode-se usar o estilo de botao para aplicar em outros tipos de elementos
import Head from '../Helper/Head';


const LoginForm = () => {
  // Cria objetos para desestruturar no input e para validar na hora do envio do formulario
  const username = useForm();
  const password = useForm();

  // Usa o UserLogin para fazer o login do usuario
  // Usa o error pra exibir se houve algum erro no login do usuario
  // Usa o loading para alterar o botao entrar quando o usuario clica
  const { userLogin, error, loading } = React.useContext(UserContext)

  // Previne o evento padrão
  // Valida os campos de input e envia os dados para o servidor para acessar a conta do usuario
  async function handleSubmit(event) {
    event.preventDefault();

    if(username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <section className='animeLeft'>
      <Head title='Login' />
      <h1 className='title'>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label='Usuário' type='text' name='username' {...username} />
        <Input label='Senha' type='password' name='password' {...password} />
        {loading ? (<Button disabled>Carregando...</Button>) : (<Button>Entrar</Button>)}
        <Error error={error && "Dados incorretos."} />
      </form>

      <Link className={styles.perdeu} to='/login/perdeu'>Perdeu a Senha?</Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
      </div>
      <Link className={stylesBtn.button} to='/login/criar'>Cadastro</Link>
    </section>
  )
}

export default LoginForm