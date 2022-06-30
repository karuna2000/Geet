

  const firebaseConfig = {
    apiKey: "AIzaSyBKpwK_4fVTEIDiHDWS-Iq4fQZxZZIZUQg",
    authDomain: "playmusic-c865b.firebaseapp.com",
    projectId: "playmusic-c865b",
    storageBucket: "playmusic-c865b.appspot.com",
    messagingSenderId: "954779405956",
    appId: "1:954779405956:web:6d1a264a8a325c61cd7cd1",
    measurementId: "G-79237DB2LP",
  };

  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);



const app = document.getElementById("app");
const playerIndicator = document.getElementById("player-indicator");
const navSection = document.getElementById("nav-section");
const DurationShow = document.getElementById("DurationShow");
const trend_parent_row = document.getElementById("trend_parent_row");
const trend_parent_hindi = document.getElementById("trend_parent_hindi");
const trend_parent_punjabi = document.getElementById("trend_parent_punjabi");
const trend_parent_english = document.getElementById("trend_parent_english");
// const trend_parent_haryanvi = document.getElementById("trend_parent_haryanvi");
const SongPoster=document.getElementById("SongPoster");
const SongTitle=document.getElementById("SongTitle");
const SongName=document.getElementById("SongName");
const NextSong=document.getElementById("NextSong");
const PrevSong=document.getElementById("PrevSong");
const btngroup = document.getElementById("btngroup");
const playLogo = document.getElementById("playLogo");
const Mute = document.getElementById("Mute");
const Volume = document.getElementById("Volume");
const Shuffle = document.getElementById("Shuffle");
const Loop = document.getElementById("Loop");
const Search = document.getElementById("search");
const playSong = document.getElementById('PlaySong');


// movable musicplayer handler with event
playerIndicator.style.display='none';
playerIndicator.addEventListener("click",()=>{
    if(!app.classList.contains('open')){
      app.classList.remove('close');
      app.classList.add('open');
    }
    else{
      app.classList.remove('open');
      app.classList.add('close');
    }
});

// mousemove event handler
handlemove = (e)=>{
  app.style.left = `${e.x-200}px`;
  app.style.top = `${e.y-200}px`;

}

// mousedown event handler
handledown = (e)=>{
  app.addEventListener('mousemove',handlemove);
}

// mouseout event handler
 handleleave = (e)=>{
  app.removeEventListener('mousemove',handlemove);
};

app.addEventListener("dblclick", handledown);
app.addEventListener("click", handleleave);


// remove event on some specific width of the screen
  if(window.innerWidth<992){
    app.removeEventListener('mousemove',handlemove);
    app.removeEventListener('dblclick',handledown);
    app.removeEventListener('click',handleleave);
  }

// scroll event on window
window.addEventListener('scroll',(e)=>{
  if(window.scrollY>70){
    navSection.classList.remove('box-style');
    navSection.style.backgroundColor=" #EEEEEE";
    navSection.style.transition="all 0.5s linear";
  }
  else{
    navSection.classList.add('box-style');
    navSection.style.removeProperty('background-color');
  }
});


// audio object
const audio = new Audio();
let playingStatus = false;

audio.addEventListener("timeupdate",(e)=>{
  let widthVal = (e.srcElement.currentTime/e.srcElement.duration)*100;
  const keyframe= new KeyframeEffect(
    DurationShow,
    [{width:`${widthVal}%`}]
    // {width:`${widthVal}%`},
    // {width:`${widthVal}%`}],
    ,{duration:2000,easing:'linear',fill:'forwards'}

    );

  keyframe.pseudoElement="::before";
  let h = new Animation();
  h.effect = keyframe;
  h.play();
  playerIndicator.style.display='block';
});

// Mute
Mute.addEventListener('click',()=>{
    if(audio.muted){
      audio.muted=false;
      Mute.style.backgroundColor="#FC4F4F";
    }
    else{
      audio.muted=true;
      Mute.style.backgroundColor="#139487";
    }
});

// Volume


// Shuffle
Shuffle.addEventListener('click',()=>{
    console.log("Shuffle");
});


// Loop
Loop.addEventListener('click',()=>{
  if(audio.loop){
    audio.loop=false;
    Loop.style.backgroundColor="#FC4F4F";
  }
  else{
    audio.loop=true;
    Loop.style.backgroundColor="#139487";
  }
});


// write data into the realtime firebase database
const database = firebase.database();

// add trend div in the dom
function trendTemplates(data) {
  let fragment = new DocumentFragment();
  // const keys = Object.keys(data);
  for (let i = 0; i < data.length; i++){
  var div = document.createElement('div');
  div.className='col';
  template=`
     <div class="col-container position-relative">
        <div class="parent-content">
          <div class="position-relative hover-child">
              <img src='${data[i].SongPoster}' loading="lazy" class="song-poster w-100 "alt="">
                  <div class="song-info  position-absolute top-0 start-0 end-0   w-100  showcase ">
                      <div class="d-flex inner-wrap ">
                        <div class="song-detail d-flex flex-column align-items-center justify-content-center">
                            <p> ${data[i].SingerName} </p>
                            <p> ${data[i].SongName} </p>
                          </div>
                            <div class=" button-group d-flex flex-column align-items-center justify-content-center">
                              <button class="btn-play"  type="button" aria-label="play"><i class="fa-regular fa-circle-play"  data-key=${data[i].key} data-tag=${data[i].tag}></i></button>
                              <button class="btn-add" aria-label="add"><i class="fa-brands fa-gratipay" data-key=${data[i].key} data-like=${data[i].LikedBy}></i></button>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>  `;
    div.innerHTML=template;
    fragment.appendChild(div);
  }
  return fragment;
}

// it will hold currentSection and songsrc
let trackCurrentIndex;


// playsongs
const PlaySongTrack = (songid)=>{
  let url = `https://playmusic-c865b-default-rtdb.firebaseio.com/Allsongs/${songid}.json`;

  fetch(url,{
    method: 'GET',
    'Access-Control-Allow-Origin':'',
  }).then((res)=>res.json()).then((data)=>{
    audio.src = data['SongSrc'];
    SongPoster.setAttribute('src',data['SongPoster']);
    SongTitle.textContent=data['SongName'];
    SingerName.textContent=data['SingerName'];
    playingStatus = true;
    playSong.innerHTML='<i class="fa-solid fa-pause"></i>';
    let currentSection = data['tag'];
    audio.play();
    trackCurrentIndex = NextSongPlay(currentSection,data['SongSrc']);
  }).catch(()=>{
    alert("Something is wrong!!!");
  })
}



// play song on click play-btn
btngroup.addEventListener('click',(e)=>{
  if(e.target.parentElement.getAttribute('aria-label') == 'play'){
  let datakey = e.target.getAttribute('data-key');
  PlaySongTrack(datakey);
}

// add like function
if(e.target.parentElement.getAttribute('aria-label') == 'add'){

  let songID = e.target.getAttribute('data-key');
  let likeData = Number(e.target.getAttribute('data-like'))+1;

  let url = `https://playmusic-c865b-default-rtdb.firebaseio.com/Allsongs/${songID}.json`;
  const data = {LikedBy:likeData};

fetch(url,{
  method: 'PATCH',
  'Access-Control-Allow-Origin':'',
  body:JSON.stringify(data),
}).then((res)=>res.json()).then((data)=>{
   console.log(data);
   location.reload();
}).catch((err)=>{
  alert("Something is wrong!!!",err);
})
}

});


// add songs in their respective parent element in dom
const TrendSet = (data,parentId)=>{
  let val = trendTemplates(data);
  parentId.appendChild(val);
}




// retrive data from  database
var list;// gather all songs in a
let SongList;

// stroe all songs in a array
function getSongList(data){
  return data;
}


database.ref("Allsongs").on('value',getsong,getError);


function getsong(data) {
  // for trending songs
   list = Object.keys(data.val()).map((a)=>{
    return data.val()[a];
  });

  SongList = getSongList(list);

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

function getError(err) {
  console.log(err);
}


// play and pause functionality in the music controller
playSong.addEventListener('click',()=>{
  if(playingStatus){
    audio.pause();
    playingStatus = false;
    playSong.innerHTML='<i class="fa-solid fa-play"></i>';
  }
  else{
    audio.play();
    playingStatus = true;
    playSong.innerHTML='<i class="fa-solid fa-pause"></i>';
  }
})

// CurrentRunning Song index
function getIndex(currentTrack,Currentplaylist){
  for (i in Currentplaylist){
    if(Currentplaylist[i].SongSrc === currentTrack){
      return i;
    }
  }
}


// CurrentCategory song with trackSource
 function NextSongPlay(currentSection,currentTrack ){
  let Currentplaylist = [];
  for (i in SongList){
    if(SongList[i].tag === currentSection){
      Currentplaylist.push(SongList[i]);
    };
  }

  let index = getIndex(currentTrack,Currentplaylist);
  return ({
    index:index,
    Currentplaylist:Currentplaylist,
  });
}


// next song
function nextSong(){
      let currentTrackSong = trackCurrentIndex.Currentplaylist[Number(trackCurrentIndex.index)+1];
      PlaySongTrack(currentTrackSong.key);
}

// previous song
function prevSong(){
      let currentTrackSong = trackCurrentIndex.Currentplaylist[Number(trackCurrentIndex.index)-1];
      PlaySongTrack(currentTrackSong.key);
}

NextSong.addEventListener('click',nextSong);
PrevSong.addEventListener('click',prevSong);

audio.addEventListener('ended',()=>{
  nextSong();
});
