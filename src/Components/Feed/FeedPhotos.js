import React from 'react';
import { PHOTOS_GET } from '../../api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import useFetch from '../../Hooks/useFetch';
import FeedPhotosItem from './FeedPhotosItem';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ user, page, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();
  console.log(data)

  // Pega as fotos que o usuario logado postou e as exibe no feed do mesmo
  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6; // Quantidade total de imagens carregadas
      const {url, options} = PHOTOS_GET({ page, total, user }); // Faz a requisição solicitando o numero da pagina, o total de imagens e o de qual usuario
      const { response, json } = await request(url, options);
      if(response && response.ok && json.length < total) setInfinite(false);
    }
    
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if(error) return <Error error={error} />
  if(loading) return <Loading />
  if(data)
  return (
    <ul className={`${styles.feed} animeleft`}>
      {data.map((photo) => (
        <FeedPhotosItem key={photo.id} photo={photo} setModalPhoto={setModalPhoto} />
      ))}
    </ul>
  )
}

export default FeedPhotos;