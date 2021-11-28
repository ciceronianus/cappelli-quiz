// Global variables
var quizData; // global variable - HERE WE WILL STORE OUR JSON OBJECT - lATIN ABBREVIATIONS
var quizResults = 0;
var quizReplies = 0;

var results = [
  {
    "id": "0",
    "description": "Zero happens!"
  },
  {
    "id": "1",
    "description": "You are as good as me ;)"
  },
  {
    "id": "2",
    "description": "You are a bit better than me!"
  },
  {
    "id": "3",
    "description": "I guess, a beginner or Monday?"
  },
  {
    "id": "4",
    "description": "As good as an average medieval scribe!"
  },
  {
    "id": "5",
    "description": "A decent competency or a good luck!"
  },

  {
    "id": "6",
    "description": "Consider yourself knowledgeable!"
  },
  {
    "id": "7",
    "description": "Not bad. #impostorsyndrome"
  },
  {
    "id": "8",
    "description": "As good as Bischoff! At least!"
  },
  {
    "id": "9",
    "description": "Are you currently writing a dictionary of abbreviations?"
  },
  {
    "id": "10",
    "description": "You are the second reincarnation of Adriano Cappelli!"
  }

];


window.onload = function () {
  console.log("loaded");
  let startQuiz = document.getElementById('startQuiz');
  startQuiz.addEventListener('click', function () {
    quizLoad();
  });

}

function escapeRegExp(string){
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}




function quizLoad() {
  let button = document.getElementById('startQuiz');
  
  if (button.innerHTML === "Reset") {
    let tableBody = document.getElementById('quiz').querySelector('tbody');
    tableBody.innerHTML = "";
    quizResults = 0;
    quizReplies = 0;
    let scoreElement = document.getElementById('score');
    scoreElement.classList.add("hidden");


  }
  loadJSONfileFetch();
  button.innerHTML = "Reset";
}



function loadJSONfileFetch() {
  fetch('cappelli_min.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      /* parse JSON */
      console.log(typeof (json));
      /* do something with the JSON */
      // console.log(quizData);
      quizData = json;

      let randomItems = get10randomItems(quizData);
      console.log(randomItems);

      let html = "";
      for (let i = 0; i < 10; i++) {
        let obj = randomItems[i];
        let id = obj.id;
        let image = id + ".jpg";
        let imagePath = "img_abbr/" + image;
        let characters = obj.characters;
        let transcription = obj.transcription;
        

        let newCard = `
        <tr id="${id}-row">
        <td>
        <img id="${id}-image" loading="lazy" height="50px"  src="${imagePath}" alt="Card image cap">
        </td>
        <td>
         <input type="text" class="form-control" id="${id}-guess" placeholder=""/>
        </td>
        <td>
          <span id="${id}-Answer" class="hidden">${transcription}</span>
        </td>
        <td>
        <button type="button" class="btn btn-primary" id="${id}-showAnswer" onclick="checkAnswer(id)">Check</button>
        </td>
        </tr>
        `;
        
        html += newCard;

       


      }

      let quizElement = document.getElementById('quiz').querySelector('tbody');
      quizElement.innerHTML = html;


    })
    .catch(function (error) {
      console.log(error);
    });
}


function checkAnswer(idButton){
  let button = document.getElementById(idButton);
  let id = getStringBeforeBar(idButton);
  

  let guess = document.getElementById(id+"-guess");
  let answer = document.getElementById(id+"-Answer");

  
  guess.disabled = true;
  button.disabled = true;

  var regex = '\\b';
  regex += escapeRegExp(guess.value);
  regex += '\\b';

  const resultOfRegex = new RegExp(regex, "i").test(answer.innerHTML);


  if(resultOfRegex && guess.value.length > 0){
    button.innerHTML = "Correct!";
    button.className = "btn btn-success";
    quizResults++;
    
 

  }else{
    document.getElementById(id+"-showAnswer").innerHTML = "Wrong!";
    button.className = "btn btn-warning";
  }

  
  answer.classList.remove("hidden");
  quizReplies++;

  if(quizReplies == 10){
     displayResults();
    }
}


function getStringBeforeBar(str) {
  let index = str.indexOf("-");
  return str.substring(0, index);
}

function get10randomItems(arr) {
  let randomItems = [];
  for (let i = 0; i < 10; i++) {
    let randomNumber = Math.floor(Math.random() * arr.length);
    randomItems.push(arr[randomNumber]);
    arr.splice(randomNumber, 1);
  }
  return randomItems;
}


function displayResults(){
  let scoreElement = document.getElementById('score');
  scoreElement.classList.remove("hidden");
  scoreElement.innerHTML = "You scored <b>" + quizResults + " out of 10!</b>";
  scoreElement.innerHTML += "<br>";
  scoreElement.innerHTML += "<i>" + results[quizResults].description + "<i>";

}