import React, {useState} from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, user} from '../Firebase/FirebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { setDoc } from 'firebase/firestore';

const Signup = () => {

  const navigate = useNavigate();

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmpassword: ''
  }

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const { email, password} = loginData;
    createUserWithEmailAndPassword(auth, email, password)
    .then(authUser => {
      return setDoc(user(authUser.user.uid), {
         pseudo,
         email
      })
    })
    .then(() => {
      setLoginData({...data})
      navigate("/welcome")
    })
    .catch(error => {
      setError(error);
      setLoginData({...data})
    })
  }

  const {pseudo, email,password, confirmpassword} = loginData;

  const btn = pseudo === '' || email === '' || password === '' || password !==  confirmpassword ?
  <button disabled>Inscription</button> : <button>Inscription</button> ;


// gestion des erreurs 

const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
           <div className='formBoxLeftSignup'>
           </div>
           <div className='formBoxRight'>
              <div className='formContent'>
              <h2>Inscription</h2>
                {errorMsg}
                <form onSubmit={handleSubmit}>
                  <div className='inputBox'>
                    <input onChange={handleChange} type="text" value={pseudo} id='pseudo' autoComplete='off' required />
                    <label htmlFor="pseudo">Pseudo</label>
                  </div>

                  <div className='inputBox'>
                    <input onChange={handleChange} type="email" value={email} id='email' autoComplete='off' required />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className='inputBox'>
                    <input onChange={handleChange} type="password" value={password} id='password' autoComplete='off' required />
                    <label htmlFor="password">Mot de passe</label>
                  </div>

                  <div className='inputBox'>
                    <input onChange={handleChange} type="password" value={confirmpassword} id='confirmpassword' autoComplete='off' required />
                    <label htmlFor="confirmpassword"> Confirmer votre mot de passe</label>
                  </div>
                  {btn}
                </form>
                <div className='linkConaiter'>
                  <Link className='simpleLink' to="/login"> Déjà inscrit ? Connectez-vous</Link>
                </div>
              </div>
           </div>
        </div>
    </div>
  )
}

export default Signup