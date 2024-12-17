let question;
let form;
let res;
let qno;
let score;

const questions = [
    {
        title : "ماهي الكلمه المحجوزه لتعريف داله في بايثون",
        options : [
            'function', // 0
            'def', // 1
            'class', // 2
            'method' // 3
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'اي من الخيارات التاليه هو نوع بيانات في بايثون؟',
        options : [
            'int',
            'class',
            'if',
            'def'
        ],
        answer : '0',
        score : 1
    },
    {
        title : "ماهي الكلمه المفتاحيه التي تستخدم لإنشاء كائن جديد في بايثون؟",
        options : [
            'new', // 0
            'class', // 1
            'init', // 2
            'def' // 3
        ],
        answer : '1',
        score : 1
    },
    {
        title : "أي من الأنواع التالية يُستخدم لتخزين النصوص في بايثون؟",
        options : [
            'int', // 0
            'float', // 1
            'string', // 2
            'boolean' // 3
        ],
        answer : '2',
        score : 1
    },
    {
        title : "ما هي الطريقة الصحيحة لإضافة عنصر إلى قائمة في بايثون؟",
        options : [
            'append()', // 0
            'add()', // 1
            'insert()', // 2
            'push()' // 3
        ],
        answer : '0',
        score : 1
    }
];



function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    
    

    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Empty";
}

function evaluate() {
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        res.innerHTML = "Correct";
        score += questions[qno].score;

    } 
    else {
        res.setAttribute("class","incorrect");
        res.innerHTML = "Incorrect";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 
}

function handleSubmit(e) {
    e.preventDefault();
    if(!form.op.value) {
        alert('الرجاء اختيار الاجابه');
    }
    else if(form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Next"
        form.submit.classList.add('next');
    }
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
    else if(form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
}
function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">اختبار تجريبي للغة Python </h1>
        <div class="app-body">
            <h1 class="answer-key">الاجابات</h1>
            <div class="question-card">
                <h2 id='question'>Question</h2>
                <form>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id="res" class="idle">Empty</div><br>
                    <input type="submit" name="submit" value="Submit" class="submit"/>
                </form>
            </div>
            <button id="homeButton">العودة إلى الصفحة الرئيسية</button> <!-- زر العودة -->
        </div>
    `;

    question = document.querySelector('#question');
    form = document.querySelector('form');
    res = document.querySelector('#res');
    qno = -1;
    score = 0;
    form.addEventListener('submit', handleSubmit);

    // ربط زر العودة إلى الصفحة الرئيسية
    document.getElementById('homeButton').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

   
    
    getNextQuestion();
}
init()