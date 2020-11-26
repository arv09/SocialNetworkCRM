<div class="row">
    <div class="container">
        <h4>Users</h4>
        <a class="btn btn-success" href="<?=base_url().'/admin_dashboard/add_user'?>">ADD USER</a>
        <div class="container">
            <div class="d-flex justify-content-center h-100">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <?php foreach($userList as $users): ?>
                        <tr>
                            <td><?=$users['user_name']?></td>
                            <td><?=$users['first_name']?></td>
                            <td><?=$users['last_name']?></td>
                            <td><?=$users['email_address']?></td>
                            <td>
                                <a class="btn btn-primary" href="<?=base_url().'/admin_dashboard/edit_user/'.$users['user_id']?>">EDIT</a>
                                <a class="btn btn-danger" href="<?=base_url().'/admin_dashboard/delete_user/'.$users['user_id']?>">DELETE</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>