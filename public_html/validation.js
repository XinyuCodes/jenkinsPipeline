///validation form

///////validation of name 

function validateName(inputId, checkId) {
    const nameInput = document.getElementById(inputId);
    const nameCheck = document.getElementById(checkId);
    const nameValue = nameInput.value;

    const namePattern = /^[A-Za-z\s]*$/;
    let nameLength = nameValue.trim().length;

    // Always clear background classes first
    nameInput.classList.remove('bg-success-subtle', 'bg-danger');

    if (nameLength === 0) {
        nameCheck.textContent = "Enter your name!";
        nameCheck.className = 'text-danger mb-0';
        nameCheck.style.display = 'block';
        return false;
    }
    else if (namePattern.test(nameValue) && nameLength > 0) {
        nameCheck.textContent = `Hello ${nameInput.value}!`;
        nameCheck.className = 'text-success mb-0'; // ADD SUCCESS STYLING
        nameCheck.style.display = 'block';
        
        // Add success background
        nameInput.classList.add('bg-success-subtle');
        return true;
    }
    else {
        nameCheck.textContent = "Try entering your name again!!";
        nameCheck.className = 'text-danger mb-0';
        nameCheck.style.display = 'block';
        
        // Add error background
        nameInput.classList.add('bg-danger');
        return false;
    }
}


/////validation of email 
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailCheck = document.getElementById('emailCheck');
    const emailValue = emailInput.value.trim();

    // Clear background classes
    emailInput.classList.remove('bg-success-subtle', 'bg-danger');

    if (emailValue.length === 0) {
        emailCheck.style.display = 'none';
        return false;
    }

    // Find @ symbol using indexOf (much simpler!)
    const atIndex = emailValue.indexOf('@');

    // Check if @ exists
    if (atIndex === -1) {
        emailCheck.textContent = "Email must contain @";
        emailCheck.className = 'text-danger mb-0';
        emailCheck.style.display = 'block';
        return false;
    }

    // Check local part (before @) is not empty
    const localPart = emailValue.substring(0, atIndex);
    if (localPart.length === 0) {
        emailCheck.textContent = "Email must have text before @";
        emailCheck.className = 'text-danger mb-0';
        emailCheck.style.display = 'block';
        return false;
    }

    // Check domain part (after @) is not empty
    const domainPart = emailValue.substring(atIndex + 1);
    if (domainPart.length === 0) {
        emailCheck.textContent = "Email must have text after @";
        emailCheck.className = 'text-danger mb-0';
        emailCheck.style.display = 'block';
        return false;
    }

    // Success case
    emailCheck.textContent = `Valid email: ${emailValue}`;
    emailCheck.className = 'text-success mb-0';
    emailCheck.style.display = 'block';
    emailInput.classList.add('bg-success-subtle');
    return true;
}

///////validation of phone numbers (cannot exceed a maximum length)
function validatePhone(){
    const phoneInput = document.getElementById('phone');
    const phoneCheck = document.getElementById('phoneCheck');
    const phoneValue = phoneInput.value; // Changed variable name to match usage

    // Clear background classes
    phoneInput.classList.remove('bg-success-subtle', 'bg-danger');

    let phone_length = phoneValue.length;
    
    // Declare variables
    let firstInvalidChar = '';
    let firstInvalidPosition = -1;

    // Check if it's all numbers 
    for (let i = 0; i < phoneValue.length; i++){
        const char = phoneValue[i];
        if(char < '0' || char > '9'){
            firstInvalidChar = char;
            firstInvalidPosition = i;
            break;
        }
    }

    if(firstInvalidPosition === -1 && phoneValue.trim() !== '' && phone_length === 9){
        phoneCheck.textContent = 'Valid phone number - we may give you a buzz at this number'; // Fixed typo
        phoneCheck.className = 'text-success mb-0';
        phoneCheck.style.display = 'block'; // Added display
        phoneInput.classList.add('bg-success-subtle'); // Added background
        return true;
    }
    else if(firstInvalidPosition !== -1){
        phoneCheck.textContent = `Invalid character "${firstInvalidChar}" at position ${firstInvalidPosition + 1}`;
        phoneCheck.className = 'text-danger mb-0';
        phoneCheck.style.display = 'block';
        phoneInput.classList.add('bg-danger');
        return false;
    }
    else if(phone_length !== 9){
        phoneCheck.textContent = 'You need to put in 9 digits!';
        phoneCheck.className = 'text-danger mb-0'; // Fixed semicolon
        phoneCheck.style.display = 'block';
        phoneInput.classList.add('bg-danger');
        return false;
    }
}


/////you should have chosen an subject
function validateSubject() {
    const subjectInput = document.getElementById('subject');
    const subjectCheck = document.getElementById('subjectCheck');
    const selectedValue = subjectInput.value;

    // Clear background classes
    // subjectInput.classList.remove('bg-success-subtle', 'bg-danger');

    // Check if an option is selected (value is not empty)
    if (selectedValue === '' || selectedValue === 'Choose...') {
        subjectCheck.textContent = 'Please select a subject';
        subjectCheck.className = 'text-danger mb-0';
        subjectCheck.style.display = 'block';
        subjectInput.classList.add('bg-danger');
        return false;
    }
    else {
        subjectCheck.textContent = `Subject selected: ${subjectInput.options[subjectInput.selectedIndex].text}`;
        subjectCheck.className = 'text-success mb-0';
        subjectCheck.style.display = 'block';
        subjectInput.classList.add('bg-success-subtle');
        return true;
    }
}
//////message cannot be blank
function validateMessage() {
    const messageInput = document.getElementById('message');
    const messageCheck = document.getElementById('messageCheck');
    const messageValue = messageInput.value;
    
    // Clear background classes
    messageInput.classList.remove('bg-success-subtle', 'bg-danger');
    
    let messageLength = messageValue.trim().length; // Use trim() for better validation
    
    if(messageLength > 0){
        messageCheck.textContent = 'Message looks good!';
        messageCheck.className = 'text-success mb-0';
        messageCheck.style.display = 'block';
        messageInput.classList.add('bg-success-subtle');
        return true;
    }
    else{
        messageCheck.textContent = 'Oh no! you have not written anything!';
        messageCheck.className = 'text-danger mb-0';
        messageCheck.style.display = 'block';
        messageInput.classList.add('bg-danger');
        return false;
    }
}

///one last check

function validateAll() {
    // Run all individual validation functions
    const nameValid = validateName('fullName', 'fullNameCheck');
    const emailValid = validateEmail();
    const phoneValid = validatePhone();
    const subjectValid = validateSubject();
    const messageValid = validateMessage();
    
    // Check if all validations passed
    if (nameValid && emailValid && phoneValid && subjectValid && messageValid) {
        // Show modal instead of alert
        var modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
        return true;
    } else {
        alert('Please fix all errors before submitting.');
        return false;
    }
}