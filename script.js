const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");

let file; //this is a global variable use in multiple functions

button.onclick = ()=>{
 input.click() //if user click on the button then the input also clicked.   
}

input.addEventListener("change", function(){
     //getting user file and [0] this means if user select multiple files we'll select only the first one;
    file = this.files[0];
    showFile()//Calling  function
    dropArea.classList.add("active");
})

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
  });

  //If user leave dragged File from DropArea
  dropArea.addEventListener("dragleave", ()=>{
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  });


//If user Drop File on DropArea
dropArea.addEventListener("drop", (event)=>{

    event.preventDefault();//preventing from defualt behaviour
    // console.log("File is dropped on DragArea");
    dropArea.classList.add("active");
    //getting user file and [0] this means if user select multiple files we'll select only the first one;
     file = event.dataTransfer.files[0];
     //console(file): returns File {name: 'closeapp business.png', lastModified: 1656246060187, lastModifiedDate: Sun Jun 26 2022 12:21:00 GMT+0000 (Greenwich Mean Time), webkitRelativePath: '', size: 25765, …} 
     showFile()//Calling  function

});

function showFile(){
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if(validExtensions.includes(fileType)){ //if user selected file is an image file
      let fileReader = new FileReader(); //creating new FileReader object
      fileReader.onload = ()=>{
        let fileURL = fileReader.result; //passing user file source in fileURL variable
        let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
        dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
      }
      fileReader.readAsDataURL(file);
    }else{
      alert("This is not an Image File!");
      dropArea.classList.remove("active");
      dragText.textContent = "Drag & Drop to Upload File";
    }
  }
  