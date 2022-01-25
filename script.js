
 const photoContainer = document.getElementById('image-container'); // Get photo-container element
 const loader = document.getElementById('loader'); // Get loader element

 let photosArray = [];  // This will contain all images JSON data from unsplash API
 let loaded = false;  // Boolean to check if have loaded more images on reaching end.
 //Unsplash API
 const noOfImgToLoad = 10; // initially we load only 10 images 
 const apiKey = '7cWNrHeM_dHY3JlTPK1avMIRgMU2_kuxJO7ermwYGp8';
 const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${noOfImgToLoad}`;

 // Funtion to setAttribute
 function setAttributes(element,attributes){  // This function will set attribute of element 
     for(const key in attributes){  // for all key value pair in array it will set attributes
         element.setAttribute(key,attributes[key]);
     }
 }


 // dispaly image for each photo in our Photo array and add it to DOM
 function displayPhotos(){
     //for each photos run the following loop 
     photosArray.forEach((photo)=>{
        /*
            First Generate following snippet :-

            <a href="" target="_blank">
                <img src="" alt="" title="">
            </a>
        */
        // Generate <a> 
        const item = document.createElement('a'); // createElement() is used to create new element -> in bracket mention tagName
        //call our setAttributes funtion with item and array of attribute,value pair
        setAttributes(item,{ 
            href:photo.links.html,
            target: '_blank'
        });
        // Generate <img>
        const image = document.createElement('img'); // creating image tag which will go inside a tag 
        //call our setAttributes function with image and array of attribute,value pair
        setAttributes(image,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.description
        }); 
      

        //adding image inside <a> tag
        item.appendChild(image);  // appendChild(child) will append image tag inside a tag
        photoContainer.appendChild(item);  //this will append a tag inside our photo-containers
     })
 }

 // Get photos from unsplash API
 async function getPhotos(){
     try{
        const response = await fetch(apiUrl); // Fetching response from unsplash API
        photosArray = await response.json();  // Getting JSON of received response
        await displayPhotos();  
        loader.hidden=true;
        noOfImgToLoad = 30; // Once the initial load is done next time onewards we load 30 images
        loaded=false;  // This is set to false cause when new images are loaded we do not want to load more untill we reach end again
    }catch(error){
         console.log(error);
     }
 }

 //  Check to see if we are about to scroll to end of document => load more images then
 window.addEventListener('scroll',()=>{
     // 1.  window.scrollY => How much pixels we have scrolled so far
     // 2.  window.innerHeight => height of the window in pixel (its fixed depending if we resize browser window)
     //         we add both of above to get the about of pixel loaded so far => scrolledPixel + currentDisplayed

     // 3.  document.body.offsetHeight => Tells us how much of page length we have in total, it include what we have + what we dont have in window
     // 4.  We subtract 1000px so that if we reach newar to 1000px from end more image will load 
    if((window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000)&& !loaded){
        loaded = true;
        getPhotos(); // We load more photos when we reach end
    }
 });

 //On Load

 getPhotos();