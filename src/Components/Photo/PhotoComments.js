import React from 'react';
import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';
 
const PhotoComments = (props) => {
  
  const [comments, setComments] = React.useState(() => props.comments) // Este estado recebe os comentarios que ja foram feitos na imagem
  
  const { login } = React.useContext(UserContext);
  
  // Faz com que o scroll sempre esteja no final dos comentarios
  const commentsSection = React.useRef(null);
  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments])

  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${props.single ? styles.single : ''}`}>
        {/* Faz um map mostrando todos os comentarios feitos na imagem */}
        {comments.map((comment) => (
        <li key={comment.comment_id}>
          <b>{comment.comment_author}: </b>
          <span>{comment.comment_content}</span>
        </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm single={props.single} id={props.id} setComments={setComments} />} {/* Só libera o campo de comentario se o usuario estiver logado */}
    </>
  )
}

export default PhotoComments