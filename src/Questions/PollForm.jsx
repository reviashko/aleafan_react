import React, {useState, useEffect} from 'react';
import Question from './Question';
import PollResult from './PollResult';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


export default function PollForm(props) {

  const [questionItems, setQuestionItems] = useState([])
  const [answeredItems, setAnsweredItems] = useState([])
  const [answeredIds, setAnsweredIds] = useState([])
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [pollResultData, setPollResultData] = useState({})
  const [userID, setUserID] = useState("")
  const classes = useStyles();

  useEffect(() => {
    setUserID(props.UserID);
    loadQuestionItems(props.UserID);
  },[props.UserID]);

  const loadQuestionItems = (userID) => {   

    fetch(props.Host + "/getquestionjson/"+userID)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.afanasiev_type === undefined){
            setShowResult(false)
            setQuestionItems(result)
          }else{
            setPollResultData(result)
            setShowResult(true)
          }
        },
        (error) => {
          setShowErrorAlert(true)
        }
      )
  }

  const parentCallBack = (qst_id, answer) =>{

    if(!answeredIds.includes(qst_id)){
      answeredIds.push(qst_id)
      setAnsweredIds(answeredIds)
      answeredItems.push({qst_id:qst_id, answer:answer})
      setAnsweredItems(answeredItems)
    }

    console.log(answeredItems);
    
    if(answeredItems.length === questionItems.length){
      saveResultToServer(answeredItems)
    }
  }

  const saveResultToServer = (answers) =>{
    (async () => {
      try {
        const response = await fetch(props.Host + "/savesurvey/", {
          method: 'POST',
          body: JSON.stringify({userid: userID, answers: answers}),
        });

        const json = await response.json();
        setPollResultData(json)
        setShowResult(true)

      } catch (error) {
        console.error('Ошибка:', error);
      }

    })();
  }

  return(
    <div className={classes.root}>
      {
        questionItems.map((pitem) => (
          <Question key={pitem.qst_id} parentCallBack={parentCallBack} id={pitem.qst_id} text={pitem.qst_text} /> 
        ))      
      }
      {
        showResult
        ? <PollResult Host={props.Host} Data={pollResultData} UserID={userID} />
        : ''
      }
      <Collapse in={showErrorAlert}>
        <Typography variant="subtitle1" gutterBottom>Что-то пошло не так...</Typography>
      </Collapse>
    </div>
    );
}