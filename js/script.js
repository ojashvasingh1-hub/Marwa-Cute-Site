// Change these timings after you replace local.mp3.
// Keep these as ORIGINAL on-screen notes rather than full song lyrics.
const moments = [
  { time: 2.0, text: "okay wait..." },
  { time: 5.5, text: "this song just has ✨ vibes ✨" },
  { time: 10.0, text: "so naturally..." },
  { time: 13.0, text: "I made a completely unnecessary website 😭" },
  { time: 18.0, text: "very productive use of my time btw" },
  { time: 23.0, text: "but hey—" },
  { time: 26.0, text: "some people deserve random cute things." },
  { time: 32.0, text: "yes, apparently you made the list 💀" },
  { time: 39.0, text: "anyway..." },
  { time: 42.0, text: "one tiny message →" }
];

const audio = document.getElementById("audio");
const startButton = document.getElementById("startButton");
const lastButton = document.getElementById("lastButton");
const lyrics = document.getElementById("lyricsContainer");
const particles = document.getElementById("particles");

let index = 0;
let finalShown = false;
let particleTimer;

function showPanel(id) {
  document.querySelectorAll(".panel").forEach(el => el.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}

function showMoment(text) {
  lyrics.classList.remove("show");
  setTimeout(() => {
    lyrics.textContent = text;
    lyrics.classList.add("show");
  }, 260);
}

function makeParticle(burst = false) {
  const el = document.createElement("span");
  const fire = Math.random() > 0.5;
  el.className = `particle ${fire ? "ember" : "drop"} ${burst ? "burst" : ""}`;
  el.textContent = fire ? "✦" : "●";
  el.style.left = `${Math.random() * 100}%`;
  el.style.setProperty("--drift", `${Math.random() * 140 - 70}px`);
  el.style.animationDuration = `${4 + Math.random() * 5}s`;
  particles.appendChild(el);
  setTimeout(() => el.remove(), 9500);
}

function startParticles() {
  clearInterval(particleTimer);
  particleTimer = setInterval(() => makeParticle(false), 320);
}

startButton.addEventListener("click", async () => {
  index = 0;
  finalShown = false;
  lyrics.textContent = "";
  showPanel("moments");
  startParticles();

  // If your chosen clip should begin later, change 0 to the start time in seconds.
  audio.currentTime = 0;
  try {
    await audio.play();
  } catch (err) {
    console.error("Audio could not start:", err);
  }
});

audio.addEventListener("timeupdate", () => {
  while (index < moments.length && audio.currentTime >= moments[index].time) {
    showMoment(moments[index].text);
    index++;
  }

  if (!finalShown && audio.currentTime >= 47) {
    finalShown = true;
    showPanel("finalCard");
  }
});

audio.addEventListener("ended", () => {
  if (!finalShown) {
    finalShown = true;
    showPanel("finalCard");
  }
});

lastButton.addEventListener("click", () => {
  showPanel("ending");
  for (let i = 0; i < 55; i++) {
    setTimeout(() => makeParticle(true), i * 28);
  }
});
