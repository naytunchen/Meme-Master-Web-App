var Meme;
var meme_rating = 1;

window.onload = function(){

  //associate parse account
  Parse.initialize("EfZFq1ljZwCgYudEG4bkkLrSeUtJ9UxHyLHL6wYI", "DGtqZV6fc6o2hjn9UiuSJPe0p3dURcNv05hBgwFk");  

  //gloabal definition
  Meme = Parse.Object.extend("Meme");
  //alert("the page is loading.")
};
// // $('#add_button').click( function() { alert('clicked'); });

// save all the info into DB
function saveMeme(){
	var meme = new Meme();
	// meme.src = document.getElementById("meme_url").value;
	// meme.name = document.getElementById("memeName").value;
	// meme.cat = document.getElementById("meme_cat").value;
	// meme.tag = document.getElementById("meme_tag").value;
	// meme.rating = 3;
	// meme.comment = document.getElementById("meme_comment").value;

	var meme_src = document.getElementById("meme_url").value;
	var memeName = document.getElementById("memeName").value;
	var meme_cat = "Cat1"; //document.getElementById("meme_cat").value;
	var meme_tag = document.getElementById("meme_tag").value;
	var meme_comment = document.getElementById("meme_comment").value;

	// console.log(meme_src);
	// console.log(memeName);
	// console.log(meme_cat);
	// console.log(meme_tag);
	// console.log(meme_comment);

	// alert(typeof(meme_cat));
	var meme_obj = {
		src: String(meme_src),
		name: String(memeName),
		cat: String(meme_cat),
		tag: String(meme_tag),
		rating: String(meme_rating),
		comment: String(meme_comment)
	};
	
	// meme.save({success: function(object) {alert("s");}, error: function(model, error) {alert("e");}});
	// alert("You've submitted meme, yo.");
	meme.save(meme_obj,{success: function(object) {alert("succ");}, error: function(model, error) {}});
};


// determine which star was pressed (rating 1-5)
// function rating(num){
// 	if(meme === 1)
// 		meme_rating = 1;
// 	else if(meme === 2)
// 		meme_rating = 2;
// 	else if(meme === 3)
// 		meme_rating = 3;
// 	else if(meme === 4)
// 		meme_rating = 4;
// 	else if(meme === 5)
// 		meme_rating = 5;
// }
