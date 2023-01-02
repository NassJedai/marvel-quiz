import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import {QuizMarvel} from '../quizMarvel';

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
    score : 0
  }


  loadQuestions = (level) => {
   const fetchedArrayQuiz =  QuizMarvel[0].quizz[level]
    if(fetchedArrayQuiz.length >= this.state.maxQuestions) {
     const newArray =  fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)
     this.setState({
        storedQuestions: newArray
      })
    } else {
      console.log("pas assez de questions");
    }
  }


  componentDidMount() { 
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
   }
   

   nextQuestion = () => {
     if(this.state. quizLevel === this.state.maxQuestions - 1) {
      // End 
     } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1 
      }))
     }
   }

   componentDidUpdate(prevProps, prevState) {
     if(this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
     }

   }

   submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
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

    return(
      <div>
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
      </div>
    )
  }
}

export default Quiz