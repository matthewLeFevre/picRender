// Starting vars
let imgObjGroup = [];

// Html5 file input selector
let imgInput = document.getElementById("js-img-input");

// Html5 Image render location (div or section)
let imgOutput = document.getElementById("js-img-output");

//==================================================
// Render Uploaded Images
//==================================================

function renderImages () {
    imgInput.addEventListener("change", function(){
        for (let i = 0; i < imgInput.files.length; i++) {
            let randomId = generateRandomId();

            // This object dictates how the image
            // Will be rendered
            let imgObj   = {

                // Html5 Element Structure
                imgElement : document.createElement("img"),
                imgWrapper : document.createElement("figure"),
                imgClose   : document.createElement("figcaption"),
                
                // File Meta Data
                fileData   : imgInput.files[i],
                fileName   : imgInput.files[i].name,
                fileSize   : imgInput.files[i].size,

                // fileId will be added as an html id to the element
                fileId     : "fileId_" + imgInput.files[i].name + randomId,
                

                configImage: function () {

                    // Configure Img with CSS class and the image source
                    this.imgElement.setAttribute("class", "your-class");
                    this.imgElement.src = URL.createObjectURL(this.fileData);;

                    // Configure Individual Img Container CSS and apply Id
                    this.imgWrapper.setAttribute("id", this.fileId);
                    this.imgWrapper.setAttribute("class", "your-class");

                    // Configure Individual Img Closs Button CSS
                    this.imgClose.setAttribute("class", "your-class");

                    // Create Completed Img Component and Append it to the Dom
                    this.imgWrapper.appendChild(this.imgClose);
                    this.imgWrapper.appendChild(this.imgElement);
                    imgOutput.appendChild(this.imgWrapper);
                }
            }

            // Configure the Image
            imgObj.configImage();

            // The following is optional logic that can be 
            // applied to add aditional CSS to the Images 
            // Depending on whether there is one or more images

            if(imgInput.files.length > 1) {
                imgObj.imgElement.setAttribute("class", "single-img-class")
            } else {
                imgObj.imgElement.setAttribute("class", "multiple-img-class")    
            }

            // Now we push the object to imgObjGroup
            // To Keep track of them
            imgObjGroup.push(imgObj);
        }
    });
}

//==================================================
// Clear All Uploaded Images
//==================================================

function clearImages () {
    // Creates a listener for when the clear button is clicked
    let clearBtn = document.getElementById("js-clear-btn");
    clearBtn.addEventListener("click", function(){

        // Remove each Image from the dom as well as from the
        for (let i = 0; i < imgObjGroup.length; i++) {
            let id    = imgObjGroup[i].fileId;
            let image = document.getElementById(id);
            if(image != null) {
                imgOutput.removeChild(image);
            }
        }

        // reset the imgObjGroup for further image renderings
        imgObjGroup = [];
    });
}

//==================================================
// standalone Helper Functions
//==================================================

// Generate a random 5 character string of numbers
function generateRandomId() {
    let id = "";
    // Addjust the length of the id by changing for loop
    for (let i = 0; i < 5; i++) {
        id += Math.floor((Math.random() * 10) + 1);
    }
    return id;
}

//==================================================
// Function Calls / Listeners
//==================================================

// Listen for Image file input change
renderImages();


