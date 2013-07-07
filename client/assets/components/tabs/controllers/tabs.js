steal('jquery').then(function ($) {

    $.Controller('Tabs', {

    }, {
        init: function () {
            var that = this;
            $('#activeTab').addClass("active");
            that.publish('active.loaded');

            $("#sortable").sortable();
            //  $( "#sortable" ).disableSelection();
        },

        //activate Active tab with active projects
        '#activeTab click': function () {
            $('#closedTab').removeClass("active");
            $('#activeTab').addClass("active");
            $('#projectsContainer').empty();
            this.publish('active.loaded')

        },

        //activate Closed tab with closed projects 
        '#closedTab click': function () {
            $('#activeTab').removeClass("active");
            $('#closedTab').addClass("active");
            $('#projectsContainer').empty();
            this.publish('closed.loaded')

        }

    });

})