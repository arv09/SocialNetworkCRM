$( document ).ready(function() {
		//Datepicker
		$('#warranty_start_w').datepicker({dateFormat: "yy-mm-dd"});
		$('#warranty_end_w').datepicker({dateFormat: "yy-mm-dd"});
		$('#warranty_start_uw').datepicker({dateFormat: "yy-mm-dd"});
		$('#warranty_end_uw').datepicker({dateFormat: "yy-mm-dd"});
		
		//Start create/update crm user
		$('.btn-crm-update-account').click(function(){
			var id = $(this).attr('data-id');
			$.ajax({
				url: "<?php echo base_url('dashboard/get_info_account') ?>/"+id,
				success: function(result){
					console.log(result.user);
					$('#ajax_form_update_crm_client_account').attr('data-id',result.user[0].id);
					$('#id_account_uam').val(result.user[0].id);
					$('#id_account_details_uam').val(result.user[0].adid);
					$('.firstname_ucrmu_label').html('User: '+result.user[0].firstname+' '+result.user[0].lastname);
					$('#id_number_ucrmu').val(result.user[0].id_number);
					$('#email_ucrmu').val(result.user[0].email);
					$('#phone_number_ucrmu').val(result.user[0].phone_number);
					if(result.user[0].role=="admin"){
						$('#role_ucrmu option[value="admin"]').attr('selected',true);
					}
					if(result.user[0].role=="sales"){
						$('#role_ucrmu option[value="sales"]').attr('selected',true);
					}
					if(result.user[0].role=="manager"){
						$('#role_ucrmu option[value="manager"]').attr('selected',true);
					}
				}
			});
		});
		
	    $('.btn-crm-view-account').click(function(){
			var id = $(this).attr('data-id');
			$.ajax({
				url: "<?php echo base_url('dashboard/get_info_account') ?>/"+id,
				success: function(result){
					$('#ajax_form_update_crm_details_account').attr('data-id',result.user[0].id);
					$('#id_account_uam').val(result.user[0].id);
					$('#id_account_details_uam').val(result.user[0].adid);
					$('#firstname_uam').val(result.user[0].firstname);
					$('#middlename_uam').val(result.user[0].middlename);
					$('#lastname_uam').val(result.user[0].lastname);
					$('#id_number_uam').val(result.user[0].id_number);
					$('#email_uam').val(result.user[0].email);
					$('#phone_number_uam').val(result.user[0].phone_number);
					$('#address_uam').val(result.user[0].address);
					$('#city_uam').val(result.user[0].city);
					$('#country_uam').val(result.user[0].country);
					$('#post_code_uam').val(result.user[0].postal_code);
					if(result.user[0].role=="admin"){
						$('#role_uam option[value="admin"]').attr('selected',true);
					}
					if(result.user[0].role=="sales"){
						$('#role_uam option[value="sales"]').attr('selected',true);
					}
					if(result.user[0].role=="manager"){
						$('#role_uam option[value="manager"]').attr('selected',true);
					}
				}
			});
		});
		
		$('#id_number_crmu').on('blur',function(){
			validate_crm_id_number($(this).val());
		});

		$('#id_number_cam').on('blur',function(){
			validate_client_id_number($(this).val());
		});
		
		if ($("#ajax_form_create_crm_account").length > 0) {
			$("#ajax_form_create_crm_account").validate({
			rules: {
			  firstname: {
				required: true,
			  },
			  lastname: {
				required: true,
			  },
			  id_number: {
				required: true,
			  },
			  phone_number: {
				required: true,
			  },
			  email: {
				required: true,
				maxlength: 50,
				email: true,
			  }
			},
			messages: {
				
			  firstname: {
				required: "Please enter first name",
			  },
			  lastname: {
				required: "Please enter first name",
			  },
			  email: {
				required: "Please enter valid email",
				email: "Please enter valid email",
				maxlength: "The email name should less than or equal to 50 characters",
				},
			},
			submitHandler: function(form) {
			  $('#ajax_form_create_crm_account .btn-form-submit').prop("disabled", true);
			  //$('#send_form').html('Sending..');
			  $.ajax({
				url: "<?php echo base_url('dashboard/create_crm_account') ?>",
				type: "POST",
				data: $('#ajax_form_create_crm_account').serialize(),
				dataType: "json",
				success: function( response ) {
					console.log(response);
					if(response.success == true){
						$('#createcrmaccountmodallabel .close').click();
						location.reload();
					}
				}
			  });
			  
			}
		  })
		}
		
		if ($("#ajax_form_update_crm_account").length > 0) {
			$("#ajax_form_update_crm_account").validate({
			rules: {
			  firstname: {
				required: true,
			  },
			  lastname: {
				required: true,
			  },
			  id_number: {
				required: true,
			  },
			  phone_number: {
				required: true,
			  },
			  email: {
				required: true,
				maxlength: 50,
				email: true,
			  }
			},
			messages: {
			  firstname: {
				required: "Please enter first name",
			  },
			  lastname: {
				required: "Please enter first name",
			  },
			  email: {
				required: "Please enter valid email",
				email: "Please enter valid email",
				maxlength: "The email name should less than or equal to 50 characters",
				},
			},
			submitHandler: function(form) {
				$('#ajax_form_update_crm_account .btn-form-submit').prop("disabled", true);
			  //$('#send_form').html('Sendi	ng..');
			  var uaurl = "<?php echo base_url('dashboard/update_crm_account') ?>"+'/'+$('#ajax_form_update_crm_account').attr('data-id');
			  
			  $.ajax({
				url: uaurl,
				type: "POST",
				data: $('#ajax_form_update_crm_account').serialize(),
				dataType: "json",
				success: function( response ) {
					console.log(response);
					if(response.success == true){
						$('#updatecrmaccountmodallabel .close').click();
						//location.reload();
					}
				}
			  });
			}
		  })
		}
		
		if ($("#ajax_form_update_crm_details_account").length > 0) {
			$("#ajax_form_update_crm_details_account").validate({
			rules: {
			  firstname: {
				required: true,
			  },
			  lastname: {
				required: true,
			  },
			  id_number: {
				required: true,
			  },
			  phone_number: {
				required: true,
			  },
			  email: {
				required: true,
				maxlength: 50,
				email: true,
			  }
			},
			messages: {
			  firstname: {
				required: "Please enter first name",
			  },
			  lastname: {
				required: "Please enter first name",
			  },
			  email: {
				required: "Please enter valid email",
				email: "Please enter valid email",
				maxlength: "The email name should less than or equal to 50 characters",
				},
			},
			submitHandler: function(form) {
				$('#ajax_form_update_crm_details_account .btn-form-submit').prop("disabled", true);
			  //$('#send_form').html('Sending..');
			  var uaurl = "<?php echo base_url('dashboard/update_crm_details_account') ?>"+'/'+$('#ajax_form_update_crm_details_account').attr('data-id');
			  
			  $.ajax({
				url: uaurl,
				type: "POST",
				data: $('#ajax_form_update_crm_details_account').serialize(),
				dataType: "json",
				success: function( response ) {
					console.log(response);
					if(response.success == true){
						$('#updatecrmdetailsaccountmodallabel .close').click();
						location.reload();
					}
				}
			  });
			}
		  })
		}
		
		//end create/update crm user
		
		//Create/update clients account
		$('.btn-client-update-account').click(function(){
			var id = $(this).attr('data-id');
			$.ajax({
				url: "<?php echo base_url('dashboard/get_client_info_account') ?>/"+id,
				success: function(result){
					console.log(result.user);
					$('#ajax_form_update_client_account').attr('data-id',result.user[0].id);
					$('#id_account_clients_ucam').val(result.user[0].id);
					$('#id_account_details_ucam').val(result.user[0].adid);
					$('#firstname_ucam').val(result.user[0].firstname);
					$('#middlename_ucam').val(result.user[0].middlename);
					$('#lastname_ucam').val(result.user[0].lastname);
					$('#id_number_ucam').val(result.user[0].id_number);
					$('#email_ucam').val(result.user[0].email);
					$('#phone_number_ucam').val(result.user[0].phone_number);
					$('#address_ucam').val(result.user[0].address);
					$('#city_ucam').val(result.user[0].city);
					$('#country_ucam').val(result.user[0].country);
					$('#post_code_ucam').val(result.user[0].postal_code);
					$('#sale_personnel_ucam').val(result.user[0].sale_personnel);
					$('#sale_email_personnel_ucam').val(result.user[0].sale_email_personnel);
				}
			});
		});
		
		if ($("#ajax_form_create_clients_account").length > 0) {
			$("#ajax_form_create_clients_account").validate({
			rules: {
			  firstname: {
				required: true,
			  },
			  lastname: {
				required: true,
			  },
			  id_number: {
				required: true,
			  },
			  phone_number: {
				required: true,
			  },
			  email: {
				required: true,
				maxlength: 50,
				email: true,
			  }
			},
			messages: {
				
			  firstname: {
				required: "Please enter first name",
			  },
			  lastname: {
				required: "Please enter first name",
			  },
			  email: {
				required: "Please enter valid email",
				email: "Please enter valid email",
				maxlength: "The email name should less than or equal to 50 characters",
				},
			},
			submitHandler: function(form) {
				$('#ajax_form_create_clients_account .btn-form-submit').prop("disabled", true);
			  //$('#send_form').html('Sending..');
			  $.ajax({
				url: "<?php echo base_url('dashboard/create_clients_account') ?>",
				type: "POST",
				data: $('#ajax_form_create_clients_account').serialize(),
				dataType: "json",
				success: function( response ) {
					console.log(response);
					if(response.success == true){
						$('#createclientsaccountmodallabel .close').click();
						location.reload();
					}
				}
			  });
			}
		  })
		}
		
		if ($("#ajax_form_update_client_account").length > 0) {
			$("#ajax_form_update_client_account").validate({
			rules: {
			  firstname: {
				required: true,
			  },
			  lastname: {
				required: true,
			  },
			  id_number: {
				required: true,
			  },
			  phone_number: {
				required: true,
			  },
			  email: {
				required: true,
				maxlength: 50,
				email: true,
			  }
			},
			messages: {
				
			  firstname: {
				required: "Please enter first name",
			  },
			  lastname: {
				required: "Please enter first name",
			  },
			  email: {
				required: "Please enter valid email",
				email: "Please enter valid email",
				maxlength: "The email name should less than or equal to 50 characters",
				},
			},
			submitHandler: function(form) {
				$('#ajax_form_update_client_account .btn-form-submit').prop("disabled", true);
			  //$('#send_form').html('Sending..');
			  $.ajax({
				url: "<?php echo base_url('dashboard/update_client_account') ?>"+'/'+$('#ajax_form_update_client_account').attr('data-id'),
				type: "POST",
				data: $('#ajax_form_update_client_account').serialize(),
				dataType: "json",
				success: function( response ) {
					console.log(response);
					if(response.success == true){
						$('#createclientsaccountmodallabel .close').click();
						location.reload();
					}
				}
			  });
			}
		  })
		}
		
		//end create/update client account
		
		// clients warranty create/update
		$('.btn-client-create-warranty-account').click(function(){
			var id = $(this).attr('data-id');
			var fn = $(this).attr('data-fn');
			var ln = $(this).attr('data-ln');
			var em = $(this).attr('data-em');
			var idn = $(this).attr('data-in');
			var pn = $(this).attr('data-pn');
			var sp = $(this).attr('data-sp');
			var sep = $(this).attr('data-sep');
			
			$('#client_id_w').val(id);
			$('#client_name_w').val(fn+' '+ln);
			$('#client_email_w').val(em);
			$('#id_number_w').val(idn);
			$('#phone_number_w').val(idn);
			$('#sale_personnel_w').val(sp);
			$('#sale_email_personnel_w').val(sep);
			$('#warranty_id_number_w strong').html(idn);
			$('#warranty_for_w strong').html(fn+' '+ln);
			$('#warranty_email_w strong').html(em);
					
		});

		$('#client-warranty-table').on('click','.btn-update_warranty',function(){
			var id = $(this).attr('data-id');
			var data = [];

			$.ajax({
				url: "<?php echo base_url('dashboard/get_clients_warranty') ?>/"+id,
				success: function(result){
					data = result.warranty[0];
					//console.log(result);
					$('#ajax_form_update_warranty').attr('data-id',id);
					$('#warranty_id_number_uw strong').html(data.id_number);
					$('#warranty_for_uw strong').html(data.client_name);
					$('#warranty_email_uw strong').html(data.email);

					$('#client_id_uw').val(id);
					$('#client_name_uw').val(data.client_name);
					$('#client_email_uw').val(data.email);
					$('#id_number_uw').val(data.id_number);
					$('#phone_number_uw').val(data.phone_number);
					$('#sale_personnel_uw').html(data.sale_personnel);
					$('#sale_email_personnel_uw').html(data.sale_email_personnel);

					$('#policy_number_uw').val(data.policy_number);
					$('#warranty_type_uw').val(data.warranty_type);
					$('#warranty_period_uw').val(data.warranty_period);
					$('#warranty_start_uw').val(data.warranty_start);
					$('#warranty_end_uw').val(data.warranty_end);
					$('#showroom_uw').val(data.showroom);
					$('#car_type_uw').val(data.car_type);
					$('#car_model_uw').val(data.car_model);
					$('#price_uw').val(data.price);
					$('#paid_amount_uw').val(data.paid_amount);
					$('#receipt_number_uw').val(data.receipt_number);
					$('#payment_method_uw').val(data.payment_method);
					$('#remarks_uw').val(data.remarks);
					
				}
			});
		});
		
		$('#client-warranty-table').on('click','.btn-update-warranty-file',function(){
			$('#viewwarrantyclientaccountmodal .close').trigger('click');
			$('#id_fu').val($(this).attr('data-id'));
			$('#id_number_fu').val($(this).attr('data-idn'));
		});
		
		$('.btn-update-warranty-file').on('click',function(){
			$('#id_fu').val($(this).attr('data-id'));
			$('#id_number_fu').val($(this).attr('data-idn'));
		});
		
		$('#client-warranty-table').on('click','.btn-view-warranty-file',function(){
			var base_url = window.location.origin;
			var filename = $(this).attr('data-file');
			window.open(base_url+'/CRMplatform/public/documents/'+filename);
		});

		$('.btn-view-warranty-file').on('click',function(){
			var base_url = window.location.origin;
			var filename = $(this).attr('data-file');
			window.open(base_url+'/CRMplatform/public/documents/'+filename);
		});
		
		$('.btn-update-client-warranty').on('click',function(){
			var id = $(this).attr('data-id');
			var data = [];

			$.ajax({
				url: "<?php echo base_url('dashboard/get_clients_warranty') ?>/"+id,
				success: function(result){
					data = result.warranty[0];
					//console.log(result);
					$('#ajax_form_update_warranty').attr('data-id',id);
					$('#warranty_id_number_uw strong').html(data.id_number);
					$('#warranty_for_uw strong').html(data.client_name);
					$('#warranty_email_uw strong').html(data.email);

					$('#client_id_uw').val(id);
					$('#client_name_uw').val(data.client_name);
					$('#client_email_uw').val(data.email);
					$('#id_number_uw').val(data.id_number);
					$('#phone_number_uw').val(data.phone_number);
					$('#sale_personnel_uw').html(data.sale_personnel);
					$('#sale_email_personnel_uw').html(data.sale_email_personnel);

					$('#policy_number_uw').val(data.policy_number);
					$('#warranty_type_uw').val(data.warranty_type);
					$('#warranty_period_uw').val(data.warranty_period);
					$('#warranty_start_uw').val(data.warranty_start);
					$('#warranty_end_uw').val(data.warranty_end);
					$('#showroom_uw').val(data.showroom);
					$('#car_type_uw').val(data.car_type);
					$('#car_model_uw').val(data.car_model);
					$('#price_uw').val(data.price);
					$('#paid_amount_uw').val(data.paid_amount);
					$('#receipt_number_uw').val(data.receipt_number);
					$('#payment_method_uw').val(data.payment_method);
					$('#remarks_uw').val(data.remarks);
					
				}
			});
		});

		$('.btn-client-view-warranty-account').click(function(){
			var idn = $(this).attr('data-id');
			var em = $(this).attr('data-em');
			var table_tr = '';
			var table_td = '';
			$.ajax({
				url: "<?php echo base_url('dashboard/get_warranty_summary') ?>/"+idn,
				success: function(result){
					for (var i = 0; i < result.summary.length; i++) {
						console.log(result.summary[i]);
						var file_upload = '';
						if(result.summary[i].value_1){
						file_upload =	"<td><button type='button' data-id="+result.summary[i].id+" data-file="+result.summary[i].value_1+" data-toggle='modal' data-target='#viewwarrantyfile' class='btn btn-outline-primary btn-sm btn-view-warranty-file'><i class='fa fa-paperclip'></i> "+result.summary[i].policy_number+"</button></td>";
						}else{
						file_upload = "<td>"+result.summary[i].policy_number+"</td>";
						}
						
						table_tr = "<td>"+result.summary[i].client_name+"</td>"+
									"<td>"+result.summary[i].id_number+"</td>"+
									"<td>"+result.summary[i].email+"</td>"+
									"<td>"+result.summary[i].phone_number+"</td>"+
									file_upload+
									"<td>"+result.summary[i].warranty_type+"</td>"+
									"<td>"+result.summary[i].warranty_period+"</td>"+
									"<td>"+result.summary[i].warranty_start+"</td>"+
									"<td>"+result.summary[i].warranty_end+"</td>"+
									"<td>"+result.summary[i].price+"</td>"+
									"<td>"+result.summary[i].paid_amount+"</td>"+
									"<td>"+result.summary[i].receipt_number+"</td>"+
									"<td>"+result.summary[i].payment_method+"</td>"+
									"<td>"+result.summary[i].sale_personnel+"</td>"+
									"<td><button type='button' data-id="+result.summary[i].id+" data-toggle='modal' data-target='#updatewarrantymodal' class='btn btn-outline-primary btn-sm btn-update_warranty'><i class='fa fa-file-text-o'></i> Details</button> <button type='button' data-id="+result.summary[i].id+" data-idn="+result.summary[i].id_number+" data-toggle='modal' data-target='#updatewarrantyfilemodal' class='btn btn-outline-danger btn-sm btn-update-warranty-file'><i class='fa fa-floppy-o'></i> Upload</button></td>";
						table_td = "<tr>"+table_tr + "</tr>" + table_td;
					}
					$("#client-warranty-table tbody").html(table_td);
				}
			});		
		});
		
		if ($("#ajax_form_add_new_warranty").length > 0) {
			$("#ajax_form_add_new_warranty").validate({
				rules: {
				  policy_number: {
					required: true,
				  },
				  warranty_type: {
					required: true,
				  },
				  warranty_period: {
					required: true,
				  },
				  price: {
					required: true,
				  },
				  paid_amount: {
					required: true,
				  },
				  theFile: { 
					required: true,
				  },
				},
				messages: {
				  policy_number: {
					required: "Please enter first policy number.",
				  },
				  warranty_type: {
					required: "Please enter warranty type.",
				  },
				  warranty_period: {
					required: "Please enter warranty period.",
				   },
				   price: {
					required: "Please enter price.",
				  },
				  paid_amount: {
					required: "Please enter paid amount.",
				   },
				  theFile: {
					  required: "File must be JPG, PNG or PDF, less than 1MB",
				   },
				},
				submitHandler: function(form) {
					$('#ajax_form_add_new_warranty .btn-form-submit').prop("disabled", true);
				  //$('#send_form').html('Sending..');
				  $.ajax({
					url: "<?php echo base_url('dashboard/add_new_warranty_account') ?>",
					type: "POST",
					data: $('#ajax_form_add_new_warranty').serialize(),
					dataType: "json",
					success: function( response ) {
						//console.log(response);
						if(response.success == true){
							$('#createclientsaccountmodallabel .close').click();
							location.reload();
						}
					}
				  });
				}
		  });
		}

		if ($("#ajax_form_update_warranty").length > 0) {
			$("#ajax_form_update_warranty").validate({
				rules: {
				  policy_number: {
					required: true,
				  },
				  warranty_type: {
					required: true,
				  },
				  warranty_period: {
					required: true,
				  },
				  price: {
					required: true,
				  },
				  paid_amount: {
					required: true,
				  }
				},
				messages: {
				  policy_number: {
					required: "Please enter first policy number.",
				  },
				  warranty_type: {
					required: "Please enter warranty type.",
				  },
				  warranty_period: {
					required: "Please enter warranty period.",
				   },
				   price: {
					required: "Please enter price.",
				  },
				  paid_amount: {
					required: "Please enter paid amount.",
				   },
				},
				submitHandler: function(form) {
					$('#ajax_form_update_warranty .btn-form-submit').prop("disabled", true);
				  //$('#send_form').html('Sending..');
				  $.ajax({
					url: "<?php echo base_url('dashboard/update_clients_warranty') ?>"+'/'+$('#ajax_form_update_warranty').attr('data-id'),
					type: "POST",
					data: $('#ajax_form_update_warranty').serialize(),
					dataType: "json",
					success: function( response ) {
						//console.log(response);
						if(response.success == true){
							$('#createclientsaccountmodallabel .close').click();
							location.reload();
						}
					}
				  });
				}
		  });
		}

		//Activate or de-Activate User
		$('.btn-activate-user').on('click',function(){
			$('.btn-confirm-activate-user').attr('data-id',$(this).attr('data-id'));
		});

		$('.btn-confirm-activate-user').on('click',function(){
			$.ajax({
				url: "<?php echo base_url('dashboard/activate_crm_user') ?>"+'/'+$(this).attr('data-id'),
				success: function( response ) {
					if(response.success == true){
						location.reload();
					}
				}
			});
		});

		$('.btn-deactivate-user').on('click',function(){
			$('.btn-confirm-deactivate-user').attr('data-id',$(this).attr('data-id'));
		});
	
		$('.btn-confirm-deactivate-user').on('click',function(){
			$.ajax({
				url: "<?php echo base_url('dashboard/deactivate_crm_user') ?>"+'/'+$(this).attr('data-id'),
				success: function( response ) {
					if(response.success == true){
						location.reload();
					}
				}
			});
		});
		//end activate or de-activate user
		
		//Change Password
		$('.btn-change-password').on('click',function(){
			$('#ajax_form_change_password').attr('data-id',$(this).attr('data-id'));
			$('#ajax_form_change_password .btn-form-submit').prop("disabled", false);
		});

		$('.btn-update-users-password').on('click',function(){
			$('#ajax_form_update_users_password').attr('data-id',$(this).attr('data-id'));
			$('#ajax_form_update_users_password .btn-form-submit').prop("disabled", false);
		});
		
		$('#ajax_form_change_password .btn-form-submit').on('click',function(){
			$('#ajax_form_change_password .btn-form-submit').prop("disabled", true);
		});

		$('#ajax_form_update_users_password .btn-form-submit').on('click',function(){
			$('#ajax_form_update_users_password .btn-form-submit').prop("disabled", true);
		});
	
		if ($("#ajax_form_change_password").length > 0) {
			$("#ajax_form_change_password").validate({
				rules: {
				  current_password: {
					required: true,
				  },
				  password: {
					required: true,
					minlength : 6,
				  },
				  confirm_password: {
					minlength : 6,
                    equalTo : "#password_up"
				  }
				},
				messages: {
				  current_password: {
					required: "Please enter old password.",
				  },
				  password: {
					required: "Please enter new password.",
				  },
				  confirm_password: {
					required: "Please confirm the new password.",
				   }
				},
				submitHandler: function(form) {
					$('#ajax_form_change_password .btn-form-submit').prop("disabled", true);
				  //$('#send_form').html('Sending..');
				  $.ajax({
					url: "<?php echo base_url('dashboard/change_password') ?>"+'/'+$("#ajax_form_change_password").attr('data-id'),
					type: "POST",
					data: $('#ajax_form_change_password').serialize(),
					dataType: "json",
					success: function( response ) {
						//console.log(response);
						if(response.success == true){
							location.reload();
						}
					}
				  });
				}
		  });
		}

		if ($("#ajax_form_update_users_password").length > 0) {
			$("#ajax_form_update_users_password").validate({
				rules: {
				  password: {
					required: true,
					minlength : 6,
				  },
				  confirm_password: {
					minlength : 6,
                    equalTo : "#password_uup"
				  }
				},
				messages: {
				  password: {
					required: "Please enter new password.",
				  },
				  confirm_password: {
					required: "Please confirm the new password.",
				   }
				},
				submitHandler: function(form) {
					$('#ajax_form_update_users_password .btn-form-submit').prop("disabled", true);
				  //$('#send_form').html('Sending..');
				  $.ajax({
					url: "<?php echo base_url('dashboard/update_users_password') ?>"+'/'+$("#ajax_form_update_users_password").attr('data-id'),
					type: "POST",
					data: $('#ajax_form_update_users_password').serialize(),
					dataType: "json",
					success: function( response ) {
						//console.log(response);
						if(response.success == true){
							location.reload();
						}
					}
				  });
				}
		  });
		}
	});

	function validate_crm_id_number(idn){
		
		$.ajax({
			url: "<?php echo base_url('dashboard/crm_id_number') ?>/"+idn,
			type: "POST",
			success: function( response ) {
				if(response.record[0] && response.record[0] !=""){
					//console.log(response.record[0]);
					$('#id_number_crmu').after('<label id="id_number_crmu-error" class="error" for="id_number_crmu">ID number is already exist.</label>');
				}
			}
		  });
	}

	function validate_client_id_number(idn){
		
		$.ajax({
			url: "<?php echo base_url('dashboard/client_id_number') ?>/"+idn,
			type: "POST",
			success: function( response ) {
				if(response.record[0] && response.record[0] !=""){
					//console.log(response.record[0]);
					$('#id_number_cam').after('<label id="id_number_cam-error" class="error" for="id_number_cam">ID number is already exist.</label>');
				}
			}
		  });
	}