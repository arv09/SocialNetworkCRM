<?php namespace App\Models;

use CodeIgniter\Model;

class AccessRightsModel extends Model
{
	protected $table = 'access_rights';
	protected $primaryKey = 'id';
	protected $allowedFields = ['label','updated_at'];
	
	protected $useTimestamps = true;
	protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

	//--------------------------------------------------------------------

}
?>
