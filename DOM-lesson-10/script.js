const book = document.querySelectorAll(".book");
const title = document.querySelectorAll("h2");
const liFilter = document.querySelectorAll("li");
const adv = document.querySelectorAll(".adv");
const newElem = document.createElement("li");
newElem.textContent = "Глава 8: За пределами ES6";
const image = document.body;
image.style.backgroundImage = "url('image/adv.jpg')";
image.style.backgroundSize = "cover";
image.style.backgroundPosition = "center";

console.log(book);
console.log(image);
console.log(title);
console.log(adv);
console.log(liFilter);
console.log(newElem);

book[1].after(book[0]);
book[4].after(book[3]);
book[5].after(book[2]);
title[4].textContent = "Книга 3. this и Прототипы  Объектов";
title[4].style.color = "darkkhaki";
adv[0].remove();

liFilter[3].after(liFilter[6]);
liFilter[6].after(liFilter[8]);

liFilter[47].after(liFilter[55]);
liFilter[55].after(liFilter[49]);
liFilter[49].after(liFilter[50]);
liFilter[48].after(liFilter[52]);
liFilter[52].after(liFilter[53]);

book[2].append(newElem);
liFilter[25].after(newElem);
