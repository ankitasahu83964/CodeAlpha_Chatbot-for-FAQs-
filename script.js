// FAQ DATA
const faq = [
    { q: "what is your return policy", a: "You can return products within 30 days." },
    { q: "how do i track my order", a: "Use tracking link sent to your email." },
    { q: "do you offer international shipping", a: "Yes, we ship worldwide." },
    { q: "what payment methods do you accept", a: "We accept Visa, MasterCard, PayPal and Aconst" },
    { q: "hello", a: "Hi! How can I help you?" },
    { q: "hi", a: "Hello! Ask me anything 😊" },
    { q: "how are you", a: "I am fine 😊 How can I help you?" },
    { q: "good morning", a: "Good Morning 🌞 Have a great day!" },
    { q: "good night", a: "Good Night 🌙 Sweet dreams!" },
    { q: "what are you doing", a: "I am helping you with your questions 🤖" },{ q: "what is your return policy", a: "You can return products within 30 days of purchase." },
    { q: "payment methods", a: "We accept Visa, MasterCard, PayPal and UPI." },
    { q: "shipping details", a: "We deliver across India and 50+ countries 🌍" },
    { q: "what is your refund policy", a: "Refunds are processed within 5-7 business days." },
    { q: "can i cancel my order", a: "Yes, you can cancel your order before it is shipped." },
    { q: "how long does delivery take", a: "Delivery usually takes 3-7 working days." },
    { q: "do you offer cash on delivery", a: "Yes, we offer Cash on Delivery (COD)." },
    { q: "is my payment secure", a: "Yes, all payments are secured and encrypted." },
    { q: "how can i contact support", a: "You can contact us via email or customer helpline." },
    // 🌱 Moral / Life Questions
    { q: "who are you", a: "I am your virtual assistant 🤖" },
    { q: "what is your name", a: "You can call me ChatBot 😊" },
    { q: "can you help me", a: "Of course! Tell me your problem." },
    { q: "how do you work", a: "I work by matching your question with stored FAQs using AI logic (NLP + similarity) 🤖" },
    { q: "are you human", a: "No 😊 I am not human, I am a virtual AI chatbot." },
    { q: "thank you", a: "You're welcome 😊" },
    { q: "bye", a: "Goodbye! Have a nice day 👋" },
    { q: "what is honesty", a: "Honesty means telling the truth and not cheating." },
    { q: "what is discipline", a: "Discipline means following rules and staying focused." },
    { q: "what is kindness", a: "Kindness means helping others with care and love." },
    { q: "what is success", a: "Success comes from hard work, patience and consistency." },
    { q: "what is moral value", a: "Moral values help us decide right and wrong behavior." },{ q: "what is success", a: "Success comes from hard work." },
    { q: "what is hard work", a: "Hard work means consistent effort." },
    { q: "why study", a: "Study helps build a better future 📚" },
    { q: "why respect others", a: "Respect builds good relationships." },
    { q: "what is moral value", a: "Moral values teach right and wrong." },
    { q: "what is good behavior", a: "Good behavior means politeness and respect." },
/* 💻 TECH QUESTIONS */
    { q: "what is html", a: "HTML is used to create web pages 🌐" },
    { q: "what is css", a: "CSS is used for styling websites 🎨" },
    { q: "what is javascript", a: "JavaScript makes websites interactive ⚡" },


];

// CLEAN TEXT
function preprocess(text) {
    return text.toLowerCase().replace(/[^\w\s]/gi, '').trim();
}

// COSINE SIMILARITY
function cosine(str1, str2) {
    let w1 = str1.split(" ");
    let w2 = str2.split(" ");

    let all = [...new Set([...w1, ...w2])];

    let v1 = [], v2 = [];

    all.forEach(w => {
        v1.push(w1.filter(x => x === w).length);
        v2.push(w2.filter(x => x === w).length);
    });

    let dot = 0, m1 = 0, m2 = 0;

    for (let i = 0; i < v1.length; i++) {
        dot += v1[i] * v2[i];
        m1 += v1[i] ** 2;
        m2 += v2[i] ** 2;
    }

    if (m1 === 0 || m2 === 0) return 0;

    return dot / (Math.sqrt(m1) * Math.sqrt(m2));
}

// BEST ANSWER
function getAnswer(input) {
    let text = preprocess(input);

    let best = "Sorry, I don't understand.";
    let scoreMax = 0;

    faq.forEach(item => {
        let score = cosine(text, preprocess(item.q));
        if (score > scoreMax) {
            scoreMax = score;
            best = item.a;
        }
    });

    return best;
}

// CHAT DISPLAY
function addMessage(sender, msg) {
    let box = document.getElementById("chatbox");
    box.innerHTML += `<p><b>${sender}:</b> ${msg}</p>`;
    box.scrollTop = box.scrollHeight;
}

// 🔊 SPEAKER FIX (TEXT TO SPEECH)
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.cancel(); // important fix
    window.speechSynthesis.speak(speech);
}

// SEND MESSAGE
function sendMessage() {
    let input = document.getElementById("userInput");
    let msg = input.value;

    if (!msg.trim()) return;

    addMessage("You", msg);

    let reply = getAnswer(msg);

    setTimeout(() => {
        addMessage("Bot", reply);
        speak(reply); // 🔊 FIXED SPEAKER
    }, 400);

    input.value = "";
}

// 🎤 VOICE INPUT FIX
function startVoice() {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Your browser does not support Voice Input. Use Chrome.");
        return;
    }

    let recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function(event) {
        let text = event.results[0][0].transcript;
        document.getElementById("userInput").value = text;
        sendMessage();
    };

    recognition.onerror = function() {
        alert("Microphone permission denied or error occurred.");
    };
}
/* =========================
   📌 🌈 QUOTE OF THE DAY
========================= */
const quotes = [
    "Believe in yourself and all that you are 💪",
    "Hard work beats talent when talent doesn't work hard 🔥",
    "Success is not final, failure is not fatal 🌟",
    "Stay positive, work hard, make it happen 🚀",
    "Small steps every day lead to big results 📈"
];

function showQuote() {
    let random = quotes[Math.floor(Math.random() * quotes.length)];
    addMessage("Bot 🌈 Quote", random);
}

/* =========================
   📌 💡 SUGGEST QUESTIONS
========================= */
function suggestQuestions() {
    let list = faq.map(item => "👉 " + item.q).join("\n");
    addMessage("Bot 💡 Suggestions", list);
}
