<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Project Control</title>

<!--<script src="http://code.jquery.com/jquery-1.9.1.js"></script>--> 
<!--<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.js"></script>-->
<!--<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/additional-methods.js"></script>-->

        <link rel="stylesheet" type="text/css" href="http://localhost/final/client/main.css">
        <script src="http://localhost/final/client/assets/steal/steal.js"></script>

        <script>
            steal(
            'components/projects',
            'components/tasks',
            'components/notification',
            'components/tabs',
            'jquery'
        ).then(function ($) {
              
                $('body').projects();
                $('body').tasks();
                $('body').notificat(); 
                $('body').tabs();
                $('#newProject').hide();                
                
                
            });
        </script>
    </head>
    <body>
        <!--
        $idProject - identifier in URL
        if http://../projects/ID - only one project will be loaded
        -->
        <div class="container" data-project-identifier="<?php echo $idProject; ?>">
            <!--for title  information-->
            <header id="pageHeader" class="row">
                <div class="span3" id="titleContainer">
                    <div class="row"> 
                        <div class="span3" id="titleName"> Progect Management Tool</div>
                    </div>
                    <div class="row"> 
                        <div class="span3" id="titleAuthor"> Name </div>
                    </div>
                </div>
                <div id="noti" class="span2">
                    <div id="validateErrors" class="span2 notification"></div>
                </div>
                
                <!--<div id="notif" class="span2 notification"></div>-->
            </header>
            <!--for tabs-->
            <nav id="mainNav" class="row">
                <div class="span3">
                    <a id="activeTab" class="btn" href="#"> Active </a>
                    <a id="closedTab" class="btn" href="#"> Closed </a>
                </div>
                <!--for projects-->
                <ul class="span12" id="sortable">
                </ul>
                <div class="span4 offset4">
                    <button id="addProject"> Add project </button>
                    <form id="newProject" class="projectForm" action="">
                        <input type="text" name="projectName" placeholder="Enter new project name" id="newProjectName">
                        <input type="submit" name="submit" value="Add project">
                    </form>
                </div>                 
        </div>
    </div>
</div>
</nav>
</div>
</body>
</html>