let firebaseConfig = {
    apiKey: config.MY_KEY,
    authDomain: "train-timetable-2ccdc.firebaseapp.com",
    databaseURL: "https://train-timetable-2ccdc.firebaseio.com",
    projectId: "train-timetable-2ccdc",
    storageBucket: "",
    messagingSenderId: "199034979986",
    appId: "1:199034979986:web:017f52912acdcc93b1884b"
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();

// Pushes parameters to database.
function pushToDatabase(name, dest, freq, firstArrival) {
    let newTrainRef = database.ref(name);
    newTrainRef.set({
        name: name,
        dest: dest,
        freq: freq,
        firstArrival: firstArrival
    });
}

// Remove a child from the database.
function removeFromDb(name) {
    database.ref(name).remove();
    $('#' + name).remove();
    $('input').val('');
}

// Update a child in the database.
function updateInDb(name, dest, freq, firstArrival) {
    let trainRef = database.ref(name);

    trainRef.update({
        name: name,
        dest: dest,
        freq: freq,
        firstArrival: firstArrival
    })
}

// Update the rows in the table with data from the database.
function addOrUpdateFromDb(event, action) {
    database.ref().on(event, (snap) => {
        let name = snap.val().name,
            dest = snap.val().dest,
            freq = snap.val().freq,
            firstArrival = snap.val().firstArrival;

        action(name, dest, freq,
            nextTrainArrival(firstArrival, freq),
            timeToNextTrain(firstArrival, freq));
    })
}

// Add a new row to the time-table with the parameters as data.
function addNewRow(name, dest, freq, nextArriv, minAway) {
    let newRow = $('<tr>'),
        nameCol = $('<td>'),
        destCol = $('<td>'),
        freqCol = $('<td>'),
        nextArrivCol = $('<td>'),
        minAwayCol = $('<td>');

    nameCol.text(name);
    destCol.text(dest);
    freqCol.text(freq);
    nextArrivCol.text(nextArriv);
    minAwayCol.text(minAway);

    newRow.attr('id', name);
    newRow.append(nameCol).append(destCol).append(freqCol);
    newRow.append(nextArrivCol).append(minAwayCol);

    $('#time-table').append(newRow);
}

function updateRow(name, dest, freq, nextArriv, minAway) {
    let rowToUpdate = $('#' + name),
        nameCol = $('<td>'),
        destCol = $('<td>'),
        freqCol = $('<td>'),
        nextArrivCol = $('<td>'),
        minAwayCol = $('<td>');
    // Clear the old data from the row.
    rowToUpdate.empty();
    // Add new data to the row.
    nameCol.text(name);
    destCol.text(dest);
    freqCol.text(freq);
    nextArrivCol.text(nextArriv);
    minAwayCol.text(minAway);

    rowToUpdate.append(nameCol).append(destCol).append(freqCol);
    rowToUpdate.append(nextArrivCol).append(minAwayCol);

    $('#time-table').append(rowToUpdate);
}

// Return the time to the next train.
function timeToNextTrain(firstArrival, freq) {
    let firstTrain = moment(firstArrival, 'HH:mm'),
        firstTrainConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years'),
        diffTime = moment().diff(moment(firstTrainConverted), 'minutes'),
        tRemainder = diffTime % freq,
        tMinutesTillTrain = freq - tRemainder;

    return tMinutesTillTrain;
}

// Return the time of the next train.
function nextTrainArrival(firstArrival, freq) {
    let firstTrain = moment(firstArrival, 'HH:mm'),
        firstTrainConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years'),
        diffTime = moment().diff(moment(firstTrainConverted), 'minutes'),
        tRemainder = diffTime % freq,
        tMinutesTillTrain = freq - tRemainder,
        nextTrain = moment().add(tMinutesTillTrain, 'minutes');

    return moment(nextTrain).format('hh:mm');
}