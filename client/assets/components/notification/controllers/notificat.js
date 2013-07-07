steal('jquery').then(function ($) { 

    $.Controller('Notificat', {
        
    },
    {
     init: function() {
          
        },
        'name.changed subscribe':function() {
            $('#noti').append('<div class="alert fade in"> ' +
                '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                + 'Project name has been changed successfuly' + '</div>')
        }, 
        'task.saved subscribe':function () {
            $('#noti').append('<div class="alert fade in"> ' +
                '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                + 'Task has been added successfuly' + '</div>')
        },
        'task.edited subscribe': function(called, data) {
            $('#noti').append('<div class="alert fade in"> ' +
                        '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                        + data.status + '</div>')
        },
        'task.deleted subscribe' : function() {
            $('#noti').append('<div class="alert fade in"> ' +
                '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                + 'Task has been deleted successfuly' + '</div>')
        },
        't.error subscribe' : function(called, data) {
           
             $('#noti').append('<div class="alert alert-error fade in"> ' +
                        '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                        + data.responseText + '</div>')
        },
        'validate.error subscribe': function(called, data) {
            
            $('#noti').append('<div class="alert alert-error fade in"> ' +
                        '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                        + data.error + '</div>')
        },
        
        'project.edited subscribe': function(called, data) {
                     $('#noti').append('<div class="alert fade in"> ' +
                        '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                        + data.status + '</div>')
        },
        'project.added subscribe': function(called, data) {
           
            $('#noti').append('<div class="alert fade in"> ' +
                        '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                        + data.status + '</div>')
        },
        'project.deleted subscribe': function(called, data) {
            
            $('#noti').append('<div class="alert fade in"> ' +
                        '                   <button data-dismiss="alert" class="close" type="button">&times;</button>   ' 
                        + data.status + '</div>')
        }
    });
    
});
    