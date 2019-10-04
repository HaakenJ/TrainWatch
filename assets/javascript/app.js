/* TODO: 

    - Add a sorting algorithm to the added_child and setInterval
        functions so that the table stays sorted by the closest train time.

    - Make the update and remove options functional.

    - Make the page pretty.

    - Add firebase.auth() so only authorized users can modify the page.

    */


$(document).ready(() => {

    let addTrainSubmit = $('#add-submit'),
        removeSubmit = $('#remove-submit'),
        updateSubmit = $('#update-submit'),
        nameInput = $('#train-name'),
        destInput = $('#destination'),
        firstTrainInput = $('#first-train'),
        freqInput = $('#frequency');

    // Add the values in the add a train input fields to the database.
    addTrainSubmit.on('click', (event) => {
        event.preventDefault();

        if (stringValidation(nameInput.val()) &&
            stringValidation(destInput.val()) &&
            freqValidation(freqInput.val()) &&
            timeValidation(firstTrainInput.val())) {

            console.log('Validation passed.');


            let name = nameInput.val(),
                dest = destInput.val(),
                freq = freqInput.val(),
                firstArrival = firstTrainInput.val();

            pushToDatabase(name, dest, freq, firstArrival);

            $('input').val('');
        } else {
            alert(`Please ensure that you provide valid input.  Only enter letters and hyphens for name and destination, enter time in the proper format, and enter a frequency between 1 and 60.`)
            $('input').val('');
        }
    })

    removeSubmit.on('click', (event) => {
        event.preventDefault();
        let name = $('#train-name-remove').val();
        removeFromDb(name);
    })

    updateSubmit.on('click', (event) => {
        event.preventDefault();
        let name = $('#train-name-update').val(),
            dest = $('#destination-update').val(),
            freq = $('#frequency-update').val(),
            firstArrival = $('#first-train-update').val();

        updateInDb(name, dest, freq, firstArrival);
        $('input').val('');
    })

    /* Update the table anytime a train is added, removed, or updated.
        called in main scope of .ready() function so that table is populated
        on page load. */
    addOrUpdateFromDb('child_added', addNewRow);
    addOrUpdateFromDb('child_changed', updateRow);


    setInterval(() => {
        $('#time-table').empty();
        console.log('One minute has passed');
        console.log('Current time is: ' + moment().format('hh:mm'));
        addOrUpdateFromDb('child_added', addNewRow);
    }, 60 * 1000);

})