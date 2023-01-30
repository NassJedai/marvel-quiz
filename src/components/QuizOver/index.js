import React from 'react';
import { useEffect, useState } from 'react';

const QuizOver = React.forwardRef ((props, ref) => {

  const {
      levelNames,
      score,
      maxQuestions,
      quizLevel,
      percent,
      loadLevelQuestions
    } = props;

  const [asked, setAsked] = useState([]); 
  //console.log(asked);
 
  useEffect(() => {
    setAsked(ref.current)
  }, [ref])


  const decision = score >= maxQuestions / 2 ? 
    (   
      <>
      <div className="stepBtnContainer">
        {
          quizLevel <levelNames.length ?
          (
            <>
              <p className='successMsg'>Bravo, passez au niveau suivant</p>
              <button className='btnResult success'
                      onClick={() => loadLevelQuestions(quizLevel)}>
                        Niveau Suivant
              </button>
            </>
          )
          :
          (
            <>
              <p className='successMsg'>Bravo, vous êtes un expert</p>
              <button 
                className='btnResult gameOver'
                onClick={() => loadLevelQuestions(0)}>
                Accueil
              </button>
            </>
          )
        }
        </div>

        <div className="percentage">
          <div className='progressPercent'>Réussite: {percent}%</div>
          <div className="progressPercent">Note {score}/{maxQuestions}</div>
        </div>
      </>

    )

    :

    (
      <>
        <div className="stepBtnContainer">
          <p className='failureMsg'>Vous avez échoué ! </p>
        </div>

        <div className="percentage">
          <div className='progressPercent'>Réussite: {percent}%</div>
          <div className="progressPercent">Note {score}/{maxQuestions}</div>
        </div>
      </>

    )


 const questionAnswer = score >= maxQuestions / 2 ? 
 (
    asked.map(question => {
      return (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td>
            <button className='btnInfo'>Info</button>
          </td>
        </tr>
      )
    })
)

  :
(
  <tr>
    <td colSpan={"3"}>
      <p style={{textAlign:'center', color:'red'}}>
        Pas de réponses !
      </p>
    </td>
  </tr>
)
  

  return (
    <>

      {decision}

      <hr />

      <p>Les réponses aux questions posées : </p>

      <div className='answerContainer'>

        <table className='answers'>
          <thead>
            <tr>
              <th>Questions</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody> 
             {questionAnswer}
          </tbody>
        </table>


      </div>
    </>
  )
})

export default React.memo(QuizOver)