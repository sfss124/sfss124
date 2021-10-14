// 轮播 
// 1 获取节点
let ulObj = document.querySelector('#banner ul')
let ulLisObj = ulObj.children;
let olObj = document.querySelector('#banner ol')
let scObj = $('.screen');
let imgW = scObj.offsetWidth; // 图片宽度
// 左右箭头获取
let arrObj = document.querySelector('#arr');
let leftObj = document.querySelector(' #arr #left');
let rightObj = document.querySelector(' #arr #right');
let backObj = document.querySelector('.back');

//返回顶部事件
var times;
window.onscroll = function() {
    var top1 = document.documentElement.scrollTop || document.body.scrollTop;
    if (top1 > 800) backObj.style.display = 'block'
    if (top1 < 800) backObj.style.display = 'none'

}
var times;
backObj.onclick = function() {
    var top1 = document.documentElement.scrollTop || document.body.scrollTop;
    if (top1 > 800) {
        times = setInterval(function() {
            if (top1 > 0) {
                top1 -= 100;
                document.documentElement.scrollTop = top1;

            } else {
                clearInterval(times);

            }
        }, 20)

    } else {
        backObj.style.display = 'none';

    }
}
console.log(imgW);
let index = 0;
let timess = '';
arrObj.style.display = 'block';
// 2创建li,追加到ol中
for (let i = 0; i < ulLisObj.length; i++) {
    let newLiobj = document.createElement('li');
    newLiobj.innerHTML = i + 1;
    olObj.appendChild(newLiobj);
    // 2-1 设置第一个下标选中
    i == 0 && newLiobj.classList.add('current');

    // 3 给li绑定点击事件
    newLiobj.onclick = liClickFn;
}
/********序列号回调函数********/
function liClickFn() {
    // console.log(this);
    // 1 获取当前图片序列号
    index = this.innerHTML - 1;
    // console.log(index);
    // 2 计算ul的left值,
    let tmpUlLeft = imgW * index;
    // ulObj.style.left = -tmpUlLeft + 'px';
    move(ulObj, {
        left: -tmpUlLeft
    })

    // 选中序列号
    sel();
}
// 获取ol的子节点
let olLisObj = olObj.children;
/*******选中序列号*****/
function sel() {
    // 1 当前选中的取消
    $('.current').classList.remove('current');
    // 2 选中刚刚点击的
    olLisObj[index].classList.add('current');
    // console.log(olLisObj[index]);

}

/******鼠标移入box中显示箭头,不能绑定到screen****/
scObj.parentNode.onmouseover = function() {
    arrObj.style.display = 'block';
    // 清除定时器
    clearInterval(timess)
}
scObj.parentNode.onmouseout = function() {
        arrObj.style.display = 'none';
        auto();
    }
    // 克隆第一张图片
let cloneImg = ulLisObj[0].cloneNode(true);
// console.log(cloneImg);
cloneImg.style.borderTop = '1px solid red';

// 追加到ul最后
ulObj.appendChild(cloneImg)


/******右箭头,下一张****/
rightObj.onclick = function() {
        // 1-1 判断index值是否为最大索引
        let target = '';
        let status = false;
        // index 最大值为4,只有5张图片,克隆的不能算
        if (index == olLisObj.length - 1) {
            index++; // 让克隆的一张显示出来
            target = imgW * index;
            index = 0; // 计算目标之后,归零
            status = true; //  将ul的left设置为0的,状态值

            // console.log(index, status);
        } else {
            // 1 index值增加
            index++;
            target = imgW * index;
        }
        // 2 计算left值

        move(ulObj, {
            left: -target
        }, function() {
            status && (ulObj.style.left = '0px');
        })

        // 3 选中序列号
        sel();
    }
    /******上一张 left*****/
leftObj.onclick = function() {
    index--;

    if (index == -1) {
        // 设置克隆的第一张显示出来
        ulObj.style.left = -olLisObj.length * imgW + 'px';
        // 给index最大索引值
        index = olLisObj.length - 1;
    }
    let target = imgW * index;
    move(ulObj, {
        left: -target
    }, function() {
        status && (ulObj.style.left = '0px');
    });
    sel();
}

/*****定时器,自动轮播******/
function auto() {
    timess = setInterval(() => {
        rightObj.onclick();
    }, 3000)
}
auto();
/****节点的获取*****/
function $(tag) {
    return document.querySelector(tag)
}
var times = '';

function move(ele, target, cb) {
    clearInterval(times);
    times = setInterval(function() {
        var onOff = true;
        // 遍历运动的方向和目标
        for (let attr in target) {
            // attr 表示运动的属性
            // console.log(attr);
            // 获取元素属性的实时值
            let tmpVal = parseInt(getPos(ele, attr))
                // 计算speed
                // console.log(tmpVal, attr);
            let speed = (target[attr] - tmpVal) / 10;
            // 取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 停止计时器,当一个属性运动到位置,设置开关状态
            if (tmpVal == target[attr]) onOff = true;
            // 让元素动起来
            ele.style[attr] = tmpVal + speed + 'px';
        }
        // 判断开关状态,清除定时器
        for (var moveAttr in target) {
            // 如果不相等,就说明有属性没有运动到位置,定时器不能停止
            if (target[moveAttr] !== parseInt(getPos(ele, moveAttr))) {
                onOff = false;
                break;
            }
        }
        if (onOff) {
            clearInterval(times);
            cb && cb();
        }
        // console.log(1111);
    }, 30)
}
// 获取元素的实时位置的函数
function getPos(obj, attr) {
    if (obj.currentStyle) { // 获取css的样式
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj)[attr]
    }
}
//输入框提示
var app = document.querySelector('#app');
var ullObj = document.querySelector('.holder ul');
var lilObj = document.querySelectorAll('.holder li');
console.log(app, ullObj, lilObj);
app.onfocus = function() {
    ullObj.style.display = 'block';
    // ullObj.style.border = 'none';
}
app.onblur = function() {
    ullObj.style.display = 'none'
}
var num = 0;
Array.from(lilObj).forEach(function(v, k) {
        lilObj[k].num = k;
        lilObj[k].onmouseover = function() {
            num = lilObj[k].num;
            select();
        }

    })
    //键盘的上下
app.onkeydown = function(event) {
    if (event.keyCode == 38) {
        if (num == 0) {
            num = lilObj.length - 1;
        } else {
            num--
        }
        select();
    }
    if (event.keyCode == 40) {
        if (num == lilObj.length - 1) {
            num = 0;
        } else {
            num++
        }
        select();
    }
}

function select() {
    for (var i = 0; i < lilObj.length; i++) {
        lilObj[i].style.background = '';
    }
    lilObj[num].style.background = '#f5f5f5';

    app.value = lilObj[num].innerHTML;
}