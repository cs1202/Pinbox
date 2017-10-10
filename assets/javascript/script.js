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

var database = firebase.database();

var currentResultArray = [];

var currentUser = null;

var inputText = '';


// --- --- GLOBAL FUNCTIONS --- ---


//function to take a string and execute an AJAX search, returning the JSON search object
function getSearchResults( searchQuery ){

    console.log ( 'Search Query: ' +searchQuery );

    //create URL for query
    
    var queryURL = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD6bIuTTEm5v6yAgiJ2HWopoC0OS0q22XY&cx=008323734482261316548:7dymxyxvecs&q=' +searchQuery;

    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {

    makeObjects(response);

    });

}

//pushes ajax result back into currentResultArray
function makeObjects( ajaxResponse ){

    console.log ( ajaxResponse);
    console.log ('length: '+ajaxResponse.items.length)

    for ( var i = 0; i < ajaxResponse.items.length; i++){

        var currentResult = {
                                number: i+1,
                                title: ajaxResponse.items[i].title, 
                                link: ajaxResponse.items[i].link,
                                snippet: ajaxResponse.items[i].snippet
                            };

        currentResultArray.push(currentResult);

    }

    console.log('array:') 
    console.log(currentResultArray);

    displayResults(currentResultArray);

}


// append array of objects to DOM
function displayResults( arrayToDisplay ){


    for (var i = 0; i < arrayToDisplay.length; i++){

        //initialize variable pointing to current object in array
        var objectToDisplay = arrayToDisplay[i];
        
        //create a div containing number, title, link, and snippet
        $('.search-results-shown').append(
            `
            <div>
                <h3>${objectToDisplay.number}. ${objectToDisplay.title}</h3>
                        
                <a href="${objectToDisplay.link}" target="_blank">${objectToDisplay.link}</a>

                <p>${objectToDisplay.snippet}</p>

                <hr>
            </div>

            `
        );

    }

}





// --- --- EVENT HANDLERS --- ---

// when search form submitted (click or enter)

$('#search').submit( function( event ){

    event.preventDefault();

    //retrieve the contents of the input box
    inputText = $('#search-input').val();

    //clear contents of input box
    $("#search")[0].reset()

    console.log( 'Input Text: ' + inputText );

    //display input text in search results title bar

    // console.log('change results')
    $('#search-term-result').text('Results for "' +inputText +'"');
    $('#search-term-result').append('<span class="glyphicon glyphicon-pushpin" style= "float:right" id="result-pin"></span>')

    //clear results panel
    $('.search-results-shown').html('');

    //clear results array
    currentResultArray = [];

    //initiate a search using the search term
    getSearchResults( inputText );

});

// when pin button clicked on search term, adds to database

$(document).on('click', '#result-pin', function(){

    var newDatabaseObject = {
                                label: inputText,
                                resultsArray: currentResultArray
                            };

    database.ref(currentUser+'/pinnedSearches/').push(newDatabaseObject);

    $('#result-pin').hide();

});

// adds all pinned terms to panels in left sidebar
database.ref(currentUser+'/pinnedSearches/').on("child_added", function(snapshot) {

    console.log('Pinned Result: '+snapshot.val().label);

    $('#side-bar').prepend(`

                        <div class="panel panel-default pin-search" data-label = "${snapshot.key}" id="pin-search-og">
                            <div class="panel-body" id="right">
                                ${snapshot.val().label}
                                <span class="glyphicon glyphicon-remove" style= "float:right"></span>
                            </div>
                        </div>

        `);

});

// when pinned search clicked, display object in db
$(document).on('click', '.pin-search', function(){

    //initializes variable to the key for the clicked element
    var currentKey = $(this).attr('data-label');

    database.ref(currentUser+'/pinnedSearches/'+currentKey).once("value", function(snapshot) {

        $('#search-term-result').text('Pinned Results for "' +snapshot.val().label +'"');
        // $('#search-term-result').append('<span class="glyphicon glyphicon-remove" style= "float:right" id="remove-pin"></span>')

        //clear results panel
        $('.search-results-shown').html('');

        //clear results array
        currentResultArray = [];

        //initiate a search using the search term
        displayResults(snapshot.val().resultsArray)

    });

});

//when remove "X" clicked, item removed from sidebar
$(document).on('click', '.glyphicon-remove', function(){

    console.log('remove this!')

    var currentKey = $(this).parent().parent().attr('data-label');

    console.log('Current Key: '+currentKey);

    console.log('Remove path: ' +currentUser+'/pinnedSearches/'+currentKey)

    database.ref(currentUser+'/pinnedSearches/'+currentKey).remove();

    $(this).parent().parent().hide();

});



//DRAGULA SCRIPT CODE
dragula([document.getElementById("left"), document.getElementById("right")]);


// --- --- MAIN PAGE LOGIC --- --- 

console.log('Page Loaded');

//clears placeholders from the sidebar
$('#side-bar').html('');


//check for login status

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('signed in!')
        console.log('user: ' +firebase.auth().currentUser.email);
        currentUser = firebase.auth().currentUser.uid;

    // adds all pinned terms to panels in left sidebar
        database.ref(currentUser+'/pinnedSearches/').on("child_added", function(snapshot) {

            console.log('Pinned Result: '+snapshot.val().label);

            $('#side-bar').prepend(`

                <div class="panel panel-default pin-search" data-label = "${snapshot.key}" id="pin-search-og">
                <div class="panel-body" id="right">
                ${snapshot.val().label}
                <span class="glyphicon glyphicon-remove" style= "float:right"></span>
                </div>
                </div>

            `);

        });

    } else {
            console.log('Error: not signed in!')
            window.location = "signin.html";
    }
});


$(document).on('click', '#signout', function(){

    firebase.auth().signOut();
    window.location = "signin.html";

});


/*

  
     

*/