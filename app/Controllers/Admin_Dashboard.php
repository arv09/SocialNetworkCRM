<?php namespace App\Controllers;

use App\Models\UserDtlModel;
use App\Models\ClientDtlModel;
use App\Models\AccessRightsModel;
use App\Models\UserLogsModel;

class Admin_Dashboard extends BaseController
{
	
	public function main()
	{
		$data = [];
		$userDtl = new UserDtlModel();
		$rights = new AccessRightsModel();

		if(session()->get('isLoggedIn'))
		{
			$useremail = session()->get('email');
			$data['user'] = $userDtl->where('user_name',$useremail)->where('status',1)->first();
			$data['userList'] = $userDtl->getAllUsers(2);

			echo view('templates/header');
			echo view('admin/dashboard', $data);
			echo view('users/dashboard', $data);
			echo view('templates/footer');
		}
		else
		{
			return redirect()->to(base_url());
		}
		
    }
    
    public function add_user()
    {
		$rights = new AccessRightsModel();
		$clientDtl = new ClientDtlModel();
		$userDtl = new UserDtlModel();
		$logs = new UserLogsModel();
		
		helper(['form', 'url']);

		if($this->request->getMethod() == 'post'){
			// for validation
			$rules = [
				'first_name' => 'required|min_length[3]|max_length[100]',
				'last_name' => 'required|min_length[3]|max_length[100]',
				'email_address' => 'required|min_length[6]|max_length[50]',
				'password' => 'required|min_length[6]|max_length[50]',
				'password_confirm' => 'matches[password]'
			];

			if(! $this->validate($rules))
			{
				$data['validation'] = $this->validator;
			} 
			else 
			{
				$useremail = session()->get('email');

				$loggedIn_user = $userDtl->where('user_name',$useremail)->where('status',1)->first();
				// insert client_dtl
				$clientDtl_data = [
					'first_name' => $this->request->getVar('first_name'),
					'mid_name'  => $this->request->getVar('mid_name'),
					'last_name'  => $this->request->getVar('last_name'),
					'birth_date'  => $this->request->getVar('birth_date'),
					'gender'  => $this->request->getVar('gender'),
					'phone_number'  => $this->request->getVar('phone_number'),
					'mobile_number'  => $this->request->getVar('mobile_number'),
					'email_address'  => $this->request->getVar('email_address'),
					'home_address'  => $this->request->getVar('home_address'),
					'city'  => $this->request->getVar('city'),
					'state'  => $this->request->getVar('state'),
					'country'  => $this->request->getVar('country'),
					'zip_code'  => $this->request->getVar('zip_code'),
					'alert'  => $this->request->getVar('alert'),
				];

				$photoFile = $this->request->getFile('upload_photo');
				if ($photoFile->isValid() && !$photoFile->hasMoved()) 
				{
					$photoFile->move('./uploads/images');
					$clientDtl_data += [
						'photo_path' => ($photoFile) ? $photoFile->getName() : ''
					];
				}

				// get client id
				$clientDtl_save = $clientDtl->insert($clientDtl_data);
				// insert query in user_logs
				$logs->insert([
					'action_taken' => 'INSERT',
					'action_taken_by' => $loggedIn_user['user_name'],
					'query_string' => $clientDtl_save,
					'table_name' => 'client_dtl'
				]);
				
				// insert user_dtl
				$userDtl_data = [
					'client_id' => $clientDtl_save,
					'user_name' => $this->request->getVar('user_name'),
					'password' => $this->request->getVar('password'),
					'access_rights' => $this->request->getVar('access_right')
				];
				$userDtl_save = $userDtl->insert($userDtl_data);
				// insert query in user_logs
				$logs->insert([
					'action_taken' => 'INSERT',
					'action_taken_by' => $loggedIn_user['user_name'],
					'query_string' => $userDtl_save,
					'table_name' => 'user_dtl'
				]);

				return redirect()->to(base_url('admin_dashboard/main'));
			}
		}
		
		$data['access_rights'] = $rights->findAll();
		echo view('templates/header');
		echo view('users/add_user',$data);
		echo view('templates/footer');
	}
	
	public function edit_user($userId) 
	{
		$rights = new AccessRightsModel();
		$clientDtl = new ClientDtlModel();
		$userDtl = new UserDtlModel();
		$logs = new UserLogsModel();
		
		helper(['form', 'url']);

		if($this->request->getMethod() == 'post'){
			$useremail = session()->get('email');

			$loggedIn_user = $userDtl->where('user_name',$useremail)->where('status',1)->first();
			// update client_dtl
			$clientDtl_data = [
				'first_name' => $this->request->getVar('first_name'),
				'mid_name'  => $this->request->getVar('mid_name'),
				'last_name'  => $this->request->getVar('last_name'),
				'birth_date'  => $this->request->getVar('birth_date'),
				'gender'  => $this->request->getVar('gender'),
				'phone_number'  => $this->request->getVar('phone_number'),
				'mobile_number'  => $this->request->getVar('mobile_number'),
				'email_address'  => $this->request->getVar('email_address'),
				'home_address'  => $this->request->getVar('home_address'),
				'city'  => $this->request->getVar('city'),
				'state'  => $this->request->getVar('state'),
				'country'  => $this->request->getVar('country'),
				'zip_code'  => $this->request->getVar('zip_code'),
				'alert'  => $this->request->getVar('alert'),
			];

			$photoFile = $this->request->getFile('upload_photo');
			
			if ($photoFile->isValid() && !$photoFile->hasMoved()) 
			{
				$photoFile->move('./uploads/images');
				$clientDtl_data += [
					'photo_path' => ($photoFile) ? $photoFile->getName() : ''
				];
			}

			$clientDtl->update($userId, $clientDtl_data);
			
			// insert query in user_logs
			$logs_data1 = [
				'action_taken' => 'UPDATE',
				'action_taken_by' => $loggedIn_user['user_name'],
				'query_string' => (string)$clientDtl->getLastQuery(),
				'table_name' => 'client_dtl'
			];

			$logs->insert($logs_data1);
			
			// update user_dtl
			$userDtl_data = [
				'client_id' => $userId,
				'user_name' => $this->request->getVar('user_name'),
				'access_rights' => $this->request->getVar('access_right')
			];
			if(!empty($this->request->getVar('password'))) {
				$userDtl_data += [
					'password' => $this->request->getVar('password')
				];
			}
			$userDtl->update($userId, $userDtl_data);

			// insert query in user_logs
			$logs_data2 = [
				'action_taken' => 'UPDATE',
				'action_taken_by' => $loggedIn_user['user_name'],
				'query_string' => (string)$userDtl->getLastQuery(),
				'table_name' => 'user_dtl'
			];
			$logs->insert($logs_data2);

			return redirect()->to(base_url('admin_dashboard/main'));
		}

		$data['userId'] = $userId;
		$data['access_rights'] = $rights->findAll();
		$data['user_dtls'] = $userDtl->getUserDetails($userId);

		echo view('templates/header');
		echo view('users/edit_user',$data);
		echo view('templates/footer');
	}

	public function delete_user($userId) 
	{
		$clientDtl = new ClientDtlModel();
		$userDtl = new UserDtlModel();
		$logs = new UserLogsModel();
		
		$useremail = session()->get('email');

		$loggedIn_user = $userDtl->where('user_name',$useremail)->where('status',1)->first();
		// update client_dtl

		$is_deleted = [
			'is_deleted' => 1
		];

		$clientDtl->update($userId, $is_deleted);

		$logs_data2 = [
			'action_taken' => 'DELETE',
			'action_taken_by' => $loggedIn_user['user_name'],
			'query_string' => (string)$clientDtl->getLastQuery(),
			'table_name' => 'client_dtl'
		];
		$logs->insert($logs_data2);

		$is_deleted += [
			'status' => 0
		];
		$userDtl->update($userId, $is_deleted);

		$logs_data2 = [
			'action_taken' => 'DELETE',
			'action_taken_by' => $loggedIn_user['user_name'],
			'query_string' => (string)$userDtl->getLastQuery(),
			'table_name' => 'user_dtl'
		];
		$logs->insert($logs_data2);

		return "<script>
		alert('Successfully deleted user.');
		window.location.href='".base_url('admin_dashboard/main')."';
		</script>";
	}
	
	public function page1()
	{
		echo view('templates/header');
		echo view('page1');
		echo view('templates/footer');
	}
	
	public function page2()
	{
		echo view('templates/header');
		echo view('page2');
		echo view('templates/footer');
	}
	
	public function page3()
	{
		echo view('templates/header');
		echo view('page3');
		echo view('templates/footer');
	}

	//--------------------------------------------------------------------

}
