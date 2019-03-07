// create variables & array for buttons

var topic = [
  "MichaelJackson",
  "Maddona",
  "Whitney Houston",
  "LionelRichie",
  "GeorgeMichael",
  "David Bowie",
  "Prince",
  "Queen",
  "Talking Heads",
  "Elton John",
  "Stevie Wonder"
];
console.log(topic);

function displayTopic(person) {

    console.log("CLicked Person:");
    console.log(person);
  // In this case, the "this" keyword refers to the button that was clicked
  

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    person +
    "&api_key=IlrZgtxqYWPqQgmVL8yXncqh6Y9384xW&limit=10";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var personImage = $("<img>");
        personImage.addClass("celebrityImages");
       // var personGif = $("<img>");
        personImage.attr("data-still", results[i].images.fixed_height_still.url);
        personImage.attr("data-animated", results[i].images.fixed_height.url);
        personImage.attr("src",personImage.attr("data-still"));
        gifDiv.append(p);
        gifDiv.append(personImage);
        $("#giph-display").prepend(gifDiv);
      }
    });
}

//  Function for displaying giph data
function createButtons() {
  // Deleting the giph prior to adding new giph
  $("#buttons-view").empty();

  // Looping through the array of giphs
  for (var i = 0; i < topic.length; i++) {
    // Then dynamicaly generating buttons for each giph in the array
    var button = $("<button>");
    // Adding a class of giph to our button
    button.addClass("giph");
    // Adding a data-attribute
    button.attr("data-name", topic[i]);
    // Providing the initial button text
    button.text(topic[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(button);
  }
}
createButtons();


// This function handles events where one button is clicked
$("#find-giph").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
  
    // This line will grab the text from the input box
    var giph = $("#giph-input")
      .val()
      .trim();
    // The movie from the textbox is then added to our array
    topic.push(giph);
  
    // calling createButtons which handles the processing of our movie array
    createButtons();
    displayTopic(giph);
  });


// Event listener for all button elements
$("button").on("click", function(){
    var person = $(this).attr("data-name");
    displayTopic(person);


});
    $(document).on("click",".celebrityImages", function(img) {
        if($(this).attr("src") === $(this).attr("data-still")){
            $(this).attr("src", $(this).attr("data-animated"))
        }else {
            $(this).attr("src", $(this).attr("data-still")
            )};
        
        // If src matches still, src should be animated: visa versa
    
});

// MISSING TWO THING: 1. INPUT GIF BUTTON TO ACTUALLY GENERATE GIFS; 2. SWITCH FROM STILL TO ANIMATE


  