const questions = [
     {
       question: "What is 2 + 2?",
       options: ["3", "4", "5", "6"],
       correctAnswer: 1, // Index of the correct option
     },
     {
       question: "Which of these is a divide and conquer algorithm?",
       options: ["Merge Sort  ", "Bubble Sort", "Selection Sort", "Insertion Sort"],
       correctAnswer: 0,
     },
     {
       question: "What data structure uses LIFO?",
       options: ["Stack  ", "Linked List", "Queue", "Array"],
       correctAnswer: 0,
     },
     {
       question: "What is the worst case time complexity of a linear search?",
       options: ["O(1)", "O(n) ", "O(log n)", "O(n^2)"],
       correctAnswer: 1,
     },
     {
       question: "Which data structure uses FIFO?",
       options: ["Array", "Stack", "Linked List", "Queue"],
       correctAnswer: 3,
     },
     {
       question: "In graph theory, what does BFS stand for?",
       options: ["Best Fit Search", "Binary Full Search", "Breadth-First Search  ", "Balance Factor Search"],
       correctAnswer: 2,
     },
     {
       question: "What is recursion in programming?",
       options: ["When the shortest path cannot be found", "A function that calls itself  ", "A syntax error", "Going in negative cycles"],
       correctAnswer: 1,
     },
     {
       question: "Which of these algorithms are usually implemented using recursion?",
       options: ["Merge sort  ", "Bubble sort", "Selection sort", "Radix sort"],
       correctAnswer: 0,
     },
     {
       question: "Which data structure allows us to access any element directly?",
       options: ["Queue", "Stack", "Array  ", "Linked List"],
       correctAnswer: 2,
     },
     {
       question: "What is the worst-case time complexity of Bubble Sort?",
       options: ["O(n^2)  ", "O(n)", "O(n log n)", "O(log n)"],
       correctAnswer: 0,
     },
     // Add more questions here
   ];
   
   let currentQuestion = 0;
   let score = 0;
   
   const questionCounter = document.getElementById("question-counter");
   const scoreCounter = document.getElementById("score");
   const questionText = document.getElementById("question-text");
   const options = document.querySelectorAll(".option");
   const nextButton = document.getElementById("next-button");
   const scoreboard = document.querySelector(".scoreboard");
   const finalScore = document.getElementById("final-score");
   const restartButton = document.getElementById("restart-button");
   
   // Get the "Start Quiz" button and quiz container elements
   const startQuizButton = document.getElementById("start-quiz-button");
   const quizContainer = document.querySelector(".quiz-container");
   
   // Add an event listener to start the quiz when the button is clicked
   startQuizButton.addEventListener("click", () => {
     // Hide the start button container
     startQuizButton.parentElement.style.display = "none";
     // Show the quiz container
     quizContainer.style.display = "block";
     // Start the quiz
     loadQuestion();
   });
   
   // Initially disable the "Next" button
   nextButton.disabled = true;
   
   // Variable to track whether an option has been clicked
   let optionClicked = false;
   
   function loadQuestion() {
     if (currentQuestion < questions.length) {
       questionCounter.textContent = `Question ${currentQuestion + 1}/${
         questions.length
       }`;
       questionText.textContent = questions[currentQuestion].question;
   
       options.forEach((option, index) => {
         option.textContent = questions[currentQuestion].options[index];
         option.style.backgroundColor = "white"; // Reset option background color
         option.style.pointerEvents = "auto"; // Re-enable click events
         option.onclick = function () {
           handleOptionClick(index);
         };
       });
   
       // Re-enable the "Next" button only if an option has been clicked
       nextButton.disabled = !optionClicked;
     } else {
       showScoreboard();
     }
   }
   
   function handleOptionClick(selectedOptionIndex) {
     const correctAnswerIndex = questions[currentQuestion].correctAnswer;
   
     // Remove click event listeners from all options to prevent multiple clicks
     options.forEach((option) => {
       option.style.pointerEvents = "none";
       option.onclick = null;
     });
   
     if (selectedOptionIndex === correctAnswerIndex) {
       options[selectedOptionIndex].style.backgroundColor = "green";
       score++;
       scoreCounter.textContent = `Score: ${score}`;
     } else {
       options[selectedOptionIndex].style.backgroundColor = "red";
       options[correctAnswerIndex].style.backgroundColor = "green";
     }
   
     optionClicked = true; // Mark an option as clicked
     nextButton.disabled = false;
   }
   
   function showScoreboard() {
     scoreboard.style.display = "block";
     finalScore.textContent = score;
   }
   
   nextButton.addEventListener("click", () => {
     currentQuestion++;
     optionClicked = false; // Reset optionClicked flag
     nextButton.disabled = true;
     loadQuestion();
   });
   
   restartButton.addEventListener("click", () => {
     currentQuestion = 0;
     score = 0;
     scoreboard.style.display = "none";
     loadQuestion();
     scoreCounter.textContent = "Score: 0";
     optionClicked = false; // Reset optionClicked flag
   });
   
   // Initialize the quiz
   loadQuestion();