document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = togglePasswordBtn.querySelector('.eye-icon');
    const eyeOffIcon = togglePasswordBtn.querySelector('.eye-off-icon');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const googleBtn = document.getElementById('googleBtn');
    const githubBtn = document.getElementById('githubBtn');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const signupLink = document.getElementById('signupLink');

    let toastTimeout;

    // ==========================================
    // 1. Password Visibility Toggle
    // ==========================================
    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        
        // Toggle icon visibility
        eyeIcon.classList.toggle('hidden', isPassword);
        eyeOffIcon.classList.toggle('hidden', !isPassword);
    });

    // ==========================================
    // 2. Validation Helpers
    // ==========================================
    function isValidEmail(email) {
        // Standard email regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email.trim());
    }

    function setError(inputElement, errorElement, message) {
        const formGroup = inputElement.closest('.form-group');
        formGroup.classList.add('has-error');
        errorElement.textContent = message;
    }

    function clearError(inputElement, errorElement) {
        const formGroup = inputElement.closest('.form-group');
        formGroup.classList.remove('has-error');
        errorElement.textContent = '';
    }

    // Clear errors dynamically on user input
    emailInput.addEventListener('input', () => {
        if (emailInput.closest('.form-group').classList.contains('has-error')) {
            clearError(emailInput, emailError);
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.closest('.form-group').classList.contains('has-error')) {
            clearError(passwordInput, passwordError);
        }
    });

    // ==========================================
    // 3. Toast Notification Function
    // ==========================================
    function showToast(message, type = 'info') {
        clearTimeout(toastTimeout);
        
        // Reset classes
        toast.className = 'toast show ' + type;
        toastMessage.textContent = message;

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // ==========================================
    // 4. Form Submit Handler
    // ==========================================
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailVal = emailInput.value.trim();
        const passwordVal = passwordInput.value;
        let isValid = true;

        // Email validation
        if (!emailVal) {
            setError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailVal)) {
            setError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        // Password validation
        if (!passwordVal) {
            setError(passwordInput, passwordError, 'Password is required');
            isValid = false;
        } else if (passwordVal.length < 6) {
            setError(passwordInput, passwordError, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError(passwordInput, passwordError);
        }

        // If form has errors, focus on the first invalid field
        if (!isValid) {
            if (emailInput.closest('.form-group').classList.contains('has-error')) {
                emailInput.focus();
            } else if (passwordInput.closest('.form-group').classList.contains('has-error')) {
                passwordInput.focus();
            }
            return;
        }

        // ==========================================
        // 5. Simulated API Request / Success State
        // ==========================================
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            spinner.classList.add('hidden');

            showToast(`Welcome back, ${emailVal.split('@')[0]}!`, 'success');
            loginForm.reset();
        }, 1200);
    });

    // ==========================================
    // 6. Social Buttons & Extra Actions
    // ==========================================
    googleBtn.addEventListener('click', () => {
        showToast('Connecting to Google...', 'info');
    });

    githubBtn.addEventListener('click', () => {
        showToast('Connecting to GitHub...', 'info');
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Password reset link sent to registered email.', 'info');
    });

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Redirecting to registration page...', 'info');
    });
});
