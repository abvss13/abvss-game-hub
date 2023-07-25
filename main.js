// API.key 

const APIkey = '50d81a9b98msh50171387bba6c27p15e49bjsn3a09d1a24d05';
const APIurl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const APIPlatformUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=';

let header = document.querySelector('.header');
let form = document.querySelector('.header__form');
let searchBar = document.querySelector('.header__search');
let respData = [];
let selectPlatform = document.querySelector('.header__filter-platform');
let options = document.querySelectorAll('.header__platform');
let gamesBox = document.querySelector('.gamges__card-box');
let pageNum = document.querySelectorAll('.games__pag-page');
let gamesOnPage = 30;
let start = (1 - 1) * gamesOnPage;
let end = start + gamesOnPage;

// Function that fetches the data from the API
getGamesList(APIurl);

async function getGamesList(url){
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": APIkey,
        },
    });
    respData = await resp.json();
    dispGames(respData); 
    pag(respData); 
};

// Event listener is assigned to <select> object in the HTML 
// It displays content depeding on the selected value
selectPlatform.addEventListener('change', (e) => {
    e.preventDefault();
    gamesBox.innerHTML = '';
    pageNum.innerHTML = '';

    if(selectPlatform.id != 1){
    let PlatfromSearch = `${APIPlatformUrl}${selectPlatform.value}`;
    getGamesList(PlatfromSearch);
    async function getGamesList(url){
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": APIkey,
            },
        });
        respData = await resp.json();
        dispGames(respData);
        pag(respData);
    };} else if(selectPlatform.id = 1){
        let PlatfromSearch = `${APIurl}`;
        getGamesList(PlatfromSearch);
        async function getGamesList(url){
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": APIkey,
            },
        });
        respData = await resp.json();
        dispGames(respData);
        pag(respData);
    };
    }
});


// Function that declares game cards' rendering and display from API data
function dispGames(input){
    input.slice(start,end).map(string =>{
        let gameCard = document.createElement('div');
        gameCard.classList.add('games__card')
        gameCard.innerHTML = `<img src="${string.thumbnail}" width="350px" alt="Free to play game thumbnail" class="games__card-img">
        <h3 class="games__name">${string.title}</h2>
        <div class="games__details-box">
            <h4 class="games__genre">${string.genre}</h4>
            <h4 class="games__platform">${string.platform}</h4>
        </div>
        <p class="games__description">${string.short_description}</p>
        <a href="${string.game_url}" class="games__url" target="_blank"><img src="./src/img/download.png" width="20px" class="games__url-icon" alt="Download icon"> Download from official website</a>`;
        gamesBox.appendChild(gameCard);
    });
};



// Function that declares pagination rendering for generated content
function pag(data){
    let pagePagBox = document.querySelector('.games__pag');
    let pageNumQuantity = data.length / gamesOnPage;
    pageNumQuantity = +pageNumQuantity.toFixed(0);
    pagePagBox.innerHTML = '';
    for (let i = 1; i <= pageNumQuantity; i++){
            let pageNum = document.createElement('div');
            pageNum.classList.add('games__pag-page');
            pageNum.classList.add('pointer');
            pageNum.id = i;
            pageNum.innerHTML = i;
            pagePagBox.appendChild(pageNum);

            pageNum.addEventListener('click', function(event){
                gamesBox.innerHTML = "";
                scrollTo(header);
                pageNumValue = pageNum.id;
                let start = (+pageNumValue - 1) * gamesOnPage;
                let end = start + gamesOnPage;
        
                data.slice(start,end).map(string =>{
                    let gameCard = document.createElement('div');
                    gameCard.classList.add('games__card')
                    gameCard.innerHTML = `<img src="${string.thumbnail}" width="350px" alt="Free to play game thumbnail" class="games__card-img">
                    <h3 class="games__name">${string.title}</h2>
                    <div class="games__details-box">
                        <h4 class="games__genre">${string.genre}</h4>
                        <h4 class="games__platform">${string.platform}</h4>
                    </div>
                    <p class="games__description">${string.short_description}</p>
                    <a href="${string.game_url}" class="games__url" target="_blank"><img src="./src/img/download.png" width="20px" class="games__url-icon" alt="Download icon"> Download from official website</a>`;
                    gamesBox.appendChild(gameCard);
                }); 
            });
    };
};