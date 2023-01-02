import React, {useRef, useEffect, useState} from 'react'
import {  Link } from "react-router-dom";

const Landing = () => {


    const [btn, setBtn] = useState(false);

    const refWolvenire = useRef(null);
    // console.log(refWolvenire )

    useEffect(() => {
        refWolvenire.current.classList.add('startingImg');

        setTimeout(() => {
            refWolvenire.current.classList.remove('startingImg');
            setBtn(true);
        }, 3000)
    }, [])


    const setLeftImg = () => {
        refWolvenire.current.classList.add('leftImg');
    }

    const setRightImg = () => {
        refWolvenire.current.classList.add('rightImg');
    }

    const clearImg = () => {
        refWolvenire.current.classList.remove('leftImg');
        refWolvenire.current.classList.remove('rightImg');
    }


   const displayBtn =  btn && (

        <>
            <div className='leftBox'  onMouseOver={setLeftImg} onMouseOut={clearImg}>
                <Link className='btn-welcome' to="/signup">Inscription</Link>
            </div>

            <div className='rightBox' onMouseOver={setRightImg} onMouseOut={clearImg}>
                <Link className='btn-welcome' to="/login">Connexion</Link>
            </div>
        </>
    )


    
    
  return (
    <main ref={refWolvenire} className='welcomePage'>

        {displayBtn}

    </main>

  )
}

export default Landing