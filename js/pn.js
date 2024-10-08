import {firebaseConfig,trendTemplates,TrendSet,
  trend_parent_punjabi,getSongList,NextSong,PrevSong,
  nextSong,prevSong,NextSongPlay,getIndex,playPause,PlaySongTrack,playSong,
  btngroup,playAdd,Mute,Loop,muteFunction,loopFunction,timeUpdate,
  playerIndicator,playIndicater,app,audio,handledown,handlemove,handleleave} from './common.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


window.addEventListener("load", () => {
  
  setTimeout(()=>{
    const loader = document.querySelector(".main");
    loader.style.display = "none";
  },3000)
 
});

// write data into the realtime firebase database
const database = firebase.database();


playerIndicator.style.display='none';


// remove event on some specific width of the screen
  // if(window.innerWidth<992){
  //   app.removeEventListener('mousemove',handlemove);
  //   app.removeEventListener('dblclick',handledown);
  //   app.removeEventListener('click',handleleave);
  // }




// retrieve all the content from the database
database.ref("Allsongs").on('value',getsong,getError);


function getsong(data) {
  // for trending songs
   let list = Object.keys(data.val()).map((a)=>{
    return data.val()[a];
  });

  getSongList(list);

  // for punjabi songs
 const ps =Object.keys(data.val()).filter((a)=>{
   if (data.val()[a].language =='Punjabi' && data.val()[a].tag =='punjabi'){
     return a;
   }
  });
  const p = ps.map((a)=>{
    return data.val()[a];
});
TrendSet(p,trend_parent_punjabi);



}

// throw error if any arise
function getError(err) {
  console.log(err);
}



// addEventListeners
btngroup.addEventListener('click',playAdd);
NextSong.addEventListener('click',nextSong);
PrevSong.addEventListener('click',prevSong);
playSong.addEventListener('click',playPause);
Mute.addEventListener('click',muteFunction);
Loop.addEventListener('click',loopFunction);
audio.addEventListener("timeupdate",timeUpdate);
playerIndicator.addEventListener("click",playIndicater);
app.addEventListener("dblclick", handledown);
app.addEventListener("click", handleleave);



// when song is ended
audio.addEventListener('ended',()=>{
  nextSong();
});
