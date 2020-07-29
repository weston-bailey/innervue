let questions = [
    [
        {
            category: 'Getting to Know You',
            content:  'Tell me about yourself.'
        },
        {
            category: 'Getting to Know You',
            content: 'Why do you want to work at this company?'
        },
        {
            category: 'Getting to Know You',
            content: 'What interests you about this role?'
        },
        {
            category: 'Getting to Know You',
            content: 'What skills would you bring to the job?'
        },
        {
            category: 'Getting to Know You',
            content: 'What are you passionate about?'
        },
        {
            category: 'Getting to Know You',
            content: 'Why are you changing careers?'
        },
        {
            category: 'Getting to Know You',
            content: 'Can you explain these gaps in your resume?'
        },
        {
            category: 'Getting to Know You',
            content: 'Why should we hire you?'
        },
        {
            category: 'Getting to Know You',
            content: 'Why are you a good fit for this role?'
        }
    ],
    [
        {
            category: 'Communication Skills',
            content: 'Tell me about a time when you had to rely on written communication to get your ideas across to your team.'
        },
        {
            category: 'Communication Skills',
            content: 'Give me an example of a time when you had to explain something fairly complex to a frustrated client. How did you handle this delicate situation?'
        },
        {
            category: 'Communication Skills',
            content: 'Tell me about a successful presentation you gave and why you think it was a hit.'
        },
        {
            category: 'Communication Skills',
            content: 'Describe a time when you were the resident technical expert. What did you do to make sure everyone was able to understand you?'
        },
        {
            category: 'Communication Skills',
            content: 'Give me an example of a time when you were able to successfully persuade someone to see things your way at work.'
        },
        {
            category: 'Communication Skills',
            content: 'What would you do if there was a breakdown in communication at work?'
        }
        
    ],
    [
        {
            category: 'Conflict Resolution',
            content: 'Describe a time when you had to give a person difficult feedback.'
        },
        {
            category: 'Conflict Resolution',
            content: 'Describe a time when your manager was wrong. How did you handle the situation?'
        },
        {
            category: 'Conflict Resolution',
            content: 'Tell me about how you dealt with a difficult challenge in the workplace.'
        },
        {
            category: 'Conflict Resolution',
            content: 'How would you deal with an angry or irate customer?'
        },
        {
            category: 'Conflict Resolution',
            content: 'Can you describe a time when your work was criticized? How did you respond?'
        },
        {
            category: 'Conflict Resolution',
            content: 'Tell me about a time when you had to collaborate with someone you found difficult to work with.'
        }
    ],
    [
        {
            category: 'Diversity and Inclusion',
            content: 'Describe your understanding of diversity and inclusion and why it is important to this position.'
        },
        {
            category: 'Diversity and Inclusion',
            content: 'What does it mean for you to have a commitment to diversity? How have you demonstrated that commitment, and how would you see yourself demonstrating it here?'
        },
        {
            category: 'Diversity and Inclusion',
            content: 'Why do you think it’s important to address diversity and equity issues in this position, and what are some ways you might do that?'
        },
        {
            category: 'Diversity and Inclusion',
            content: 'If you were hired, how would you use this position to increase or enhance diversity at our company?'
        },
        {
            category: 'Diversity and Inclusion',
            content: 'How would you handle a situation in which someone made a sexist, racist, homophobic or otherwise prejudiced remark?'
        }
    ],
    [
        {
            category: 'Adaptability',
            content: 'Tell me about a time you were under a lot of pressure. What was going on, and how did you get through it?'
        },
        {
            category: 'Adaptability',
            content: 'Describe a time when your team or company was undergoing change. How did that impact you, and how did you adapt?'
        },
        {
            category: 'Adaptability',
            content: 'Tell me about the first job you’ve ever had. What did you do to learn the ropes?'
        },
        {
            category: 'Adaptability',
            content: 'Give me an example of a time when you had to think on your feet in order to delicately extricate yourself from a difficult or awkward situation.'
        },
        {
            category: 'Adaptability',
            content: 'Tell me about a time you failed. How did you deal with the situation?'
        }
    ],
    [
        {
            category: 'Time Management',
            content: 'Tell me about a time you had to be very strategic in order to meet all your top priorities.'
        },
        {
            category: 'Time Management',
            content: 'Describe a long-term project that you managed. How did you keep everything moving along in a timely manner?'
        },
        {
            category: 'Time Management',
            content: 'Sometimes it’s just not possible to get everything on your to-do list done. Tell me about a time your responsibilities got a little overwhelming. What did you do?' 
        },
        {
            category: 'Time Management',
            content: 'Tell me about a time you set a goal for yourself. How did you go about ensuring that you would meet your objective?' 
        },
        {
            category: 'Time Management',
            content: 'Give me an example of a time you managed numerous responsibilities. How did you handle that?'
        },
        {
            category: 'Time Management',
            content: 'What techniques and tools do you use to keep yourself organized?'
        }
    ],
    [
        {
            category: 'Teamwork',
            content: 'Talk about a time when you had to work closely with someone whose personality was very different from yours.'
        },
        {
            category: 'Teamwork',
            content: 'Give me an example of a time you faced a conflict while working on a team. How did you handle that?'
        },
        {
            category: 'Teamwork',
            content: 'Describe a time when you struggled to build a relationship with someone important. How did you eventually overcome that?'
        },
        {
            category: 'Teamwork',
            content: 'We all make mistakes we wish we could take back. Tell me about a time you wish you’d handled a situation differently with a colleague.'
        },
        {
            category: 'Teamwork',
            content: 'Tell me about a time you needed to get information from someone who wasn’t very responsive. What did you do?'
        },
        {
            category: 'Teamwork',
            content: 'Do you prefer working alone or in a team environment? Why?'
        }
    ],
    [
        {
            category: 'Motivation',
            content: 'Tell me about your proudest professional accomplishment.'
        },
        {
            category: 'Motivation',
            content: 'Describe a time when you saw a problem and took the initiative to correct it rather than wait for someone else to do it.'
        },
        {
            category: 'Motivation',
            content: 'Tell me about a time when you worked under close supervision or extremely loose supervision. How did you handle that?'
        },
        {
            category: 'Motivation',
            content: 'Give me an example of a time you were able to be creative with your work. What was exciting or difficult about it?'
        },
        {
            category: 'Motivation',
            content: 'Tell me about a time you were dissatisfied in your work. What could you have done to make it better?'
        }
    ]
]

export default questions