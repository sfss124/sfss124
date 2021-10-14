//返回顶部事件
let backObj = document.querySelector('.back');
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
    //加载更多
let moreObj = document.getElementById('more');
let rtObj = document.querySelector('.rt');
let cc = rtObj.innerHTML;
console.log(cc);
console.log(moreObj);

//点击事件
moreObj.onclick = more;

function more() {
    // console.log(1);
    moreObj = document.getElementById('more');

    moreObj.remove();

    cc = rtObj.innerHTML;
    // let html = '';
    cc += `<div class="tt">
    </div>
    <div class="pd">
        <a href="./detail.html?id=3;name=manShoe1;src=./images/shoe1.jpg;price=288">
            <div class="pic">
                <img src="./images/shoe1.jpg" alt="">
            </div>
            <div class="bb">
                <p>男子潮流文化鞋 DB030161</p>
                <p style="color: red;">¥288</p>
            </div>
        </a>
    </div>
    <div class="pd">
        <a href="./detail.html?id=4;name=manShoe2;src=./images/shoe2.jpg;price=388">

            <div class="pic">
                <img src="./images/shoe2.jpg" alt="">
            </div>
            <div class="bb">
                <p>男子潮流文化鞋 DB030161</p>
                <p style="color: red;">¥388</p>
            </div>
        </a>
    </div>
    <div class="pd">
        <a href="./detail.html?id=5;name=manShoe3;src=./images/shoe3.jpg;price=488">

            <div class="pic">
                <img src="./images/shoe3.jpg" alt="">
            </div>
            <div class="bb">
                <p>男子潮流文化鞋 DB030161</p>
                <p style="color: red;">¥488</p>
            </div>
        </a>
    </div>
    <div class="pd">
        <a href="./detail.html?id=6;name=manShoe4;src=./images/shoe4.jpg;price=399">

            <div class="pic">
                <img src="./images/shoe4.jpg" alt="">
            </div>
            <div class="bb">
                <p>男子潮流文化鞋 DB030161</p>
                <p style="color: red;">¥399</p>
            </div>
        </a>
    </div>
    <div class="pd">
        <a href="./detail.html?id=7;name=manShoe5;src=./images/shoe5.jpg;price=1288">

            <div class="pic">
                <img src="./images/shoe5.jpg" alt="">
            </div>
            <div class="bb">
                <p>男子潮流文化鞋 DB030161</p>
                <p style="color: red;">¥1288</p>
            </div>
        </a>
    </div>
    <div class="pd">
        <a href="./detail.html?id=8;name=manShoe6;src=./images/shoe6.jpg;price=288">

            <div class="pic">
                <img src="./images/shoe6.jpg" alt="">
            </div>
            <div class="bb">
                <p>男子潮流文化鞋 DB030161</p>
                <p style="color: red;">¥288</p>
            </div>
        </a>
    </div>
    <div class="pd">
        <a href="./detail.html?id=9;name=manShoe7;src=./images/shoe7.jpg;price=2898">

            <div class="pic">
                <img src="./images/shoe7.jpg" alt="">
            </div>
            <div class="bb">
                <p>男子潮流文化鞋 DB030161</p>
                <p style="color: red;">¥2898</p>
            </div>
        </a>
    </div>
    <div class="pd">
        <a href="./detail.html?id=10;name=manShoe8;src=./images/shoe8.jpg;price=5288">

            <div class="pic">
                <img src="./images/shoe8.jpg" alt="">
            </div>
            <div class="bb">
                <p>男子潮流文化鞋 DB030161</p>
                <p style="color: red;">¥5288</p>
            </div>
        </a>
    </div>
    <span id="more" style="padding-top: 30px;height: 20px;margin-left: 350px;padding-bottom: 30px; cursor: pointer;"onclick=more();>+加载更多</span>
`
    rtObj.innerHTML = cc;
    enter();

}


function enter() {
    //鼠标移入产生边框
    let pd = document.querySelectorAll('.pd');
    // console.log(pd);
    pd.forEach(function(v) {
        // console.log(v);
        v.onmouseenter = function() {
            v.classList.add('pd1');
        }
        v.onmouseleave = function() {
            v.classList.remove('pd1');
        }
    })
}
enter();
//鼠标点击产生黑色背景

let liObj = document.querySelectorAll('#content li');
// console.log(liObj);
liObj.forEach(function(v, k) {
    // console.log(v);
    liObj[k].id = '0';
    liObj[k].onclick = function() {
        liObj.forEach(function(v, k) {
            liObj[k].id = 0;

            liObj[k].classList.remove('c1');
        })
        liObj[k].id++;
        if (liObj[k].id == 1) {
            liObj[k].className = 'c1';
            // liObj[k].style.background = 'url(./images/jiantou.png)';
        } else {
            liObj[k].classList.remove('c1');
        }
    }
})