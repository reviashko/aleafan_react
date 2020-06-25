import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FeedBackForm from './FeedBackForm';
import { Collapse } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {    
    margin: 1,
  },
}));


export default function PollResult(props) {

  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [pollResult, setPollResult] = useState({})

  const classes = useStyles();

  useEffect(() => {
    if( props.Data.afanasiev_type === undefined ){
      loadPollResult(props.UserID)
    }else{
      setPollResult(props.Data)
    }
  },[]);

  const loadPollResult = (userID) => {   

    fetch(props.Host + "/surveyresult/"+userID)
      .then(res => res.json())
      .then(
        (result) => {
          setPollResult(result)
        },
        (error) => {
          setShowErrorAlert(true)
        }
      )
      
  }

  return(

    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>{props.Data.afanasiev_feedback}Ваш психотип : {pollResult.ps_name}</Typography>
      <TextField  id="outlined-multiline-static" multiline fullWidth={true} rows={24} 
                  margin="normal" defaultValue={pollResult.ps_descr} variant="outlined" />
      
      <Collapse in={showErrorAlert}>
        <Typography variant="subtitle1" gutterBottom>Что-то пошло не так...</Typography>
      </Collapse>
      <Collapse in={!pollResult.afanasiev_feedback}>
        <FeedBackForm Host={props.Host} UserID={props.UserID} />
      </Collapse>      
    </div>

  );


}