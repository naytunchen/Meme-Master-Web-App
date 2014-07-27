//global declaration
var Meme,Cat,meme_query,cat_query;

/* called when page loads first time */
window.onload = function(){

  //associate parse account
  Parse.initialize("EfZFq1ljZwCgYudEG4bkkLrSeUtJ9UxHyLHL6wYI", "DGtqZV6fc6o2hjn9UiuSJPe0p3dURcNv05hBgwFk");  

  //gloabal definition
  Meme = Parse.Object.extend("Meme");
  Cat = Parse.Object.extend("Cat");
  meme_query = new Parse.Query(Meme);
  cat_query = new Parse.Query(Cat);

  //setup default meme and cat (run only once)
  //setupDefault();

  //insert contents
  updateAllCat();
  updateCatBar();
};

var setupDefault = function(){
  var default_memes = [{src:"pic/meme1.png",name:"lol1",cat:"Cat1"},
                       {src:"pic/meme2.png",name:"lol2",cat:"Cat2"},
                       {src:"pic/meme3.png",name:"lol3",cat:"Cat3"}];
  var default_cats = [{name:"Cat1", count:1},{name:"Cat2", count:1},{name:"Cat3", count:1}];
  //SAVE DEFAULT MEME TO SERVER
  for(i in default_memes){
    var meme = new Meme();
    meme.save(default_memes[i],{
    success: function(object) {
    },
    error: function(model, error) {
    }
    });
  }
  //SAVE DEFAULT CAT TO SERVER
  for(i in default_cats){
    var cat = new Cat();
    cat.save(default_cats[i],{
    success: function(object) {
    },
    error: function(model, error) {
    }
    });
  }
};

var updateAllCat = function(){
  //insert memes
  meme_query.find({
    success: function(results){
      var cv = document.getElementById("content-view");
      for(i in results){
        cv.innerHTML = cv.innerHTML+"<div class=\"memeImg\">"+
              "<a href=\"newEdit.html\"><img src=\""+results[i].attributes.src+"\" alt=\""
              +results[i].attributes.name+"\" data-id=\""+results[i].id
              +"\" height=\"150\" width=\"150\"></a>"+
              "</div>";
      }
      //attach event listener
      var meme_div = document.getElementsByClassName('memeImg');
      for(i=0;i<meme_div.length;i++){
        meme_div[i].addEventListener("click",updateEdit,false);
      }
    },
    error: function(error){
      alert("updateAllCat error");
    }
  });
};

var updateCatBar = function(){
  cat_query.find({
    success: function(results){
      var cb = document.getElementById("cat-bar");
      for(i in results){
        cb.innerHTML = cb.innerHTML+"<a href=\"indexCat2.html\">"
        +"<div class=\"category-item\" data-name=\""+results[i].attributes.name
        +"\" data-id=\""+results[i].id+"\">"+results[i].attributes.name+"</div>"
      }
      //attach event listener
      var cat_div = document.getElementsByClassName('category-item');
      for(i=0;i<cat_div.length;i++){
        cat_div[i].addEventListener("click",updateCatView,false);
      }
    },
    error: function(error){
      alert("updateCatBar error");
    }
  });
};

var updateEdit = function(){
  // alert("hihihi");
};

var updateCatView = function(){

}

// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
//   testObject.save({foo: "bar"}, {
//   success: function(object) {
//     alert("success");
//   },
//   error: function(model, error) {
//     alert("error");
//   }
// });

// var query = new Parse.Query(TestObject);
// query.equalTo("foo","bar");
// query.find({
//   success: function(results) {
//     alert("Successfully retrieved " + results.length + " scores.");
//     // Do something with the returned Parse.Object values
//     for (var i = 0; i < results.length; i++) { 
//       var object = results[i];
//       alert(object.id + ' - ' + object.get('foo'));
//     }
//   },
//   error: function(error) {
//     alert("Error: " + error.code + " " + error.message);
//   }
// });