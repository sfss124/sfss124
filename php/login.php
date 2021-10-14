<?php
// 引入mysql文件
include('./mysql.php');
// 获取访问的方法
$fn = $_POST['fn'];
// add()  get() 
$fn();


// 获取数据的方法
function get(){
    $user = $_POST['user'];
    $pwd  =$_POST['pwd'];
    $sql = "select * from zhanghu";

    $res = select($sql);
    print_r(json_encode($res));
}
//查询用户名的方法
function sel(){
    $user = $_POST['user'];
    $sql1 = "select * from zhanghu where user='$user'";
    $res1 = select($sql1);
    print_r(json_encode($res1));
}



?>