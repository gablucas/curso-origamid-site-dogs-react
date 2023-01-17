import React from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext'


// Se acessar a pagina de conta com o usuario deslogado, o ProtectedRoute vai redirecionar automaticamente o usuario para a pagina de login, não permitindo que o mesmo acessa a pagina de conta
const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);
  return login ? children : <Navigate to='/login' />;
  
}

export default ProtectedRoute