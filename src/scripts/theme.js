const calculatorBody = document.querySelector(".calculator");
const changeThemeButtons = document.querySelectorAll(".change-theme");

changeThemeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const clickedButton = e.currentTarget;
    const theme = clickedButton.dataset.theme;

    // Удаляем active у всех кнопок
    changeThemeButtons.forEach((btn) => btn.classList.remove("active"));
    // Добавляем active нажатой кнопке
    clickedButton.classList.add("active");

    // Устанавливаем тему
    if (theme === "light") {
      calculatorBody.classList.add("light");
      calculatorBody.classList.remove("dark");
    } else if (theme === "dark") {
      calculatorBody.classList.add("dark");
      calculatorBody.classList.remove("light");
    }
  });
});
