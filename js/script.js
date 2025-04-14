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

  