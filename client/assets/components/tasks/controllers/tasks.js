steal('jquery').then(function ($) {

    /*  
     * @controller Tasks
     * orginise all about tasks
     */
    $.Controller('Tasks', {
        'viewpath': '//components/tasks/views/'
    }, {

        init: function () {},

        /* 
         * @function  p.loaded subscribe
         * @description subscribes on p.loaded event(projects are loaded)
         * call load function in the end
         */
        'project.loaded subscribe': function () {
            var that = this;
            //
            $('#taskForm').removeAttr('novalidate');
            //custom validation method for checking deadline date
            $.validator.addMethod("DateFormat", function (value, element) {
                    return value.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
                },
                // error message
                "Please enter a date in the format yyyy/mm/dd"
            );

            //we should validate each form for creation new task 
            //by name and deadlineDate fields
            $(".form").each(function () {
                $(this).validate({
                    debug: true,
                    onfocusout: false,
                    rules: {
                        name: {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        },
                        deadlineDate: {
                            required: true,
                            DateFormat: true
                        }
                    },
                    messages: {
                        name: {
                            required: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "Enter task name, please!" + '</div>',
                            minlength: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "At least 2 characters required!" + '</div>',
                            maxlength: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "Task name must be shorter than 100 symbols!" + '</div>'
                        },
                        deadlineDate: {
                            required: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "Enter deadline date, please!" + '</div>',
                            DateFormat: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "Please enter a date in the format yyyy/mm/dd" + '</div>'
                        }
                    },
                    errorLabelContainer: "#validateErrors"
                });
            });

            this.loadTasks();
        },
        /* 
         * @function  .taskEdit click
         * @description subscribes on .taskEdit click event for edit single task
         * @param  {object} element
         * @param {action} event
         */
        '.taskEdit click': function (el, ev) {
            var that = this;
            /*
             * @param  {string} taskId
             */
            var taskId = el.data('task-id');
            //            var that = this;
            /*
             * @param  {string} nameValue save ald task title for easiers editing
             */
            var nameValue = $('.taskTitle#' + taskId).text();
            /*
             * @param  {string} dateValue save date for easier editing
             */
            var dateValue = $('.taskDate' + taskId).text();

            //hide row with information and show edit row with edit form
            $('#taskRow' + taskId).addClass('nonVisible').hide();
            $('#editRow' + taskId).removeClass('nonvisible').append('\
            <div class="span9 offset1"><form id="editTaskForm">\n\
            <input type="hidden" name="id" value=' + taskId + '>\n\
            <input type="hidden" name="closed" value=' + 0 + '>\n\
            <input class="span5" type="text" name="taskName" value=' + nameValue + '>\n\
            <input class="span2 inputDate" type="date"  name="date" value=' + dateValue + '>\n\
            <input class="span1 offset1 saveTaskChanges" type="submit" value="save" name="submit"></form></div>')

            //validate edit form
            $('#editTaskForm').validate({
                debug: true,
                onfocusout: true,
                rules: {
                    taskName: {
                        required: true,
                        minlength: 2,
                        maxlength: 100
                    },
                    date: {
                        required: true,
                        DateFormat: true
                    }
                },
                messages: {
                    taskName: {
                        required: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "Enter task name, please!" + '</div>',
                        minlength: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "At least 2 characters required!" + '</div>',
                        maxlength: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "Task name must be shorter than 100 symbols!" + '</div>'
                    },
                    date: {
                        required: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "Enter deadline date, please!" + '</div>',
                        DateFormat: '<div class="alert alert-error fade in">' + '<button data-dismiss="alert" class="close" type="button">&times;</button>' + "Please enter a date in the format yyyy/mm/dd" + '</div>'
                    }
                },
                errorLabelContainer: "#validateErrors",

                //on submit success
                submitHandler: function () {
                    TasksModel.changeTask($('#editTaskForm').serialize(), function (data) {
                        console.log(data['status'])
                        //show standart view of task again with new data
                        $('#editRow' + taskId).empty().addClass('nonVisible');
                        $('.taskDate' + taskId).empty().text(data['taskDate']);
                        $('.taskTitle' + taskId).empty().text(data['taskName']);
                        $('#taskRow' + taskId).removeClass('nonVisible').show();
                        that.publish('task.edited', {
                            status: data['status']
                        })
                    });
                }
            });
        },

        //on create task form submit
        '#taskForm submit': function (element, event) {
            event.preventDefault();
            var that = this;
            TasksModel.addTask(element.serialize(), function (data) {
                that.publish('task.saved');
            });
        },

        //subscribe on task saved event
        'task.saved subscribe': function () {
            $('.forTasks').empty();
            $("#taskForm").trigger('reset');
            this.loadTasks();
        },

        //remove btn clicked
        '.remove click': function (el, ev) {
            var taskId = el.data('task-id');
            var that = this;
            if (confirm('Are you sure to delete task #' + taskId)) {
                TasksModel.deleteTask(taskId, function () {
                    that.publish('task.deleted', {
                        id: taskId
                    })
                })
            }
        },

        //subscribe on success task delete
        'task.deleted subscribe': function (called, data) {
            this.deleteTaskFromDom(data.id)
        },

        'deleteTaskFromDom': function (id) {
            $('a[data-task-id=' + id + ']').parent('div').parent('li').parent('.taskRow').remove();

        },


        loadTasks: function () {
            var that = this;
            TasksModel.getTasks(function (data) {
                that.renderTasks(data, function () {})
            });
        },

        //get data from TasksModel.getTasks callback
        renderTasks: function (data) {
            var that = this;

            // loop for every project. Data have format:
            // projectID: {
            //      taskID: {
            //          taskColumn: value
            //      }
            // }
            for (var key in data) {
                // key is projectID so append to classname and get unique <ul>
                $('.forTasks' + key).append(function () {
                    $(this).html(
                        $.View(that.Class.viewpath + 'tasks.tmpl', {
                            task: data[key]
                        })
                    )
                })
            }
        }
    });

    $.Model('TasksModel', {

        getTasks: function (cb) {
            $.ajax({
                url: 'http://localhost/final/server/tasks_rest/task/format/json/',
                dataType: 'json',
                'type': 'get',
                success: this.callback(cb),
                error: this.callback(cb)
            });
        },


        /*
         * add new task.
         * @param {array} data name and date of new task
         */
        addTask: function (data, cb) {
            $.ajax({
                url: 'http://localhost/final/server/tasks_rest/task/',
                dataType: 'json',
                data: data,
                'type': 'POST',
                success: this.callback(cb),
                error: this.callback(cb)
            });
        },

        deleteTask: function (id, cb) {
            $.ajax({
                url: 'http://localhost/final/server/tasks_rest/task/' + id,
                dataType: 'json',
                'type': 'delete',
                success: this.callback(cb),
                error: this.callback(cb)

            });
        },

        /*
         * add new task.
         * @param {array} data name and date of new task
         */
        changeTask: function (data, cb) {

            $.ajax({
                url: 'http://localhost/final/server/tasks_rest/tasks_edit/',
                dataType: 'json',
                data: data,
                'type': 'POST',
                success: this.callback(cb),
                error: this.callback(cb)
            });
        }
    }, {

    })

})