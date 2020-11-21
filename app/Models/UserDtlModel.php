<?php namespace App\Models;

use CodeIgniter\Model;

class UserDtlModel extends Model
{
	protected $table = 'user_dtl';
	protected $primaryKey = 'id';
	protected $allowedFields = ['user_id','client_id','user_name','password','access_rights','status','is_deleted','updated_at'];
	
	protected $useTimestamps = true;
	protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

	protected function beforeInsert(array $data)
	{
		$data =  $this->passwordHash($data);
		
		return $data;
	}
	
	protected function beforeUpdate(array $data)
	{
		$data =  $this->passwordHash($data);
		
		return $data;
	}
	
	protected function passwordHash(array $data)
	{
		if(isset($data['data']['password'])){
			$data['data']['password'] = password_hash($data['data']['password'],PASSWORD_DEFAULT);
			return $data;
		}
	}

	public function getAllUsers($accessRights) 
	{
		if ($accessRights == 1) {
			$sql = "SELECT user_dtl.id as id, client_dtl.id as client_id, user_dtl.user_name, client_dtl.* FROM `user_dtl` LEFT JOIN client_dtl ON client_dtl.id = user_dtl.client_id WHERE user_dtl.status = 1 AND user_dtl.is_deleted = 0";
		} else if($accessRights == 2) {
			$sql = "SELECT user_dtl.id as id, client_dtl.id as client_id, user_dtl.user_name, client_dtl.* FROM `user_dtl` LEFT JOIN client_dtl ON client_dtl.id = user_dtl.client_id WHERE user_dtl.access_rights != 3 and user_dtl.status = 1 AND user_dtl.is_deleted = 0";
		}
		
		$users = $this->db->query($sql);
		return $users->getResultArray();

	}

	public function getUserDetails($userId)
	{
		$sql = "SELECT user_dtl.id as id, client_dtl.id as client_id, user_dtl.*, client_dtl.* FROM `user_dtl` LEFT JOIN client_dtl ON client_dtl.id = user_dtl.client_id WHERE user_dtl.id = ? LIMIT 1";

		$users = $this->db->query($sql, $userId);
		return $users->getResultArray();
	}

	//--------------------------------------------------------------------

}
?>
