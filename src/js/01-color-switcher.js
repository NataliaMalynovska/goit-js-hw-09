const onStartBtn= document.querySelector("button[data-start]");
const onStoptBtn= document.querySelector("button[data-stop]");
const colorBody = document.querySelector("body");
let intervalId = null;
onStartBtn.addEventListener("click", (event) => {
  intervalId = setInterval(() => {
    colorBody.style.backgroundColor = getRandomHexColor();
    console.log(colorBody.style.backgroundColor)
    onStartBtn.setAttribute("disabled", "disabled");
  }, 1000)
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
onStoptBtn.addEventListener("click", () => {
      clearInterval (intervalId);
      onStartBtn.removeAttribute("disabled", "disabled");
}
)