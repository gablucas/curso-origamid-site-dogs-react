import React from 'react';
import Image from '../Helper/Image';
import styles from './FeedPhotosItem.module.css';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {

  // Quando clicado na imagem, envia os dados da foto (dado passado no map das fotos) para o componente de modal para exibir informações detalhas da foto clicada
  function handleClick() {
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualization}>{photo.acessos}</span>
    </li>
  )
}

export default FeedPhotosItem