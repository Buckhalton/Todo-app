$(document).ready(onReady);

function onReady(){
    $('#submitButton').on('click', submitTask);
    $('#taskDisplay').on('click', '.deleteButton', deleteTask)
    getTasks();
}

function deleteTask() {
    console.log('In deleteTask');
    let currentTask = $(this).parent();
    let id = currentTask.data('taskId');
    $.ajax({
        method: 'DELETE',
        url: `/task/${id}`
    }).then((response) => {
        console.log('back from DELETE with:', response);
        getTasks();
    }).catch((error) => {
        console.log('Error with DELETE', error);
    
    })
}

function submitTask() {
    console.log('in submitTask');
    let objectToSend = {
        task: $('#taskIn').val(),
        priority: $('#priorityIn').val(),
        completed: false
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
    
}


function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then((response) => {
        $('#taskDisplay').empty();
        for(let data of response){
            let listRow = $(`<li><input class="checkBox" type="checkbox">${data.task}<button class="deleteButton">Delete</button></li>`);
            $('#taskDisplay').append(listRow);
            $(listRow).data('taskId', data.id);
        }
    }).catch((error) => {
        console.log('Error with GET', error);
    })
}