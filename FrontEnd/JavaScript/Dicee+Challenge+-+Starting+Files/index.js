<<<<<<< HEAD


function dice(){
    randomNumber1 = Math.floor(Math.random()*6+1);
    if(randomNumber1 == 1) return "./images/dice1.png";
    if(randomNumber1 == 2) return "./images/dice2.png";
    if(randomNumber1 == 3) return "./images/dice3.png";
    if(randomNumber1 == 4) return "./images/dice4.png";
    if(randomNumber1 == 5) return "./images/dice5.png";
    if(randomNumber1 == 6) return "./images/dice6.png";

}

function result(){

    if (document.getElementsByClassName("img1")[0].getAttribute("src") == document.getElementsByClassName("img2")[0].getAttribute("src") )
        document.querySelector("h1").innerHTML="Draw!!";

    if (document.getElementsByClassName("img1")[0].getAttribute("src") > document.getElementsByClassName("img2")[0].getAttribute("src") )
        document.querySelector("h1").innerHTML="Player 1 Wins!!";  
    
    if (document.getElementsByClassName("img1")[0].getAttribute("src") < document.getElementsByClassName("img2")[0].getAttribute("src") )
        document.querySelector("h1").innerHTML="Player 2 Wins!!";   
}



document.getElementsByClassName("img1")[0].setAttribute("src",dice());
document.getElementsByClassName("img2")[0].setAttribute("src",dice());
=======


function dice(){
    randomNumber1 = Math.floor(Math.random()*6+1);
    if(randomNumber1 == 1) return "./images/dice1.png";
    if(randomNumber1 == 2) return "./images/dice2.png";
    if(randomNumber1 == 3) return "./images/dice3.png";
    if(randomNumber1 == 4) return "./images/dice4.png";
    if(randomNumber1 == 5) return "./images/dice5.png";
    if(randomNumber1 == 6) return "./images/dice6.png";

}

function result(){

    if (document.getElementsByClassName("img1")[0].getAttribute("src") == document.getElementsByClassName("img2")[0].getAttribute("src") )
        document.querySelector("h1").innerHTML="Draw!!";

    if (document.getElementsByClassName("img1")[0].getAttribute("src") > document.getElementsByClassName("img2")[0].getAttribute("src") )
        document.querySelector("h1").innerHTML="Player 1 Wins!!";  
    
    if (document.getElementsByClassName("img1")[0].getAttribute("src") < document.getElementsByClassName("img2")[0].getAttribute("src") )
        document.querySelector("h1").innerHTML="Player 2 Wins!!";   
}



document.getElementsByClassName("img1")[0].setAttribute("src",dice());
document.getElementsByClassName("img2")[0].setAttribute("src",dice());
>>>>>>> 19b2325 (Initial commit)
result();