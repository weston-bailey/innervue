import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MyResponses from '../pages/MyReponses'
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
     details: {
         backgroundColor: "#90caf9",
         paddingRight: "20px",
         paddingLeft: "20px",
         width: "100%"
     }
  }));

export default function AnalysisAccordion(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const responses = [
        {
            id: props.question,
            heading: props.question,
            secondaryHeading: props.category,
            details: props.analysisResponse
        },
    ]

    return (
        <div className={classes.root}>
          {responses.map(accordion => {
            const { id, heading, secondaryHeading, details } = accordion;
              return (
                  <Accordion
                      expanded={expanded === id}
                      key={id}
                      onChange={handleChange(id)}
                  >
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                      >
                          <Typography className={classes.heading}>{heading}</Typography>
                          <Typography className={classes.secondaryHeading}>
                              {secondaryHeading}
                          </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                          <Typography className={classes.details}>{details}</Typography>
                      </AccordionDetails>
                  </Accordion>
              );
          })}
          </div>
      );
  }
    