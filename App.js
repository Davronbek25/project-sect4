import React from 'react'
import Questions from './components/Questions'
import Start from './components/Start'

export default function App() {
    const [quiz, setQuiz] = React.useState(false)
    const [answers, setAnswers] = React.useState([])
    const [results, setResults] = React.useState([])
    const [check, setCheck] = React.useState(false)
    const [checkText, setCheckText] = React.useState("Check answers")
    const [load, setLoad] = React.useState(false)
    const [runNums, setRunNums] = React.useState([[],[],[],[]])
    const [rightAns, setRightAns] = React.useState(0)
    
    React.useEffect(() => {
        async function fetchQuestions() {
            const fetchQ = await fetch("https://opentdb.com/api.php?amount=4&type=multiple")
            const response = await fetchQ.json()
            setResults(response.results)
            setLoad(prevLoad => !prevLoad)
            // console.log(response.results)
        }
        
        setRunNums(prev => prev.map(num => shuffle([0,1,2,3])))
        
        fetchQuestions()
    }, [])
    
    function shuffle(array) {
        let i = array.length,
            j = 0,
            temp;

        while (i--) {

            j = Math.floor(Math.random() * (i+1));

            // swap randomly chosen element with current element
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;

        }

        return array;
    }
    
    const toggleQuiz = () => setQuiz(prevQuiz => !prevQuiz)
    
    const handleAnswer = (event, id) => {
        if(!check) {
            if(answers.length === 0) {
                setAnswers(prevAns => [...prevAns, { value: event.target.innerText, id: id}])
            }else {
                if(answers.every(ans => ans.id !== id)) {
                    setAnswers(prevAns => [...prevAns, { value: event.target.innerText, id: id}])
                }else {
                    setAnswers(prevAns => prevAns.map(ans => ans.id === id ?
                    {...ans, value: event.target.innerText} : ans))
                }
            }   
        }
        // setAnswers(prevAns => prevAns.length > 0 ? 
        // (prevAns.filter(ans => ans.id !== id)) : 
        // [...prevAns, { value: event.target.innerText, id: id}])
        // setAnswers(prevAns => [...prevAns, { value: event.target.innerText, id: id}])
        // setAnswers(prevAns => [...prevAns, { value: event.target.innerText, id: id}])
    }
    
    const handleCheck = () => {
        setCheck(prevCheck => !prevCheck)
        setCheckText(!check ? "Play again" : "Check answers")
        !check && setAnswers([])
        localStorage.setItem("answers", JSON.stringify(answers))
        let correctAnswers = []
        for(let i = 0; i < 4; i++) {
            correctAnswers.push(
                results.filter(res => 
                res.correct_answer === answers[i].value)
            ) 
        }
        
        correctAnswers.map(cA => {
            cA.length > 0 && setRightAns(prev => prev + 1)
        })
        
    }
        // console.log(rightAns)
        // console.log(JSON.parse(localStorage.getItem('answers')))
    
    // answers.length > 0 && console.log(answers)
    
    return (
        <div id="app">
            {quiz && <Start toggleQuiz={toggleQuiz} />}
            {(!quiz && answers) && <Questions 
            results={results}
            handleAnswer={handleAnswer}
            answers={answers}
            handleCheck={handleCheck}
            checkText={checkText}
            check={check}
            load={load}
            runNums={runNums}
            storedAnswers={JSON.parse(localStorage.getItem('answers'))}
            rightAns={rightAns}
            />}
        </div>
    )
}