import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {ReactComponent as MinhasFotos} from '../../Assets/feed.svg'
import {ReactComponent as Estatisticas} from '../../Assets/estatisticas.svg'
import {ReactComponent as AdicionarFotos} from '../../Assets/adicionar.svg'
import {ReactComponent as Sair} from '../../Assets/sair.svg'
import styles from './UserHeaderNav.module.css'
import { useState } from 'react';
import useMedia from '../../Hooks/useMedia';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/user';

const UserHeaderNav = () => {
  const dispatch = useDispatch();
  const mobile = useMedia('(max-width:40rem)');
  const [mobileMenu, setMobileMenu] = useState(false); 

  

  const {pathname} = useLocation();
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname])

  return (
    <>
    {mobile && <button aria-label="Menu" className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={() => setMobileMenu(!mobileMenu)}></button>}
    <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
      <NavLink to="/conta" end>
        <MinhasFotos />
        {mobile && 'Minhas Fotos'}
      </NavLink>

      <NavLink to="/conta/estatisticas">
        <Estatisticas /> 
        {mobile && 'Estatísticas'}
      </NavLink>

      <NavLink to="/conta/postar">
        <AdicionarFotos/>
        {mobile && 'Adicionar Fotos'}
      </NavLink>

      <button onClick={() => dispatch(userLogout())}>
        <Sair/>
        {mobile && 'Sair'}        
        </button>
    </nav>
    </>
  )
}

export default UserHeaderNav