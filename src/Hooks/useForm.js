import React from 'react'

// Objeto que contem os tipos de valores com seu regex e mensagem de erro
const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: 'A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 dígito. Com no mínino 8 caracteres.'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize apenas números'
  }
}

// Esse hook é desestruturado no input, passando todas as propriedades pro mesmo
const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  // Valida o valor do input
  // Primeiro ve se é preciso validar
  // Depois verifica se o valor do input está vazio
  // Depois verifica se existe o tipo de validador e se o valor do input corresponde ao regex
  function validate(value) {
    if(type === false) return true;
    if(value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  // Valida e salva o valor do input
  // Caso o usuario ja tenha errado no campo de input, será feito uma validação a cada mudança no input
  // Armazena o valor do input no estado
  function onChange({ target }) {
    if (error) validate(target.value)
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }
}

export default useForm