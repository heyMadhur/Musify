// NavBar Hamburger Menu
function myFunction(){
    var x= document.getElementById("menu");
    var y= document.getElementById("nav");
    if(x.style.display=="block"){
        x.style.display="none";
        // y.style.height="85px";
        y.style.height="85px";
    }
    else{
        x.style.display="block";
        // y.style.height="60vw";
        y.style.height="19rem";
    }
}



// Variable Declaration


let songsList=[
    {SongName: "DIVINE- Satya", songPath: "../songs/11.mp3"},
    {SongName: "DIVINE- 3:59 AM", songPath: "../songs/12.mp3"},
    {SongName: "Living in the Night- Batman Edition", songPath: "../songs/1.mp3"},
    {SongName: "Where are you- Peaky Blinders", songPath: "../songs/2.mp3"},
    {SongName: "Rasputin", songPath: "../songs/3.mp3"},
    {SongName: "Enemy", songPath: "../songs/4.mp3"},
    {SongName: "Lala- Scam 1992", songPath: "../songs/5.mp3"},
    {SongName: "Zinda- Bhaag Milkha Bhaag", songPath: "../songs/6.mp3"},
    {SongName: "Venom", songPath: "../songs/7.mp3"},
    {SongName: "Angreji Beat", songPath: "../songs/8.mp3"},
    {SongName: "Breakup Party", songPath: "../songs/9.mp3"},
    {SongName: "Beggin", songPath: "../songs/10.mp3"}
];
let songIndex=0;
let checkRepeat1=0;
let repeatSongIndex=0;
let song= new Audio(songsList[songIndex].songPath);
let currSongName=document.getElementById('current-song-name');
let backVid= document.getElementById('back-vid');
let play_bt= document.getElementById('play');
let pause_bt= document.getElementById('pause');
let repeat_bt= document.getElementById('repeat');
let repeat1_bt= document.getElementById('repeat-1');
let progressBar=document.getElementById('progressBar');
let masterSongName= document.getElementById('current-song-name');




// ---------------------Functions------------------------------
// Play-Pause
function masterplay(){
        song.play();
        backVid.style.opacity="0.4";
        play_bt.style.display="none";
        pause_bt.style.display="inline-block";
        masterSongName.textContent= songsList[songIndex].SongName;
        document.title= songsList[songIndex].SongName;
}
function masterpause(){
        song.pause();
        backVid.style.opacity="0";
        play_bt.style.display="inline-block";
        pause_bt.style.display="none";
}

// Prev-Next
function masterprev(){
    if(songIndex<=0){
        songIndex=songsList.length-1;
    }
    else{
        songIndex--;
    }
    console.log("Index= "+songIndex);
    song.src=songsList[songIndex].songPath;
    masterplay();
}
function masternext(value){
    if(checkRepeat1==1){
        if(value!=null){
            songIndex++;
            if(songIndex>=songsList.length-1){
                songIndex=0;
            }
        }
    }
    else if(songIndex==songsList.length-1){
        songIndex=0;
        console.log("Inside");
    }
    else{
        songIndex++;
    }
    // console.log("List Length= "+songsList.length);
    console.log("Index= "+songIndex);
    song.src=songsList[songIndex].songPath;
    masterplay();
}
function masterrepeat1(){
    repeat1_bt.style.display="none";
    repeat_bt.style.display="inline-block";
    checkRepeat1=0;
}
function masterrepeat(){
    repeat_bt.style.display="none";
    repeat1_bt.style.display="inline-block";
    checkRepeat1=1;
    repeatSongIndex=songIndex;
}
function playSong(value){
    songIndex=value;
    song.src=songsList[value].songPath;
    song.play();
    masterSongName.textContent= songsList[songIndex].SongName;
    document.title= songsList[songIndex].SongName;
}



// ------------------------Events-----------------------------------
// ProgressBar
song.addEventListener('timeupdate',()=>{
    let progress= parseInt((song.currentTime/song.duration)*100);
    progressBar.value= progress;
    
    // AutoPlay next Song
    if(song.currentTime==song.duration){
        masternext();
    }

    // System Play-Pause
    if(song.paused){
        masterpause();
    }
    else{
        masterplay();
    }
    
    
})
progressBar.addEventListener('change',()=>{
    song.currentTime= progressBar.value*song.duration/100;
})






// --------------------Some Code----------------------------------------

let e=0;
Array.from(document.getElementsByClassName('song-name-li')).forEach(element => {
    element.setAttribute('value',e);
    element.setAttribute('onclick', 'playSong(value)')
    element.textContent=`${e+1}. ${songsList[e].SongName}`;
    e++;
});


