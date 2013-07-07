steal('jquery').then(function ($) {

    $.Controller('Projects', {
        'viewpath': '//components/projects/views/'
    }, {

        init: function () {
            /*
             * @param {string} window.closedSwitcher set closed(=0)
             * or active(=1) projects will be shown
             */
            window.closedSwitcher = 0;
            /* 
             * @param {string} window.projectIdentifier set id of project
             * if id = 0, then all project will be shown,
             * if id = any other number, only one project wi this ID will be shown
             */
            window.projectIdentifier = $('.container').data('project-identifier');



        },

        //new project create button
        '#addProject click': function (element, event) {
            var that = this;
            //hide name of project and show input instead of it
            $('#addProject').hide();
            $('#newProject').show();
            $('#newProject').removeAttr('novalidate');

            //validate input with project name
            $('#newProject').validate({
                debug: true,
                onfocusout: false,
                rules: {
                    projectName: {
                        required: true,
                        minlength: 2,
                        maxlength: 100
                    }
                },
                messages: {
                    projectName: {
                        required: "<div class='alert alert-error fade in'>" + "<button data-dismiss='alert' class='close' type='button'>&times;</button>" + "Please enter project name" + "</div>",
                        minlength: "<div class='alert alert-error fade in'>" + "<button data-dismiss='alert' class='close' type='button'>&times;</button>" + "At least 2 characters required!" + "</div>",
                        maxlength: "<div class='alert alert-error fade in'>" + "<button data-dismiss='alert' class='close' type='button'>&times;</button>" + "Project name must be shorter than 100 symbols!" + "</div>"
                    }
                },
                errorLabelContainer: "#validateErrors",

                //on valid name
                submitHandler: function () {
                    ProjectsModel.addProject($('#newProject').serialize(), function (data) {
                        that.publish('project.added', {
                            status: data['status']
                        })
                    });
                    //reset form for another new project and hide
                    $('#newProject').trigger('reset').hide();
                    $('#addProject').show();
                    $('#sortable').empty();
                    //reload projects
                    $('#closedTab').removeClass("active");
                    $('#activeTab').addClass("active");
                    that.publish('active.loaded');
                }
            })
        },

        //load active projects if active tab is presses or its default loading
        'active.loaded subscribe': function () {
            window.closedSwitcher = 0;
            this.loadProjects();
        },

        //load closed projects only if Closed pressed
        'closed.loaded subscribe': function () {
            window.closedSwitcher = 1;
            this.loadProjects();
        },

        //edit name for exist project 
        '.editProject click': function (el, ev) {
            var projectId = el.data('project-id');
            var that = this;
            var fieldValue = $('.forProjectName#' + projectId).text();
            $('.forProjectName#' + projectId).empty().append('\
            <form id="editProjectForm" class="projectForm">\n\
            <input type="hidden" name="id" value=' + projectId + '>\n\
            <input type="hidden" name="closed" value=' + 0 + '>\n\
            <input type="text" name="projectName" value=' + fieldValue + '>\n\
            <input type="submit" class="saveChanges" value="save" name="submit"></form>');

            //validate rules for rename project name
            $('.projectForm').validate({
                debug: true,
                onfocusout: false,
                rules: {
                    projectName: {
                        required: true,
                        minlength: 2,
                        maxlength: 100
                    }
                },
                messages: {
                    projectName: {
                        required: "<div class='alert alert-error fade in'>" + "<button data-dismiss='alert' class='close' type='button'>&times;</button>" + "Enter project name, please!" + "</div>",
                        minlength: "<div class='alert alert-error fade in'>" + "<button data-dismiss='alert' class='close' type='button'>&times;</button>" + "At least 2 characters required!" + "</div>",
                        maxlength: "<div class='alert alert-error fade in'>" + "<button data-dismiss='alert' class='close' type='button'>&times;</button>" + "Project name must be shorter than 100 symbols!" + "</div>"
                    }
                },
                errorLabelContainer: "#validateErrors",

                //on submit success
                submitHandler: function () {

                    ProjectsModel.changeName($('#editProjectForm').serialize(), function (data) {
                        $('.forProjectName#' + projectId).empty().append(data['name']);
                        that.publish('project.edited', {
                            status: data['status']
                        })
                    });

                }
            });
        },

        '.moveProject click': function (element, event) {
            var projectId = el.data('project-id');
            alert(projectId)
            $('.forTask' + projectId).hide();
        },
        //get all projects
        loadProjects: function () {
            var that = this;
            ProjectsModel.getProjects(function (data) {
                that.renderProjects(data);
            });
        },

        //render all projects, from loadProjects callback
        renderProjects: function (data) {
            var that = this;
            console.log(data['status']);
            if (data['status'] !== 404) {
                $('#sortable').fadeOut(function () {
                    var idProject = data.id;
                    $(this).html($.View(that.Class.viewpath + 'project1.tmpl', {
                        projects: data
                    })).fadeIn(function () {
                        that.publish('project.loaded', {
                            status: data['status']
                        });
                    });
                });
            } else {
                $('#sortable').empty().append('No projects found');
            }

        },

        // update 'closed' property of project
        '.closeProject click': function (el, ev) {
            var projectId = el.data('project-id');
            var that = this;
            ProjectsModel.closeProject(projectId, function () {
                that.publish('project.closed', {
                    id: projectId
                })
            })
        },

        //delete from DOM if Active tab is on 
        'project.closed subscribe': function (called, data) {
            this.deleteProjectFromDom(data.id)
        },

        //change 'delete' property of project.
        //Poroject stays in database, but not shown any more
        '.delete click': function (el, ev) {
            var projectId = el.data('project-id');
            var that = this;
            if (confirm('Are you sure to delete project #' + projectId)) {
                ProjectsModel.deleteProject(projectId, function (data) {
                    that.publish('project.deleted', {
                        id: data['id'],
                        status: data['status']
                    });
                })
            }
        },

        //delete project only from DOM, not from database
        'project.deleted subscribe': function (called, data) {
            this.deleteProjectFromDom(data.id)
        },

        'deleteProjectFromDom': function (id) {
            $('a[data-project-id=' + id + ']').parent('div').parent('div').parent('li').remove();
        }
    });

    $.Model('ProjectsModel', {

        addProject: function (data, cb) {
            $.ajax({
                url: 'http://localhost/final/server/projects_rest/projects/' + closedSwitcher,
                dataType: 'json',
                data: data,
                'type': 'POST',
                success: this.callback(cb),
                error: this.callback(cb)
            });
        },

        // Gets projects. Depends on closedSwitcher and projectIdentidier
        // 
        // For more information look at variable description at the 
        // begining of the page
        getProjects: function (cb) {
            $.ajax({
                url: 'http://localhost/final/server/projects_rest/projects/' + closedSwitcher + '/' + projectIdentifier,
                dataType: 'json',
                'type': 'get',
                success: this.callback(cb),
                error: this.callback(cb)
            });
        },

        //simple delete by id
        deleteProject: function (id, cb) {
            $.ajax({
                url: 'http://localhost/final/server/projects_rest/projects/' + id,
                dataType: 'json',
                'type': 'delete',
                success: this.callback(cb),
                error: this.callback(cb)
            });
        },

        //change close property of the project
        closeProject: function (id, cb) {
            var data = new Array();
            data.id = id;
            data.closed = 1;
            $.ajax({
                url: 'http://localhost/final/server/projects_rest/projects_edit/',
                dataType: 'json',
                data: {
                    id: id,
                    closed: 1
                },
                'type': 'POST',
                success: this.callback(cb)
            });
        },

        //change name property of the project
        changeName: function (data, cb) {

            $.ajax({
                url: 'http://localhost/final/server/projects_rest/projects_edit/',
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