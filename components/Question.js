import React from 'react'

export default function Question({ result, handleAnswer, 
id, answer, load, check, runNum, storedAnswer }) {
    const options = [result.correct_answer, ...result.incorrect_answers]
    
    // const [load, setLoad] = React.useState(false)
    
    // React.useEffect(() => {
    //     setLoad(prevLoad => !prevLoad)
    // }, [])
    
    const questionButtons = []
    
    // function shuffle(array) {
    //     let i = array.length,
    //         j = 0,
    //         temp;

    //     while (i--) {

    //         j = Math.floor(Math.random() * (i+1));

    //         // swap randomly chosen element with current element
    //         temp = array[i];
    //         array[i] = array[j];
    //         array[j] = temp;

    //     }

    //     return array;
    // }

    // let ranNums = shuffle([0,1,2,3]);
    // localStorage.clear()
    // !load && localStorage.setItem("ranNums", ranNums) 
    // console.log(answer)
    let styleBtn
    let styleBtn2
    let styleBtn3
    if(answer) {
        styleBtn = {
            backgroundColor: '#D6DBF5',
            border: '0.8px solid #D6DBF5',
        }   
    } else if(check) {
        styleBtn = {
            backgroundColor: '#94D7A2',
            border: '0.8px solid #94D7A2',
        }  
          
        styleBtn2 = {
            backgroundColor: '#F8BCBC',
            border: '0.8px solid #F8BCBC',
            color: '#293264',
            opacity: 0.5
        }   
        
        styleBtn3 = {
            border: '0.8px solid #4D5B9E',
            color: '#293264',
            opacity: 0.5
        }  
        // console.log(answer)
    }
    
    for(let i = 0; i < 4; i++) {
        questionButtons.push(
            <button key={i}
            className="q-btn"
            style={{ 
                backgroundColor: '', 
                border: '',
                color: '',
                opacity: '' 
                }}
            onClick={() => handleAnswer(event, id)}>
                {runNum.length > 0 && options[runNum[i]]}
            </button>    
        ) 
    }
    
    if(!check) {
        questionButtons.length > 0 && questionButtons.map(qBtn => {
            answer && (qBtn.props.children === answer.value && 
            (qBtn.props.style.backgroundColor = styleBtn.backgroundColor) && 
            (qBtn.props.style.border = styleBtn.border))
        })  
    }
    else {
        questionButtons.map(qBtn => {
            if(qBtn.props.children === result.correct_answer) {
                qBtn.props.style.backgroundColor = styleBtn.backgroundColor
                qBtn.props.style.border = styleBtn.border
            }
            else if(qBtn.props.children === storedAnswer.value) {
                qBtn.props.style.backgroundColor = styleBtn2.backgroundColor
                qBtn.props.style.border = styleBtn2.border
                qBtn.props.style.color = styleBtn2.color
                qBtn.props.style.opacity = styleBtn2.opacity
            }
            else {
                qBtn.props.style.border = styleBtn3.border
                qBtn.props.style.color = styleBtn3.color
                qBtn.props.style.opacity = styleBtn3.opacity
            }
        })
    }
    
    return (
        <div id="question">
            <h4>
                {result.question.replace(/&quot;|&#039;|&eacute;/g, function (x) {
                    if(x === "&quot;") {
                        return x = '\"'
                    }else if(x === "&#039;") {
                        return x = '\''
                    }else {
                        return x = '\è'
                    }
                })}
            </h4>
            <div className="q-btn-group">
                {questionButtons}
            </div>
            <hr />
        </div>
    )
}