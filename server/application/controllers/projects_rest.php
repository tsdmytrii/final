<?php

require(APPPATH . 'libraries/REST_Controller.php');

/**
 * Class Projects_rest
 * 
 * get/edit/delete/create projects
 * 
 * @author Tsybriii Dmytro <tsybriidmytro@gmail.com> 
 * @version 1.0
 */

class Projects_rest extends REST_Controller {

    /**
     * Class method
     * 
     * @todo  Creates new project,
     * return response for ajax with status or errors  
     */
    
    public function projects_post($closed) {
        $this->load->helper('date');
        $prj = new Project();
        $prj->name = $this->post('projectName');
         $prj->closed = $closed;
        $prj->creationDate = mdate("%Y-%m-%d", time());
        $prj->position = 1;
        $prj->deleted = 0;
        $prj->Tasks = 1;

        if ($prj->save()) {
            $this->response(array('status' => 'Project has been successfuly added'), 200);
        } else {
                        $this->response(array('status' => $prj->error->all), 404);
        }
    }

    /**
     * Class method
     * 
     * @todo  get projects from database,
     *  has 2 params, $closed - so it can get filter by closed status
     * and param $id - if $id = 0, it returns all row,
     * on other hand it returns only project with exact ID
     */
    
    public function projects_get($closed, $id) {
        $this->load->model('proj');
        $result = $this->proj->get_all_projects($closed, $id);
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array('status' => 'Not found'), 404);
        }
    }

    /**
     * Class method
     * 
     * @todo  Deletes project by ID. Nothing special
     * return response for ajax with status or errors  
     */
    
    public function projects_delete($id) {
        $prj = new Project();
        $prj->where('id', $id)->get();
        $prj->deleted = '1';
        if ($prj->save()) {
            $this->response(array('status' => 'Project has been succesfuly deleted',
                                    'id' => $id), 200);
        } else {
            $this->response(array('status' => $prj->error->all), 404);
        }
    }

    /**
     * Class method
     * 
     * @todo  Edits project name or closed status.
     * It needs POST, not PUT ajax call
     * return response for ajax with status or errors  
     */
    public function projects_edit_post() {
        $prj = new Project();
        $prj->where('id', $this->post('id'));
        $prj->get();
        $prj->closed = $this->post('closed');
        $prj->name = $this->post('projectName');
        if ($prj->save()) {
            $this->response(array('name' => $this->post('projectName'),
                'status' => 'Project has been successfuly edited'), 200);
        } else {
            $error = $prj->error->all;
            $this->response(array('status' => $error), 404);
        }
    }

}

/* End of file projects_rest.php */ 
/* Location: ./server/applications/controllers/projects_rest.php */