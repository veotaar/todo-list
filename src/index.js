import "./style.css";

const h1 = document.createElement("h1");
const div = document.createElement("div");

h1.textContent = "Tailwind!";
h1.classList.add(
  "bg-gradient-to-r",
  "from-green-400",
  "to-blue-500",
  "text-transparent",
  "text-9xl",
  "bg-clip-text",
  "font-extrabold"
);

div.classList.add(
  "flex",
  "w-full",
  "h-screen",
  "justify-center",
  "items-center"
);

div.appendChild(h1);
document.body.appendChild(div);
