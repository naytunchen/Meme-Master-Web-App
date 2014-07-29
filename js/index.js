//global declaration
var Meme,Cat;

/* called when page loads first time */
window.onload = function(){

  //associate parse account
  Parse.initialize("EfZFq1ljZwCgYudEG4bkkLrSeUtJ9UxHyLHL6wYI", "DGtqZV6fc6o2hjn9UiuSJPe0p3dURcNv05hBgwFk");  

  //gloabal definition
  Meme = Parse.Object.extend("Meme");
  Cat = Parse.Object.extend("Cat");

  //setup default meme and cat (run only once)
  //setupDefault();

  //switch stylesheets
  for ( i=0; i<document.styleSheets.length; i++) {
    document.styleSheets.item(i).disabled=true;
  }
  document.styleSheets.item(0).disabled=false;
  document.styleSheets.item(1).disabled=false;

  //insert contents
  updateAllCat();
  updateCatBar();
};

//nide everything in conten view
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
      cb.addEventListener("click",updateCreateView,false);
      ub.addEventListener("click",updateAddView,false);
    },
    error: function(error){
      alert("updateCatBar error");
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
        document.edit_form.edit_name.value = results[0].get("name");
        document.edit_form.edit_tag.value = results[0].get("tag");
        document.edit_form.edit_comment.value = results[0].get("comment");
        // for(i=0;i<parseInt(results[0].get("rating"));i++){
        // }
        $('#edit_catDrop option[value=' + results[0].get("cat") + ']').prop('selected', true);
      },
      error: function(error){
        alert("updateEditView error");
      }
    });
  }
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
  //show edit view only
  hideView();
  var ev = document.getElementById('edit-view');
  ev.style.display = "block";
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
  //show edit view only
  hideView();
  var ev = document.getElementById('add-view');
  ev.style.display = "block";
};

//show create page in content view
var updateCreateView = function(){
  //bind events
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
  //show edit view only
  hideView();
  var ev = document.getElementById('create-view');
  ev.style.display = "block";
};

//called when edit page is saved
var editSave = function(){
  //TODO: save action
  updateAllCat();
  updateCatBar();
};

//called when create page is saved
var createSave = function(){
  //TODO: save action
  updateAllCat();
  updateCatBar();
};

//called when add page is saved
var addSave = function(){
  //TODO: save action
  updateAllCat();
  updateCatBar();
};