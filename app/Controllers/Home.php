<?php namespace App\Controllers;

use App\Models\AccountModel;

class Home extends BaseController
{
	
	public function index()
	{
		$data = [];

		if(session()->get('isLoggedIn'))
		{
			$useremail = session()->get('email');

			$model = new AccountModel();
			$data['user'] = $model->where('email',$useremail)->where('status',1)->first();

			echo view('templates/header', $data);
			echo view('dashboard');
			echo view('templates/footer');
		}
		else
		{
			return redirect()->to(base_url());
		}
		
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
