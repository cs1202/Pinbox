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


//function to take a string and execute an AJAX search, returning the JSON search object
function getSearchResults( searchQuery ){

    console.log ( 'Search Query: ' +searchQuery );

    //create URL for query
    
    var queryURL = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD6bIuTTEm5v6yAgiJ2HWopoC0OS0q22XY&cx=008323734482261316548:7dymxyxvecs&q=' +searchQuery;

    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {

    console.log(response);

    makeObjects(response);

    });

}

function makeObjects( ajaxResponse ){

//replace with for loop
    var i = 0;

    var searchResultObject = {
                                title: ajaxResponse.items[i].title, 
                                link: ajaxResponse.items[i].link,
                                snippet: ajaxResponse.items[i].snippet
                            };

    console.log(searchResultObject);

    displayResults(searchResultObject);

}


// prepend object to DOM
function displayResults( objectToDisplay ){

    //create a div
    //append title
    //append link as a hyperlink
    //append snippet 
    $('#search-results-shown').append(
        `
        <div>
            <h3>${objectToDisplay.title}</h3>
                    
            <a href="${objectToDisplay.link}" target="_blank">${objectToDisplay.link}</a>

            <p>${objectToDisplay.snippet}</p>

            <hr>
        </div>

        `
    );



}





// --- --- EVENT HANDLERS --- ---

// when search form submitted (click or enter)

$('#search').submit( function( event ){

    event.preventDefault();

    //retrieve the contents of the input box
    inputText = $('#search-input').val();

    console.log( 'Input Text: ' + inputText );

    //initiate a search using the search term
    getSearchResults( inputText );

});






// --- --- MAIN PAGE LOGIC --- --- 

console.log('Page Loaded');




/*

  
     

*/