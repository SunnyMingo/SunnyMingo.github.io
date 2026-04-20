// Provides lists of questions, options, and answers for the quiz. Also contains the logic for loading questions, submitting answers, and showing results.
const quizData = [
    //Multiple choice questions
    {
        question: "What does WWW stand for in the context of the internet?",
        options: ["World Wide Web", "Wireless Web", "Web of the World", "Wide Web World", "Web World Wide", "World Web Wide"],
        answer: "World Wide Web"
    },
    {
        question: "What is the purpose of a URL?",
        options: ["To locate a resource on the internet", "To encrypt data transmitted over the internet", "To manage user accounts on a website", "To store data on a web server"],
        answer: "To locate a resource on the internet"
    },
    {
        question: "What is the role of the scheme in a URL?",
        options: ["It specifies the protocol for accessing the resource", "It defines the domain name of the server", "It indicates the port number for the connection", "It determines the path to the resource"],
        answer: "It specifies the protocol for accessing the resource"
    },
    /* Following questions are currently not functional, need to go back on milestone 3 and figure out how to make them functional.
    // Multiple answer question
    {
        question: "What are the six components of a URL?",
        options: ["Scheme", "Host", "Port", "Path", "Query", "Fragment", "User Info", "Authority", "Subdomain" , "Top-Level Domain" , "Directory"],
        answer: ["Scheme", "Host", "Port", "Path", "Query", "Fragment"]
    },
    // Fill in the blank question
    {
        question: "What does URL stand for?",
        options: [],
        answer: "Uniform Resource Locator"
    }
    */
];


//Elements that select the stylings off the CSS file and allow the JavaScript to manipulate the HTML elements on the quiz page.
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("choice");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const quizContainer = document.getElementById("quiz_form_box");




let currentQuestionIndex = 0;
let score = 0;
let multipleAnswerSelected = 0;

//Code focusing on questions 1-3, loading them and allowing the user to click on an option. Upon clicking, the user must click submit to lock in their answer and move onto the next question.
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    //Code block that presents the question related to the current question index and allows user to select and submit their answer. If the answer is correct, their score is increased by 1. Upon submission, the next question is loaded. Need to add an element to show that the user clicked on an option.
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement("button");
        resetButton.style.display = "none";
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => {
            if (option === currentQuestion.answer) {
                score++;
            }
            currentQuestionIndex++;
            submitButton.addEventListener("click", () => {
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }); 
        });

/*
Code related to the multiple answer and fill in the blank questions. Currently, these questions are not functional. Need to go back on milestone 3 and figure out how to make them functional.
        if (currentQuestionIndex == quizData[3].question) {
            optionElement.addEventListener("click", () => {
                multipleAnswerSelected++;
                if (multipleAnswerSelected == 6) {
                    score++;
                }
            });
        }

        if (currentQuestionIndex == quizData[4].question) {
            optionElement.addEventListener("click", () => {
                const userAnswer = prompt("Please enter your answer:");
                if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
                    score++;
                }
            });
        }
*/

        optionsElement.appendChild(optionElement);
    });
}
        


//Provides user with their score result and allows them to take the quiz again if they wish to do so.
function showResults() {
    questionElement.textContent = `Quiz Completed! Your score: ${score}/${quizData.length}`;
    quizPercentage = (score / quizData.length) * 100;
    if (quizPercentage >= 70) {
        questionElement.textContent += " (Congrats, you passed!)";
    } else {
        questionElement.textContent += " (Sorry, you failed!)";
    }

    optionsElement.innerHTML = "";
    submitButton.style.display = "none";
    resetButton.style.display = "block";

    // Displays correct answers for all questions, however doesn't show user's selected answer, something to improve in milestone 3. Need to change display of correct answers to look more attractive and easier to read as well.
    quizData.forEach(element => {
        const optionElement = document.createElement("p");
        optionElement.textContent = `Question: ${element.question} | Correct Answer: ${element.answer}`;
        optionsElement.appendChild(optionElement);
    });

    // Resets quiz to the beginning and allows user to retake quiz.
    resetButton.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        submitButton.style.display = "block";
        resetButton.style.display = "none";
        loadQuestion();
    });
}
loadQuestion();
