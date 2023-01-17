import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';

const Feed = ({ user }) => {
  // Esse estado pega os dados da imagem que o usuario clicou no feed (no componente 'FeedPhotos') e esse estado é passado para o componente 'FeedModal' que vai pegar o id do dado da imagem para buscar mais informações da mesma e exibi-las no modal. (autor, titulo, visualizações, comentarios)
  const [modalPhoto, setModalPhoto] = React.useState(null);

  // Esse estado atualiza a quantidade de imagens que vão aparecer no feed do usuario, os valores são adicionados neste estado pelo evento de scroll abaixo e com esse estado é feito um map adicionando os componentes do feed
  const [pages, setPages] = React.useState([1]);

  // Esse estado é utilizado para verificar a quantidade de paginas que existem no servidor, ele é enviado para o componente 'FeedPhotos' para fazer essa verificação, caso no fetch desse componente hajá menos imagens do que o padrão, significa que é a ultima pagina que possui imagens.
  const [infinite, setInfinite] = React.useState(true);

  // Mostra mais imagens pro usuario a medida que ele vai fazendo o scroll na página
  React.useEffect(() => {
    let wait = false; // Esta variavel é utilizada em um setTimeout para impedir que seja adicionado varios componentes ao mesmo tempo

    function infiniteScroll() {
      // Verifica se ainda há paginas para serem exibidas,
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight; // Diminui o tamanho do body da página pelo tamanho total da tela do site

        // Verifica se a distancia do scroll é maior que 75% da tela que não estava sendo mostrada e se a varial wait (tempo de espera até adicionad uma nova pagina) está falso, adiciona uma pagina a mais no estado 'setPages'
        if (scroll > height * .75 && !wait) {
          setPages(pages => [...pages, pages.length + 1]);

          // Impede que seja adicionado varios componentes ao mesmo tempo
          wait = true; 
          setTimeout(() => {
            wait = false;
          }, 500)
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);

    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    }
  }, [infinite])

  return (
    <div>
      {modalPhoto && <FeedModal setModalPhoto={setModalPhoto} photo={modalPhoto}/>}
      {pages.map(page => <FeedPhotos key={page} page={page} user={user} setModalPhoto={setModalPhoto} setInfinite={setInfinite} />)}
      
    </div>
  )
}

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
}

export default Feed