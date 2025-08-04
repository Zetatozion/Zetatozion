// -------------------------------
//       ▪️ ASUKA PRELOADER
// -------------------------------
window.addEventListener("load", () => {
  const overlay = document.getElementById("asukaFallback");
  const quote = document.getElementById("asuka-line");

  if (quote) {
    const text = quote.innerHTML.replace(/<br>/g, '\n');
    quote.innerHTML = "";

    const letters = text.split("").map(char => {
      const span = document.createElement("span");
      span.innerHTML = char === "\n" ? "<br>" : char;
      span.style.opacity = "0";
      span.style.transition = "opacity 0.6s ease";
      span.style.display = "inline-block";
      return span;
    });

    letters.forEach(span => quote.appendChild(span));

    const indices = [...Array(letters.length).keys()];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    indices.forEach((i, idx) => {
      setTimeout(() => {
        letters[i].style.opacity = "1";
      }, idx * 50);
    });

    // ⏳ Preloader duration: 10 seconds
    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => overlay.style.display = "none", 1000);
      document.getElementById("main-content").style.opacity = "1";
    }, 10000);
  }
});

// -------------------------------
//       ▪️ MENU TOGGLE
// -------------------------------
function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("open");
}

// -------------------------------
//     ▪️ FLOWER GATEWAY LOGIC
// -------------------------------
function openFlowerGateway() {
  const flowerOverlay = document.getElementById("flower-overlay");
  flowerOverlay.style.display = "flex";
  flowerOverlay.style.opacity = "1";

  // ⏱ Auto-close after 30s
  setTimeout(() => {
    flowerOverlay.style.opacity = "0";
    setTimeout(() => flowerOverlay.style.display = "none", 1000);
  }, 30000);
}

function handleTruthInput() {
  const input = document.getElementById("truthInput").value.trim().toLowerCase();
  const res = document.getElementById("truthResponse");
  const q2 = document.getElementById("loveQuestion");
  const r2 = document.getElementById("loveResponse");
  const q3 = document.getElementById("trueLoveQuestion");
  const r3 = document.getElementById("trueLoveResponse");
  const invite = document.getElementById("jesusInvite");

  if (input === "yes") {
    res.innerText = "Brilliant, then focus on your breath.\n📖 Read the Old Testament.";
    q2.style.display = "block";
    q2.innerText = "Do you seek love?";
    q2.onclick = () => {
      r2.innerText = "Wonderful, then focus on your words.\n📖 Read the New Testament.";
      q3.style.display = "block";
      q3.innerText = "Do you seek true love?";
      q3.onclick = () => {
        r3.innerText = "You can find that in Jesus.\n\n📘 His nature (truth) is in the Old Testament.\n💗 His identity (love) is in the New.";
        invite.style.display = "block";
        invite.innerText = "Do you wish to experience the true love of Jesus?";
        invite.onclick = () => {
          invite.innerText = "📖 Scripture: 'He is closer than the mention of His name.'";
        };
      };
    };
  } else if (input === "no") {
    window.location.href = "index.html"; // Return to homepage
  } else {
    res.innerText = "";
    q2.style.display = "none";
    r2.innerText = "";
    q3.style.display = "none";
    r3.innerText = "";
    invite.style.display = "none";
  }
}

// -------------------------------
//     ▪️ ELLARI PORTAL LOGIC
// -------------------------------
function openEllariOverlay() {
  const ellariOverlay = document.getElementById("ellari-overlay");
  ellariOverlay.style.display = "flex";
  ellariOverlay.style.opacity = "1";

  // ⏱ Auto-close after 30s
  setTimeout(() => {
    ellariOverlay.style.opacity = "0";
    setTimeout(() => ellariOverlay.style.display = "none", 1000);
  }, 30000);
}

// -------------------------------
//     ▪️ SHEEP PERSONALITIES
// -------------------------------
function talkToSheep(id) {
  let msg = "";
  switch(id) {
    case 1:
      msg = "☘️ Irish Christian Sheep: 'The blood of the Lamb and a wee bit of Guinness, eh?'";
      break;
    case 2:
      msg = "🧑‍🎓 Pastor’s Son Sheep: 'Actually, the Greek for that word is…'";
      break;
    case 3:
      msg = "🤓 Nerdy Christian Sheep: 'According to my calculations, grace is statistically miraculous!'";
      break;
    case 4:
      msg = "💃 Stripper Christian Sheep: 'Jesus loved me *before* the pole came down.'";
      break;
  }
  alert(msg);
}