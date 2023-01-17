import React from 'react'

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);
  
  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }

    // Faz a verificação do tamanho da tela antes do usuario alterar o tamanho da mesma
    changeMatch();

    window.addEventListener('resize', changeMatch);

    // Sempre remove o evento quando um novo é adicionado
    return () => {
      window.removeEventListener('resize', changeMatch)
    }

  }, [media])

  return match;
}

export default useMedia