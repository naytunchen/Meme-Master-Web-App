$(function(){
  transformCovers();
  $('.example .coverflow').on('click','.flowItem:not(.selected)',function(){
    transformCovers($(this));
  });
});

function transformCovers(centerItem,callback) {
  if(typeof(centerItem)=="undefined"){
    var items = $('.example .coverflow .flowItem');
    centerItem = items.eq(parseInt(items.length/2));
  }

  if(!centerItem.hasClass('selected')){
    var leftItems = centerItem.prevAll('.flowItem');
    var rightItems = centerItem.nextAll('.flowItem');

    var transform_vals = "translateX(0px) rotateY(0deg) translateZ(0)";
    centerItem.css({"transform": transform_vals});
 
    leftItems.each(function(i){
      var itemdelta = i+1;
      var transform_vals = "translateX("+((itemdelta)*-100)+"px) rotateY(40deg) translateZ(-200px)";
      $(this).css({"transform": transform_vals});
    });
 
    rightItems.each(function(i){
      var itemdelta = i+1;
      var transform_vals = "translateX("+((itemdelta)*100)+"px) rotateY(-40deg) translateZ(-200px)";
      $(this).css({"transform": transform_vals});
    });
    
 centerItem.addClass('selected').siblings('.selected').removeClass('selected');
  }
}