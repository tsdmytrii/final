steal(
    'jquery',
    'jquery/controller', // a widget factory
    'jquery/controller/subscribe', // subscribe to OpenAjax.hub
    'jquery/view',
    'jquery/controller/view', // lookup views with the controller's name
    'jquery/model', // Ajax wrappers   ,
    'jquery/view/tmpl',
    'components/bootstrap',
    'components/jquery_ui',
    'components/jquery-validate/jquery.validate.js',
    'components/jquery-validate/additional-methods.js'
    
    ).then(
    './controllers/projects.js'
 )