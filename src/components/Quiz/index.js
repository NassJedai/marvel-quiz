import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import {QuizMarvel} from '../quizMarvel';
import QuizOver from '../QuizOver';

//toast.configure();

// Régler problème de toastify -> ne s'affiche pas 

class Quiz extends Component  {

  state = {
    levelNames: ['debutant', 'confirme', 'expert'],
    quizLevel : 0,
    maxQuestions : 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score : 0,
    showWelcomeMsg: false,
    quizEnd: false
  }

  storedDataRef =  React.createRef();

  loadQuestions = (level) => {
   const fetchedArrayQuiz =  QuizMarvel[0].quizz[level]
    if(fetchedArrayQuiz.length >= this.state.maxQuestions) {

      this.storedDataRef.current = fetchedArrayQuiz;
      
     const newArray =  fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)
     this.setState({
        storedQuestions: newArray
      })
    } else {
      console.log("pas assez de questions");
    }
  }

  showWelcomeMsg = (pseudo) => {
    if(!this.state.showWelcomeMsg) {

      this.setState({
        showWelcomeMsg: true
      })

      toast.warn(`Bienvenue ${pseudo}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }

  }

  componentDidMount() { 
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
   }
   

   // Si on est pas arrivé à la dernière question, on continue sinon on arrête 
   // On voit aussi si on à répondu de la bonne manière 
   nextQuestion = () => {
     if(this.state.idQuestion === this.state.maxQuestions - 1) {
      this.gameOver();
     } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1 
      }))
     }

     const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

     if(this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score : prevState.score + 1
      }))

      toast.success(`Bravo + 1 point`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        });

     } else {

      toast.error(`Raté ! `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
     }
   }




   componentDidUpdate(prevProps, prevState) {
     if(this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
     }

     if(this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer : null,
        btnDisabled : true
        
      })
     }

     if(this.props.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo)
     }
   }

   submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    })
   }

   gameOver = () =>{
    this.setState({
      quizEnd: true
    })
   }




  render () {

    const {pseudo} = this.props.userData;

    const displayOptions =  this.state.options.map((option, index) => {
      return ( 
      <p key={index} 
          onClick={()=> this.submitAnswer(option)}
          className={`answerOptions ${this.state.userAnswer === option ? "selected" : ""} `}>{option} </p>
      )
      })


      return this.state.quizEnd ? 
      
        (<QuizOver/>) 
        
        : 
        
  
    (
      <>
        <h2>Pseudo: {pseudo}</h2>
        <Levels/>
        <ProgressBar/>
        <h2>{this.state.question}</h2>

        {displayOptions}

        <button 
          disabled={this.state.btnDisabled} 
          className="btnSubmit"
          onClick={this.nextQuestion}>
          Suivant
        </button>
      </>
    )
  }
}

export default Quiz