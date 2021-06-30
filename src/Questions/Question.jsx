import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Collapse from '@material-ui/core/Collapse'


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const marks = [ { value: -1, label: '', },
                { value: 0, label: '---', },
                { value: 1, label: '--+', },
                { value: 2, label: '-++', },
                { value: 3, label: '+++', },
              ];

export default function Question(props) {
  const [collapseItem, setCollapseItem] = useState(true)
  const classes = useStyles();

  const handleSliderChange = (event, answer) => {
    if(answer > 3 || answer < 0)
    {
      return
    }
    setTimeout(() => {
      props.parentCallBack(props.id, answer); 
      setCollapseItem(false);
    }, 800);

  };


  return(

    <Collapse in={collapseItem}>
      <Grid item xs={12}>
      <Paper className={classes.paper}>

        <Grid container spacing={3}  justify="flex-start" alignItems="flex-start">
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
            {props.text}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={2}>
            <Slider defaultValue={-1} track={false} step={1} marks={marks} min={-1} max={3} onChange={handleSliderChange}
            />
          </Grid>
        </Grid>

      </Paper>
      </Grid>

    </Collapse>
    );


}