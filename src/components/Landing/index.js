import React, {useRef, useEffect, useState} from 'react'

const Landing = () => {


    const [btn, setBtn] = useState(false);

    const refWolvenire = useRef(null);
    // console.log(refWolvenire )

    useEffect(() => {
        refWolvenire.current.classList.add('startingImg');

        setTimeout(() => {
            refWolvenire.current.classList.remove('startingImg');
            setBtn(true);
        }, 1000)
    }, [])


   const displayBtn =  btn && (

        <>
            <div className='leftBox'>
                <button className='btn-welcome'>Inscription</button>
            </div>

            <div className='rightBox'>
                <button className='btn-welcome'>Connexion</button>
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