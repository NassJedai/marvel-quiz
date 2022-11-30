import React, {useState} from 'react'
import Logout from '../Logout'
import Quiz from '../Quiz'

const Welcome = () => {

  const [userSession, setuserSession] = useState(null);
   
  
  return userSession === null ? 

    (
      <>
        <div className='loader'></div>
      </>
    ) 
  
  : 
    (
    <div className='quiz-bg'>
        <div className='container'>
            <Logout/>
            <Quiz/>
        </div>
    </div>
  )

}

export default Welcome