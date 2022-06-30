import {firebaseConfig,trendTemplates,TrendSet,
  trend_parent_row,getSongList,NextSong,PrevSong,
  nextSong,prevSong,NextSongPlay,getIndex,playPause,PlaySongTrack,playSong,
  btngroup,playAdd,Mute,Loop,muteFunction,loopFunction,timeUpdate,
  playerIndicator,playIndicater,app,audio,handledown,handlemove,handleleave} from './common.js';

const filterParent = document.getElementById('filterParent');
let Initialize ;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// write data into the realtime firebase database
const database = firebase.database();


playerIndicator.style.display='none';

// retrieve all the content from the database
database.ref("Allsongs").on('value',getsong,getError);


function getsong(data) {
  // for trending songs
   let list = Object.keys(data.val()).map((a)=>{
    return data.val()[a];
  });

  getSongList(list);

  const tr =Object.keys(data.val()).filter((a)=>{
    if (data.val()[a].tag =='trending' ){
      return a;
    }
   });
   const s = tr.map((a)=>{
     return data.val()[a];
 });

 TrendSet(s,trend_parent_row);
 filtersong(s);
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

// filter the songs based on singers and languages
const filtersong = (data) =>{
  Initialize = data;
}


// filter the songs based on given value
filterParent.addEventListener('click',(e)=>{
  let data = [];
  let s = document.querySelectorAll('#trend_parent_row>div');
  let input = document.querySelectorAll('input');

  for(let i of  s){
    trend_parent_row.removeChild(i);
  }

  if(e.target.checked){

    for(let j of input){
      if(!j.checked){
        j.disabled=true;
      }
    }

    Initialize.forEach((item, i)=>{
      if(Object.values(item).find((a)=>a === e.target.value)){
        data.push(item);
      }
    });
    TrendSet(data,trend_parent_row);
  }

  else{

    for(let j of input){
      if(!j.checked){
        j.disabled=false;
      }
    }

     TrendSet(Initialize,trend_parent_row);
  }

});




/*
when filter the songs example
hindi SongS
there are 15 songs in hindi language
we need to add those songs in the playlist to playSong According
serial

*/
