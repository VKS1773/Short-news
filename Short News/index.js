const api_key="6f85e621a7e84b3ea218374ab24da04b";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",() => fetchNews("India"));
async function fetchNews(query){
   const res= await fetch(`${url}${query}&apiKey=${api_key}`);
   const data=await res.json();
   bindData(data.articles);
}


function bindData(articles){
    const cardsContainer=document.getElementById("news-box");
    const newsCardTemplate=document.getElementById("template-box-card");
    cardsContainer.innerHTML='';
    articles.forEach(article =>{
     if(!article.urlToImage) return;
     const cardClone=newsCardTemplate.content.cloneNode(true);
     fillDataInCard(cardClone,article);
     cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
  const newsImg=cardClone.querySelector('#news-img');
  const newsTitle=cardClone.querySelector('#box-title');
  const newsSource=cardClone.querySelector('#box-source');
  const newsDesc=cardClone.querySelector('#desc');
  newsImg.src=article.urlToImage;
  newsTitle.innerHTML=article.title;
  newsDesc.innerHTML=article.description;
  
  const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
  });

  newsSource.innerHTML=`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
     window.open(article.url, "_blank");
  });
}

let curselectednav=null;
function itemcall(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curselectednav?.classList.remove('active'); 
    curselectednav=navItem;
    curselectednav.classList.add('active');

}

const searchbtn=document.getElementById("search-button");
const searchtext=document.getElementById("in");

searchbtn.addEventListener('click',() => {
  const query= searchtext.value;
  if(!query)return;
  fetchNews(query);
  curselectednav?.classList.remove('active');
  curselectednav=null;
});

function reload(){ 
    window.location.reload();
}
const input=document.getElementById("in");
input.addEventListener("keydown",function(event){
    if(event.key=="Enter")
      getmessage();
})
function getmessage(){
    const query=input.value;
    if(!query)return;
    fetchNews(query);
    curselectednav?.classList.remove('active');
    curselectednav=null;
}
  