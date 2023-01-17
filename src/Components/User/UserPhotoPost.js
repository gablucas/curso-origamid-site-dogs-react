import React from 'react';
import styles from './UserPhotoPost.module.css';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { PHOTO_POST } from '../../api';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const {data, error, loading, request} = useFetch();
  const navigate = useNavigate();

  // Quando a foto for postada, o usuario sera redirecionado para a pagina principal
  React.useEffect(() => {
    if(data) navigate('/conta');
  }, [data, navigate])

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(); // Quando há uma imagem a ser enviada no formulario, deve-se usar o objeto FormData
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)
    formData.append('img', img.raw)

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token)


    const {response} = await request(url, options)
    console.log(response)
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]), // Usa javascript para criar uma URL da imagem enviada
      raw: target.files[0]
    });
  }

  // A imagem do preview é colocada como background pois é mais facil de manipula-la

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title='Poste sua foto' />
      <form onSubmit={handleSubmit}>
        <Input label='Nome' type='text' name='nome' {...nome} />
        <Input label='Peso' type='number' name='peso' {...peso} />
        <Input label='Idade' type='number' name='idade' {...idade} />
        <input className={styles.file} type='file' name='img' id='img' onChange={handleImgChange} />
        {loading ? (<Button disabled>Enviando...</Button>) : (<Button>Enviar</Button>)}
        <Error error={error}/>
      </form>
      <div>
        {img.preview && (<div className={styles.preview} style={{ backgroundImage: `url('${img.preview}')`}}></div>)}
      </div>
    </section>
  )
}

export default UserPhotoPost;