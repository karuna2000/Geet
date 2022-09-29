import {firebaseConfig,trendTemplates,TrendSet,trend_parent_row,trend_parent_hindi,
  trend_parent_english,trend_parent_punjabi,getSongList,NextSong,PrevSong,
  nextSong,prevSong,NextSongPlay,getIndex,playPause,PlaySongTrack,playSong,
  btngroup,playAdd,Mute,Loop,muteFunction,loopFunction,timeUpdate,
  playerIndicator,playIndicater,app,audio,handledown,handlemove,handleleave} from './common.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



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

   const tr =Object.keys(data.val()).filter((a)=>{
     if (data.val()[a].tag =='trending' ){
       return a;
     }
    });
    const s = tr.map((a)=>{
      return data.val()[a];
  });

  s.length = 5;
  TrendSet(s,trend_parent_row);


  // for hindi songs
   const hs =Object.keys(data.val()).filter((a)=>{
     if (data.val()[a].language =='Hindi' && data.val()[a].tag =='hindi' ){
       return a;
     }
    });
    const h = hs.map((a)=>{
      return data.val()[a];
  });
  TrendSet(h,trend_parent_hindi);


    // for english songs
   const es =Object.keys(data.val()).filter((a)=>{
     if (data.val()[a].language =='English' && data.val()[a].tag =='english' ){
       return a;
     }
    });
    const e = es.map((a)=>{
      return data.val()[a];
  });
  TrendSet(e,trend_parent_english);

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

// moving playIndicator (EventListeners)
app.addEventListener("mousedown", handledown);
app.addEventListener("mouseup", handleleave);
app.addEventListener("dragstart",()=>{
  return false;
})



// when song is ended
audio.addEventListener('ended',()=>{
  nextSong();
});
