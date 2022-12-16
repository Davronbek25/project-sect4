import React from 'react'
import Question from './Question'
import CheckButton from './CheckButton'

export default function Questions({ results, 
handleAnswer, answers, 
handleCheck, checkText,
check, load, runNums,
storedAnswers, rightAns }) {
    // console.log(JSON.parse(localStorage.getItem('answers')))
    // console.log(storedAnswers)
    return (
        <div id="questions">
            {results && results.map((result, index) => (
            <Question key={index} 
            id={index} result={result} 
            answer={answers[index]}
            handleAnswer={handleAnswer}
            load={load}
            check={check}
            runNum={runNums[index]}
            storedAnswer={storedAnswers[index]}
            />    
            ))}
            {results && <CheckButton 
            handleCheck={handleCheck}
            checkText={checkText}
            check={check}
            rightAns={rightAns}
            />}
        </div>
    )
}