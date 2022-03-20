// URL: https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=VEv4zKkH6mydKKCzo97zoOhuO0w0801c

const apiKey = "VEv4zKkH6mydKKCzo97zoOhuO0w0801c";
const dashBoard = document.getElementById("dashboard");
const dashBoard2 = document.getElementById("dashboard2");
let category1 = document.querySelectorAll(".category1")
let list = []
let info = []

const title = document.createElement("span")
    title.innerHTML = `<h2 id="title">Welcome to <b>Books 4You</b></h2><p>A service dedicated to students of the University of London's Distance learning community. We provide online resources, professional support and guidance to all our students whenever, and from wherever they have chosen to study.</p><figure><img src="./media/bg.jpg" id="banner"></figure><p>Check all the best book categories we have selected for you</p><div id="title2-div"><img src="https://img.icons8.com/material-rounded/48/000000/chevron-down.png" id="arrow-title"/><h2 id="title2">Book categories</h2></div>`;
    dashBoard.appendChild(title);


async function allLists() {
    try {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}`);
        const data = await response.json();
        list = data.results
    } catch (error) {
        console.error(error);
    }
}

function remove(element){
    element.remove()
}

function firstLoop() {
    

    for (let i = 0; i < list.length; i++) {
    //Nombre completo de la lista
    const h3 = document.createElement("h3");
    //Fecha del libro más antiguo en la lista
    const p1 = document.createElement("p");
    //Fecha del último libro incorporado
    const p2 = document.createElement("p");
    //Frecuencia de actualización
    const p3 = document.createElement("p");
    //Link para poder cargar la lista
    const read = document.createElement("button");
    //div 1
    const category1 = document.createElement("div");
    //div 2
    const category2 = document.createElement("div")
    category1.appendChild(h3);
    category2.append(p1, p2, p3, read);
    category1.append(category2);

    category2.setAttribute("class", "category2")
    category1.setAttribute("class", "category1")
    dashBoard.append(category1);

    //PINTAR EN HTML:
    
    h3.innerHTML = `${list[i].list_name}`;
    p1.innerHTML = `<b>Oldest published date:</b> ${list[i].oldest_published_date}`;
    p2.innerHTML = `<b>Newest published date:</b> ${list[i].newest_published_date}`;
    p3.innerHTML = `<b>Updated:</b> ${list[i].updated}`;

    read.innerHTML = "Read More here";
    read.setAttribute("class", "readMore");

    document.getElementsByClassName("readMore")[i].addEventListener("click", async(event) => {
        remove(dashBoard);
        await booksCategory(i);
        await secondLoop();
    })
}
}

async function booksCategory(i) {
    try {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${list[i].list_name_encoded}.json?api-key=${apiKey}`);
        const data = await response.json();
        console.log(data)
        info = data.results.books
        
    } catch (error) {
        console.error(error);
    }
}

function secondLoop(){
    const back = document.createElement("span")
    back.innerHTML = `<input type="button" value="< GO BACK" onclick="back()" id="back"/>`;
    dashBoard2.appendChild(back)

    for (let i = 0; i < info.length; i++) {
        
    //Portada
    const poster = document.createElement("figure");    
    //Titulo libro
    const h3 = document.createElement("h3");
    //Semanas en lista
    const p1 = document.createElement("p");
    //Descripción
    const p2 = document.createElement("p");
    //Link para amazon
    const amazon = document.createElement("button");

    //divs
    const container = document.createElement("div");
    const divImg = document.createElement("div");
    const divTitle = document.createElement("div");
    const divInfo = document.createElement("div");
    const divButton = document.createElement("div");

    //append
    divTitle.appendChild(h3);
    divImg.appendChild(poster)
    divInfo.append(p1, p2);
    divButton.appendChild(amazon)
    container.append(divImg, divTitle, divInfo, divButton)
    document.getElementById("dashboard2").appendChild(container)
    
    //class
    divTitle.setAttribute("class", "divTitle");
    divInfo.setAttribute("class", "divInfo");
    divImg.setAttribute("class", "divImg");
    container.setAttribute("class", "container");
    
    divButton.setAttribute("class", "divButton");


    //PINTAR EN HTML:
    poster.innerHTML = `<img src=${info[i].book_image} class="poster">`;
    h3.innerHTML = `${info[i].title}`;
    p1.innerHTML = `<u>Weeks on list:</u> ${info[i].weeks_on_list}`;
    p2.innerHTML = `<u>Description:</u> ${info[i].description}`;
    amazon.innerHTML = "Purchase now!";     
        

    amazon.addEventListener("click", (event) => {
        window.location.href = info[i].amazon_product_url;
     })
    }
}


const library = async () => {
    await allLists();
    firstLoop();
}


function back(){
    if(info = true){
        window.location.href="./index.html"
    }
} 

//______________<<<<<<<<>>>>>>>_______________

title.addEventListener("click", (event) => {
    if(list==false){
        library();
        document.getElementById("arrow-title").style.transform="rotate(180deg)"
    } else if (list!==[""]){
        back();
    }
    
})






