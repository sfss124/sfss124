let user = document.getElementById('username');
let password = document.getElementById('pwd');
let btn = document.getElementById('btn');
//1.用户名   用户名仅支持中文、字母、数字、“-”“_”的组合，4-20个字符
//2.密码的规则    数字字母特殊字符，一种类型，弱。两种类型为中，三种类型为强,6-20个字符
//用户名的正则
var reg = /^([\u4e00-\u9fa5\-]|\w){3,20}$/;
//密码的正则
var reg1 = /^(\w|[^\w]){3,20}$/;
var a;
var b;
// 用户名验证
user.onblur = function() {
        if (reg.test(user.value)) {
            user.nextElementSibling.innerHTML = '正确';
            a = true;
        } else {
            user.nextElementSibling.innerHTML = '格式有误';
            a = false;
        }
    }
    //密码验证
password.onblur = function() {
        if (reg1.test(password.value)) {
            var temp = 0;
            var re = /\d+/;
            var re1 = /[a-z]+/i;
            var re2 = /[^\da-z]+/;
            if (re.test(password.value)) {
                temp++;
            } else {
                temp = temp;
            }
            if (re1.test(password.value)) {
                temp++;
            } else {
                temp = temp;
            }
            if (re2.test(password.value)) {
                temp++;
            } else {
                temp = temp;
            }
            if (temp == 3) {
                password.nextElementSibling.innerHTML = '正确';
            } else if (temp == 2) {
                password.nextElementSibling.innerHTML = '正确';
            } else if (temp == 1) {
                password.nextElementSibling.innerHTML = '正确';

            }
            b = true;

        } else {
            pwd.nextElementSibling.innerHTML = '格式有误';
            b = false;
        }

    }
    //给登录点击绑定事件
btn.onclick = function() {

    var username = user.value;
    // console.log(username);
    var pwd = password.value;
    // console.log(username, pwd);

    console.log(username, pwd);
    // 提示
    if (!username) {
        layer.msg('用户名为空,请重新输入')
        return;
    };
    if (!pwd) {
        layer.msg('密码为空,请重新输入')
        return;
    };
    if (a && b) {
        //判断用户名是否存在
        $.post('./php/login.php', {
                fn: 'sel',
                'user': username,
            }, function(data) {
                data = JSON.parse(data);
                // console.log(data.length);
                if (data.length != 0) {
                    $.post('./php/login.php', {
                        fn: 'sel',
                        'user': username,
                    }, function(datas) {
                        datas = JSON.parse(datas);
                        console.log(datas);
                        // let arr =datas.map
                        console.log(datas[0].pwd);
                        console.log(datas.length);
                        if (datas[0].pwd == pwd) {
                            layer.msg('登陆成功');
                            setTimeout(function() {
                                self.location = '/00peak/inde.html';

                            }, 1000)
                        } else {
                            layer.msg('密码错误，请重新输入')
                        }
                    })
                } else {
                    layer.msg('用户名不存在，请重新输入')
                }
            })
            // layer.msg('登陆成功');
    } else {
        layer.msg('登陆失败');
        // return;
    }


}