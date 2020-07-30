import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import questions from '../Questions';
import InputControl from './InputControl';

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

  const allQuestions = questions.map((category, index) => {
    return (
      <InputControl
      key={index}
      handleQuestionClick={props.handleQuestionClick}
      category={category}
      />    
    )
  })

  return (
    <div className="questions">
      <h1>questions</h1>
      {allQuestions}
    </div>
  );
}
