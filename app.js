var config = {
    apiKey: "AIzaSyBlUG4ucv7CypkpyqV0xxvCUoXW8ZIL040",
    authDomain: "my-first-firebase-projec-85758.firebaseapp.com",
    databaseURL: "https://my-first-firebase-projec-85758.firebaseio.com",
    projectId: "my-first-firebase-projec-85758",
    storageBucket: "my-first-firebase-projec-85758.appspot.com",
    messagingSenderId: "789893387238"
};

firebase.initializeApp(config);

var database = firebase.database();

var titleize = function(name) {

  var names = name.split(" ");

  // Transform to guarantee consistency
  for (var i = 0; i < names.length; i += 1) {
    name = names[i];

    names[i] = titleCase(name.toLowerCase());
  }

  return names.join(" ");
};

// Helper function, to keep titleize nice and clean.
function titleCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

//function which checks to see if somethingis a number
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/* if(!isNaN(miscCharge))
{
   //do some thing if it's a number
}else{
   //do some thing if it's NOT a number
}*/

/*if (militaryTime == null || !militaryTime.matches("^\\d{2}:\\d{2}$")) {
    System.out.println(militaryTime + " is not a valid military time.");
}*/

$('#yo').hide();

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    var name = $('#name-thing').val().trim();
    var destination = $('#destination-thing').val().trim();
    var first = $('#first-thing').val().trim();
    var frequency = $('#frequency-thing').val().trim();

    var newTrain = {
        newName: name,
        newDestination: destination,
        newFirst: first,
        newFrequency: frequency,

    };

    database.ref().push(newTrain);

    $("#name-thing").val("");
    $("#destination-thing").val("");
    $("#first-thing").val("");
    $("#frequency-thing").val("");


});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var name = childSnapshot.val().newName;
    var destination = childSnapshot.val().newDestination;
    var frequency = childSnapshot.val().newFrequency;
    var first = childSnapshot.val().newFirst; 
    var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = diffTime % frequency; 
    var minutesAway = frequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes");

    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + " minutes" + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + minutesAway + " minutes" + "</td></tr>");

});



