window.onload = function() {
    // document.getElementById("exam").classList.add("hide");
    // document.getElementById("creat").classList.remove("hide");
    showInput();
};

function showInput() {
    document.getElementById("exam").classList.remove("hide");
    // document.getElementById("submit").classList.remove("hide");
    document.getElementById("creat").classList.add("hide");
    document.getElementById("side-bar1").classList.remove("hide");
    document.getElementById("side-bar2").classList.remove("hide");
}

function start() {
    const numberOfQuestions = parseInt(document.getElementById("inputNumber").value);
    if (numberOfQuestions && numberOfQuestions > 0) {
        const questionsDiv = document.getElementById("questions");
        const currentQuestionCount = questionsDiv.querySelectorAll(".question").length;

        if (numberOfQuestions > currentQuestionCount) {
            for (let i = currentQuestionCount; i < numberOfQuestions; i++) {
                addQuestion(i); // إضافة سؤال لكل رقم مدخل
            }
        } else if (numberOfQuestions < currentQuestionCount) {
            const questionsToRemove = currentQuestionCount - numberOfQuestions;
            for (let i = 0; i < questionsToRemove; i++) {
                questionsDiv.lastElementChild.remove(); // حذف الأسئلة الزائدة
            }
            questionCount = numberOfQuestions; // تحديث عدد الأسئلة ليطابق العدد الحالي
        }
        questionsDiv.classList.remove("hide");
        document.getElementById("addQuestionButton").classList.remove("hide");
        document.getElementById("submit").classList.remove("hide");
        updateQuestionNumbers(); // تحديث أرقام الأسئلة بعد كل عملية
    } else {
        alert("Please enter a valid number of questions");
    }
}

let questionCount = 0;

function addQuestion(index) {
    questionCount++; // زيادة عدد الأسئلة
    const questionsDiv = document.getElementById("questions");
    const questionHTML = `
        <div class="question">
            <h3>Question ${questionCount}</h3>
            <label for="mark${questionCount}">mark: </label><input type="number" placeholder="كم درجة هذا السؤال؟" class="mark" name="mark${questionCount}">
            <input type="text" placeholder="Enter question text" name="question${questionCount}" style="background-color: rgb(243, 250, 255)"><br><br>
            <input type="text" placeholder="Option 1" name="option1_${questionCount}" class="option-input">
            <input type="text" placeholder="Option 2" name="option2_${questionCount}" class="option-input">
            <input type="text" placeholder="Option 3" name="option3_${questionCount}" class="option-input">
            <input type="text" placeholder="Option 4" name="option4_${questionCount}" class="option-input">
            <span>Correct Answer: </span>
            <div class="button-group">
                <button type="button" onclick="selectOption(this, 'option1_${questionCount}')">Option 1</button>
                <button type="button" onclick="selectOption(this, 'option2_${questionCount}')">Option 2</button>
                <button type="button" onclick="selectOption(this, 'option3_${questionCount}')">Option 3</button>
                <button type="button" onclick="selectOption(this, 'option4_${questionCount}')">Option 4</button>
                <input type="hidden" name="correct_${questionCount}" value="">
            </div>
            <button class="deleteBtn" onclick="deleteQuestion(this)">Delete</button>
        </div>
    `;
    questionsDiv.insertAdjacentHTML('beforeend', questionHTML);
}

function selectOption(button, value) {
    const buttonGroup = button.parentElement;
    buttonGroup.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    buttonGroup.querySelector("input[type='hidden']").value = value;

    const questionDiv = buttonGroup.parentElement;
    const optionInputs = questionDiv.querySelectorAll(".option-input");
    optionInputs.forEach(input => input.classList.remove("selected"));
    questionDiv.querySelector(`input[name='${value}']`).classList.add("selected");
}

function deleteQuestion(button) {
    const questionDiv = button.parentElement;
    questionDiv.remove();
    updateQuestionNumbers(); // تحديث أرقام الأسئلة بعد حذف سؤال
    questionCount--; // تقليل عدد الأسئلة
}

function updateQuestionNumbers() {
    const questions = document.querySelectorAll(".question");
    questions.forEach((question, index) => {
        question.querySelector("h3").textContent = `Question ${index + 1}`;
        const inputs = question.querySelectorAll("input[type='text'], input[type='hidden'], input[type='number']");
        inputs.forEach(input => {
            const name = input.getAttribute("name");
            if (name.startsWith("question")) {
                input.setAttribute("name", `question${index + 1}`);
            } else if (name.startsWith("option1_")) {
                input.setAttribute("name", `option1_${index + 1}`);
            } else if (name.startsWith("option2_")) {
                input.setAttribute("name", `option2_${index + 1}`);
            } else if (name.startsWith("option3_")) {
                input.setAttribute("name", `option3_${index + 1}`);
            } else if (name.startsWith("option4_")) {
                input.setAttribute("name", `option4_${index + 1}`);
            } else if (name.startsWith("correct_")) {
                input.setAttribute("name", `correct_${index + 1}`);
            } else if (name.startsWith("mark")) {
                input.setAttribute("name", `mark${index + 1}`);
            }
        });
    });
}

function showTimeOptions(show) {
    var timeOptions = document.querySelector('.timeOptions');
    if (show) {
        timeOptions.classList.remove('hide');
    } else {
        timeOptions.classList.add('hide');
    }
}

function allMark(show) {
    var examGradeInput = document.querySelector('.numberOfDegree');
    var bignumber = document.querySelector('.bignumber');
    var marks = document.querySelectorAll('.mark');

    if (show) {
        var examGrade = examGradeInput.value;
        var x = examGrade / bignumber.value;
        
        if (examGrade) {
            console.log(x);
            marks.forEach(function(mark) {
                mark.value = x;
            });
        }
    }
}

function submit() {
    const subjectName = document.getElementById("subjectName").value;
    const examGrade = document.getElementById("examGrade").value;
    const examTime = document.querySelector('input[name="examTime"]:checked') ? document.querySelector('input[name="examTime"]:checked').value : null;
    const examTimeMinutes = document.getElementById("examTimeMinutes").value;
    const questions = document.querySelectorAll(".question");
    
    if (!subjectName) {
        alert("Please enter the subject name.");
        return;
    }
    
    if (!examGrade) {
        alert("Please enter the exam grade.");
        return;
    }
    
    let examData = {
        subjectName: subjectName,
        examGrade: examGrade,
        examTime: examTime === "yes" ? examTimeMinutes : null,
        questions: []
    };

    questions.forEach((question, index) => {
        let questionText = question.querySelector(`input[name="question${index + 1}"]`).value;
        let mark = question.querySelector(`input[name="mark${index + 1}"]`).value;
        let correctAnswer = question.querySelector(`input[name="correct_${index + 1}"]`).value;
        let options = [];
        
        question.querySelectorAll(".option-input").forEach((option, i) => {
            options.push(option.value);
        });

        if (!questionText || !mark || !correctAnswer || options.includes("")) {
            alert(`Please complete all fields for Question ${index + 1}.`);
            return;
        }

        examData.questions.push({
            id: index,
            mark: mark,
            question: questionText,
            options: options,
            correct: correctAnswer
        });
    });

    let exams = JSON.parse(localStorage.getItem('exams')) || [];
    exams.push(examData);
    localStorage.setItem('exams', JSON.stringify(exams));
    window.location.href = "exams.html";
}
