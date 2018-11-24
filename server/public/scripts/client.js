$(document).ready(onReady);

function onReady(){
    $('#submitButton').on('click', submitTask);
    $('#taskDisplay').on('click', '.deleteButton', deleteTask);
    $('#taskDisplay').on('click', '.checkBox', completeTask);
    getTasks();
} // end onReady

function completeTask() {
    let id = $(this).parent().data('taskId'); 
        $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
    }).then((response) => {
        getTasks();
    }).catch((error) => {
        console.log(error);
    })
} // end completeTask

function deleteTask() {
    let currentTask = $(this).parent();
    let id = currentTask.data('taskId');
    let result = confirm('Are you sure you want to delete this task?');
    if(result) {
        //if the user confirms to delete, proceed with the ajax request.
        $.ajax({
            method: 'DELETE',
            url: `/task/${id}`
        }).then((response) => {
            console.log('back from DELETE');
            getTasks();
        }).catch((error) => {
            console.log('Error with DELETE', error);
        })
    } // end if statement
} // end deleteTask

function submitTask() {
    console.log('in submitTask');
    let objectToSend = {
        task: $('#taskIn').val(),
        priority: $('#priorityIn').val()
    }
    $.ajax({
        method: 'POST',
        url: '/task',
        data: objectToSend
    }).then((response) => {
        getTasks();
    }).catch((error) => {
        console.log('Error with POST', error);
    })
} // end submitTask

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then((response) => {
        $('#taskDisplay').empty();
        for(let data of response){
            if(data.completed === true){
                //if the task has been completed, append this
                let listRow = $(`<li class="complete">
                                    <input class="checkBox" checked="true" type="checkbox">${data.task}
                                        <button type="button" class="close deleteButton" aria-label="Close">
                                            <span aria-hidden="true">&times;</span></button>
                                </li>`);
                $('#taskDisplay').append(listRow);
                $(listRow).data('taskId', data.id);
            } else if(data.completed === false){
                // else, if its incomplete, append this
                let listRow = $(`<li>
                                    <input class="checkBox" type="checkbox">${data.task}
                                        <button type="button" class="close deleteButton" aria-label="Close">
                                            <span aria-hidden="true">&times;</span></button>
                                </li>`);
                $('#taskDisplay').append(listRow);
                $(listRow).data('taskId', data.id);
            }
        }
    }).catch((error) => {
        console.log('Error with GET', error);
    })
} // end getTasks