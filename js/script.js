function theme() {
  // Select the theme button
  let themeBtn = document.querySelector("#theme-btn");
  let darkmode = localStorage.getItem("darkmode");
  // Create a callback function

  const toggleThemeMode = () => {
    const currDarkmode = localStorage.getItem("darkmode");
    if (currDarkmode !== "active") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  };

  const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkmode", "active");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkmode", "null");
  };

  if (darkmode === "active") {
    enableDarkMode();
  }

  // Register a 'click' event listener for the theme button,
  // and tell it to use toggleThemeMode as its callback function
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleThemeMode);
  }    
}
document.addEventListener("DOMContentLoaded", theme);

// --------------------------------------------------//

function form() {
  const form = document.querySelector(".form");
  const submitBtn = document.querySelector(".btn");

  // Create a container for displaying registrations
  const registrationList = document.createElement("div");
  registrationList.className = "registration-list";
  registrationList.innerHTML = "<h3>Confirmed Registrations</h3>";

  // Add the registration list to the page
  if (form) {
    form.appendChild(registrationList);
  }

  // Validation function
  // Validation function
  const validateForm = () => {
    let containsErrors = false;

    // Get the input fields we want to validate
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const acknowledgeCheckbox = document.getElementById("acknowledge");

    // Reset previous error styling
    const inputs = [nameInput, emailInput, phoneInput];
    inputs.forEach((input) => {
      if (input) {
        input.style.borderBottomColor = "#DCD7D7";
        // Remove any existing error messages
        const existingError =
          input.parentElement.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }
      }
    });

    // Validate name (required and min length 2)
    if (!nameInput || !nameInput.value || nameInput.value.trim().length < 2) {
      if (nameInput) {
        nameInput.style.borderBottomColor = "red";
        // Add error message for name
        const errorMsg = document.createElement("span");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Name must be at least 2 characters";
        nameInput.parentElement.appendChild(errorMsg);
      }
      containsErrors = true;
    }

    // Validate email (required and valid format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !emailInput ||
      !emailInput.value ||
      !emailRegex.test(emailInput.value)
    ) {
      if (emailInput) {
        emailInput.style.borderBottomColor = "red";
        // Add error message for email
        const errorMsg = document.createElement("span");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Please enter a valid email address";
        emailInput.parentElement.appendChild(errorMsg);
      }
      containsErrors = true;
    }

    // Validate phone (required and minimum length)
    if (
      !phoneInput ||
      !phoneInput.value ||
      phoneInput.value.trim().length < 7
    ) {
      if (phoneInput) {
        phoneInput.style.borderBottomColor = "red";
        // Add error message for phone
        const errorMsg = document.createElement("span");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Please enter a valid phone number";
        phoneInput.parentElement.appendChild(errorMsg);
      }
      containsErrors = true;
    }

    // Validate acknowledge checkbox
    if (!acknowledgeCheckbox || !acknowledgeCheckbox.checked) {
      containsErrors = true;
      // Highlight the checkbox label
      const acknowledgeLabel = document.querySelector(
        'label[for="acknowledge"]'
      );
      if (acknowledgeLabel) {
        acknowledgeLabel.style.color = "red";
      }
    }

    return !containsErrors;
  };
  // Function to add participant to the list
  const addParticipant = () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (!nameInput || !emailInput) return;

    // Get selected services
    const selectedServices = [];
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    checkboxes.forEach((checkbox) => {
      if (checkbox.id !== "acknowledge") {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
          selectedServices.push(label.textContent);
        }
      }
    });

    // Get other service if provided
    const otherService = document.getElementById("other-service");
    if (otherService && otherService.value.trim()) {
      selectedServices.push(otherService.value);
    }

    // Create a new entry
    const entry = document.createElement("div");
    entry.className = "registration-entry";
    entry.innerHTML = `
      <p><strong>${nameInput.value}</strong> (${emailInput.value})</p>
      ${
        selectedServices.length > 0
          ? `<p class="services">Services: ${selectedServices.join(", ")}</p>`
          : ""
      }
    `;

    // Add to list
    registrationList.appendChild(entry);
  };

  // Clear form fields
  const clearForm = () => {
    const inputs = document.querySelectorAll('input:not([type="submit"])');
    inputs.forEach((input) => {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      } else {
        input.value = "";
      }
    });
    
    const acknowledgeLabel = document.querySelector('label[for="acknowledge"]');
    if (acknowledgeLabel) {
      acknowledgeLabel.style.color = "";
    }
  };

  // Add event listener to the submit button
  if (submitBtn) {
    submitBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission

      if (validateForm()) {
        addParticipant();
        clearForm();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", form);
