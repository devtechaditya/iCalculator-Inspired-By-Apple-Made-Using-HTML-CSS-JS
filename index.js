const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator-btn");
const sciPanel = document.getElementById("scientific");

function haptic() {
    if (navigator.vibrate) navigator.vibrate(10);
}

function appendToDisplay(input) {
    haptic();
    if (display.value === "0") display.value = input;
    else display.value += input;
}

function clearDisplay() {
    haptic();
    display.value = "0";
    operators.forEach(op => op.classList.remove("active"));
}

function setOperator(op) {
    haptic();
    operators.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    appendToDisplay(op);
}

function calculate() {
    haptic();
    try {
        display.value = eval(display.value);
        operators.forEach(op => op.classList.remove("active"));
    } catch {
        display.value = "Error";
    }
}

/* Keyboard support */
document.addEventListener("keydown", e => {
    if ("0123456789.+-*/".includes(e.key)) appendToDisplay(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") display.value = display.value.slice(0, -1) || "0";
});

/* Light / Dark mode */
document.getElementById("modeToggle").onclick = () => {
    document.body.classList.toggle("light");
};

/* Scientific toggle */
document.getElementById("sciToggle").onclick = () => {
    sciPanel.classList.toggle("show");
};

function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
    const date = now.toLocaleDateString([], {
        weekday: "long",
        day: "numeric",
        month: "long"
    });
    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;
}

updateTime();
setInterval(updateTime, 1000);