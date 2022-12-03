import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../Firebase/FirebaseConfig';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if(password.length > 5 && email !=='') {
        setBtn(true)
      } else if (btn) {
        setBtn(false)
      }
  }, [password, email, btn])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      setEmail('');
      setPassword('');
      navigate("/welcome" , {replace: true})
    })
    .catch(error => {
      setError(error);
      setEmail('');
      setPassword('');
    })
  }

  const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>

            <div className='formBoxLeftLogin'>
            </div>

            <div className='formBoxRight'>
              <div className='formContent'>

              <h2>Connexion</h2>
                {errorMsg}
                <form onSubmit={handleSubmit}>
                <div className='inputBox'>
                    <input onChange={e => setEmail(e.target.value)} type="email" value={email} autoComplete='off' required />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className='inputBox'>
                    <input onChange={e => setPassword(e.target.value)}type="password" value={password} autoComplete='off' required />
                    <label htmlFor="password">Mot de passe</label>
                  </div>

                  {
                    <button disabled={btn ? false: true}>Connexion</button> 
                  }

                </form>

                <div className='linkConaiter'>
                  <Link className='simpleLink' to="/signup"> Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant ! </Link>
                    <br />

                    <Link className='simpleLink' to="/forgetpassword"> Vous avez oublié votre mot de passe ? </Link>
                </div>

              </div>
           </div>
        </div>
    </div>
  )
}

export default Login