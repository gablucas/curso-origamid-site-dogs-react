import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import PhotoComments from './PhotoComments';
import styles from './PhotoContent.module.css';
import PhotoDelete from './PhotoDelete';
import Image from '../Helper/Image';

const PhotoContent = ({ single, data }) => {

  const user = React.useContext(UserContext);

  // Desestrutura os dados e os comentarios das fotos
   const {photo, comments} = data;
  
  return (
    // Conteudo do modal
    <div className={`${styles.photo} ${single ? styles.single : ''}`}> {/* O single é quando a imagem é aberta em uma pagina propria ao inves do modal */}
      {/* Imagem */}
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title}/>
        </div>

      {/* Detalhes da postagem */}
      <div className={styles.details}>

        <div>
        {/* Dados do autor */}
          <p className={styles.author}> 
            {user.data && user.data.username === photo.author ? (<PhotoDelete id={photo.id} />) : (<Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>)}
            <span className={styles.vizualization}>{photo.acessos}</span>
          </p>

          {/* Título da imagem */}
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>

          {/* Atributos do cachorro */}
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>

      {/* Campo de comentarios */}
      <PhotoComments single={single} id={photo.id} comments={comments} />
    </div>
  )
}

export default PhotoContent