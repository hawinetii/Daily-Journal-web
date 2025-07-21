// This script handles the form logic and is accessible globally
function showForm(formId) {
    const signupForm = document.getElementById('signup');
    const loginForm = document.getElementById('login');
    const signupTab = document.querySelector('.tabs .tab:nth-child(1)');
    const loginTab = document.querySelector('.tabs .tab:nth-child(2)');

    // Deactivate both forms and tabs
    signupForm.classList.remove('active-form');
    loginForm.classList.remove('active-form');
    signupTab.classList.remove('active');
    loginTab.classList.remove('active');

    // Activate the selected form and its tab
    if (formId === 'signup') {
        signupForm.classList.add('active-form');
        signupTab.classList.add('active');
    } else if (formId === 'login') {
        loginForm.classList.add('active-form');
        loginTab.classList.add('active');
    }
}

// Function to handle form submission (login/signup)
function handleFormSubmit(event) {
    event.preventDefault(); // Prevents the page from reloading
    
    // Hide the home, about, and signup/login sections
    document.getElementById('home').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    document.getElementById('signup-login').style.display = 'none';
    
    // Show the journal section
    document.getElementById('journal').style.display = 'block';
}

// This script handles the hamburger menu and its animation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const closeBtn = document.querySelector(".close-btn");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
}

document.querySelectorAll(".nav-links li").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// This script runs when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // This makes sure the initial state is correct on page load
    showForm('signup');

    // Event listener for the 'Get Started' button to scroll to the forms
    const getStartedButton = document.querySelector('.button1');
    const signupLoginFormSection = document.getElementById('signup-login');

    if (getStartedButton && signupLoginFormSection) {
        getStartedButton.addEventListener('click', (event) => {
            event.preventDefault();
            signupLoginFormSection.scrollIntoView({ behavior: 'smooth' });
            showForm('signup');
        });
    }
});

// Function to handle adding a journal entry - now with a title
function addEntry(event) {
    event.preventDefault();
    const journalTitleInput = document.getElementById('journalTitle');
    const journalTextarea = document.getElementById('journalText');
    const entriesList = document.getElementById('entriesList');
    
    const entryTitle = journalTitleInput.value.trim();
    const entryText = journalTextarea.value.trim();

    // Only add an entry if both the title and text are not empty
    if (entryTitle && entryText) {
        const newEntryDiv = document.createElement('div');
        newEntryDiv.className = 'journal-entry';
        newEntryDiv.innerHTML = `
            <p class="entry-date">${new Date().toLocaleDateString()}</p>
            <h3 class="entry-title">${entryTitle}</h3>
            <p class="entry-text">${entryText}</p>
        `;
        entriesList.prepend(newEntryDiv);
        
        // Clear both input fields after submission
        journalTitleInput.value = '';
        journalTextarea.value = '';
    }
}