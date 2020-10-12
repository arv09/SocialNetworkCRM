<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3 class="trn">Login</h3>
				<div class="d-flex justify-content-end social_icon">
					<span><i class="fab fa-expeditedssl"></i></span>
				</div>
			</div>
			<div class="card-body">
			
				<?php if(session()->get('success')): ?>
					<?= session()->get('success'); ?>
				<?php endif; ?>
				
				<?php if(isset($validation)): ?>
					<div class="alert alert-danger" role="alert">
						<?= $validation->listErrors() ?>
					</div>
				<?php endif; ?>
				<form class="" action="/CRMplatform/public/" method="post">
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="text" class="form-control" name="email" id="email" placeholder="email" value="<?= set_value(''); ?>">
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" class="form-control" name="password" id="password" placeholder="password">
					</div>
					<div class="input-group form-group">
						<input type="radio" id="sa" name="translation" value="sa" checked>
						<label class="flag-icon-label" for="sa"><span class="flag-icon flag-icon-sa"></span></label>
						<input type="radio" id="ev" name="translation" value="en">
						<label class="flag-icon-label" for="ev"><span class="flag-icon flag-icon-gb"></span></label>
					</div>
					
					<div class="form-group">
						<input type="submit" value="Login" class="btn float-right btn-submit-login">
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					<span class="trn">Forgot your password? Please contact your account manager.</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
input[type=radio]{
	margin-top: 5px;
	cursor: pointer;
}
label.flag-icon-label {
    margin: 0px 4px;
}
</style>