import React, {useState, useEffect} from 'react';
import Logout from '../Logout';
import Quiz from '../Quiz';
import { auth, user} from '../Firebase/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const navigate = useNavigate();
  const [userSession, setuserSession] = useState(null);
  const [userData, setUserData] = useState({});
   
  useEffect(() => {
   const listener =  onAuthStateChanged(auth, user => {
      user ? setuserSession(user) : navigate('/')
    })

    if(!!userSession) {

      const colRef =   user(userSession.uid);

      getDoc(colRef)
      .then(snapshot => {
        if(snapshot.exists()) {
         const docdata =  snapshot.data(); // objet
         console.log(docdata);
         console.log(snapshot.id)
         setUserData(docdata);
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
    return listener();
  }, [userSession])
  
  
  return userSession === null ? 

    (
      <>
        <div className='loader'></div>
        <p className='loaderText'> Loading ...</p>
      </>
    ) 
  
  : 
    (
    <div className='quiz-bg'>
        <div className='container'>
            <Logout/>
            <Quiz userData={userData}/>
        </div>
    </div>
  )

}

export default Welcome