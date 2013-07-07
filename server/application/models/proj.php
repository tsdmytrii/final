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
    public function get_all_projects($closed, $id) {
        $i = 0;
        $prj = new Project();

        // if URL like   http://localhost/final/server/projects/ or ./projects/0
        //get all projects
        if ($id == 0) {
            $prj->get_where(array('deleted' => 0,
                'closed' => $closed));
        } else {
            //if need to get only one project
            //URL like http://localhost/final/server/projects/ID
            $prj->get_where(array('id' => $id,
                'deleted' => 0,
                'closed' => $closed));
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

}

/* End of file proj.php */
/* Location: ./server/applications/models/proj.php */
?>
