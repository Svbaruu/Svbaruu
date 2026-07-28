/* =====================================================
   CODEMATE - CODEMATE.JS
===================================================== */

// ==================== VARIABLES ====================

let selectedLanguage = null;
let currentGuide = 0;
let currentQuizQuestion = 0;
let quizScore = 0;
let quizStarted = false;

// ==================== LANGUAGE NAMES ====================

const languageNames = {
    python: "Python 🐍",
    java: "Java ☕",
    c: "C Language 💻"
};

// ==================== GUIDE IMAGES ====================

const guideImages = {
    python: [
        "https://res.cloudinary.com/uoei1znt/image/upload/v1785163814/python1_cmvgqs.jpg",
        " https://res.cloudinary.com/uoei1znt/image/upload/v1785163815/python3_d81roh.jpg  ",
        "https://res.cloudinary.com/uoei1znt/image/upload/v1785163814/python2_enzu1i.jpg",
        " https://res.cloudinary.com/uoei1znt/image/upload/v1785163814/python4_h9voj7.jpg "
    ],
    java: [
        " https://res.cloudinary.com/uoei1znt/image/upload/v1785163814/java1_wsbeic.jpg ",
        " https://res.cloudinary.com/uoei1znt/image/upload/v1785163813/java3_gfug67.jpg  ",
        " https://res.cloudinary.com/uoei1znt/image/upload/v1785163814/java2_bmdpdh.jpg ",
        "  https://res.cloudinary.com/uoei1znt/image/upload/v1785163813/java4_w7b7cp.jpg  "
    ],
    c: [
        " https://res.cloudinary.com/uoei1znt/image/upload/v1785163815/c1_pgmfwo.jpg",
        "https://reshttps://res.cloudinary.com/uoei1znt/image/upload/v1785163815/c2_yf9bdk.jpg",
        "https://res.cloudinary.com/uoei1znt/image/upload/v1785163815/c2_yf9bdk.jpg",
        "https://res.cloudinary.com/uoei1znt/image/upload/v1785163815/c4_r0psnt.jpg"
    ]
};

// ============ QUIZ QUESTIONS ====================

const quizData = {
    python: [
        {
            question: "What does print(list_name[index]) do?",
            options: [
                "It deletes an item from the list.",
                "It prints an item from the list.",
                "It creates a new list.",
                "It sorts the list."
            ],
            answer: "b"
        },
        {
            question: "What keyword is used after if for another condition?",
            options: [
                "else",
                "elif",
                "then",
                "elseif"
            ],
            answer: "b"
        },
        {
            question: "What data type is used for True or False values?",
            options: [
                "string",
                "int",
                "bool",
                "float"
            ],
            answer: "c"
        },
        {
            question: "Which loop uses range()?",
            options: [
                "while loop",
                "do-while loop",
                "if loop",
                "for loop"
            ],
            answer: "d"
        },
        {
            question: "Which function is used to get user input?",
            options: [
                "scan()",
                "input()",
                "read()",
                "get()"
            ],
            answer: "b"
        }
    ],

    java: [
        {
            question: "Which method is used to print output in Java?",
            options: [
                "print()",
                "System.out.println()",
                "display()",
                "output()"
            ],
            answer: "b"
        },
        {
            question: "Which class is commonly used to receive user input in Java?",
            options: [
                "Input",
                "Reader",
                "Scanner",
                "Keyboard"
            ],
            answer: "c"
        },
        {
            question: "Which data type is used to store decimal numbers in Java?",
            options: [
                "int",
                "char",
                "double",
                "boolean"
            ],
            answer: "c"
        },
        {
            question: 'Which relational operator means "not equal to" in Java?',
            options: [
                "==",
                "!=",
                "=",
                "<="
            ],
            answer: "b"
        },
        {
            question: "Which loop is best used when you know how many times a block of code should repeat?",
            options: [
                "while loop",
                "if statement",
                "for loop",
                "switch statement"
            ],
            answer: "c"
        }
    ],

    c: [
        {
            question: 'In C, what will be the output of printf("%d", 10 + 5);?',
            options: [
                "10",
                "15",
                "20",
                "5"
            ],
            answer: "b"
        },
        {
            question: 'In C, what will be the output of printf("%d", 8 * 4);?',
            options: [
                "12",
                "24",
                "32",
                "40"
            ],
            answer: "c"
        },
        {
            question: `What will be the output of the following C code?

int x = 10;
if (x > 5)
    printf("True");
else
    printf("False");`,
            options: [
                "True",
                "False",
                "10",
                "Error"
            ],
            answer: "a"
        },
        {
            question: "Which loop in C is guaranteed to execute at least once?",
            options: [
                "for loop",
                "while loop",
                "if statement",
                "do-while loop"
            ],
            answer: "d"
        },
        {
            question: "What is the first index of an array in C?",
            options: [
                "0",
                "1",
                "-1",
                "10"
            ],
            answer: "a"
        }
    ]
};

// ==================== PAGE ELEMENTS ====================

const welcomePage = document.getElementById("welcomePage");
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const startButton = document.getElementById("startButton");
const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logoutButton");

// ==================== START BUTTON ====================

if (startButton) {
    startButton.addEventListener("click", () => {
        welcomePage.classList.add("hidden");
        loginPage.classList.remove("hidden");
    });
}

// ==================== LOGIN ====================

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        selectedLanguage = null;
        currentGuide = 0;
        currentQuizQuestion = 0;
        quizScore = 0;
        quizStarted = false;

        loginPage.classList.add("hidden");
        dashboardPage.classList.remove("hidden");

        hideLanguageNavigation();
        clearLanguageHighlight();
        showPage("homePage");
    });
}

// ==================== SHOW PAGE ====================

function showPage(pageId) {
    document.querySelectorAll(".content-page").forEach(page => {
        page.classList.add("hidden");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.remove("hidden");
    }

    // Sidebar active state
    document.querySelectorAll(".nav-button").forEach(button => {
        button.classList.remove("active");

        if (button.dataset.page === pageId) {
            button.classList.add("active");
        }
    });

    // Update content when changing pages
    if (selectedLanguage) {
        updateLanguageContent();
    }

    // Only load the quiz.
    // DO NOT reset the score here.
    if (pageId === "quizPage" && selectedLanguage) {
        if (!quizStarted) {
            startQuiz();
        } else {
            loadQuizQuestion();
        }
    }
}

// ==================== SIDEBAR NAVIGATION ====================

document.querySelectorAll(".nav-button").forEach(button => {
    button.addEventListener("click", () => {
        const pageId = button.dataset.page;

        if (
            pageId === "guidePage" ||
            pageId === "quizPage" ||
            pageId === "activityPage"
        ) {
            if (!selectedLanguage) {
                alert("Please select a programming language first.");
                return;
            }
        }

        showPage(pageId);
    });
});

// ==================== SELECT LANGUAGE ====================

function selectLanguage(language) {
    if (!quizData[language]) {
        return;
    }

    selectedLanguage = language;
    currentGuide = 0;
    currentQuizQuestion = 0;
    quizScore = 0;
    quizStarted = false;

    highlightLanguage(language);
    showLanguageNavigation();
    updateLanguageContent();

    // Start with Guide
    showPage("guidePage");
}

// ==================== LANGUAGE HIGHLIGHT ====================

function highlightLanguage(language) {
    clearLanguageHighlight();

    document.querySelectorAll(".language-card").forEach(card => {
        const onclickValue = card.getAttribute("onclick");

        if (
            onclickValue &&
            onclickValue.includes(`'${language}'`)
        ) {
            card.classList.add("active");
        }
    });
}

// ==================== CLEAR HIGHLIGHT ====================

function clearLanguageHighlight() {
    document.querySelectorAll(".language-card").forEach(card => {
        card.classList.remove("active");
    });
}

// ==================== SHOW LANGUAGE NAV ====================

function showLanguageNavigation() {
    document.querySelectorAll(".language-nav").forEach(nav => {
        nav.classList.remove("hidden");
    });
}

// ==================== HIDE LANGUAGE NAV ====================

function hideLanguageNavigation() {
    document.querySelectorAll(".language-nav").forEach(nav => {
        nav.classList.add("hidden");
    });
}

// ==================== UPDATE LANGUAGE CONTENT ====================

function updateLanguageContent() {
    if (!selectedLanguage) {
        return;
    }

    const languageName = languageNames[selectedLanguage];

    const guideTitle = document.getElementById("guideTitle");
    const quizTitle = document.getElementById("quizTitle");
    const activityTitle = document.getElementById("activityTitle");

    if (guideTitle) {
        guideTitle.textContent = languageName + " Guide";
    }

    if (quizTitle) {
        quizTitle.textContent = languageName + " Quiz";
    }

    if (activityTitle) {
        activityTitle.textContent = languageName + " Activity";
    }

    updateGuideImage();
}

// ==================== GUIDE IMAGE ====================

function updateGuideImage() {
    if (!selectedLanguage) {
        return;
    }

    const images = guideImages[selectedLanguage];
    const guideImage = document.getElementById("guideImage");

    if (!guideImage || !images) {
        return;
    }

    guideImage.src = images[currentGuide];

    guideImage.alt =
        languageNames[selectedLanguage] +
        " Guide " +
        (currentGuide + 1);

    const guideCounter =
        document.getElementById("guideCounter");

    if (guideCounter) {
        guideCounter.textContent =
            `${currentGuide + 1} / ${images.length}`;
    }

    const lessonNumber =
        document.getElementById("guideLessonNumber");

    if (lessonNumber) {
        lessonNumber.textContent =
            `Lesson ${currentGuide + 1} of ${images.length}`;
    }
}

// ==================== NEXT GUIDE ====================

function nextGuide() {
    if (!selectedLanguage) {
        return;
    }

    const images = guideImages[selectedLanguage];

    if (currentGuide < images.length - 1) {
        currentGuide++;
        updateGuideImage();
    } else {
        showPage("quizPage");
    }
}

// ==================== PREVIOUS GUIDE ====================

function previousGuide() {
    if (!selectedLanguage) {
        return;
    }

    if (currentGuide > 0) {
        currentGuide--;
        updateGuideImage();
    }
}

// ==================== START QUIZ ====================

function startQuiz() {
    if (!selectedLanguage) {
        return;
    }

    currentQuizQuestion = 0;
    quizScore = 0;
    quizStarted = true;

    restoreQuizLayout();
    loadQuizQuestion();
}

// ==================== RESTORE QUIZ LAYOUT ====================

function restoreQuizLayout() {
    const quizContent =
        document.querySelector(".quiz-content");

    if (!quizContent) {
        return;
    }

    quizContent.innerHTML = `
        <h1 id="quizTitle">
            ${languageNames[selectedLanguage]} Quiz
        </h1>

        <p id="quizQuestionText"></p>

        <div class="quiz-options"></div>

        <button
            class="primary-button"
            id="nextQuizButton">
            Next →
        </button>
    `;

    const newButton =
        document.getElementById("nextQuizButton");

    if (newButton) {
        newButton.addEventListener(
            "click",
            checkQuizAnswer
        );
    }
}

// ==================== LOAD QUIZ QUESTION ====================

function loadQuizQuestion() {
    if (!selectedLanguage) {
        return;
    }

    const questions = quizData[selectedLanguage];

    if (!questions) {
        return;
    }

    const currentQuestion =
        questions[currentQuizQuestion];

    if (!currentQuestion) {
        return;
    }

    // Question
    const questionText =
        document.getElementById("quizQuestionText") ||
        document.querySelector("#quizPage .quiz-content > p");

    if (questionText) {
        questionText.innerHTML =
            currentQuestion.question.replace(/\n/g, "<br>");
    }

    // Progress text
    const progressText =
        document.querySelector(".quiz-progress p");

    if (progressText) {
        progressText.textContent =
            `Question ${currentQuizQuestion + 1} of ${questions.length}`;
    }

    // Progress bar
    const progress =
        document.querySelector(".quiz-progress .progress");

    if (progress) {
        const percentage =
            ((currentQuizQuestion + 1) / questions.length) * 100;

        progress.style.width = percentage + "%";
    }

    // Options
    const optionsContainer =
        document.querySelector(".quiz-options");

    if (!optionsContainer) {
        return;
    }

    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const letter =
            String.fromCharCode(65 + index);

        const label =
            document.createElement("label");

        label.className = "quiz-option";

        label.innerHTML = `
            <input
                type="radio"
                name="answer"
                value="${letter.toLowerCase()}"
            >
            <strong>${letter}.</strong>
            ${option}
        `;

        optionsContainer.appendChild(label);
    });

    // Next button
    const nextButton =
        document.getElementById("nextQuizButton");

    if (nextButton) {
        nextButton.textContent =
            currentQuizQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next →";
    }
}

// ==================== CHECK ANSWER ====================

function checkQuizAnswer() {
    if (!selectedLanguage) {
        return;
    }

    const selectedAnswer =
        document.querySelector(
            '#quizPage input[name="answer"]:checked'
        );

    // No answer selected
    if (!selectedAnswer) {
        alert("Please choose an answer first.");
        return;
    }

    const questions =
        quizData[selectedLanguage];

    const currentQuestion =
        questions[currentQuizQuestion];

    const userAnswer =
        selectedAnswer.value.toLowerCase();

    const correctAnswer =
        currentQuestion.answer.toLowerCase();

    // Correct answer
    if (userAnswer === correctAnswer) {
        quizScore++;

        alert(
            "✅ Correct!\n\n" +
            "Great job!"
        );
    }

    // Wrong answer
    else {
        const correctIndex =
            correctAnswer.charCodeAt(0) - 97;

        const correctText =
            currentQuestion.options[correctIndex];

        alert(
            "❌ Wrong!\n\n" +
            "Correct answer: " +
            correctAnswer.toUpperCase() +
            ". " +
            correctText
        );
    }

    // Next question
    if (currentQuizQuestion < questions.length - 1) {
        currentQuizQuestion++;
        loadQuizQuestion();
    }

    // Finish quiz
    else {
        showQuizResult();
    }
}

// ==================== QUIZ RESULT ====================

function showQuizResult() {
    const questions =
        quizData[selectedLanguage];

    const total =
        questions.length;

    const percentage =
        Math.round((quizScore / total) * 100);

    let message;

    if (percentage === 100) {
        message = "Perfect score! 🔥";
    } else if (percentage >= 80) {
        message = "Great job! 🎉";
    } else if (percentage >= 60) {
        message = "Good effort! Keep practicing. 💪";
    } else {
        message = "Keep studying and try again! 📚";
    }

    const quizContent =
        document.querySelector(".quiz-content");

    if (!quizContent) {
        return;
    }

    quizStarted = false;

    quizContent.innerHTML = `
        <div class="quiz-result">

            <p class="page-label">
                QUIZ COMPLETE
            </p>

            <h1>
                ${languageNames[selectedLanguage]}
            </h1>

            <div class="score-circle">
                ${quizScore}/${total}
            </div>

            <h2>
                ${percentage}%
            </h2>

            <p>
                ${message}
            </p>

            <button
                class="primary-button"
                id="retryQuizButton">
                Try Again
            </button>

            <button
                class="primary-button"
                id="continueActivityButton">
                Continue to Activity →
            </button>

        </div>
    `;

    const retryButton =
        document.getElementById("retryQuizButton");

    if (retryButton) {
        retryButton.addEventListener(
            "click",
            startQuiz
        );
    }

    const activityButton =
        document.getElementById(
            "continueActivityButton"
        );

    if (activityButton) {
        activityButton.addEventListener(
            "click",
            () => {
                showPage("activityPage");
            }
        );
    }
}

// ==================== ACTIVITY ====================

const runCodeButton =
    document.getElementById("runCodeButton");

if (runCodeButton) {
    runCodeButton.addEventListener("click", () => {
        const codeInput =
            document.getElementById("codeInput");

        const output =
            document.getElementById("output");

        if (!codeInput || !output) {
            return;
        }

        const code =
            codeInput.value.trim();

        if (code === "") {
            output.textContent =
                "Please write some code first.";
            return;
        }

        if (
            code.includes("Hello") ||
            code.includes("hello")
        ) {
            output.textContent =
                "Hello, CodeMate!";
        } else {
            output.textContent =
                "Code received! 💻\n\n";
        }
    });
}

// ==================== LOGOUT ====================

if (logoutButton) {
    logoutButton.addEventListener("click", () => {

        selectedLanguage = null;
        currentGuide = 0;
        currentQuizQuestion = 0;
        quizScore = 0;
        quizStarted = false;

        clearLanguageHighlight();
        hideLanguageNavigation();

        dashboardPage.classList.add("hidden");
        loginPage.classList.add("hidden");
        welcomePage.classList.remove("hidden");

        // Reset quiz
        const quizContent =
            document.querySelector(".quiz-content");

        if (quizContent) {
            quizContent.innerHTML = `
                <h1 id="quizTitle">
                    Choose a Language
                </h1>

                <p id="quizQuestionText">
                    Select a programming language
                    before starting the quiz.
                </p>

                <div class="quiz-options"></div>

                <button
                    class="primary-button"
                    id="nextQuizButton">
                    Next →
                </button>
            `;
        }
    });
}

// ==================== INITIALIZATION ====================

function init() {

    if (welcomePage) {
        welcomePage.classList.remove("hidden");
    }

    if (loginPage) {
        loginPage.classList.add("hidden");
    }

    if (dashboardPage) {
        dashboardPage.classList.add("hidden");
    }

    hideLanguageNavigation();
    clearLanguageHighlight();
}

init();