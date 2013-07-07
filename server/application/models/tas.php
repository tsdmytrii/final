<?php

/**
 * Class Tas
 * 
 * Gets data from database and organise array for return
 * Has difficult way of making reslut array
 * 
 * @author Tsybriii Dmytro <tsybriidmytro@gmail.com> 
 * @version 1.0
 */

class Tas extends CI_Model {

    /**
     * Class method
     * 
     * There is a hard way to organise data for rendering tasks,
     * but i had a problem with returning object data.
     * Looking for easier way.
     * 
     * @todo  get projects from database,
     * @return $result array for ajax response with data or errors  
     */
    
    public function get_tasks() {
        $prj = new Project();
        $result = array();
        //get all projects
        foreach ($prj->get() as $curProject) {
            //save id of every project 
            $idProject = $curProject->id;
            //for each project get all its tasks 
            foreach ($curProject->task->get() as $currTasks) {
                //save task's id
                $idTask = $currTasks->id;
                $columns = array('id', 'name', 'creationDate', 'deadlineDate', 'position',
                    'deleted', 'project');
                //for each column in task save value
                foreach ($columns as $col) {
                    $result[$idProject][$idTask][$col] = $currTasks->$col;
                }
            }
        }
        //return multidimentional array
        return $result;
    }

}

/* End of file tas.php */
/* Location: ./server/applications/controllers/tas.php */
?>
