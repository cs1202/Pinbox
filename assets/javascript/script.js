// --- --- INITIALIZE FIREBASE --- ---

var config = {
    apiKey: "AIzaSyCXCHm7-dGstFOKYEcyg3U5RoOccCZvz34",
    authDomain: "pinbox-3fdd8.firebaseapp.com",
    databaseURL: "https://pinbox-3fdd8.firebaseio.com",
    projectId: "pinbox-3fdd8",
    storageBucket: "pinbox-3fdd8.appspot.com",
    messagingSenderId: "335499738606"
};

firebase.initializeApp(config);

// --- --- GLOBAL VARIABLES --- ---




// --- --- GLOBAL FUNCTIONS --- ---



// --- --- EVENT HANDLERS --- ---


$('#search').submit( function( searchQuery ){

 event.preventDefault();

    console.log( $(this).val() );
    //console.log( searchQuery );
    event.preventDefault();

});





// --- --- MAIN PAGE LOGIC --- --- 

console.log('Page Loaded');




/*

  
     

*/