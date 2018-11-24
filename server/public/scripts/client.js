$(document).ready(onReady);

function onReady(){
    $('#submitButton').on('click', submitTask);
    $('#taskDisplay').on('click', '.deleteButton', deleteTask);
    $('#taskDisplay').on('click', '.checkBox', completeTask);
    getTasks();
}

function completeTask() {
    // $(this).parent().addClass('complete');
    let id = $(this).parent().data('taskId'); 
    console.log(id);
        $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
    }).then((response) => {
        console.log(response);
        getTasks();
    }).catch((error) => {
        console.log(error);
    })
}

function deleteTask() {
    console.log('In deleteTask');
    let currentTask = $(this).parent();
    let id = currentTask.data('taskId');
    $.ajax({
        method: 'DELETE',
        url: `/task/${id}`
    }).then((response) => {
        console.log('back from DELETE');
        getTasks();
    }).catch((error) => {
        console.log('Error with DELETE', error);
    })
}

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
    
}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then((response) => {
        $('#taskDisplay').empty();
        for(let data of response){
            if(data.completed === true){
                let listRow = $(`<li class="complete"><input class="checkBox" checked="true" type="checkbox">${data.task}<button class="deleteButton">Delete</button></li>`);
                $('#taskDisplay').append(listRow);
                $(listRow).data('taskId', data.id);
            } else if(data.completed === false){
                let listRow = $(`<li><input class="checkBox" type="checkbox">${data.task}<button class="deleteButton">Delete</button></li>`);
                $('#taskDisplay').append(listRow);
                $(listRow).data('taskId', data.id);
            }
        }
    }).catch((error) => {
        console.log('Error with GET', error);
    })
}