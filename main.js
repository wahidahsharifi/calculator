const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("display");

function handleButtonClick(value) {
   if (value === "backspace") {
      if (display.textContent === "0") return;
      display.textContent = display.textContent.slice(0, -1);
      if (display.textContent === "") display.textContent = "0";
   } else if (value === "C") {
      display.textContent = "0";
   } else if (value === "=") {
      if (display.textContent === "0") return;
      try {
         const lastChar = display.textContent.slice(-1);
         if (["+", "-", "*", "/", "%"].includes(lastChar)) {
            display.textContent = display.textContent.slice(0, -1);
         }
         if (display.textContent) {
            const result = eval(display.textContent);
            display.textContent = result !== undefined ? result : "Error";
            if (display.textContent === "" || display.textContent === "0") {
               display.textContent = "0";
            }
         }
      } catch (error) {
         display.textContent = "Error";
      }
   } else if (["+", "-", "*", "/", "%"].includes(value)) {
      const lastChar = display.textContent.slice(-1);
      if (["+", "-", "*", "/", "%"].includes(lastChar)) {
         display.textContent = display.textContent.slice(0, -1) + value;
      } else {
         display.textContent += value;
      }
   } else if (value === ".") {
      if (display.textContent === "" || display.textContent === "0") {
         display.textContent = "0.";
      } else if (!display.textContent.endsWith(".") && !display.textContent.split(/[\+\-\*\/\%]/).pop().includes(".")) {
         display.textContent += value;
      }
   } else {
      if (display.textContent === "0" && !isNaN(value)) {
         display.textContent = value;
      } else {
         display.textContent += value;
      }
   }
}

buttons.forEach((btn) => {
   btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-value");
      handleButtonClick(value);
   });
});

document.addEventListener("keydown", (event) => {
   const keyMapping = {
      Backspace: "backspace", c: "C", C: "C", Enter: "=", "+": "+", "-": "-", 
      "*": "*", "/": "/", "%": "%", ".": ".", "0": "0", "1": "1", "2": "2", 
      "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9"
   };
   if (event.key in keyMapping) {
      handleButtonClick(keyMapping[event.key]);
      event.preventDefault();
   }
});