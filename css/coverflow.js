      var min = 1;
      var max = 7;
      var current = 4;
      var currPos = 0;
      var newPos = 0;
      var currAngle = 0;
      var newAngle = 0;
      var gap = 50;
      var clickedIndex = 0;      
      var diff = 0;
      window.onload = function() {
          initialThrust();
      }

      function initialThrust() {
          setTimeout(function() {

            document.getElementById("fig1").style.webkitTransform = "translateX(-200px) rotateY(60deg)";
            document.getElementById("fig2").style.webkitTransform = "translateX(-150px) rotateY(60deg)";
            document.getElementById("fig3").style.webkitTransform = "translateX(-100px) rotateY(60deg)";
            document.getElementById("fig4").style.webkitTransform = "translateX(0px) rotateY(0deg) translateZ(200px)";
            document.getElementById("fig5").style.webkitTransform = "translateX(100px) rotateY(-60deg)";
            document.getElementById("fig6").style.webkitTransform = "translateX(150px) rotateY(-60deg)";
            document.getElementById("fig7").style.webkitTransform = "translateX(200px) rotateY(-60deg)";

          }, 500);
      }   
      
      function moveTo(targetObj) {                    
          //console.log(targetObj.id);          
              clickedIndex = parseInt(targetObj.id.slice(3, 4));
              if (clickedIndex > current) {
                  //move right to the clicked index
                  console.log("Move right: " + clickedIndex + "/" + current + "/" + (clickedIndex - current));
                  diff = clickedIndex - current;
                  for (var i = 1; i <= diff; i++) {
                      right();
                  }
              }
              else if (clickedIndex < current) {
                  //move left to the clicked index
                  console.log("Move left: " + clickedIndex + "/" + current + "/" + (current - clickedIndex));
                  diff = (current - clickedIndex);
                  for (var i = 1; i <= diff; i++) {
                      left();
                  }
              }
              else {
                  //same element is clicked....do nothing
              }         
      }
      function left() {
          //alert('test');
          if (current > min) {
              current--;
              //console.log("Left: " + current);              

              for (var i = 1; i <= max; i++) {
                  currPos = document.getElementById("fig" + i).getAttribute("cp");
                  currAngle = document.getElementById("fig" + i).getAttribute("a");
                  if (currPos == "-100" || currPos == "0") {
                      newPos = parseInt(currPos) + (gap * 2) * (1);
                      if (currPos == "0") {
                          newAngle = -60;
                      }
                      else if (currPos = "-100") {
                          newAngle = 0;
                      }
                      else {
                      }
                  }
                  else {
                      newPos = parseInt(currPos) + (gap) * (1);
                      newAngle = parseInt(currAngle);
                  }
                  //console.log("Curr: " + currPos + " / New: " + newPos);
                  //console.log("Curr angle: " + currAngle + " / New Angle: " + newAngle);
                  if (i == current) {
                      document.getElementById("fig" + i).style.webkitTransform = "translateX(" + newPos + "px) rotateY(" + newAngle + "deg) translateZ(200px)";
                  }
                  else {
                      document.getElementById("fig" + i).style.webkitTransform = "translateX(" + newPos + "px) rotateY(" + newAngle + "deg)";
                  }
                  document.getElementById("fig" + i).setAttribute("cp", newPos);
                  document.getElementById("fig" + i).setAttribute("a", newAngle);
              }
          }
      }
      function right() {
          if (current < max) {
              current++;
              //console.log("Right: " + current);              

              for (var i = 1; i <= max; i++) {
                  currPos = document.getElementById("fig" + i).getAttribute("cp");
                  currAngle = document.getElementById("fig" + i).getAttribute("a");
                  if (currPos == "100" || currPos == "0") {
                      newPos = parseInt(currPos) + (gap * 2) * (-1);
                      if (currPos == "0") {
                          newAngle = 60;
                      }
                      else if (currPos = "100") {
                          newAngle = 0;
                      }
                      else {
                      }
                  }
                  else {
                      newPos = parseInt(currPos) + (gap) * (-1);
                      newAngle = parseInt(currAngle);
                  }
                  //console.log("Curr: " + currPos + " / New: " + newPos);
                  //console.log("Curr angle: " + currAngle + " / New Angle: " + newAngle);
                  if (i == current) {
                      document.getElementById("fig" + i).style.webkitTransform = "translateX(" + newPos + "px) rotateY(" + newAngle + "deg) translateZ(200px)";
                  }
                  else {
                      document.getElementById("fig" + i).style.webkitTransform = "translateX(" + newPos + "px) rotateY(" + newAngle + "deg)";
                  }
                  document.getElementById("fig" + i).setAttribute("cp", newPos);
                  document.getElementById("fig" + i).setAttribute("a", newAngle);
              }
          }
      }