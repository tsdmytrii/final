<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Welcome to CodeIgniter</title>

        <style type="text/css">
            #start {
                font-size: 25px;
            }

        </style>
        <script src="../../client/assets/steal/steal.js"></script>

        <script>
            steal('components/test').then(function ($) {
                $(document).ready(function() {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost/final/server/projectsRest/projects/format/json/",
                        success: function($res) {
                            for($key in $res) {
                                alert($key);
                            }
                        }
                    })
                });
            });
        </script>


    </head>
    <body>

        <div id="container">

            <p id="start"><b>Ready to start</b></p>

            <button id="btn">
                lol                
            </button>
        </div>

    </body>
</html>