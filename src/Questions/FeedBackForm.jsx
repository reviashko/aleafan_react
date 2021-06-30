import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Question(props) {
  const [feedBackValue, setFeedBackValue] = useState(0)
  const [collapseItem, setCollapseItem] = useState(true)
  const [collapseSendBtn, setCollapseSendBtn] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const classes = useStyles();

  const handleSliderChange = (event, answer) => {
    setFeedBackValue(answer);
    setCollapseSendBtn(true);
  };

  const handleButtonChange = () =>{
    
    (async () => {
      try {
        const response = await fetch(props.Host + "/savesurveyfeedback/", {
          method: 'POST',
          body: JSON.stringify({userid: props.UserID, answer: feedBackValue}),
        });

        const json = await response.json();
        //console.log('Успех:', JSON.stringify(json));

      } catch (error) {
        console.error('Ошибка:', error);
      }

    })();

    setCollapseItem(false)
    setShowThanks(true)
  }

  return(
    <Paper className={classes.paper}>
    <Collapse in={collapseItem}>
      <Grid item xs={12}>
      

        <Grid container spacing={3}  justify="flex-start" alignItems="flex-start">
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
            Насколько это описание соответствует вам?
            </Typography>
          </Grid>
          <Grid item xs={8} sm={2}>
            <Slider valueLabelDisplay="on" defaultValue={0} track="normal" step={10} marks min={0} max={100} onChange={handleSliderChange} />
            <Collapse in={collapseSendBtn}>
              <Button onClick={handleButtonChange} variant="outlined" color="primary">Отправить</Button>
            </Collapse>
          </Grid>
        </Grid>

      
      </Grid>

    </Collapse>
    <Collapse in={showThanks}>
      <Typography variant="subtitle1" gutterBottom>Спасибо за обратную связь!</Typography>
    </Collapse>
    </Paper>
    );


}