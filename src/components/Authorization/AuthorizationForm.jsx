import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 45vh;
    justify-content: space-around;
    border: 1px solid black;
    background-color: white;
    width: 60%;
    border-radius: 8px;
  `

  const DivInForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
  `

  const Label = styled.label`
    margin: 5px;
  `

  const Input = styled.input`
    height: 38px;
    border-radius: 8px;
    border: 1px solid black;
  `

const AuthorizationForm = () => {
  const navigate = useNavigate()

  const Add = async (login, password) => {
    await axios.post('http://localhost/auth/jwt/create/', {
      username: login,
      password: password,
    }).then((res) => {
      console.log('res', res)
        localStorage.setItem('jwtToken', res.data.access)
        document.cookie = `jwtToken=${res.data.refresh}`
        /*setOpen({ bool: true, message: 'авторизация прошла успешно', sev: 'success' });*/
        navigate('/MainPage')
      }).finally(console.log(login, password))

    await axios.post('http://localhost/accounts/').then((res) => {
      console.log('uid?', res)
    })

  }

  const changeSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
		const password = formData.get("Password")
    const login = formData.get("login")

    Add(login, password)  
  };

  
  
  return (<>
      <Form onSubmit={changeSubmit}>
        <DivInForm>
          <Label >Login:</Label>
            <Input 
              id="login" 
              placeholder='Login'
              autoComplete="off"
              required
              name="login"
              minLength="1"
              title="Введите не менее шести символов"
            />
        </DivInForm>

        <DivInForm>
          <Label >Password:</Label>
            <Input
              name="Password"
              type='password'
              placeholder='Password'
              autoComplete="off"
              required
              minLength="1"
              title="Пароль должен содержать латинские буквы и хотя бы одну цифру"
            />
        </DivInForm>
        <div>
          <button>Авторизоваться</button>
        </div>
        <div>
          <Link to='/registration'>
            <div>Зарегистрироваться</div>
          </Link>
        </div>
      </Form>
  </>);
};

export default AuthorizationForm