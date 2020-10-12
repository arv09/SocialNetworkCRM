<?php namespace App\Validation;
use App\Models\AccountModel;

class UserRules{
	
	public function validateUser(string $str, string $fields, array $data){
		$model = new AccountModel();
		$user = $model->where('email',$data['email'])->where('status',1)->first();
		if(!$user)
			return false;
		
		return password_verify($data['password'],$user['password']);
	}	
	
}