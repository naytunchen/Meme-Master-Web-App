//global declaration
var Meme,Cat;
var rating = 0;
var meme_id;
var cat_id;

/* called when page loads first time */
window.onload = function(){

  //associate parse account
  Parse.initialize("EfZFq1ljZwCgYudEG4bkkLrSeUtJ9UxHyLHL6wYI", "DGtqZV6fc6o2hjn9UiuSJPe0p3dURcNv05hBgwFk");  

  //gloabal definition
  Meme = Parse.Object.extend("Meme");
  Cat = Parse.Object.extend("Cat");

  //setup default meme and cat (run only once)
  //setupDefault();

  //bind rating events
  ratingFunc();

  //switch stylesheets
  for ( i=0; i<document.styleSheets.length; i++) {
    document.styleSheets.item(i).disabled=true;
  }
  document.styleSheets.item(0).disabled=false;
  document.styleSheets.item(1).disabled=false;

  //insert contents
  updateAllCat();
  updateCatBar();

   $(function() {
    $('#search-box').on("change", function() {
      var source_file = $(this).val();
      searchMeme(source_file);
      document.getElementById('search-box').value = "";

      });
  });
};

var searchMeme = function(target){
  var meme_query = new Parse.Query(Meme);
  var memeArray1 = {};
  meme_query.contains("name", target);
  meme_query.find({
      success: function(results){
        for(i in results)
        {
          memeArray1[results[i].id] = results[i];
        }
        var query = new Parse.Query(Meme);
        query.contains("tag", target);
        query.find({
          success: function(results){
            for(i in results)
            {
              memeArray1[results[i].id] = results[i];
            }
            //-------------------------------------------------
            var mv = $("#meme-view");
            $("div").remove(".memeImg");
            for(i in memeArray1){
              mv.append("<div class=\"memeImg\">"+
                    "<img src=\""+memeArray1[i].get("src")+"\" alt=\""
                    +memeArray1[i].get("name")+"\" data-id=\""+memeArray1[i].id
                    +"\" height=\"150\" width=\"150\">"+
                    "</div>");
            }
            //attach event listener
            var meme_div = document.getElementsByClassName('memeImg');
            for(i=0;i<meme_div.length;i++){
              meme_div[i].addEventListener("click",updateEditView,false);
            }
            //switch stylesheets
            for ( i=0; i<document.styleSheets.length; i++) {
              document.styleSheets.item(i).disabled=true;
            }
            document.styleSheets.item(0).disabled=false;
            document.styleSheets.item(1).disabled=false;
            //show meme view only
            hideView();
            var MV = document.getElementById('meme-view');
            MV.style.display = "block";
          },
          error: function(error){
            alaert("ERROR in search tag")
          }
        });
      },
      error: function(error){
        alert("updateEditView error");
      }
    });
}


var ratingFunc = function(){
  for(i=1;i<6;i++){
    $(".rating"+i).bind("click",function(){
      rating = this.value;
    });
  }
}

//nide everything in content view
var hideView = function(){
  var cv = document.getElementsByClassName('content-view');
  for(i=0;i<cv.length;i++){
    cv[i].style.display = "none";
  }
};

//setup the default data in database
var setupDefault = function(){
  var default_memes = [{src:"pic/meme1.png",name:"lol1",cat:"Cat1",tag:"tag0,tag1",rating:"3",comment:"some comment"},
                       {src:"pic/meme2.png",name:"lol2",cat:"Cat2",tag:"tag0,tag2",rating:"4",comment:"some comment"},
                       {src:"pic/meme3.png",name:"lol3",cat:"Cat3",tag:"tag0,tag3",rating:"5",comment:"some comment"}];
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

//show all memes in content view
var updateAllCat = function(){
  //insert memes
  var meme_query = new Parse.Query(Meme);
  meme_query.find({
    success: function(results){
      var mv = $("#meme-view");
      $("div").remove(".memeImg");
      for(i in results){
        mv.append("<div class=\"memeImg\">"+
              "<img src=\""+results[i].get("src")+"\" alt=\""
              +results[i].get("name")+"\" data-id=\""+results[i].id
              +"\" height=\"150\" width=\"150\">"+
              "</div>");
      }
      //attach event listener
      var meme_div = document.getElementsByClassName('memeImg');
      for(i=0;i<meme_div.length;i++){
        meme_div[i].addEventListener("click",updateEditView,false);
      }
      //switch stylesheets
      for ( i=0; i<document.styleSheets.length; i++) {
        document.styleSheets.item(i).disabled=true;
      }
      document.styleSheets.item(0).disabled=false;
      document.styleSheets.item(1).disabled=false;
      //show meme view only
      hideView();
      var MV = document.getElementById('meme-view');
      MV.style.display = "block";
    },
    error: function(error){
      alert("updateAllCat error: "+error);
    }
  });
};

//show categories on side bar
var updateCatBar = function(){
  var cat_query = new Parse.Query(Cat);
  cat_query.find({
    success: function(results){
      var cb = $("#cat-bar");
      $("div").remove(".category-sub");
      for(i in results){
        cb.append("<div class=\"category-item category-sub\" data-name=\""
          +results[i].get("name")+"\" data-id=\""+results[i].id+"\">"
          +results[i].get("name")+"</div>");
      }
      //attach event listener
      var cat_div = document.getElementsByClassName('category-item');
      for(i=0;i<cat_div.length;i++){
        cat_div[i].addEventListener("click",updateCatView,false);
      }
      var cb = document.getElementById('createBtn');
      var ub = document.getElementById("uploadBtn");
	  var lb = document.getElementById("login-button");
	  var sb = document.getElementById("login_signupButton");
	  var signupSubmit = document.getElementById("signupSubmitButton");
	  var signIn = document.getElementById("login_signinButton");
      cb.addEventListener("click",updateCreateView,false);
      ub.addEventListener("click",updateAddView,false);
	  lb.addEventListener("click", updateLoginView, false);
	  sb.addEventListener("click", updateSignupView, false);
	  signupSubmit.addEventListener("click", submitSignup, false);
	  signIn.addEventListener("click", signin, false);
    },
    error: function(error){
      alert("updateCatBar error");
    }
  });
};

//signIn
var signin = function() {
	Parse.User.logIn(document.getElementById("loginUsername").value, document.getElementById("loginPassword").value, {
	  success: function(user) {
		updateAllCat();
	  },
	  error: function(user, error) {
		// The login failed. Check error to see why.
		alert("Invalid username or password");
	  }
	});
}

//create account
var submitSignup = function() {
	var user = new Parse.User();
	user.set("username", document.getElementById("signup_username").value);
	user.set("password", document.getElementById("signup_password").value);
	user.set("email", document.getElementById("signup_email").value);
	
	user.signUp(null, {
	  success: function(user) {
		document.getElementById("signup_username").value = "";
		document.getElementById("signup_firstName").value = "";
		document.getElementById("signup_lastName").value = "";
		document.getElementById("signup_password").value = "";
		document.getElementById("signup_email").value = "";
		alert("Congratulations! You're now a MemeMaster.");
		updateAllCat();
	  },
	  error: function(user, error) {
		// Show the error message somewhere and let the user try again.
		alert("Error: " + error.code + " " + error.message);
	  }
	});
};

//show edit page in content view
var updateEditView = function(){
  var target = this;
  //fill in cat drop down info
  var edit_catDrop = $("#edit_catDrop");
  edit_catDrop.empty();
  var cat_query = new Parse.Query(Cat);
  cat_query.find({
    success: function(results){
      for(i in results){
        edit_catDrop.append($('<option></option>').val(results[i].get("name")).html(results[i].get("name")));
      }
      fillEditInfo();
    },
    error: function(error){
      alert("updateEditView error");
    }
  });

  //fill in meme info
  var fillEditInfo = function(){
    var meme_query = new Parse.Query(Meme);
    meme_query.equalTo("objectId",target.childNodes[0].getAttribute("data-id"));
    meme_query.find({
      success: function(results){
        document.getElementById("edit-img").src=results[0].get("src");
        document.edit_form.edit_name.value = results[0].get("name");
        document.getElementById('figcap').innerHTML = results[0].get("name");

        $('.tagsystem').importTags(results[0].get("tag"));
        document.edit_form.edit_comment.value = results[0].get("comment");
        for(i=1;i<6;i++){
          document.getElementById("add-rate-"+i).checked=false;
        }
        if(parseInt(results[0].get("rating"))>0)
          document.getElementById("edit-rate-"+parseInt(results[0].get("rating"))).checked=true;
        $('#edit_catDrop option[value=' + results[0].get("cat") + ']').prop('selected', true);
        rating = results[0].get("rating");
        meme_id = results[0].id;
        bindEdit();
      },
      error: function(error){
        alert("updateEditView error");
      }
    });
  }

  var bindEdit = function(){
    //bind events
    var es = document.getElementById("edit-save");
    es.addEventListener("click",editSave,false);
    var ec = document.getElementById("edit-cancel");
    ec.addEventListener("click",updateAllCat,false);
    //switch stylesheets
    for ( i=0; i<document.styleSheets.length; i++) {
      document.styleSheets.item(i).disabled=true;
    }
    document.styleSheets.item(0).disabled=false;
    document.styleSheets.item(1).disabled=false;
    document.styleSheets.item(2).disabled=false;
    document.styleSheets.item(3).disabled=false;
    //show edit view only
    hideView();
    var ev = document.getElementById('edit-view');
    ev.style.display = "block";
  }
};

//show memes in content view based on category
var updateCatView = function(){
  if(this.id=="all-cat"){
    updateAllCat();
  }else{
    //insert memes
    var meme_query = new Parse.Query(Meme);
    meme_query.equalTo("cat",this.getAttribute("data-name"));
    meme_query.find({
      success: function(results){
        var mv = $("#meme-view");
        $("div").remove(".memeImg");
        for(i in results){
          mv.append("<div class=\"memeImg\">"+
                "<img src=\""+results[i].get("src")+"\" alt=\""
                +results[i].get("name")+"\" data-id=\""+results[i].id
                +"\" height=\"150\" width=\"150\">"+
                "</div>");
        }
        //attach event listener
        var meme_div = document.getElementsByClassName('memeImg');
        for(i=0;i<meme_div.length;i++){
          meme_div[i].addEventListener("click",updateEditView,false);
        }
        //switch stylesheets
        for ( i=0; i<document.styleSheets.length; i++) {
          document.styleSheets.item(i).disabled=true;
        }
        document.styleSheets.item(0).disabled=false;
        document.styleSheets.item(1).disabled=false;
        //show meme view only
        hideView();
        var MV = document.getElementById('meme-view');
        MV.style.display = "block";
      },
      error: function(error){
        alert("updateAllCat error");
      }
    });
  }
};

//show add page in content view
var updateAddView = function(){
  //clear fields
  document.add_form.add_url.value="";
  document.add_form.add_name.value="";
  $("#add_tag").importTags("");
  document.add_form.add_comment.value="";
  for(i=1;i<6;i++){
    document.getElementById("add-rate-"+i).checked=false;
  }
  document.getElementById("add_imageViewer").src="pic/Placeholder.jpg";

  //fill in cat drop down info
  var add_catDrop = $("#add_catDrop");
  add_catDrop.empty();
  var cat_query = new Parse.Query(Cat);
  cat_query.find({
    success: function(results){
      for(i in results){
        add_catDrop.append($('<option></option>').val(results[i].get("name")).html(results[i].get("name")));
      }
    },
    error: function(error){
      alert("updateAddView error");
    }
  });
  rating=0;

  //bind events
  var as = document.getElementById("add-save");
  as.addEventListener("click",addSave,false);
  var ac = document.getElementById("add-cancel");
  ac.addEventListener("click",updateAllCat,false);
  //switch stylesheets
  for ( i=0; i<document.styleSheets.length; i++) {
    document.styleSheets.item(i).disabled=true;
  }
  document.styleSheets.item(0).disabled=false;
  document.styleSheets.item(1).disabled=false;
  document.styleSheets.item(2).disabled=false;
  document.styleSheets.item(3).disabled=false;
  //show edit view only
  hideView();
  var ev = document.getElementById('add-view');
  ev.style.display = "block";
};

//show signup page in content view
var updateSignupView = function() {
	hideView();
	var ev = document.getElementById('signup-view');
	ev.style.display="block";
}

//show login page in content view
var updateLoginView = function() {
	hideView();
	var ev = document.getElementById('login-view');
	ev.style.display="block";
}

//show create page in content view
var updateCreateView = function(){
  //clear fields
  document.getElementById("imgInp").value="";
  document.create_form.create_name.value="";
  $("#create_tag").importTags("");
  document.create_form.create_comment.value="";
  for(i=1;i<6;i++){
    document.getElementById("create-rate-"+i).checked=false;
  }
  document.getElementById("create_imageViewer").src="pic/Placeholder.jpg";

  //fill in cat drop down info
  var create_catDrop = $("#create_catDrop");
  create_catDrop.empty();
  var cat_query = new Parse.Query(Cat);
  cat_query.find({
    success: function(results){
      for(i in results){
        create_catDrop.append($('<option></option>').val(results[i].get("name")).html(results[i].get("name")));
      }
    },
    error: function(error){
      alert("updateCreateView error");
    }
  });
  rating=0;

  //bind events
  document.getElementById('top_text_pane').style.border = '1px dotted black';
  document.getElementById('bot_text_pane').style.border = '1px dotted black';
  var imgViewer = document.getElementById('create_imageViewer');
  imgViewer.src = "pic/Placeholder.jpg";
  $("#top_text_pane").text("Enter Top Text Here");
  $("#bot_text_pane").text("Enter Bot Text Here");

  var cs = document.getElementById("create-save");
  cs.addEventListener("click",createSave,false);
  var cc = document.getElementById("create-cancel");
  cc.addEventListener("click",updateAllCat,false);
  //switch stylesheets
  for ( i=0; i<document.styleSheets.length; i++) {
    document.styleSheets.item(i).disabled=true;
  }
  document.styleSheets.item(0).disabled=false;
  document.styleSheets.item(1).disabled=false;
  document.styleSheets.item(2).disabled=false;
  document.styleSheets.item(3).disabled=false;
  //show create view only
  hideView();
  var ev = document.getElementById('create-view');
  ev.style.display = "block";
};

//called when edit page is saved
var editSave = function(){
  //save action
  var meme_query = new Parse.Query(Meme);
  meme_query.equalTo("objectId",meme_id);
  meme_query.find({
    success: function(results){
      results[0].set("name",document.edit_form.edit_name.value);
      results[0].set("tag",document.edit_form.edit_tag.value);
      results[0].set("comment",document.edit_form.edit_comment.value);
      results[0].set("rating",String(rating));
      results[0].set("cat",$('#edit_catDrop').val());
      results[0].save();

      updateAllCat();
      updateCatBar();
    },
    error: function(error){
      alert("editSave error");
    }
  });
};

//called when create page is saved
var createSave = function(){
  //save action
  var new_meme;
  borderClearer();
  html2canvas($('#createMeme_container'), {
    onrendered: function(canvas) {
      var imgString = canvas.toDataURL("image/png");
      var file = new Parse.File("memePic.png", { base64: imgString });
      file.save().then(function() {
        new_meme = {
          src: file._url,
          name: document.create_form.create_name.value,
          tag: document.create_form.create_tag.value,
          comment: document.create_form.create_comment.value,
          "rating": String(rating),
          cat: $('#create_catDrop').val()
        };
        var meme = new Meme();
        meme.save(new_meme,{
        success: function(object) {
          updateAllCat();
          updateCatBar();
        },
        error: function(model, error) {
          alert("addSave error");
        }
        });
      }, function(error) {
        alert("upload file failed");
      });

    }
  });
};

//called when add page is saved
var addSave = function(){
  //save action
  var new_meme = {
    src: document.add_form.add_url.value,
    name: document.add_form.add_name.value,
    tag: document.add_form.add_tag.value,
    comment: document.add_form.add_comment.value,
    "rating": String(rating),
    cat: $('#add_catDrop').val()
  }
  var meme = new Meme();
  meme.save(new_meme,{
  success: function(object) {
    updateAllCat();
    updateCatBar();
  },
  error: function(model, error) {
    alert("addSave error");
  }
  });
};


var imgScreenshot = function(){

  html2canvas($('#createMeme_container'), {
    onrendered: function(canvas) {
      var imgString = canvas.toDataURL("image/png");
      
    }
  });
};

var borderClearer = function(){
  var ttp = document.getElementById('top_text_pane');
  var btp = document.getElementById('bot_text_pane');
  ttp.style.border = 'none';
  btp.style.border = 'none';
  ttp.style.textShadow = '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
  btp.style.textShadow = '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';

};
