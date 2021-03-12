const target = document.querySelector(".target");
const coordinate = document.querySelector(".coordinate");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");

document.body.addEventListener("mousemove", (e) => {
  target.style.left = `${e.pageX}px`;
  target.style.top = `${e.pageY}px`;
  coordinate.style.left = `${e.pageX + 40}px`;
  coordinate.style.top = `${e.pageY + 20}px`;
  line2.style.left = `${e.pageX}px`;
  line1.style.top = `${e.pageY}px`;
  coordinate.innerText = `${e.pageX}px, ${e.pageY}px`;
});
