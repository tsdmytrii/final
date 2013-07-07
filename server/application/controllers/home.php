<?php

class Home extends CI_Controller {
    public function index($idProject = 0) {
        $data['idProject'] = $idProject;
        $this->load->view('../../../client/index', $data);
    }
}
?>
