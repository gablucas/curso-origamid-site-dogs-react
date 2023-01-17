import React from 'react'
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_RESET } from '../../api';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';


const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const {error, loading, request} = useFetch();
  const password = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const login = params.get('login');
    const key = params.get('key');

    if (login) setLogin(login);
    if (key) setKey(key);
  }, [])
  
  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = PASSWORD_RESET({login, key, password: password.value});
    const { response } = await request(url, options)
    if (response.ok) navigate('/login');
  }

  return (
    <section className='animeLeft'>
      <Head title='Resete a senha' />
      <h1 className='title'>Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label='Nova Senha' type='password' name='password' {...password} />
        {loading ? (<Button disabled>Resetando...</Button>) : (<Button>Resetar</Button>)}
        <Error error={error} />
      </form>
    </section>
  )
}

export default LoginPasswordReset