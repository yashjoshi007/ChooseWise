let mic = document.getElementById("mic");
let chatareamain = document.querySelector(".chatarea-main");
let chatareaouter = document.querySelector(".chatarea-outer");
// alert("hi");
let intro = [
  "Hello, I am Cookie bot. How may I help you?",
  "Hi, I am a cookie the bot. How may I help you?",
  "Hello, My name is Cookie bot. How may I help you?",
];
let help = ["How may i assist you?", "How can i help you?", "What i can do for you?"];
let greetings = ["I am good y", "I am fine, what about you", "i am good"];
let hobbies = [
  "i love to solve people's issues",
  "i like to find solution to people's problems",
  "i like answering to queries",
];
let pizzas = [
  "You can know about them in the developers sections which is mentioned on the home page .",
];
let thank = ["Most welcome", "Not an issue", "Its my pleasure", "Mention not"];
let closing = [
  "We have various schools registered on our site whose fees range varies from 18,000 p.a to 60,000 p.a",
];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function showusermsg(usermsg) {
  let output = "";
  output += `<div class="chatarea-inner user">${usermsg}</div>`;
  chatareaouter.innerHTML += output;
  return chatareaouter;
}

function showchatbotmsg(chatbotmsg) {
  let output = "";
  output += `<div class="chatarea-inner chatbot">${chatbotmsg}</div>`;
  chatareaouter.innerHTML += output;
  return chatareaouter;
}

function chatbotvoice(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text =
    "I cannot understand your query, you can mail your queries at cookieclan@gmail.com, regards Cookie Bot.";
  if (message.includes("hello")) {
    let finalresult = intro[Math.floor(Math.random() * intro.length)];
    speech.text = finalresult;
  }
  if (message.includes("hi")) {
    let finalresult = intro[Math.floor(Math.random() * intro.length)];
    speech.text = finalresult;
  }
  if (message.includes("who are you")) {
    let finalresult = intro[Math.floor(Math.random() * intro.length)];
    speech.text = finalresult;
  }
  if (message.includes("can you help me")) {
    let finalresult = help[Math.floor(Math.random() * help.length)];
    speech.text = finalresult;
  }
  if (message.includes("how are you" || "how are you doing today")) {
    let finalresult = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalresult;
  }
  if (
    message.includes(
      "tell me something about you" || "tell me something about your hobbies"
    )
  ) {
    let finalresult = hobbies[Math.floor(Math.random() * hobbies.length)];
    speech.text = finalresult;
  }
  if (message.includes("developers")) {
    speech.text = "This project is developed by members of Cookie Clan.";
  }
  if (message.includes("thank you" || "thank you so much")) {
    let finalresult = thank[Math.floor(Math.random() * thank.length)];
    speech.text = finalresult;
  }
  if (message.includes("fee structure")) {
    let finalresult = closing[Math.floor(Math.random() * closing.length)];
    speech.text = finalresult;
  }
  window.speechSynthesis.speak(speech);
  chatareamain.appendChild(showchatbotmsg(speech.text));
}

recognition.onresult = function (e) {
  let resultIndex = e.resultIndex;
  let transcript = e.results[resultIndex][0].transcript;
  chatareamain.appendChild(showusermsg(transcript));
  chatbotvoice(transcript);
  console.log(transcript);
};
recognition.onend = function () {
  mic.style.background = "#ff3b3b";
};
mic.addEventListener("click", function () {
  mic.style.background = "#39c81f";
  recognition.start();
  console.log("Activated");
});
