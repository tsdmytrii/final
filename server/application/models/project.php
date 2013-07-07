<?php
/**
 * Class Project
 * 
 * Datamapper class. Describes validation rules for each column in 
 * table - Projects
 * 
 * @author Tsybriii Dmytro <tsybriidmytro@gmail.com> 
 * @version 1.0
 */

class Project extends DataMapper {

    var $has_many = array('task');
    //validation rules for projects
    var $validation = array(
        'name' => array(
            'label' => 'name',
            'rules' => array('required', 'trim', 'unique', 'alpha_dash', 'min_length' => 1, 'max_length' => 50),
        ),
        'closed' => array(
            'label' => 'closed',
            'rules' => array('required', 'boolean'),
        ),
        'creationDate' => array(
            'label' => 'creationDate',
            'rules' => array('required', 'valid_date'),
        ),
        'position   ' => array(
            'label' => 'position',
            'rules' => array('numeric'),
        ),
        'deleted' => array(
            'label' => 'deleted',
            'rules' => array('required', 'boolean'),
        ),
        'Tasks' => array(
            'label' => 'Tasks',
            'rules' => array('required', 'boolean'),
        )
        
    );
}

/* End of file project.php */
/* Location: .server/application/models/project.php */
?>