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

$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var name = $('#name-thing').val().trim();
    var destination = $('#destination-thing').val().trim();
    var first = $('#first-thing').val().trim();
    var frequency = $('#frequency-thing').val().trim();
    var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = diffTime % frequency
    var minutesAway = frequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes");


    var newTrain = {
        newName: name,
        newDestination: destination,
        newFirst: first,
        newFrequency: frequency
    };

    database.ref().push(newTrain);

    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + " minutes" + "</td><td>" + moment(nextTrain).format("hh:mm") + " am" + "</td><td>" + minutesAway + " minutes" + "</td></tr>");

    $("#name-thing").val("");
    $("#destination-thing").val("");
    $("#first-thing").val("");
    $("#frequency-thing").val("");
});



