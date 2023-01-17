import React from 'react';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import {ReactComponent as Enviar} from '../../Assets/enviar.svg';
import { COMMENT_POST } from '../../api';
import styles from './PhotoCommentsForm.module.css';

// CAMPO DE MENSAGEM DO POST

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const {request, error} = useFetch();
  const [comment, setComment] = React.useState('')

  // Enviado o texto do formulário para o servidor
  async function handleSubmit(event) {
    event.preventDefault();
    const {url, options} = COMMENT_POST(id, {comment});
    const {response, json} = await request(url, options);
    if (response.ok) {
      // Esse estado é deste proprio componente
      setComment('');
      // Esse estado vem como uma prop do componente 'PhotoComments', nele é espalhado dentro de uma array, todos objetos de cada comentario junto com o objeto do comentario feito nesse envio (que está no json do fetch realizado), assim é possível mostrar o comentario na tela sem recarregar a página
      setComments((comments) => [...comments, json])
    }
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea className={styles.textarea} id='comment' name='commenta' placeholder='Comente...' value={comment} onChange={({ target }) => setComment(target.value)} />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm