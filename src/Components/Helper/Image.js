import React from 'react';
import styles from './Image.module.css';

// EXIBE O ESQUELETO DA IMAGEM ENQUANTO A MESMA ESTA CARREGANDO

// O alt é passado direto pois caso contrario, o Eslint acusa que não há o atributo alt 
export const Image = ({alt, ...props}) => {
  const [skeleton, setSkeleton] = React.useState(true)

  // Quando a imagem é totalmente carregada, desativa o esqueleto e exibe a imagem (funcao executada no evento onLoad)
  function handleLoad({ target }) {
    setSkeleton(false)
    target.style.opacity = 1;
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  )
}

export default Image;
