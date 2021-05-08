//Board
var BoardSize=8;
var Comp="<p id=\"tex\" style=\"color:gray;font-size:15px;\">Aceasta e o recreație simplă a jocului snake<br>Apasă pe săgeți pentru mișcare</p><p></p> <span style=\"white-space: nowrap;\">";
for(var i=0;i<BoardSize;i++){
  Comp+="<div>";
  for(var j=0;j<BoardSize;j++)
    Comp+=" <img id=\"a"+i+"."+j+"\" onclick=\"Pane("+i+","+j+")\" align=\"left\" src=\"img/WhiteBox.png\" width=\"30\" height=\"30\" >";
  Comp+="<br></div>";}
Comp+="</span> <script src=\"js/jocuri.js\"></script>";
document.getElementById("snek").innerHTML=Comp;

var D='q';

var Snk=[[0,0],[0,0],[0,0]],Head=[Math.trunc(BoardSize/2),Math.trunc(BoardSize/2)],Berry=[0,0],boolT,dead=false,blink=0;
var Q="";
Berry[0]=Math.trunc(Math.random()*BoardSize);
Berry[1]=Math.trunc(Math.random()*BoardSize);

function changeImage(i,j,c) {
  switch (c) {
    case 0: document.getElementById("a"+i+"."+j).src = 'img/WhiteBox.png';break;
    case 1: document.getElementById("a"+i+"."+j).src = 'img/BlackBox.png';break;
    case 2: document.getElementById("a"+i+"."+j).src = 'img/RedBox.png';break;
    case 3: document.getElementById("a"+i+"."+j).src = 'img/DarkBox.png';break;
    case 4: document.getElementById("a"+i+"."+j).src = 'img/GrayBox.png';break;}
    //document.body.innerHTML="";
}
function show(){
    document.getElementById("tex").innerHTML = "Scor "+(Snk.length-3);
}
function Restart(){
  Snk=[[0,0],[0,0],[0,0]];Head=[Math.trunc(BoardSize/2),Math.trunc(BoardSize/2)];Berry=[0,0];dead=false;D='q';
  Berry[0]=Math.trunc(Math.random()*BoardSize);
  Berry[1]=Math.trunc(Math.random()*BoardSize);
  for(i=0;i<BoardSize;i++)
    for(j=0;j<BoardSize;j++)
      document.getElementById("a"+i+"."+j).src = 'img/WhiteBox.png';
  document.getElementById("tex").innerHTML="Apasați pe săgeți să vă mișcați";
}

function Pane(y,x){
  if(dead)
    Restart();
  else{
    if(x>=y){
      if(y+x<8) AddQ('w');
      else if(x==y) AddQ("s");
      else AddQ("d");
    }else{
      if(x+y<7) AddQ('a');
      else AddQ('s');
    }
  }
}


//MainGame
function game(){
//console.log(Q);
  if(dead==false){

    if(Q.length>2){
      D=Q[Q.length-1];
      Q="";
    }else if(Q.length==2){
      D=Q[0];
      Q=Q.substr(1);
    }else if(Q!=""){
      D=Q[0];
      Q="";
    }


  if(D!='q'){
  switch (D) {
      case 'w':Head[0]-=1;while(Head[0]<0)Head[0]+=BoardSize;break;
      case 's':Head[0]+=1;while(Head[0]>=BoardSize)Head[0]-=BoardSize;break;
      case 'a':Head[1]-=1;while(Head[1]<0)Head[1]+=BoardSize;break;
      case 'd':Head[1]+=1;while(Head[1]>=BoardSize)Head[1]-=BoardSize;break;
    }
  for(i=1;i<BoardSize-1;i++)
    if(Math.abs)

  Snk.forEach((item, i) => {
    dead=dead||(Head[0]==item[0]&&Head[1]==item[1]);
  });
  if(dead)Q="";

  if(Berry[0]==Head[0]&&Berry[1]==Head[1]){
    Snk.push([0,0]);
    Snk[Snk.length-1][0]=Head[0];
    Snk[Snk.length-1][1]=Head[1];
    show();
    boolT=Berry[0]==Head[0]&&Berry[1]==Head[1];
    while(boolT){
      Berry[0]=Math.trunc(Math.random()*BoardSize);
      Berry[1]=Math.trunc(Math.random()*BoardSize);
      boolT=Berry[0]==Head[0]&&Berry[1]==Head[1];
      Snk.forEach((item, i) => {
        boolT=boolT||(Berry[0]==item[0]&&Berry[1]==item[1]);
      });

    }
  }

  changeImage(Berry[0],Berry[1],2);
  changeImage(Head[0],Head[1],3);
  if(Snk[Snk.length-1][0]!=Snk[Snk.length-2][0]||Snk[Snk.length-1][1]!=Snk[Snk.length-2][1])
    changeImage(Snk[Snk.length-1][0],Snk[Snk.length-1][1],1);
  else
    changeImage(Snk[Snk.length-1][0],Snk[Snk.length-1][1],4);

  changeImage(Snk[0][0],Snk[0][1],0);
  Snk.push([0,0]);
  Snk[Snk.length-1][0]=Head[0];
  Snk[Snk.length-1][1]=Head[1];

  Snk.shift();
}else{
  for(i=0;i<BoardSize;i++)
    for(j=0;j<BoardSize;j++)
      changeImage(i,j,0);

  changeImage(Head[0],Head[1],3);
  Snk[0][0]=Head[0];
  Snk[0][1]=Head[1];
  changeImage(Berry[0],Berry[1],2);

}
}
else{
  document.getElementById("tex").innerHTML = "(Apasa R sa restartezi) Scor "+(Snk.length-3);
  for(i=0;i<BoardSize;i++)
    for(j=0;j<BoardSize;j++)
      changeImage(i,j,0);
  blink++;
  while(blink>100)blink-=100;
  if(Math.trunc(blink/10)%2==0){
    for(i=3;i<BoardSize-2;i++)
      changeImage(i,i,2);
    for(i=0;i<BoardSize;i++)
      changeImage(i,0,2);
    changeImage(3,2,2);
    changeImage(3,1,2);
    changeImage(0,1,2);
    changeImage(0,2,2);
    changeImage(0,3,2);
    changeImage(1,4,2);
    changeImage(2,4,2);
    changeImage(6,5,2);
    changeImage(7,5,2);}
  else{
    Snk.forEach((item, i) => {
      changeImage(item[0],item[1],1);
    });
    changeImage(Berry[0],Berry[1],2);
    changeImage(Head[0],Head[1],3);
  }
}
}
var Clock = setInterval(game,130);

function AddQ(who){
  let cant=false;
  if(Q=="")
    switch (D) {
      case 'w': cant=(who=='s'); break;
      case 's': cant=(who=='w'); break;
      case 'a': cant=(who=='d'); break;
      case 'd': cant=(who=='a'); break;
    }
  else switch (Q[Q.length-1]) {
    case 'w': cant=(who=='s'); break;
    case 's': cant=(who=='w'); break;
    case 'a': cant=(who=='d'); break;
    case 'd': cant=(who=='a'); break;
  }
  if(!cant)Q+=who;
  show();
  if(dead)
    Restart();
}

//Tastatura
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "Escape": Q='q';  break;
    case "ArrowUp": AddQ('w');  break;
    case "w": AddQ('w');  break;
    case "W": AddQ('w');  break;
    case "8": AddQ('w');  break;
    case "ArrowLeft": AddQ('a');  break;
    case "a": AddQ('a');  break;
    case "A": AddQ('a');  break;
    case "4": AddQ('a');  break;
    case "ArrowDown": AddQ('s');  break;
    case "s": AddQ('s');  break;
    case "S": AddQ('s');  break;
    case "2": AddQ('s');  break;
    case "ArrowRight":  AddQ('d');  break;
    case "d": AddQ('d');  break;
    case "D": AddQ('d');  break;
    case "6": AddQ('d');  break;
    case "r": Restart();  break;
    case "R": Restart();  break;
    default:  return;
  }
  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
