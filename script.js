document.addEventListener('DOMContentLoaded', () => {
    // Navigation between forms
    document.getElementById('show-signup').addEventListener('click', () => {
        document.getElementById('login-container').classList.add('d-none');
        document.getElementById('signup-container-step1').classList.remove('d-none');
    });

    document.getElementById('go-back-login').addEventListener('click', () => {
        document.getElementById('signup-container-step1').classList.add('d-none');
        document.getElementById('login-container').classList.remove('d-none');
    });

    // District code validation
    const districtCodeInput = document.getElementById('district-code');
    const nextStepButton = document.getElementById('next-step');

    districtCodeInput.addEventListener('input', () => {
        nextStepButton.disabled = districtCodeInput.value.length !== 6; // Changed from 4 to 6
    });

    nextStepButton.addEventListener('click', () => {
        if (districtCodeInput.value.length === 6) { // Changed from 4 to 6
            document.getElementById('signup-container-step1').classList.add('d-none');
            document.getElementById('signup-container-step2').classList.remove('d-none');
        } else {
            console.log('District code must be exactly 6 characters.');
        }
    });

    // Parent/Student selection
    document.getElementById('parent-button').addEventListener('click', () => {
        document.getElementById('signup-container-step2').classList.add('d-none');
        document.getElementById('signup-container-parent').classList.remove('d-none');
    });

    document.getElementById('student-button').addEventListener('click', () => {
        document.getElementById('signup-container-step2').classList.add('d-none');
        document.getElementById('signup-container-student').classList.remove('d-none');
    });

    // Parent form validation
    const parentForm = document.getElementById('parent-form');

    // Auto-uppercase for parent code
    document.getElementById('parent-code-reg').addEventListener('input', function() {
        this.value = this.value.toUpperCase();
    });

    parentForm.addEventListener('input', (event) => {
        const target = event.target;
        validateParentFormInput(target);
    });

    document.getElementById('complete-registration').addEventListener('click', async () => {
        const parentCode = document.getElementById('parent-code-reg').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;

        if (validateParentForm()) {
            // Show loading state
            const button = document.getElementById('complete-registration');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validating...';

            const isValidGuardian = await validateGuardianData(parentCode, firstName, lastName);

            if (isValidGuardian) {
                document.getElementById('signup-container-parent').classList.add('d-none');
                document.getElementById('verification-container').classList.remove('d-none');
                
                // Simulate verification process
                setTimeout(() => {
                    document.getElementById('verification-complete').classList.remove('d-none');
                }, 2000);
            } else {
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger mt-3';
                errorDiv.textContent = 'Invalid guardian information. Please check your details and try again.';
                document.getElementById('parent-form').appendChild(errorDiv);
                
                // Reset button
                button.disabled = false;
                button.innerHTML = 'Complete Registration';
            }
        }
    });

    // Continue to dashboard
    document.getElementById('continue-to-dashboard').addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });

    // Form validation functions
    function validateParentFormInput(input) {
        const errorMessage = input.nextElementSibling;
        let isValid = true;

        if (input.id === 'parent-code-reg') {
            if (input.value.length !== 6) { // Changed from 8 to 6
                isValid = false;
                errorMessage.textContent = 'Parent code must be 6 digits.';
            } else {
                errorMessage.textContent = '';
            }
        } else if (input.id === 'confirm-password') {
            const password = document.getElementById('password').value;
            if (input.value !== password) {
                isValid = false;
                errorMessage.textContent = 'Passwords do not match.';
            } else {
                errorMessage.textContent = '';
            }
        } else if (input.id === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                errorMessage.textContent = 'Invalid email format.';
            } else {
                errorMessage.textContent = '';
            }
        } else if (input.id === 'phone') {
            const phonePattern = /^\d{10}$/;
            if (!phonePattern.test(input.value)) {
                isValid = false;
                errorMessage.textContent = 'Invalid phone number.';
            } else {
                errorMessage.textContent = '';
            }
        } else {
            if (input.value.trim() === '') {
                isValid = false;
                errorMessage.textContent = 'This field is required.';
            } else {
                errorMessage.textContent = '';
            }
        }

        if (!isValid) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    function validateParentForm() {
        const requiredFields = [
            'parent-code-reg', 'first-name', 'last-name', 
            'username', 'password', 'confirm-password', 
            'email', 'phone'
        ];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            validateParentFormInput(input);
            if (input.classList.contains('error')) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Student registration
    const parentCodeInput = document.getElementById('parent-code');
    const nextStepStudentButton = document.getElementById('next-step-student');

    parentCodeInput.addEventListener('input', () => {
        nextStepStudentButton.disabled = parentCodeInput.value.length !== 6; // Changed from 8 to 6
    });

    nextStepStudentButton.addEventListener('click', () => {
        if (parentCodeInput.value.length === 6) { // Changed from 8 to 6
            document.getElementById('signup-container-student').classList.add('d-none');
            document.getElementById('welcome-screen').classList.remove('d-none');
        } else {
            const error = document.getElementById('parent-code-error');
            error.textContent = 'Invalid code.';
            parentCodeInput.classList.add('error');
        }
    });

    // Back buttons
    document.getElementById('go-back-step2').addEventListener('click', () => {
        document.getElementById('signup-container-parent').classList.add('d-none');
        document.getElementById('signup-container-step2').classList.remove('d-none');
    });

    document.getElementById('go-back-step2-student').addEventListener('click', () => {
        document.getElementById('signup-container-student').classList.add('d-none');
        document.getElementById('signup-container-step2').classList.remove('d-none');
    });

    // Add child flow
    document.getElementById('add-child').addEventListener('click', () => {
        document.getElementById('welcome-screen').classList.add('d-none');
        document.getElementById('add-child-screen').classList.remove('d-none');
    });

    const childCodeInput = document.getElementById('child-code');
    const submitChildCodeButton = document.getElementById('submit-child-code');

    childCodeInput.addEventListener('input', () => {
        submitChildCodeButton.disabled = childCodeInput.value.length !== 6;
    });

    submitChildCodeButton.addEventListener('click', () => {
        if (childCodeInput.value.length === 6) {
            document.getElementById('child-profile').classList.remove('d-none');
            document.getElementById('child-name').textContent = 'John Doe';
        } else {
            const error = document.getElementById('child-code-error');
            error.textContent = 'Invalid code.';
            childCodeInput.classList.add('error');
        }
    });

    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});

// Add this function to fetch and validate guardian data
async function validateGuardianData(parentCode, firstName, lastName) {
    try {
        const response = await fetch('https://voltschool.vercel.app/api/students?code=572394');
        const students = await response.json();
        
        // For debugging
        console.log('Parent Code:', parentCode);
        console.log('Name to match:', `${firstName} ${lastName}`);
        console.log('API Data:', students);
        
        // Find any student whose guardian matches the provided details
        const match = students.find(student => {
            const guardianCodeMatch = student.guardian.guardianCode === parentCode;
            const guardianNameMatch = student.guardian.name.toLowerCase() === `${firstName} ${lastName}`.toLowerCase();
            
            console.log('Comparing:');
            console.log('Guardian code:', student.guardian.guardianCode, 'vs', parentCode);
            console.log('Guardian name:', student.guardian.name.toLowerCase(), 'vs', `${firstName} ${lastName}`.toLowerCase());
            
            return guardianCodeMatch && guardianNameMatch;
        });
        
        return !!match;
    } catch (error) {
        console.error('Error validating guardian:', error);
        return false;
    }
}