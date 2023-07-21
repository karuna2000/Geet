
const searchClient= algoliasearch('TU39AN3W6E', '1a1bfa67ea9761ea5be39f4788b706d7');
// const index = searchClient.initIndex('AllSongs');
const index = searchClient.initIndex('Songs');
const hit = document.querySelector('#hit');

// intially display none for hit container
hit.classList.add('d-none');


const search = instantsearch({
    indexName: 'AllSongs',
    searchClient,
});


search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#searchbox',
        placeholder: 'Search for songs and singers',
        showReset:true,
        showSubmit: false,
        cssClasses:{
          input:['form-control'],
        },
    })
);

// ../audio/
// ./audio/Despacito.mp3
let audio = new Audio();

const AudioPlay = (e)=>{
    let s = e.target.attributes['data-src'].nodeValue;
    audio.src = s;
    audio.play();
}

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hit',
        templates:{
            item:data => `
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
            <div class="SongCard ">
              <div class="SongCard_wrapper d-flex">
              <div class="Song_poster">
                   <img src=${data.imageUrl} alt="">
              </div>
              <div class="Song_detail">
                 <div class="song_info">
                    <h3>${instantsearch.highlight({attribute:'SongName',hit:data})}</h3>
                   <span>${instantsearch.highlight({attribute:'SingerName',hit:data})}</span>
                 </div>
                 <div class="song_action">
                   <button type="button" name="button" class='btn' aria-label="play">
                      <i class="fa-regular fa-circle-play" data-src = ${'.'+ data.SongSrc} onclick="AudioPlay(event)" ></i>
                   </button>
                   <button type="button" name="button" class='btn' aria-label="add">
                     <i class="fa-brands fa-gratipay"></i>
                   </button>
                 </div>
              </div>
            </div>
            </div>
            </div>`,
            empty: '<span class="text-white bg-danger d-block text-center w-100 mt-2">No results for <q>{{ query }}</q><span>',
        },

}));


search.start();



const input = document.querySelector('input');
input.addEventListener('input',()=>{
    if(input.value !== ''){
        hit.classList.remove('d-none');
    }
    else{
        hit.classList.add('d-none');
    }
});


