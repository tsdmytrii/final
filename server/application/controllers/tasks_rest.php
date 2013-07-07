<?php

require(APPPATH . 'libraries/REST_Controller.php');

/**
 * Class Tasks_rest
 * 
 * get/edit/delete/create tasks
 * 
 * @author Tsybriii Dmytro <tsybriidmytro@gmail.com> 
 * @version 1.0
 */

class Tasks_rest extends REST_Controller {

    /**
     * Class method
     * 
     * @todo  get tasks from database,
     * return response for ajax with status or errors  
     */
    
    public function task_get() {
        //load model, which get tasks and makes an array for return
        $this->load->model('tas');
        $result = $this->tas->get_tasks();
        
        //check for any results
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response("error", 404);
        }
    }

    /**
     * Class method
     * 
     * @todo  Creates new task,
     * return response for ajax with status or errors  
     */
    
    public function task_post() {
        $this->load->helper('date');

        //set properties for a new task
        $tsk = new Task();
        $tsk->name = $this->post('name');
        $tsk->creationDate = mdate("%Y-%m-%d", time());
        
        //get deadlineDate from task create form (#taskForm)
        $tsk->deadlineDate = $this->post('deadlineDate'); 
        
        //default position of new task in project is last
        $tsk->position = 1;
        $tsk->deleted = 0;
        
        //get deadlineDate from task create form (#taskForm)
        $tsk->project = $this->post('id');

        //get project to link a new task with it by id
        $prj = new Project();
        $prj->where('id', $this->post('id'));
        $prj->get();

        //link task with project
        if (!($tsk->save($prj->all))) {
            //return all errors with one string
            $status = $tsk->error->all;
            $this->response($status, 404);
        } else {
            $status = (array('status' => 'success'));
            $this->response($status, 201);
        }
    }

    /**
     * Class method
     * 
     * @todo  Deletes task by ID. 
     * (using data-task-id property of remove button)
     * return response for ajax with status or errors  
     */
    // (using data-task-id property of remove button)
    public function task_delete($id) {
        $tsk = new Task();
        $tsk->where('id', $id)->get();

        if ($tsk->delete()) {
            $this->response("success", 200);
        } else {
            $status = $tsk->error->all;
            $this->response($status, 404);
        }
    }
    
    /**
     * Class method
     * 
     * @todo  Edits task name and deadline date.
     * It needs POST, not PUT ajax call
     * all data serialized from #editTaskForm
     * return response for ajax with status or errors  
     */
    
    public function tasks_edit_post() {
        $tsk = new Task();
        $tsk->where('id', $this->post('id'));
        $tsk->get();
        $tsk->name = $this->post('taskName');
        $tsk->deadlineDate = $this->post('date');

        if ($tsk->save()) {
            $this->response(array('taskName' => $this->post('taskName'),
                'taskDate' => $this->post('date'),
                'status' => 'Task has been changed successfuly'), 200);
        } else {
            $error = $tsk->error->all;
            $this->response(array('status' => $error), 404);
        }
    }

}

/* End of file tasks_rest.php */ 
/* Location: ./server/applications/controllers/tasks_rest.php */
?>

