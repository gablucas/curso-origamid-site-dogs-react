import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';
 
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate(); // Permite redirecionar o usuario para outra pagina

  // Pega o token gerado na função userLogin e envia para a API para finalizar o login
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options)
    const json = await response.json();
    setData(json); // Passa os dados do usuario para o setData
    setLogin(true);
  }

  // Pega o usuario e senha envia para api, retorna o token e envia para a função getUser
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({username, password});
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
    
  }

  // Faz o logout o usuario
  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
    navigate('/login'); // Redireciona para a pagina de conta assim que o usuario é deslogado
  }, [navigate]);

  // Se houver um token salvo no localStorage, é feito a validação do mesmo e depois logado o usuario
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const {url, options} = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if(!response.ok) throw new Error('Token Invalido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
      }
    }
  } 
    autoLogin();
  }, [userLogout])

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
      {children}
    </UserContext.Provider>
  )
}

