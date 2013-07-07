<?php
/**
 * Class Task
 * 
 * Datamapper class. Describes validation rules for each column in 
 * table - Tasks
 * 
 * @author Tsybriii Dmytro <tsybriidmytro@gmail.com> 
 * @version 1.0
 */

class Task extends DataMapper {

    var $has_one = array('project');

    var $error_prefix = "<br />";
    var $error_suffix = "<br />";
    
    //validate rules for tasks
    var $validation = array(
        'name' => array(
            'label' => 'name',
            'rules' => array('required', 'trim', 'min_length' => 1, 'max_length' => 50),
        ),
        'creationDate' => array(
            'label' => 'creationDate',
            'rules' => array('required', 'valid_date'),
        ),
        'deadlineDate' => array(
            'label' => 'deadlineDate',
            'rules' => array('required', 'valid_date'),
        ),
        'position' => array(
            'label' => 'position',
            'rules' => array('required', 'numeric'),
        ),
        'deleted' => array(
            'label' => 'deleted',
            'rules' => array('required'),
        ),
        'project' => array(
            'label' => 'project',
            'rules' => array('required'),
        )
        
    );
}

/* End of file task.php */
/* Location: .server/application/models/task.php */
?>
