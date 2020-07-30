import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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


const InputControl = (props) => {
    console.log(props.questions)
    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">{props.category[0].category}</InputLabel>
                <Select
                    native
                    onChange={(event) => props.handleQuestionClick(event)}
                    name={props.category[0].category}
                    >
                    <option aria-label="None" value="" />
                    {props.category.map(item => (
                        <option key={item.content}>{item.content}</option>
                    ))} 
                </Select>
      </FormControl>
        </div>
    );
};

export default InputControl;