steal('jquery').then(function ($) {

    $.Controller('Tabs', {

    }, {
        init: function () {
            var that = this;
            document.cookie = 1;
            window.order = 'name';
            window.direction = 'asc';
            window.searchValue = '';
            window.searchProperty = '';
            $('#activeTab').addClass("active");
            that.publish('active.loaded');
            
            // set cookie, which will be inserted in ajax calls as 
            // identificator of sending request from site
            
            $("#sortable").sortable();
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