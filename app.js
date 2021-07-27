function switchSrc(element, name, backDrop){
  // console.log("Enter app.js........."); 
  modelViewer = document.querySelector("model-viewer");
          //switchSrc function  
  window.switchSrc = (element, name, backDrop) => {
    // console.log("Enter switchSrc.........");
    const base = "assets/";
    modelViewer.src = base + "glb/"+ name +".glb";
    modelViewer.poster = base + "png/"+ name +".png";
    const slides = document.querySelectorAll(".slide");
    slides.forEach((element) => {element.classList.remove("selected");});
    // dynamic background image, fetch from map folder
    let backgroundImg ="url(" + base + "png/map/"+ backDrop +"/"+ backDrop+ "/"+ backDrop +"_02.png)";
    // console.log(backgroundImg);
    document.getElementById('mv').style.backgroundImage=backgroundImg;
    
    var textTemp = '';
    // fetch .txt file to the id="detail" div 
    fetch(base+ "txt/" + name + ".txt")
      .then(response => response.text())
    // .then(text => document.getElementById("detail").innerHTML = text) 
      .then((text) => {
        var i;
        var NumOfChinese = 0;
        var lastChar = 0;
        // console.log("Text length", text.length);

        //get where is the end of chinese word
        for (i = 0; i < text.length-1; i++) { 
          if (text[i].match("[\u4E00-\u9FA5]+")) {
            NumOfChinese += 1;
          }
        }
        // console.log("Num of Chinese Char: ",NumOfChinese);

        // loop through all the words and remove all the space
        for (var j = 0; j < text.length; j++) {
            // In range of Chinese words
            if (j < NumOfChinese && text[j].match(' '||'/s'||'/S')) {
                // console.log("eliminated word:",text[j]);
                // textTemp += 'X';
                // console.log(j);
                continue;
            }
            // console.log("Eng zone");
            textTemp += text[j];
        }
        // console.log(textTemp);
        document.getElementById("detail").innerHTML = textTemp;
      })
      
    element.classList.add("selected");
  };

  document.querySelector(".slider").addEventListener('beforexrselect', (ev) => {
    // Keep slider interactions from affecting the XR scene.
    ev.preventDefault();
  });
}
