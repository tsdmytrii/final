steal(

        'jquery/controller', // a widget factory
        'jquery/controller/subscribe', // subscribe to OpenAjax.hub
        'jquery/view',
        'jquery/controller/view', // lookup views with the controller's name
        'jquery/model', // Ajax wrappers   ,
        'jquery/view/tmpl',
        {'src':'jquery/dom/fixture', 'ignore':true},
        'components/bootstrap',
        'components/windows'
        )
        .then(
           './controllers/notificat.js'

            )