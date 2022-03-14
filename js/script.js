// API KEY: VEv4zKkH6mydKKCzo97zoOhuO0w0801c

// URL: https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=VEv4zKkH6mydKKCzo97zoOhuO0w0801c

const apiKey = 'VEv4zKkH6mydKKCzo97zoOhuO0w0801c';

async function allLists() {
    try {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
console.log(allLists());

allLists()
.then((data) => {
    const list = data.results;

    for (let i = 0; i < list.length; i++) {

//Nombre completo de la lista
    const titleH3 = document.createElement("h3");
//Fecha del libro más antiguo en la lista
    const oldestP = document.createElement("p");
//Fecha del último libro incorporado
    const newestP = document.createElement("p");
//Frecuencia de actualización
    const updatingP = document.createElement("p");
//Link para poder cargar la lista
    const readMore = document.createElement("button");

//div 1
const category1 = document.createElement("div");
//div 2
const category2 = document.createElement("div")

category1.appendChild(titleH3);
category2.append(oldestP, newestP, updatingP, readMore);
category1.append(category2);

category2.setAttribute("class", "category2")
category1.setAttribute("class", "category1")

const dashBoard = document.getElementById("dashboard");
dashBoard.appendChild(category1);

//PINTAR EN HTML:
titleH3.innerHTML = `${list[i].list_name}`;
oldestP.innerHTML = `<b>Oldest published date:</b> ${list[i].oldest_published_date}`;
newestP.innerHTML = `<b>Newest published date:</b> ${list[i].newest_published_date}`;
updatingP.innerHTML = `<b>Updated:</b> ${list[i].updated}`;

readMore.innerHTML = "Read More here";

    }          


            })

            /*
"list_name": "Combined Print and E-Book Fiction",
"display_name": "Combined Print & E-Book Fiction",
"list_name_encoded": "combined-print-and-e-book-fiction",
"oldest_published_date": "2011-02-13",
"newest_published_date": "2022-03-20",
"updated": "WEEKLY"
*/