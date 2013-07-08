<?php

/**
 * Class Proj
 * 
 * Gets data from database and organise array for return
 * 
 * @author Tsybriii Dmytro <tsybriidmytro@gmail.com> 
 * @version 1.0
 */
class Proj extends CI_Model {

    /**
     * Class method
     * 
     * @todo  get projects from database,
     * @return $result array for ajax response with data or errors  
     */
    public function get_all_projects($id, $closed, $order, $direction) {
        $i = 0;
        $prj = new Project();
        $prj->order_by($order, $direction);
        
        // if URL like   http://localhost/final/server/projects/ or ./projects/0
        //get all projects
        if ($id == 0) {
            $prj->get_where(array('deleted' => 0,
                'closed' => $closed));
        } else {
            //if need to get only one project
            //URL like http://localhost/final/server/projects/ID
            $prj->get_where(array('id' => $id,
                'deleted' => 0));
        }
 

        //create empty array
        $result = array();
        $columns = array('id', 'name', 'closed', 'creationDate', 'position',
            'deleted', 'Tasks');
        //get every single project
        foreach ($prj as $row) {
            //get every single column in project
            foreach ($columns as $col) {
                //multidimentional array for return
                $result[$i][$col] = $row->$col;
            }
            $i++;
        }
        return $result;
    }
    
    public function get_search($closed, $searchProperty, $searchValue, $order, $direction) {
        $i = 0;
        $prj = new Project();
        $prj->order_by($order, $direction);
        $prj->get_where(array('deleted' => 0,
                'closed' => $closed,
            $searchProperty => $searchValue));
        
        $result = array();
        $columns = array('id', 'name', 'closed', 'creationDate', 'position',
            'deleted', 'Tasks');
        //get every single project
        foreach ($prj as $row) {
            //get every single column in project
            foreach ($columns as $col) {
                //multidimentional array for return
                $result[$i][$col] = $row->$col;
            }
            $i++;
        }
        return $result;
    }

}

/* End of file proj.php */
/* Location: ./server/applications/models/proj.php */
?>
