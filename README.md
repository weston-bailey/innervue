# innervue

## Mission Statement
Giving job applicants the key tools to ace the interview.

# Project Structure

##  Team members and their roles:

Team Name: WNK (aka 'The Winkers')

Wes:
* GIT Master
* README
* ERD/Database Manager
* Full-Stack Developer

Neri:
* Product Manager
* Full-Stack Developer
* Scrum Master
* Pitch Deck
* Design

Karly: 
* Organization
* Research
* Wireframes
* Full-Stack Developer


## Wireframes

![](https://i.imgur.com/mwm9SD6.png)
![](https://i.imgur.com/qBVZVZH.png)



## MVP

[X] User can login and respond to interview questions

[X] User can choose from a variety of interview questions

[X] User can respond with speech or writing 

[X] User is given feedback on their response to interview questions using sentiment analysis

[X] User can view past responses and their analysis

[X] User can revisit past question to try them again

## Stretch Goals

[ ] Integrate career tips using [muse](https://www.themuse.com/developers/api/v2) API (side bar with taglines, user can save links to database)

[ ] Calendar function allows user to enter interview milestones
 

# Technologies We Used

### Frameworks
* React
* Express
* Node.js

### Database
* MongoDB
* Mongoose

> ### Sentiment Analysis APIs
> * IBM Watson
> * Google Cloud Natural Language
    > Analyze Sentiment 
    > Analyze Entity Sentiment

> ### HTTP requests
> * axios
> * fetch

> ### Styling Framework
> * Material-UI [link](https://material-ui.com/getting-started/installation/)


> ### Node packages
> * Material-UI [link](https://www.npmjs.com/package/@material-ui/core)
> * React Speech Recognition [link](https://www.npmjs.com/package/react-speech-recognition)

### Auth Tools
* Bcrypt
* Passport
* Cors
* JSON Webtoken



# Project Planning
### Time Management Plan

> Daily activity calendar
> To-dos per person and team goals
> Morning and evening check-ins
> Miro Board


> ### Project Folder Organization
> ```
> .
> ├── src
> │   ├── file11.ext
> │   └── file12.ext
> ├── dir2
> │   ├── file21.ext
> │   ├── file22.ext
> │   └── file23.ext
> ├── dir3
> ├── file_in_root.ext
> └── README.md
> ```
> ### React routes
> HTTP Path | Component | Auth Required
> ----------|-----------|--------------|
> / | |
>  /login | |
>  /feedback | |
>   /myresponses | |

> ### API routes (express)
> HTTP Verb | Route | Request | Response | Auth Required
> ----------|-------|---------|----------|--------------|
> GET | /api/v1/:userId | | |
> POST | /api/v1/ TODO | |  |
> 

> ### Major Components
> ```
> App
> ├── NavBar
> │   ├── Component
> │   └── Component
> ├── Component
> │   ├── Component
> │   ├── Component
> │   │   └── Component
> │   └── Component
> ├── Component
> │   ├── Component
> │   └── Component
> │       └── Component
> ├── Component
> └── Component
> ```

## Database model

```javascript
const mongoose = require('mongoose');

const answeredQuestionSchema = new mongoose.Schema({
  category: String,
  content: String,
  analysis: {
    key1: String,
    key2: String
  }
}, {
  timestamps: true
})

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      unique: true
    }, 
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100
    },
    answeredQuestions: [answeredQuestionSchema]
  }, {
  timestamps: true
  }
);
```

## Questions data model

```javascript
// array of questions
const questions = [
  // each category is an array
 [
    // questions are objects
    {
      category: 'category 1',
      content: 'this is question content?',

    },
    {
      category: 'category 1',
      content: 'this is question content?',
    }
  ],
 [
    {
      category: 'category 2',
      content: 'this is question content?',

    },
    {
      category: 'category 2',
      content: 'this is question content?',
    }
  ],

]
```