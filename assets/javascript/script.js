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

function getSearchResults( searchQuery ){

    console.log ( 'Search Query: ' +searchQuery );

    

}



// --- --- EVENT HANDLERS --- ---


$('#search').submit( function( event ){

    event.preventDefault();

    inputText = $('#search-input').val();

    console.log( 'Input Text: ' + inputText );

    getSearchResults( inputText );

});





// --- --- MAIN PAGE LOGIC --- --- 

console.log('Page Loaded');




/*

  
     

*/