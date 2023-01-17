import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {

  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia('(max-width: 40rem'); // Altera para o menu mobile se o tamanho da tela corresponder ao argumento passado
  const [mobileMenu, setMobileMenu] = React.useState(false); // Abre ou fecha o menu mobile

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  // ${mobile ? styles.navMobile : styles.nav} - Define se o estilo será o modo desktop ou mobile
  // ${mobileMenu && styles.navMobileActive} - Se o botao do menu mobile for true, exibe o menu com as opções

  return (
    <>
      {mobile && (<button className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} aria-label='Menu' onClick={() => setMobileMenu(!mobileMenu)}></button>)}

      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to='/conta' end> <MinhasFotos /> {mobile && 'Minhas Fotos'}</NavLink>
        <NavLink to='/conta/estatisticas'><Estatisticas />  {mobile && 'Estatisticas'}</NavLink>
        <NavLink to='/conta/postar'> <AdicionarFoto /> {mobile && 'Adicionar Foto'}</NavLink>
        <button onClick={userLogout}> <Sair /> {mobile && 'Sair'}</button>
      </nav>
    </>
  )
}

export default UserHeaderNav