// Firebase config from your project
const firebaseConfig = {
  apiKey: "AIzaSyBUZOOk5yNjjQMwlq8QlS_h75EhqK8EvNc",
  authDomain: "deep-stack-advisors-ai.firebaseapp.com",
  projectId: "deep-stack-advisors-ai",
  storageBucket: "deep-stack-advisors-ai.firebasestorage.app",
  messagingSenderId: "1097954365388",
  appId: "1:1097954365388:web:a279641dd132617d1d1769",
  measurementId: "G-RHG6X00F7K"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simple form handler
window.submitClientLead = async function() {
  const name = document.getElementById('client-name').value;
  const email = document.getElementById('client-email').value;
  const company = document.getElementById('client-company').value;
  const message = document.getElementById('client-message').value;

  if (!name || !email) {
    alert('Please fill name and email');
    return;
  }

  try {
    await addDoc(collection(db, "client-leads"), {
      name, email, company, message,
      timestamp: serverTimestamp(),
      type: "client"
    });
    alert('Thank you! We\'ll be in touch soon.');
    document.getElementById('client-form').reset();
  } catch (e) {
    alert('Error submitting. Please try again.');
    console.error(e);
  }
};

window.submitCandidate = async function() {
  const name = document.getElementById('cand-name').value;
  const email = document.getElementById('cand-email').value;
  const linkedin = document.getElementById('cand-linkedin').value;
  const resumeText = document.getElementById('cand-resume').value.toLowerCase();

  if (!name || !email) {
    alert('Please fill name and email');
    return;
  }

  // Simple AI keyword match score (Solana, Rust, DeFi, ZK, etc.)
  const keywords = ['solana', 'rust', 'anchor', 'defi', 'zk', 'zero knowledge', 'blockchain', 'protocol', 'cryptography', 'svm'];
  let score = 0;
  keywords.forEach(k => {
    if (resumeText.includes(k)) score += 10;
  });
  score = Math.min(score, 100);

  try {
    await addDoc(collection(db, "candidate-applications"), {
      name, email, linkedin, resumeText,
      matchScore: score,
      timestamp: serverTimestamp(),
      type: "candidate"
    });
    alert(`Application received! Your initial match score: ${score}/100`);
    document.getElementById('candidate-form').reset();
  } catch (e) {
    alert('Error submitting. Please try again.');
    console.error(e);
  }
};