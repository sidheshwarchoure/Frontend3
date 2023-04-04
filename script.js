let imagecontainer=document.getElementById('current-image-container');
let searches=[];
let your_api_key="G6PU5n49dVhIlPfLtGQUX1KaoeKTKxlyVqJzKJpj"
let picDate=document.createElement('h1');
let imgContainer = document.createElement('div');
imgContainer.setAttribute('id', 'img-container');
let img=document.createElement('img');
let heading=document.createElement('h2');
let description=document.createElement('p');
let history=document.getElementById('search-history');

function addSearchToHistory(obj){
    let li=document.createElement('li');
    let link = document.createElement('a');
    link.setAttribute('href', "#");
    link.innerHTML=obj.Date;
    li.appendChild(link);
    history.appendChild(li);

    let list=document.querySelectorAll('li');
    list.forEach(val => {
        val.addEventListener('click',getImageOfTheDay);
    })
}

function saveSearch(date){
    searches.push({"Date" : date});
    localStorage.setItem("history",JSON.stringify(searches));
    addSearchToHistory(searches[searches.length-1]);
}

function getImageOfTheDay(e){
    let date;
    e.preventDefault();
    if((e.target.innerHTML).length==10){
        date = e.target.innerHTML;
    } else {
        date = document.getElementById('search-input').value;
        if(date.length==0){
            alert("provide valid date");
            return;
        }
    }
    
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=G6PU5n49dVhIlPfLtGQUX1KaoeKTKxlyVqJzKJpj`)
        .then(res => res.json())
        .then(data => {
            picDate.innerHTML=`Picture on ${date}`;
            description.innerHTML=data.explanation;
            heading.innerHTML=data.title;
            img.src=data.url;
            imgContainer.appendChild(img);
        })
    if((e.target.innerHTML).length!=10) saveSearch(date);
}

function getCurrentImageOfTheDay(){
    let currentDate = new Date().toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?api_key=G6PU5n49dVhIlPfLtGQUX1KaoeKTKxlyVqJzKJpj&date=${currentDate}`)
        .then((res) =>  res.json())
        .then(data => {
            picDate.innerHTML="NASA picture of the Day";
            img.src=data.url;
            heading.innerHTML=data.title;
            description.innerHTML=data.explanation;
            imgContainer.appendChild(img);

            imagecontainer.appendChild(picDate);
            imagecontainer.appendChild(imgContainer);
            imagecontainer.appendChild(heading);
            imagecontainer.appendChild(description);
        })
}

window.addEventListener('load', getCurrentImageOfTheDay);