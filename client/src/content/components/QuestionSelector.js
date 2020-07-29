import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import questions from '../Questions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function QuestionSelector(props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Getting to Know You</InputLabel>
        <Select
          native
        //   value={inputs.questions}
          onChange={(event) => props.handleQuestionClick(event)}
          name="Getting to Know You"
        //   inputProps={{
        //     name: 'content',
        //     id: 'question-native-simple',
        //   }}
        >
          <option aria-label="None" value="" />
          {questions[0].map(item => (
              <option key={item.content}>{item.content}</option>
          ))} 
        </Select>
      </FormControl>
    </div>
  );
}
