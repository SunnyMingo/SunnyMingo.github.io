const quizData = [
    //Multiple choice questions
    {
        question: "What does WWW stand for in the context of the internet?",
        options: ["World Wide Web", "Wireless Web", "Web of the World", "Wide Web World"],
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
    // Multiple answer question
    {
        question: "What are the six components of a URL?",
        options: ["Scheme", "Host", "Port", "Path", "Query", "Fragment", "User Info", "Authority", "Subdomain" , "Top-Level Domain" , "Directory"],
        answer: ["Scheme", "Host", "Port", "Path", "Query", "Fragment"]
    },
    // Fill in the blank question
    {
        question: "What does URL stand for?",
        answer: "Uniform Resource Locator"
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("choice");
const submitButton = document.getElementById("submit");


let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement("button");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => {
            if (option === currentQuestion.answer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
        optionsElement.appendChild(optionElement);
    });
}

function showResults() {
    questionElement.textContent = `Quiz Completed! Your score: ${score}/${quizData.length}`;
    optionsElement.innerHTML = "";
    submitButton.style.display = "none";
}
loadQuestion();
