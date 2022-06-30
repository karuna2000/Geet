
// using push method 
function setNew(title,singer){
    database.ref('newsong').push().set({
      title:title,
      singer:singer,
    });
  };
  
  
  // filter and sort the list of data
  var vl = database.ref('Allsongs/').limitToFirst(10);
  let i =false;
  
   vl.orderByChild('SingerName').equalTo('Roi Na').on('child_added',(data)=>{
    console.log(data.val())
    i = true;
    // console.log(i);
  });
  
  if (i === false){
    vl.orderByChild('SongName').equalTo('Roi Na').on('child_added',(data)=>{
      console.log(data.val())
      i = false;
      // console.log(i);
    });
  }
  
  
  
  
  
  
  
  
  





