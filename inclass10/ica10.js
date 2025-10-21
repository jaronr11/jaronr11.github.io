let triviaBtn = document.querySelector("#js-new-quote").addEventListener('click', newTrivia);

let answerBtn = document.querySelector("#js-tweet").addEventListener('click', newAnswer);

let current = {
    question: "",
    answer: "",
};

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
async function newTrivia() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        displayTrivia(json["question"]);

        current.question = json['question'];
        current.answer = json['answer'];
    }
    catch(err) {
        console.log(err);
        alert("Failed to get new trivia");
    }
}

function displayTrivia(question) {
    const questionText = document.querySelector('#js-quote-text');
    const answer = document.querySelector('#js-answer-text');

    questionText.textContent = question;
    answer.textContent = "";


}


function newAnswer() {
    const answer = document.querySelector('#js-answer-text');
    answer.textContent = current.answer;
}
newTrivia();
