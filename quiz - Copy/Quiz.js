// window.onload = function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const quizArrayString = urlParams.get('quizArray');
//     window.quizArray = JSON.parse(quizArrayString);

//     // استخدام quizArray بعد التأكد من تعيينه
//     console.log(quizArray);

//     // باقي الكود الخاص بامتحان الـ Quiz يأتي هنا، مثل عرض الأسئلة والتحقق من الإجابات وحساب النتيجة.

//     startDiv.classList.remove("hide");
//     Exam.classList.add("hide");
//     scoreDiv.classList.add("hide");
//     restartBtn.onclick = function() {
//         initial();
//         Exam.classList.remove("hide");
//         scoreDiv.classList.add("hide");
//         if(again) {
//             review.classList.add("hide");
//         }
//         count = pp;
//     };
// };

const articale = true;
const again = false;// هل يستطيع المستخدم اعادةالامتحان
const time = true;//ما ليها لازمة
let count = 30; //لو الامتحان مقالي فالرقم دا دقايق لو غير مقالي فالرقم دا ثواني
let skip = true; //هل يستطيع المستخدم تخطي بعض الاسئلة
let mono = true;
//عايزين نعمل لما يحل اجابة صح بياخد درجتين او درجة




//////////////////////////////////////////////////////////////////////////////////////
let pp = count
if(articale == true){
    document.getElementById("next-button").classList.add("hide");
}
document.querySelector('.hamburger-menu').addEventListener('click', () => {
    document.querySelector('.nav-links ul').classList.toggle('show');
});
// let time = true;//this exam by time or not
// let count = 30; //how time by minte?
// const quizArray = [
//     { id: "0", mark: 1, question: "how solve Mohammed's homework", options: ["Mohammed", "Kareem", "Osama", "Ahmed"],  correct: "Mohammed" },
//     { id: "1", mark: 3, question: "how solve Osama's    homework", options: ["Mohammed", "Ali", "Osama", "Ahmed"],     correct: "Osama" },
//     { id: "2", mark: 2, question: "how solve Ashraf's   homework", options: ["Kareem", "Ashraf", "Osama", "Hend"],     correct: "Ashraf" },
//     { id: "3", mark: 4, question: "how solve Donia's    homework", options: ["Mohammed", "Ali", "Osama", "Donia"],     correct: "Donia" },
//     { id: "4", mark: 5, question: "how solve Youssef's  homework", options: ["Mohammed", "Youssef", "Osama", "Ahmed"], correct: "Youssef" },
//     { id: "5", mark: 6, question: "how solve Fathy's    homework", options: ["Fathy", "Ali", "Osama", "Ahmed"],        correct: "Fathy" },
//     { id: "6", mark: 1, question: "how solve Kareem's   homework", options: ["Hamas", "Ali", "Osama", "Kareem"],       correct: "Kareem" },
//     { id: "7", mark: 6, question: "how solve Saed's     homework", options: ["Mohammed", "Ali", "Saed", "Ahmed"],      correct: "Saed" },
//     { id: "8", mark: 1, question: "how solve Hend's     homework", options: ["Mohammed", "Hend", "Osama", "Ahmed"],    correct: "Hend" },
//     { id: "9", mark: 4, question: "how solve Hamas's    homework", options: ["Hamas", "Ali", "Osama", "Ahmed"],        correct: "Hamas" }
// ];
// quizArray.push({id: "3", mark: 90, question: "how solve Mohammed's jjj", options: ["Mohammed", "Kareem", "Osama", "Ahmed"],  correct: "Mohammed" });
// console.log(quizArray);
let s = 1;
const Exam = document.getElementById("Exam");
const scoreDiv = document.querySelector(".score-div");
const review = document.querySelector(".review");

const startDiv = document.querySelector(".start-div");



 
window.onload = function() {
    startDiv.classList.remove("hide");
    Exam.classList.add("hide");
    scoreDiv.classList.add("hide");
};


// const startButton = document.getElementById("start-button");
// startButton.onclick = 

function start() {
    startDiv.classList.add("hide");
    Exam.classList.remove("hide");
    initial();
};



const userScore = document.getElementById("score");
const restartBtn = document.getElementById("restart");
restartBtn.onclick = function() {
    initial();
    Exam.classList.remove("hide");
    scoreDiv.classList.add("hide");
    if(again){
    review.classList.add("hide");}
    count = pp;
};
if(!again){restartBtn.classList.add("hide");}


let scoreCount = 0;
let rong = 0;
let questionCount = 0;
let countdown;
const quizContainer = document.getElementById("Exam-mid");
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    rong = 0
    // count = 15;
    
    clearInterval(countdown);
    timerDisplay();
    
    
    quizCreator();
    quizDisplay(questionCount);
}

var sumMark = 0;
// let questionCount = 0;
const nextBtn = document.getElementById("next-button");
const countOfQuestion = document.querySelector(".numberOfQuestion");
nextBtn.addEventListener("click", displayNext);
function displayNext() {
    questionCount++;
    if (questionCount == quizArray.length) {
        Exam.classList.add("hide");
        scoreDiv.classList.remove("hide");
        startDiv.classList.add("hide");
        userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount} & missed ${rong} & passed ${questionCount-(rong + scoreCount)}`;
        // // userScore.innerHTML = `Your score is <span style="color: green;">${scoreCount}</span> out of ${questionCount} & missed <span style="color: red;">${rong}</span> & passed <span style="color: black;">${questionCount - (rong + scoreCount)}</span>`;
    } else { 
        countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
        quizDisplay(questionCount);
        count = pp;
        if(articale == false){
        clearInterval(countdown);
        timerDisplay();
        }

    }
}
if(articale){
    document.getElementById("finsh").classList.remove("hide");
    const finsh = document.getElementById("finsh");
    finsh.addEventListener("click", Finsh);
    function Finsh(){
        if(articale && !skip && (questionCount-(rong + scoreCount))>0 && count != 0){
                                    var targetElement = document.querySelector('.shape:not(.clickeed)');
                                        // استخدم الخاصية scrollTop لتعيين الموضع العمودي للتمرير
                                        window.scrollTo({
                                            top: targetElement.offsetTop,
                                            behavior: 'smooth' // تجعل الحركة ناعمة
                                        });
        }else{
        Exam.classList.add("hide");
        scoreDiv.classList.remove("hide");
        startDiv.classList.add("hide");
        review.classList.remove("hide");
        //////////////////////////////////////
        clearInterval(countdown);
        s = 1;
        
        for(let i = 0; i < quizArray.length; i++){
            sumMark += quizArray[i].mark;
        }
        userScore.innerHTML = `You solve ${scoreCount} out of ${questionCount} & missed ${rong} & passed ${questionCount-(rong + scoreCount)} <br>`;
        userScore.innerHTML += `Your score is ${sum} out of ${sumMark}`;
        // userScore.innerHTML = `Your score is <span style="color: green;">${scoreCount}</span> out of ${questionCount} & missed <span style="color: red;">${rong}</span> & passed <span style="color: black;">${questionCount - (rong + scoreCount)}</span>`;
        // review.innerHTML =`${document.querySelectorAll('.shape')[1].innerHTML}`;
        // var lineBreak = document.createElement("br");
        
        for (let i = 0; i < quizArray.length; i++){
            review.innerHTML += ` <br> <br> `;
            // review.innerHTML += `<hr>`;
            review.innerHTML += `${document.querySelectorAll('.shape')[i].innerHTML}`;
            // whatt(document.querySelectorAll('.shape')[i].innerHTML , i);
            review.innerHTML += ` <br> <br> `;
        }
        if(mono){
            document.querySelectorAll('.truee').forEach(element => { element.classList.add("correct");element.classList.remove("choise");});
            // document.querySelectorAll('.truee').forEach(element => { if (document.querySelector('.shape:not(.clickeed)')) { element.classList.remove("correct");}});
            document.querySelectorAll('.choise').forEach(element => {if(document.querySelectorAll('.choise')[0] != document.querySelectorAll('.truee')[0]) {element.classList.add("incorrect");element.classList.remove("choise");}});
    
        }

        var above = document.querySelector('.shape');
                                        // استخدم الخاصية scrollTop لتعيين الموضع العمودي للتمرير
                                        window.scrollTo({
                                            top: above.offsetTop,
                                            // behavior: 'smooth' // تجعل الحركة ناعمة
                                        });
    }
}}

const timeLeft = document.querySelector(".time-left");
function timerDisplay() {
    function updateTimer() {
        
                    if(articale==false){
                    timeLeft.innerHTML = `${count}s`;}
                    else{timeLeft.innerHTML = `${count} m`;}

                    if (count == 0) {
                        if(articale == false){
                        displayNext();}
                        else{
                            clearInterval(countdown);
                            Finsh();
                        }
                    } else {
                        if(articale==false){
                        countdown = setTimeout(updateTimer, 1000);}
                        else{countdown = setTimeout(updateTimer, 60*1000);}
                        // else{countdown = setTimeout(updateTimer, 10);}
                    }
        count--;
    }
    updateTimer();
}


function quizDisplay(questionCount) {
    const quizCards = document.querySelectorAll(".shape");
    if(articale == true){
    for (let i = 0; i < quizCards.length; i++) {
        quizCards[i].classList.remove("hide");
        
        
    }}
    else{
        for (let i = 0; i < quizCards.length; i++) {
            quizCards[i].classList.add("hide");
        }
        quizCards[questionCount].classList.remove("hide");
}
}



function shuffleArray(array) {
    return array.sort(function() {
        return Math.random() - 0.5;
    });
}
function quizCreator() { 

    countOfQuestion.innerHTML = "1 of " + quizArray.length + " Question";

    shuffleArray(quizArray); 

    for (var i = 0; i < quizArray.length; i++) {
        const div = showQuestionAndOptions(quizArray[i]);

        quizContainer.appendChild(div);
        if(articale==true){
        if(i < quizArray.length-1){
        var lineBreak = document.createElement("br");
        quizContainer.appendChild(lineBreak);
        var hr = document.createElement("br");
        quizContainer.appendChild(hr);
        }}



        shuffleArray(quizArray[i].options);
        if(articale){
        questionCount++;
        }
    }
    
    
}

    function showQuestionAndOptions(questioN) {
        const div = document.createElement("div");
        // div.classList.add("shape", "hide");
        div.classList.add("shape");
        // let j = questioN.id;
        // div.id = j;
        const p = document.createElement("p");  
        p.classList.add("question");
        
        const span = document.createElement("span");  
        span.classList.add("span"); 
        span.innerHTML = questioN.mark;

        p.innerHTML = s+") "+questioN.question ;
        s += 1;
        
        p.style.display = 'inline';
        div.appendChild(p);
        div.appendChild(span);

        for (var z = 0; z < questioN.options.length; z++) {
            const button = document.createElement("button");
            button.classList.add("option-div");
            // button.classList.add(`${questioN.id}`);
            // console.log(questioN.id[-1]);
            // button.className = `${j}`;
            button.innerHTML = questioN.options[z];

            
            

            if(articale){
            button.classList.add(`${questionCount}`);
            }
            div.appendChild(button);
            // console.log(questioN.id);
            if(mono){
                if (questioN.options[z] === questioN.correct){button.classList.add("truee");}}

            button.onclick = function() {
            checker(button);
            }
            
        }
        // x += 10;
        // console.log(x);
        return div;
    }


//

var sum = 0;
// let questionCount = 0;
// let scoreCount = 0;
function checker(userOption) {
    
    const userSolution = userOption.innerText; //"osama"
    
    
    // console.log(question1);
    // console.log(userOption.classList[1]);
    

    // console.log(Math.floor(0 / 10));
    // console.log(Math.floor(userOption.id/10));
    // const question1 = document.getElementsByClassName("shape")[Math.floor(userOption.id/10)];
    // const question1 = document.getElementsByClassName("shape")[questionCount];
    // const options1 = question1.querySelectorAll(".option-div");
    // const question_art = document.getElementsByClassName("shape")[questionCount];
    // const options_art = question.querySelectorAll(".option-div");

    // console.log(button.classList[1]);
    
    // const sss = document.getElementsByClassName("shape")[userOption.className].querySelectorAll(".option-div");
    if(articale == false){
        const question = document.getElementsByClassName("shape")[questionCount];
        const options = question.querySelectorAll(".option-div");
        
        if (userSolution === quizArray[questionCount].correct) {
            userOption.classList.add("correct");
            scoreCount++;
        } else {
            userOption.classList.add("incorrect");
            rong++;
            options.forEach(option => {
                if (option.innerText == quizArray[questionCount].correct){
                    option.classList.add("correct");
                }
            });
            clearInterval(countdown);
            
            }
            clearInterval(countdown);
            options.forEach(option => option.disabled = true);
    }
    else if(articale){
        const question1 = document.getElementsByClassName("shape")[userOption.classList[1]];
        
        const options1 = question1.querySelectorAll(".option-div");


        
        // options1.forEach(option => option.classList.remove("choise"));

        // for (let i = 0; i < options1.length; i++) {
        //     if(options1[i].correct.classList == ("choise")){
        //         scoreCount--;
        //     }else if(options1[i].classList == ("choise") && options1[i].correct.classList != ("choise")){
        //         rong--;
        //     }
        //     options1[i].classList.remove("choise");
        // }

        for (let i = 0; i < options1.length; i++) {
            if(options1[i].classList.contains("choise")){
                if(options1[i].innerHTML === quizArray[userOption.classList[1]].correct){
                    
                    scoreCount--;
                    sum = sum - quizArray[userOption.classList[1]].mark ;
                    
                } else {
                    rong--;
                    // rong = rong- quizArray[userOption.classList[1]].mark ;
                }
            }
            options1[i].classList.remove("choise");
        }
        
            userOption.classList.add("choise");
            question1.classList.add("clickeed");
        options1.forEach(option => option.disabled = false);
        userOption.disabled = true;
        userOption.style.cursor = "pointer";

                                        if (userSolution === quizArray[userOption.classList[1]].correct) {
                                            scoreCount++;
                                            sum = sum + quizArray[userOption.classList[1]].mark ;
                                            
                                            
                                        } else if (userSolution != quizArray[userOption.classList[1]].correct) {
                                            
                                            rong++;
                                            // rong = rong+ quizArray[userOption.classList[1]].mark ;
                                            
                                            }
                                            }}

 