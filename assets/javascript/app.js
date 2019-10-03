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

    function addnewRow(name, dest, freq, nextArriv, minAway) {
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

    function pushToDatabase(name, dest, freq, firstArrival) {
        database.ref().push({
            name: name,
            dest: dest,
            freq: freq,
            firstArrival: firstArrival
        });
    }

    addTrainSubmit.on('click', (event) => {
        event.preventDefault();

        let name = nameInput.val(),
            dest = destInput.val(),
            freq = freqInput.val(),
            firstArrival = firstTrainInput.val();

        pushToDatabase(name, dest, freq, firstArrival);
    })

    database.ref().on('child_added', (snap) => {
        let name = snap.val().name,
            dest = snap.val().dest,
            freq = snap.val().freq,
            firstArrival = snap.val().firstArrival;

        addnewRow(name, dest, freq);
    })

})