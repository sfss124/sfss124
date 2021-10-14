//用户名的正则
var reg = /^([\u4e00-\u9fa5\-]|\w){3,20}$/;
//密码的正则
var reg1 = /^(\w|[^\w]){3,20}$/;
var a;
var b;
// console.log(1);
// console.log($('#user'));
$('#username').blur(function() {
    let user = document.getElementById('username');
    // console.log(1);
    if (reg.test(user.value)) {
        user.nextElementSibling.innerHTML = '正确';
        a = true;
    } else {
        user.nextElementSibling.innerHTML = '格式有误';
        a = false;
    }
});
$('#pwd').blur(function() {
        console.log(1);
        let password = document.getElementById('pwd');
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
                password.nextElementSibling.innerHTML = '强';
            } else if (temp == 2) {
                password.nextElementSibling.innerHTML = '中';
            } else if (temp == 1) {
                password.nextElementSibling.innerHTML = '弱';

            }
            b = true;

        } else {
            pwd.nextElementSibling.innerHTML = '格式有误';
            b = false;
        }

    })
    //注册点击事件
$(':button').click(function() {
    //用户名
    let user = document.querySelector('#username').value;
    //密码
    let pwd = document.querySelector('#pwd').value;
    // 提示
    if (!user) {
        layer.msg('用户名为空,请重新输入')
        return;
    };
    if (!pwd) {
        layer.msg('密码为空,请重新输入')
        return;
    };
    if (a && b) {
        //判断用户名是否存在
        $.post('./php/register.php', {
            fn: 'sel',
            'user': user,
        }, function(data) {
            data = JSON.parse(data); //转化数据
            // console.log(data.length);

            if (data.length != 0) { //存在用户名
                layer.msg('用户名已经存在，请重新命名！')
                    // return;
            } else {
                console.log(user);
                console.log(pwd);
                //创建用户信息
                $.post('php/register.php', {
                    fn: 'add',
                    user,
                    pwd
                }).then(data => {
                    if (data) {
                        layer.msg('注册成功')
                        setTimeout(function() {
                                self.location = '/00peak/login.html';

                            }, 1000)
                            // location.reload()
                            // self.location = '/00peak/login.html';
                        console.log(data);
                    }
                });
            }
        });
    } else {
        layer.msg('注册失败');
        // return;
    }

});