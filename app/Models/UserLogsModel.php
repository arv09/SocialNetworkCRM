<?php namespace App\Models;

use CodeIgniter\Model;

class UserLogsModel extends Model
{
	protected $table = 'user_logs';
	protected $primaryKey = 'id';
	protected $allowedFields = ['action_taken','action_taken_by','query_string','table_name','updated_at'];
	
	protected $useTimestamps = true;
	protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

	//--------------------------------------------------------------------

}
?>
