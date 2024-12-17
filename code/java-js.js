let question; // المتغير الذي سيحمل السؤال الحالي
let form; // المتغير الذي سيحمل النموذج (form) في HTML
let res; // المتغير الذي سيحمل عنصر عرض النتيجة
let qno; // المتغير الذي سيحتفظ برقم السؤال الحالي
let score; // المتغير الذي سيحتفظ بدرجة الاختبار

// تعريف قائمة من الأسئلة مع الإجابات والدرجات الخاصة بكل سؤال
const questions = [
    {
        title : "ماهي الكلمه المفتاحية التي تستخدم لانشاء كائن جديد في java?", // عنوان السؤال
        options : [
            'create', // 0
            'make', // 1
            'new', // 2
            'build' // 3
        ],
        answer : '2', // الإجابة الصحيحة هي الخيار 2 (new)
        score : 1 // الدرجة لكل إجابة صحيحة هي 1
    },
    // باقي الأسئلة بنفس الشكل
];

// دالة لإعادة تشغيل الاختبار بعد الانتهاء
function restartScreen() {
    // تحديث العنوان ليعرض الدرجة النهائية
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`;
    
    // الحصول على العنصر الذي يحتوي على الأسئلة وعرض جميع الأسئلة والإجابات
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    
    // إظهار مفتاح الإجابة بعد انتهاء الاختبار
    document.querySelector('.answer-key').style.display = 'block';
    document.querySelector('button').style.display = 'block';
}

// دالة لإعادة تعيين خيارات الإجابة للمستخدم بعد كل سؤال
function resetradio() {
    // إزالة خاصية 'disabled' من كل الخيارات لتمكين المستخدم من التحديد
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle"); // إعادة تعيين النتيجة إلى الحالة الافتراضية
    res.innerHTML = "Empty"; // عرض كلمة "Empty" كحالة مبدئية
}

// دالة لتقييم الإجابة التي اختارها المستخدم
function evaluate() {
    // إذا كانت الإجابة الصحيحة، نعرض "Correct" وإذا كانت خاطئة نعرض "Incorrect"
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct"); // تغيير لون النص إلى أخضر
        res.innerHTML = "Correct"; // عرض "Correct"
        score += questions[qno].score; // إضافة درجة السؤال إلى الدرجة الكلية
    } else {
        res.setAttribute("class","incorrect"); // تغيير لون النص إلى أحمر
        res.innerHTML = "Incorrect"; // عرض "Incorrect"
    }
    // تعطيل جميع الخيارات بعد الإجابة لتجنب التعديل بعد الإجابة
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled",""); // تعطيل الخيار
    });
}

// دالة لتحميل السؤال التالي بعد الإجابة عليه
function getNextQuestion() {
    qno++; // زيادة رقم السؤال
    ques = questions[qno]; // تحديد السؤال الحالي بناءً على الرقم
    question.innerHTML = ques.title; // عرض عنوان السؤال
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx]; // عرض الخيارات
    }); 
}

// دالة للتعامل مع إرسال النموذج (الإجابة على السؤال)
function handleSubmit(e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة عند إرسال النموذج
    if(!form.op.value) {
        alert('الرجاء اختيار الاجابه'); // إذا لم يختار المستخدم إجابة، تظهر رسالة تحذير
    }
    else if(form.submit.classList.contains('submit')) {
        evaluate(); // إذا كان النموذج في حالة "Submit"، نقوم بتقييم الإجابة
        form.submit.classList.remove('submit'); // تغيير الفئة من "submit" إلى "next"
        form.submit.value = "Next"; // تغيير النص إلى "Next"
        form.submit.classList.add('next');
    }
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion(); // الانتقال إلى السؤال التالي
        resetradio(); // إعادة تعيين الإجابات
        form.submit.classList.remove('next'); // إعادة تعيين فئة الزر
        form.submit.value = "Submit"; // إعادة النص إلى "Submit"
        form.submit.classList.add('submit');
        form.reset(); // إعادة تعيين النموذج
    }
    else if(form.submit.classList.contains('next')) {
        restartScreen(); // إذا تم الوصول إلى آخر سؤال، نقوم بإظهار النتيجة النهائية
        form.submit.classList.remove('next'); // إعادة تعيين فئة الزر
        form.submit.value = "Submit"; // إعادة النص إلى "Submit"
        form.submit.classList.add('submit');
        form.reset(); // إعادة تعيين النموذج
    }
}

// دالة لت初始化 الصفحة وعرض أول سؤال
function init() {
    // إنشاء هيكل HTML للاختبار داخل الصفحة
    document.body.innerHTML = `
        <h1 class="quiz-heading"> اختبار تجريبي للغة java</h1>
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

    // ربط المتغيرات بالعناصر في الصفحة
    question = document.querySelector('#question');
    form = document.querySelector('form');
    res = document.querySelector('#res');
    qno = -1; // تحديد رقم السؤال الحالي ليبدأ من -1
    score = 0; // الدرجة الابتدائية هي 0
    form.addEventListener('submit', handleSubmit); // ربط حدث إرسال النموذج مع دالة التعامل مع الإجابة

    // ربط زر العودة إلى الصفحة الرئيسية
    document.getElementById('homeButton').addEventListener('click', function() {
        window.location.href = 'index.html'; // إعادة التوجيه إلى الصفحة الرئيسية
    });

    getNextQuestion(); // عرض السؤال الأول عند بدء الاختبار
}
init(); // تنفيذ الدالة التي تبدأ الاختبار
