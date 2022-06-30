// firebase setup common for all the pages
export const firebaseConfig = {
  apiKey: "AIzaSyBKpwK_4fVTEIDiHDWS-Iq4fQZxZZIZUQg",
  authDomain: "playmusic-c865b.firebaseapp.com",
  projectId: "playmusic-c865b",
  storageBucket: "playmusic-c865b.appspot.com",
  messagingSenderId: "954779405956",
  appId: "1:954779405956:web:6d1a264a8a325c61cd7cd1",
  measurementId: "G-79237DB2LP",
};


// export all the variables
export const app = document.getElementById("app");
export const playerIndicator = document.getElementById("player-indicator");
export const navSection = document.getElementById("nav-section");
export const DurationShow = document.getElementById("DurationShow");
export const trend_parent_row = document.getElementById("trend_parent_row");
export const trend_parent_hindi = document.getElementById("trend_parent_hindi");
export const trend_parent_punjabi = document.getElementById("trend_parent_punjabi");
export const trend_parent_english = document.getElementById("trend_parent_english");
export const SongPoster=document.getElementById("SongPoster");
export const SongTitle=document.getElementById("SongTitle");
export const SongName=document.getElementById("SongName");
export const NextSong=document.getElementById("NextSong");
export const PrevSong=document.getElementById("PrevSong");
export const btngroup = document.getElementById("btngroup");
export const playLogo = document.getElementById("playLogo");
export const Mute = document.getElementById("Mute");
export const Volume = document.getElementById("Volume");
export const Shuffle = document.getElementById("Shuffle");
export const Loop = document.getElementById("Loop");
export const Search = document.getElementById("search");
export const playSong = document.getElementById('PlaySong');
export const audio = new Audio();
let playingStatus = false;
let trackCurrentIndex;
let SongList;




// playerIndicator function
export const playIndicater = ()=>{
  if(!app.classList.contains('close')){
    app.classList.remove('open');
    app.classList.add('close');
  }
  else{
    app.classList.remove('close');
    app.classList.add('open');
  }
}

// handleMove function
export const handlemove = (e)=>{
  app.style.left = `${e.x-200}px`;
  app.style.top = `${e.y-200}px `;
}

// // handledown function
export const handledown = (e)=>{
  document.addEventListener('mousemove',handlemove);
}

// mouseout event handler
 export const handleleave = (e)=>{
  document.removeEventListener('mousemove',handlemove);
};



// timeUpdate function
export const timeUpdate = (e)=>{
  let widthVal = (e.srcElement.currentTime/e.srcElement.duration)*100;
  const keyframe= new KeyframeEffect(
    DurationShow,
    [{width:`${widthVal}%`}]
    ,{duration:2000,easing:'linear',fill:'forwards'}

    );

  keyframe.pseudoElement="::before";
  let h = new Animation();
  h.effect = keyframe;
  h.play();
  playerIndicator.style.display='block';
  app.classList.add('open');
}

// loopFunction
export const loopFunction = () =>{
  if(audio.loop){
    audio.loop=false;
  }
  else{
    audio.loop=true;
  }
};

// MuteFunction
export const muteFunction = () =>{
  if(audio.muted){
    audio.muted=false;
  }
  else{
    audio.muted=true;
  }
};

// templateFunction --->Add songs card in dom
export const  trendTemplates = (data)=> {
  let fragment = new DocumentFragment();
  for (let i = 0; i < data.length; i++){
  var div = document.createElement('div');
  div.className='col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3';
  let template=`
    <div class="SongCard ">
      <div class="SongCard_wrapper d-flex">
      <div class="Song_poster">
           <img src='${'.'+data[i].SongPoster}' alt="">
      </div>
      <div class="Song_detail">
         <div class="song_info">
            <h3> ${data[i].SingerName} </h3>
           <span>${data[i].SongName} </span>
         </div>
         <div class="song_action">
           <button type="button" name="button" class='btn' aria-label="play">
              <i class="fa-regular fa-circle-play" data-key=${data[i].key} data-tag=${data[i].tag}></i>
           </button>
           <button type="button" name="button" class='btn' aria-label="add">
             <i class="fa-brands fa-gratipay" data-key=${data[i].key} data-like=${data[i].LikedBy}></i>
           </button>
         </div>
      </div>
    </div>
    </div>
    `;

    div.innerHTML=template;
    fragment.appendChild(div);
  }
  return fragment;
}

//Add fragment in their respective parentElement in the dom
export const TrendSet = (data,parentId)=>{
  let val = trendTemplates(data);
  parentId.appendChild(val);
}

//playSongsTrack function
export const PlaySongTrack = (songid)=>{
  let url = `https://playmusic-c865b-default-rtdb.firebaseio.com/Allsongs/${songid}.json`;


  fetch(url,{
    method: 'GET',
    'Access-Control-Allow-Origin':'',
  }).then((res)=>res.json()).then((data)=>{
    audio.src = '.'+ data['SongSrc'];
    SongPoster.setAttribute('src','.'+ data['SongPoster']);
    SongTitle.textContent=data['SongName'];
    SingerName.textContent=data['SingerName'];
    playingStatus = true;
    playSong.innerHTML='<i class="fa-solid fa-pause"></i>';
    let currentSection = data['tag'];
    audio.play();
    trackCurrentIndex = NextSongPlay(currentSection,data['SongSrc'],SongList);
  }).catch((err)=>{
    console.log(err);
  })
}

// OnclickPlaySong Function and add LIke

export const playAdd = (e) =>{

  // to play particular song
  if(e.target.parentElement.getAttribute('aria-label') == 'play'){
  let datakey = e.target.getAttribute('data-key');
  PlaySongTrack(datakey);
  }

  // to add liked Count of song
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
}


// strore all songs in a array
export const  getSongList = (data)=> {
  SongList =  data;
}

//PlayAndPause function
export const playPause = ()=>{
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
}

// getIndex of currentSrc in the playlist
export const  getIndex = (currentTrack,Currentplaylist) => {
  for (let i in Currentplaylist){
    if(Currentplaylist[i].SongSrc === currentTrack){
      return i;
    }
  }
}

// CurrentCategory song with trackSource
 export const NextSongPlay = (currentSection,currentTrack,SongList)=>{
  let Currentplaylist = [];
  for (let i in SongList){
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

// nextSong function
export const nextSong=()=>{
      let currentTrackSong = trackCurrentIndex.Currentplaylist[Number(trackCurrentIndex.index)+1];
      PlaySongTrack(currentTrackSong.key);
}

// prevSong function
export const prevSong = () => {
      let currentTrackSong = trackCurrentIndex.Currentplaylist[Number(trackCurrentIndex.index)-1];
      PlaySongTrack(currentTrackSong.key);
}

// Shuffle

// volume
