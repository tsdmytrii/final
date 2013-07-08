steal('components/tabs',
    'funcunit', function(){
        module('test tab');
        S.open('http://localhost/final/server/projects/');
    })
    
        test('table_check', function() {
                 
//            S('.').visible(function(){
//                equals(S('.table tbody tr').size(), 5, "there are 5 results in the table")
//            })
//            S.wait(1000)
//            S('.reload').click()
//            S('.table').visible(function(){
//                equals(S('.table tbody tr').size(), 5, "there are 5 results in the table")
//            })
        })
//
//        test('search_table_check', function(){
//            S.wait(1000)
//            S('.input').type("sdf")
//            S('.searchBtn').click()
//            S.wait(1000)
//            S('.table').visible(function(){
//                equals(S('.table tbody tr').size(), 4, "there are should be 4 results in the seatch table")
//                for (i = 0; i < S('.table tbody tr').size(); i++) {  
//                    var a = S('.table tbody tr:eq('+i+') td:eq(2)').html()
//                    a = a.replace(/\s+/g,'');        
//                    equal(a, "sdf"+i)
//                } 
//            })
//        })
//      
//        test('clear_table_check', function(){
//            S('.closeButton').click(function (){
//                S.wait(1000)
//                equal(S('.table tbody tr').size(), 0)
//            })
//        })
//        
//        test('delete_single_tweet', function(){
//            S.open('http://localhost/task/index.html'); 
//            S.wait(3000)
//            S('.delete').click()
//            
//        })



    
        
        
        
    
    

    