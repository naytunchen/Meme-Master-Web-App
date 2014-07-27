window.onload = function(){

Parse.initialize("EfZFq1ljZwCgYudEG4bkkLrSeUtJ9UxHyLHL6wYI", "DGtqZV6fc6o2hjn9UiuSJPe0p3dURcNv05hBgwFk");  

var default_memes = [{src:"pic/meme1.png",name:"lol1"},{src:"pic/meme2.png",name:"lol2"},{src:"pic/meme3.png",name:"lol3"}];

var Meme = Parse.Object.extend("Meme");

// for(i in default_memes){
//   var meme = new Meme();
//   meme.save(default_memes[i],{
//     success: function(object) {
//     // console.log("success");
//   },
//   error: function(model, error) {
//     // console.log("error");
//   }
//   });
// }

var query = new Parse.Query(Meme);
query.find({
  success: function(results){
    for(i in results){
      var cv = document.getElementById("content-view");
      cv.innerHTML = cv.innerHTML+"<div class=\"memeImg\">"+
            "<a href=\"newEdit.html\"><img src=\""+ results[i].attributes.src +"\" alt=\""+results[i].attributes.name+"\" height=\"150\" width=\"150\"></a>"+
          "</div>";
    }
  },
  error: function(error){
    alert("error");
  }
})

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