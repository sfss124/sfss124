//放大镜
let bigObj = document.getElementById('big');
let smallObj = document.getElementById('small');
let maskObj = document.getElementById('mask');
let boxObj = document.getElementById('box');
let imgObj = document.getElementById('i2');
//绑定事件
//移入事件
smallObj.onmouseenter = function() {
        maskObj.style.display = 'block';
        bigObj.style.display = 'block';
    }
    //移出
smallObj.onmouseleave = function() {
        maskObj.style.display = 'none';
        bigObj.style.display = 'none';
    }
    //移动事件
smallObj.onmousemove = function(event) {
    //小黄块的移动
    // 1 获取鼠标的实时位置
    let pt = event.pageY;
    let pl = event.pageX;
    // console.log(pt, pl);
    //2.获取box的坐标
    let boxT = boxObj.offsetTop;
    let boxL = boxObj.offsetLeft;
    // console.log(boxT, boxL);
    //3.小黄块的位置
    let tmpT = pt - boxT - maskObj.offsetHeight / 2 - 50;
    // console.log(tmpT);
    let tmpL = pl - boxL - maskObj.offsetWidth / 2 - 180;

    let diffT = smallObj.offsetHeight - maskObj.offsetHeight;
    let diffL = smallObj.offsetWidth - maskObj.offsetWidth;
    // console.log(diffT, diffL);
    //设置左边和上边的边界值
    if (tmpT < 0) tmpT = 0;
    if (tmpL < 0) tmpL = 0;
    //设置右边和下边的边界值
    if (tmpT > diffT - maskObj.offsetHeight / 2) tmpT = diffT - maskObj.offsetHeight / 2;
    if (tmpL > diffL - maskObj.offsetWidth / 2) tmpL = diffL - maskObj.offsetWidth / 2;

    maskObj.style.left = tmpL + 'px';
    maskObj.style.top = tmpT + 'px';


    // 计算大图在div中,移动的最大位置
    let bigT = bigObj.offsetWidth - imgObj.offsetWidth;
    let bigL = bigObj.offsetHeight - imgObj.offsetHeight;
    // 计算大图的实时位置
    let tmpBigT = tmpT / (diffT - maskObj.offsetHeight / 2) * bigT;
    let tmpBigL = tmpL / (diffT - maskObj.offsetWidth / 2) * bigL;
    // 实时位置设置给大图
    imgObj.style.left = tmpBigL + 'px';
    imgObj.style.top = tmpBigT + 'px';
}

//倒计时
setInterval(function() {
    var box1 = document.getElementById('time');
    var h = document.getElementById('h');
    var m = document.getElementById('m');
    var sec = document.getElementById('s');
    var num = document.getElementById('num');
    var date = new Date();
    var h1 = date.getHours();
    if (h1 % 2 == 0) {
        h1 = 1;
    } else {
        h1 = 0;
    }
    var m1 = date.getMinutes();
    var sec1 = date.getSeconds();
    h = h1;
    m = 60 - m1 - 1;
    sec = 60 - sec1 - 1;
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    sec = sec < 10 ? '0' + sec : sec
    time.innerHTML = h + ':' + m + ':' + sec;
    var num1 = date.getHours();
    if (num1 % 2 == 0) {
        num1 = num1;
    } else {
        num1 = num1 - 1;
    }
    num.innerHTML = num1 + ':' + 0 + 0 + '点场，距结束';
}, 1000)

//选择颜色的事件
let color = document.querySelectorAll('.choose1 span');
// console.log(color);
color.forEach(function(v, k) {
        // console.log(v);
        // console.log(k);
        color[k].id = '0';

        color[k].onclick = function() {
            // color[k].parentNode.childNodes.id = '0';
            // console.log(color[k].parentNode.childNodes);
            color.forEach(function(v, k) {
                color[k].id = 0;
                color[k].classList.remove('c1');
            })
            color[k].id++;
            if (color[k].id == 1) {
                color[k].className = 'c1';
                // console.log(v.id);
            } else if (color[k].id == 0) {
                color[k].classList.remove('c1');
            }
        }
    })
    //选择尺码大小的事件
let size = document.querySelectorAll('.choose2 span');
// console.log(size);
size.forEach(function(v, k) {
        // console.log(v);
        // console.log(k);
        size[k].id = '0';
        size[k].onclick = function() {
            // color[k].parentNode.childNodes.id = '0';
            // console.log(color[k].parentNode.childNodes);
            size.forEach(function(v, k) {
                size[k].id = 0;
                size[k].classList.remove('c2');
            })
            size[k].id++;
            if (size[k].id == 1) {
                size[k].className = 'c2';
                // console.log(v.id);
            } else if (size[k].id == 0) {
                size[k].classList.remove('c2');
            }
        }
    })
    //数量的增加和减少
let redObj = document.querySelector('.choose3 .l2');
let addObj = document.querySelector('.choose3 .r2');
let numObj = document.querySelector('.choose3 input');
console.log(addObj, redObj);
//绑定点击事件
addObj.onclick = function() {
    // console.log(numObj.innerHTML);
    numObj.value++;
    console.log(numObj.value);
}
redObj.onclick = function() {
        numObj.value--;
        if (numObj.value < 2) {
            numObj.value = 1;
        }
    }
    //小轮播的点击事件
let cyclelObj = document.querySelector('.cyclel');
let cyclerObj = document.querySelector('.cycler');
let ulllObj = document.querySelector('.items ul');
let lillObj = document.querySelectorAll('.items li');
let aaa = document.getElementById('aaa');
// console.log(aaa);
// let lillI = document.querySelectorAll('.items  img');
// console.log(lillI);
let wdd = 0;
let lilen = lillObj.length - 3;
// let abc = ulllObj.style.left;
// let usl = ulllObj.style.left;

//移入的时候显示移入的图片
let ic = document.querySelectorAll('.i3');
ulllObj.onmouseover = function(e) {

    Array.from(lillObj).forEach(function(v) {
        v.classList.remove('moved');
    });
    if (e.target.nodeName.toLowerCase() == 'img') {
        e.target.parentNode.classList.add('moved');
        let nI = e.target.src;
        ic.forEach(function(v) {
            v.src = nI;
        })

    }
}

// lillObj.forEach(function(v, k) {
//     console.log(v);
//     v.onmouseenter = function(eve) {
//         v.style.border = '1px solid red';
//         // console.log(v.children);
//         // console.log(eve.target.children);
//         // console.log(v.className);
//         // v.children.className = 'i3';
//         // v.className
//     }
//     v.onmouseleave = function() {
//         v.style.border = 'none';
//     }
// })

//点击左键
cyclelObj.onclick = function() {
    if (wdd == 0) {
        ulllObj.style.left == 0 + 'px';
        wdd = 99;
    }
    wdd -= 99
    console.log(wdd);
    ulllObj.style.left = -wdd + 'px';


}

//点击右键
cyclerObj.onclick = function() {
    if (wdd == lilen * 99) {
        ulllObj.style.left = -wdd + 'px';
        return;
    }
    wdd += 99;

    ulllObj.style.left = -wdd + 'px';

    console.log(wdd);



}



//获取页面数据
let name = document.querySelector('.r1 p').innerHTML;
// console.log(username);
// username = username.innerHTML;
// console.log(name);
let price = document.querySelector('.price').innerHTML;
// console.log(price);
let src = document.querySelector('#small img').src;
// console.log(src);
let num = document.querySelector('.choose3 input').value;
// console.log(num);
let cartObj = document.querySelector('.button-add');
// console.log(cartObj);
let colorObj = document.querySelector('.choose1 .c1').innerHTML;
let leObj = document.querySelector('.choose2 .c2').innerHTML;
// console.log(foot);
let id = document.querySelector('.main1');
id = id.id;
console.log(id);

cartObj.onclick = function() {
    num = document.querySelector('.choose3 input').value;
    colorObj = document.querySelector('.choose1 .c1').innerHTML;
    leObj = document.querySelector('.choose2 .c2').innerHTML;
    addCart(id, name, src, price, num, colorObj, leObj);
    //获取localstorge长度
    let con = localStorage.getItem('cart');
    con = JSON.parse(con);
    console.log(con);
    console.log(con.length);
    let carrr = document.getElementById('carrr');
    console.log(carrr);
    let html = '';
    // console.log(v.parentNode);
    // console.log(v);
    html += `<span style="color:black"><span>(</span>${con.length}<span>)</span></span>`
    carrr.innerHTML = html;
}

function addCart(id, name, src, price, num, colorObj, leObj) {
    //1 获取购物车数据
    let cartGoods = localStorage.getItem('cart')

    // 2 判断购物车是否为空
    if (cartGoods) { // 3 不为空
        cartGoods = JSON.parse(cartGoods);
        // console.log(cartGoods);
        // 3-1 判断商品是否存在
        let exists = false;
        cartGoods.forEach(v => {
                // console.log(v);
                if (v.id == id && v.colorObj == colorObj && v.leObj == leObj) {
                    // 存在则增加数量
                    // num += v.num;
                    v.num = v.num - 0 + (num - 0)
                    exists = true;
                }
            })
            // console.log(cartGoods);
            // 4-1不存在则添加商品数据
        if (!exists) {
            cartGoods.push({ id, name, src, price, num, colorObj, leObj })
        }
        // 5 存入local
        localStorage.setItem('cart', JSON.stringify(cartGoods))
    } else { // 4 为空
        // 4-1 以数组的形式保存         {id:1,name:''}  [id,name,src]

        let tmpGoods = { id, name, src, price, num, colorObj, leObj };
        let goodsArr = [tmpGoods];

        // console.log(JSON.stringify(goodsArr));
        localStorage.setItem('cart', JSON.stringify(goodsArr))
    }
}

// 获取localstorage的长度 用于显示购物里面的商品种类
let con = localStorage.getItem('cart');
con = JSON.parse(con);
// console.log(con);
// console.log(con.length);
let carrr = document.getElementById('carrr');
console.log(carrr);
let html = '';
// console.log(v.parentNode);
// console.log(v);

if (!con) html += `<span style="color:black">(0)</span>`

else html += `<span style="color:black"><span>(</span>${con.length}<span>)</span></span>`
carrr.innerHTML = html;

//当鼠标移入购物车按钮的时候，显示已添加的购物车商品列表
let shopObj = document.getElementById('shop');
let carObj = document.querySelector('.car');
// console.log(shopObj);
// console.log(carObj);
shopObj.onmouseenter = function() {
    console.log(1);
    //当购物车列表为0时，显示为空
    let con = localStorage.getItem('cart');
    con = JSON.parse(con);
    // console.log(con);
    console.log(carObj);
    let contentss = '';
    if (!con) {
        contentss += `<div class="boxx">购物车为空，请添加商品</div>`

    }
    carObj.innerHTML = contentss;
    carObj.style.display = 'block';
    console.log(carObj);
    // console.log(name);
    let carts = localStorage.getItem('cart');
    let contents = '';
    carts = JSON.parse(carts);
    // console.log(carts);
    carts.forEach(v => {
        contents += `<div class="boxx">
        <div class="ll" style=""><img src="${v.src}" alt="">
            <p>${v.name}</p>
            <div class="guige">
                <p>${v.colorObj}</p>
                <p>${v.leObj}<span>码</span></p>
            </div>
            <div class="pn">  <p><span>数量:</span>${v.num}</p>
            <p><span>￥</span>${v.price*v.num}</p></div>
        </div>
    </div>`
    })

    carObj.innerHTML = contents;


}
shopObj.onmouseout = function() {
    carObj.style.display = 'none';
    console.log(carObj);
}
carObj.onmouseover = function() {
        carObj.style.display = ' block';
    }
    // console.log(name, price);
carObj.onmouseleave = function() {
    this.style.display = 'none';
    console.log(carObj);
}