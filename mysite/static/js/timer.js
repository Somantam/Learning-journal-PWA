// static/js/timer.js

// Variables
let timerInterval = null;
let defaultDuration = 25 * 60; // Default 25 minutes

// DOM Elements
const display = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');

// --- STORAGE FUNCTIONS ---

function saveTimerState(state, targetTime = null, remaining = null) {
    localStorage.setItem('timerState', state); // 'running', 'paused', 'idle'
    if (targetTime) localStorage.setItem('timerTarget', targetTime);
    if (remaining) localStorage.setItem('timerRemaining', remaining);
}

function clearTimerState() {
    localStorage.removeItem('timerState');
    localStorage.removeItem('timerTarget');
    localStorage.removeItem('timerRemaining');
}

// --- CORE LOGIC ---

function updateDisplay(secondsLeft) {
    if (secondsLeft < 0) secondsLeft = 0;
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = Math.floor(secondsLeft % 60);

    const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    display.textContent = timeString;
    document.title = `${timeString} - Focus`; // Shows time in browser tab
}

function startTimer() {
    // 1. Determine the end time
    let secondsLeft;

    // Check if we are resuming from a paused state
    const savedRemaining = localStorage.getItem('timerRemaining');
    if (savedRemaining) {
        secondsLeft = parseInt(savedRemaining);
    } else {
        // Or starting fresh (parse current display if needed, or use default)
        const currentText = display.textContent.split(':');
        secondsLeft = parseInt(currentText[0]) * 60 + parseInt(currentText[1]);
    }

    const now = Date.now();
    const targetTime = now + (secondsLeft * 1000);

    // 2. Save to storage
    saveTimerState('running', targetTime, null);

    // 3. UI Updates
    startBtn.disabled = true;
    startBtn.style.opacity = "0.5";
    pauseBtn.disabled = false;

    // 4. Start Interval
    runInterval(targetTime);
}

function runInterval(targetTime) {
    clearInterval(timerInterval); // Clear any existing

    timerInterval = setInterval(() => {
        const now = Date.now();
        const secondsLeft = Math.ceil((targetTime - now) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            finishTimer();
        } else {
            updateDisplay(secondsLeft);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);

    // Calculate what was left
    const currentText = display.textContent.split(':');
    const secondsLeft = parseInt(currentText[0]) * 60 + parseInt(currentText[1]);

    // Save "Paused" state and time remaining
    saveTimerState('paused', null, secondsLeft);

    startBtn.disabled = false;
    startBtn.style.opacity = "1";
    startBtn.textContent = "Resume";
}

function resetTimer() {
    clearInterval(timerInterval);
    clearTimerState();

    startBtn.disabled = false;
    startBtn.style.opacity = "1";
    startBtn.textContent = "Start Focus";
    pauseBtn.disabled = true;

    // Reset to default 25m
    updateDisplay(25 * 60);
}

function setTimer(minutes) {
    resetTimer(); // Clear old state
    updateDisplay(minutes * 60);
}

function finishTimer() {
    clearTimerState();
    updateDisplay(0);
    startBtn.disabled = false;
    startBtn.style.opacity = "1";
    startBtn.textContent = "Start Focus";

    alert("Time is up! Great work.");

    if (window.Notification && Notification.permission === 'granted') {
        new Notification('Timer Finished!', {
            body: 'Time to take a break.',
            icon: '/static/images/icon-192.png'
        });
    }
}

// --- INITIALIZATION (Runs on Page Load) ---

function initTimer() {
    const state = localStorage.getItem('timerState');
    const targetTime = localStorage.getItem('timerTarget');
    const remaining = localStorage.getItem('timerRemaining');

    if (state === 'running' && targetTime) {
        // Calculate if we are still running or finished while away
        const now = Date.now();
        const secondsLeft = Math.ceil((parseInt(targetTime) - now) / 1000);

        if (secondsLeft > 0) {
            updateDisplay(secondsLeft);
            startBtn.disabled = true;
            startBtn.style.opacity = "0.5";
            runInterval(parseInt(targetTime));
        } else {
            finishTimer(); // It finished while we were away
        }
    } else if (state === 'paused' && remaining) {
        updateDisplay(parseInt(remaining));
        startBtn.textContent = "Resume";
        pauseBtn.disabled = false;
    }
}

// Event Listeners
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

// Request notification permission
if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Start
initTimer();

