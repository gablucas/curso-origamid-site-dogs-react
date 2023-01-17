import React from 'react';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import styles from './FeedModal.module.css';

const FeedModal = ({ photo, setModalPhoto }) => {
  const {data, error, loading, request} = useFetch();

  // Recebe o estado com nome de 'photo' que possui os dados da imagem que o usuario clicou, e usa o id dessa imagem para fazer um fetch das informações da imagem (autor, vizualizações, comentarios) e desse fetch envia os dados (data) para o componente 'PhotoContent'
  React.useEffect(() => {
    const {url, options} = PHOTO_GET(photo.id);
    request(url, options)
  }, [photo, request]);

  // Fecha o modal quando o usuario clica fora do mesmo
  function handleOutsideClick(event) {
    if(event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && (<Error error={error} />)}
      {loading && (<Loading />)}
      {data && <PhotoContent data={data} />}
      
    </div>
  )
}

export default FeedModal