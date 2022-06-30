
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
  // const playerIndicator = document.getElementById("player-indicator");
  // const navSection = document.getElementById("nav-section");
  // const DurationShow = document.getElementById("DurationShow");
  const trend_parent_row = document.getElementById("trend_parent_row");
  // const SongPoster=document.getElementById("SongPoster");
  // const SongTitle=document.getElementById("SongTitle");
  // const SongName=document.getElementById("SongName");
  // const NextSong=document.getElementById("NextSong");
  // const PrevSong=document.getElementById("PrevSong");
  const btngroup = document.getElementById("btngroup");
  // const playLogo = document.getElementById("playLogo");
  // const Mute = document.getElementById("Mute");
  // const Volume = document.getElementById("Volume");
  // const Shuffle = document.getElementById("Shuffle");
  // const Loop = document.getElementById("Loop");
  // const Search = document.getElementById("search");




  // movable musicplayer handler with event
  // playerIndicator.addEventListener("click",()=>{
  //     if(!app.classList.contains('open')){
  //       app.classList.remove('close');
  //       app.classList.add('open');
  //     }
  //     else{
  //       app.classList.remove('open');
  //       app.classList.add('close');
  //     }
  // });

  // mousemove event handler
  handlemove = (e)=>{
    // app.style.left = `${e.x-200}px`;
    // app.style.top = `${e.y-200}px`;

  }

  // mousedown event handler
  handledown = ()=>{
    // app.removeEventListener('mousemove',handlemove);
  }

  // mouseout event handler
   handleleave = ()=>{
     // app.addEventListener('mousemove',handlemove);
  };
  // mousemove
  // app.addEventListener("mousemove", handlemove);
  // // mousedown
  // app.addEventListener("mousedown", handledown);
  // // mouseout
  // app.addEventListener("mouseleave", handleleave);


  // remove event on some specific width of the screen
    if(window.innerWidth<992){
      // app.removeEventListener('mousemove',handlemove);
      // app.removeEventListener('mousedown',handledown);
      // app.removeEventListener('mouseleave',handleleave);
    }

  // scroll event on window
  // window.addEventListener('scroll',(e)=>{
  //   if(window.scrollY>70){
  //     navSection.classList.remove('box-style');
  //     navSection.style.backgroundColor=" #EEEEEE";
  //     navSection.style.transition="all 0.5s linear";
  //   }
  //   else{
  //     navSection.classList.add('box-style');
  //     navSection.style.removeProperty('background-color');
  //   }
  // });


  // audio object
  const audio = new Audio();

  audio.addEventListener("timeupdate",(e)=>{
    let widthVal = (e.srcElement.currentTime/e.srcElement.duration)*100;
    const keyframe= new KeyframeEffect(
      DurationShow,
      [{width:`${widthVal}%`}]
      ,{duration:2000,easing:'linear',iterations:'Infinity'}

      );

    keyframe.pseudoElement="::before";
    let h = new Animation();
    h.effect = keyframe;
    h.play();
  });

  // Mute
  // Mute.addEventListener('click',()=>{
  //     if(audio.muted){
  //       audio.muted=false;
  //       Mute.style.backgroundColor="#FC4F4F";
  //     }
  //     else{
  //       audio.muted=true;
  //       Mute.style.backgroundColor="#139487";
  //     }
  // });

  // Volume

  // Shuffle


  // Loop
  // Loop.addEventListener('click',()=>{
  //   if(audio.loop){
  //     audio.loop=false;
  //     Loop.style.backgroundColor="#FC4F4F";
  //   }
  //   else{
  //     audio.loop=true;
  //     Loop.style.backgroundColor="#139487";
  //   }
  // });


  // write data into the realtime firebase database
  const database = firebase.database();

  // add trend div in the dom
  function trendTemplates(data) {

    let fragment = new DocumentFragment();
    let div1 = document.createElement('div');
    div1.className = 'grid';
    for (let i = 0; i < data.length; i++){
    var div = document.createElement('div');
    div.className='g-col-6';
    template=`
       <div class="col-container position-relative">
          <div class="parent-content ">
            <div class="position-relative hover-child ">
                <img src='${'.'+ data[i].SongPoster}' loading="lazy" class="song-poster w-100 "alt="">
                    <div class="song-info  position-absolute top-0 start-0 end-0   w-100  showcase ">
                        <div class="d-flex inner-wrap ">
                          <div class="song-detail d-flex flex-column align-items-center justify-content-center">
                              <p> ${data[i].SingerName} </p>
                              <p> ${data[i].SongName} </p>
                            </div>
                              <div class="button-group d-flex flex-column align-items-center justify-content-center">
                                <button class="btn-play"  type="button" aria-label="play"><i class="fa-regular fa-circle-play" key=${'.'+ data[i].SongSrc} data-key=${data[i].key}></i></button>
                                <button class="btn-add" aria-label="add"><i class="fa-brands fa-gratipay" data-key=${data[i].key}></i></button>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>  `;
      div.innerHTML=template;
      fragment.appendChild(div);
    }
    div1.appendChild(fragment);
    // return fragment;
    // console.log(div1);
    return div1;
  }



  // play songs on click play-btn
  // btngroup.addEventListener('click',async (event)=>{
  //   if(event.target.parentElement.attributes['aria-label'].nodeValue == 'play'){
  //   var key = await event.target.getAttribute('key');
  //
  //   audio.src = key;
  //   // console.log(key);
  //  const getSong = (list)=>{
  //     list.find((a)=>{
  //         if(('.'+a.SongSrc)===key){
  //           SongPoster.setAttribute('src','.'+ a.SongPoster);
  //           SongTitle.textContent=a.SongName;
  //           SingerName.textContent=a.SingerName;
  //           audio.play();
  //           console.log("Hello World!!!");
  //         }
  //     });
  //  }
  //  getSong(list);
  //
  // }
  //
  // if(event.target.parentElement.attributes['aria-label'].nodeValue == 'add'){
  //
  //   let songID = event.target.attributes['data-key'].nodeValue;
  //   database.ref('Allsongs').orderByKey().equalTo(songID).once('child_added',(data)=>{
  //
  //     database.ref('Allsongs/' + data.key).set({
  //       SingerName:data.val()['SingerName'],
  //       SongName:data.val()['SongName'],
  //       SongPoster:data.val()['SongPoster'],
  //       SongSrc:data.val()['SongSrc'],
  //       key:data.key,
  //       language:data.val()['language'],
  //       tag:data.val()['tag'],
  //       LikedBy:data.val()['LikedBy']+1,
  //     }, (error) => {
  //       if (error) {
  //         console.log("Updation failed: ",error);
  //       } else {
  //         console.log("Updated successfully!!!")
  //         // location.reload();
  //       }
  //     });
  //   },(err)=>{console.log(err);});
  //
  // }
  //
  // });


  // add the card of songs
  const TrendSet = (data,parentId)=>{
    let val = trendTemplates(data);
    parentId.appendChild(val);
  }



  // retrive data from Allsongs database
  var list;
  database.ref("Allsongs").on('value',getsong,getError);

  async function getsong(data){
     list = await Object.keys(data.val()).map((a)=>{
      return data.val()[a];
    });
     let arr = list.filter((a)=>{
       if(a['tag'] ==='trending'){
         return a;
       }
     })
     TrendSet(arr,trend_parent_row);
  }
function getError(err) {
    console.log(err);
}




// filter based on language and singers
// const Filter = document.getElementById('filter_parent');
//
// Filter.addEventListener('change',(e)=>{
//   if(e.target.checked){
//     let v = e.target.value;
//     let sfield = e.target.getAttribute('data-type');
//     let arr = list.filter((a)=>{
//       if(a[sfield] === v && a['tag'] ==='trending'){
//         return a;
//       }
//     })
//     trend_parent_row.removeChild(trend_parent_row.firstChild);
//     TrendSet(arr,trend_parent_row);
//   }
//   else{
//     trend_parent_row.removeChild(trend_parent_row.firstChild);
//     let arr = list.filter((a)=>{
//       if(a['tag'] ==='trending'){
//         return a;
//     }
//     });
//     TrendSet(arr,trend_parent_row);
//    };
// });
