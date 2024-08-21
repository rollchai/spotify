console.log("lets write the java script");
let currentsong= new Audio
function secondsToMinutesSeconds(seconds) {
    // Round the input seconds to the nearest integer to avoid decimal issues
    seconds = Math.round(seconds);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad with leading zeros if necessary
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    // Format as "MM:SS"
    return `${paddedMinutes}:${paddedSeconds}`;
}

// Example usage:
console.log(secondsToMinutesSeconds(12));    // Output: "00:12"
console.log(secondsToMinutesSeconds(125));   // OutputsecondsToMinutesSeconds(3600));  // Output: "60:00"
console.log(secondsToMinutesSeconds(125.456)); // Output: "02:05"
console.log(secondsToMinutesSeconds(12.9));  // Output: "00:13"


async function getsongs(){
let a= await fetch("http://127.0.0.1:5500/SONGS/")
let response=await a.text();
// console.log(response)

let div=document.createElement("div")
div.innerHTML=response;
let as=div.getElementsByTagName("a")
let songs=[]
for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3"))
    { 
        songs.push(element.href.split("/SONGS/")[1])
    }
}
return songs
}
 const  playMusic=(track,pause=false)=>{
     currentsong.src="/SONGS/"+ track
     if(!pause){

         currentsong.play()
        play.src="pause.svg"
    }
    document.querySelector(".songinfo").innerHTML= decodeURI(track)
   document.querySelector(".songtime").innerHTML="00:00/00:00"
 }
 async function main(){
    //get the list of all the songs
let songs= await getsongs()
playMusic(songs[0],true)

//show all songs in the playlist
songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
for (const song of songs) {
    
    let songName = "O Mahi O Mahi(PagalWorld.com.cm).mp3";
let cleanedSongName = songName;
console.log(cleanedSongName);


    songul.innerHTML=songul.innerHTML+` <li>
    <img class="invert" src="music.svg"alt="">
    <div class="info">
        <div>
        ${song.replaceAll("%20"," ")
    }
     
    
     
        </div>
      
        
   
        <div>akshit</div>
    </div>
        <div class="playnow">    
            <span >Play</span>     
            <img class="invert" src="play.svg" alt="">
        </div>


  </li>`;
}
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

    })
})

// for song pause and play
play.addEventListener("click",()=>{
    if(currentsong.paused){
        currentsong.play()
        play.src="pause.svg"
    }
    else{
        currentsong.pause()
        play.src="play.svg"
    }
})
// listen for time update function 

currentsong.addEventListener("timeupdate",() =>{
console.log(currentsong.currentTime,currentsong.duration);
document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)}/${
    secondsToMinutesSeconds(currentsong.duration)}`
    // for moving the seek bar
document.querySelector(".circle").style.left =(currentsong.currentTime/ currentsong.duration)*100 + "%"
})
document.querySelector(".seekbar").addEventListener("click",e=>{
let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
  document.querySelector(".circle").style.left=(percent + "%")
  currentsong.currentTime=((currentsong.duration)*percent)/100
})
// add addEventListener for hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left ="0"
})

document.querySelector(".close").addEventListener("click",()=>
{
    document.querySelector(".left").style.left="-120%"
})

 }
main()
