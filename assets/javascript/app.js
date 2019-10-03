/* TODO: 

    - Add a sorting algorithm to the added_child and setInterval
        functions so that the table stays sorted by the closest train time.

    - Make the update and remove options functional.

    - Make the page pretty.

    - Add firebase.auth() so only authorized users can modify the page.

    */


$(document).ready(() => {

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

    let addTrainSubmit = $('#add-submit'),
        database = firebase.database(),
        nameInput = $('#train-name'),
        destInput = $('#destination'),
        firstTrainInput = $('#first-train'),
        freqInput = $('#frequency');

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

        newRow.append(nameCol).append(destCol).append(freqCol);
        newRow.append(nextArrivCol).append(minAwayCol);

        $('#time-table').append(newRow);
    }

    // Pushes parameters to database.
    function pushToDatabase(name, dest, freq, firstArrival) {
        database.ref().push({
            name: name,
            dest: dest,
            freq: freq,
            firstArrival: firstArrival
        });
    }

    // Return the time to the next train.
    function timeToNextTrain(firstArrival, freq) {
        let now = moment(),
            firstTrain = moment(firstArrival, 'HH:mm'),
            firstTrainConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years'),
            diffTime = moment().diff(moment(firstTrainConverted), 'minutes'),
            tRemainder = diffTime % freq,
            tMinutesTillTrain = freq - tRemainder;

        return tMinutesTillTrain;
    }

    // Return the time of the next train.
    function nextTrainArrival(firstArrival, freq) {
        let now = moment(),
            firstTrain = moment(firstArrival, 'HH:mm'),
            firstTrainConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years'),
            diffTime = moment().diff(moment(firstTrainConverted), 'minutes'),
            tRemainder = diffTime % freq,
            tMinutesTillTrain = freq - tRemainder,
            nextTrain = moment().add(tMinutesTillTrain, 'minutes');

        return moment(nextTrain).format('hh:mm');
    }

    // Add the values in the add a train input fields to the database.
    addTrainSubmit.on('click', (event) => {
        event.preventDefault();

        let name = nameInput.val(),
            dest = destInput.val(),
            freq = freqInput.val(),
            firstArrival = firstTrainInput.val();

        pushToDatabase(name, dest, freq, firstArrival);
    })

    console.log('Current time is: ' + moment().format('hh:mm'));
    /* When a new child is added and when the page loads, add the data to 
        a new row. */
    database.ref().on('child_added', (snap) => {
        let name = snap.val().name,
            dest = snap.val().dest,
            freq = snap.val().freq,
            firstArrival = snap.val().firstArrival;

        addNewRow(name, dest, freq,
            nextTrainArrival(firstArrival, freq),
            timeToNextTrain(firstArrival, freq));
    })

    setInterval(() => {
        $('#time-table').empty();
        console.log('One minute has passed');
        console.log('Current time is: ' + moment().format('hh:mm'));
        database.ref().on('child_added', (snap) => {
            let name = snap.val().name,
                dest = snap.val().dest,
                freq = snap.val().freq,
                firstArrival = snap.val().firstArrival;
    
            addNewRow(name, dest, freq,
                nextTrainArrival(firstArrival, freq),
                timeToNextTrain(firstArrival, freq));
                
        }) 
    }, 60 * 1000);

})

