import React from 'react'
import UserHeaderNav from './UserHeaderNav';
import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
  const [title, setTitle] = React.useState(''); // Estado para alterar o titulo da pagina de conta do usuario
  const location = useLocation(); // Hook para pegar em qual pagina está o usuario e tambem atulizar o useEffect a cada mudança que houver

  React.useEffect(() => {
    const { pathname } = location; // Desestruturando o caminho da página

    switch(pathname) {
      case '/conta/postart':
        setTitle('Poste Sua Foto');
        break;
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha Conta');
    }
  }, [location])

  return (
    <header className={styles.header}>
      <h1 className='title'>{title}</h1>
      <UserHeaderNav />
    </header>
  )
}

export default UserHeader