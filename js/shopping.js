class sc {
    constructor() {
        //获取购物车数据
        this.getGoods();
        //获取全选按钮的节点
        this.acheck = document.querySelectorAll('#choose-a-btn');
        //单选按钮的节点
        this.ocheck = document.querySelectorAll('#choose-o-btn');
        // console.log(this.ocheck);
        this.ocFn(); //单个按钮的方法
        //给全选按钮绑定事件

        this.acheck[0].addEventListener('click', this.allFn.bind(this, 1));
        this.acheck[1].addEventListener('click', this.allFn.bind(this, 0));

        //+-的冒泡
        this.$('tbody').addEventListener('click', this.tbFn.bind(this));
        // this.addObj = document.querySelector('add');
        // this.addObj.addEventListener('click', this.addFn.bind(this));


    }
    tbFn(e) {
        if (e.target.className == 'add') {
            this.addFn(e.target);
        }
        if (e.target.className == 'reduce') {
            this.reduceFn(e.target)
        }
        if (e.target.className == 'delete') {
            this.deleteFn(e.target)
        }
        // console.log(e.target);
    }

    //数量增加的方法
    addFn(eve) {
            console.log(eve);
            // 找到数字的节点
            let numObj = eve.previousElementSibling;
            // console.log(numObj);
            let num = numObj.value - 0 + 1;
            // console.log(num);
            //把增加的数字追加到页面的数字上
            numObj.value = num;
            //拿到价格
            let price = eve.parentNode.previousElementSibling.innerHTML;
            // console.log(price);
            eve.parentNode.nextElementSibling.innerHTML = price * num;
            //如果商品未选中,则不调用小计
            // tr的第一个子节点
            (eve.parentNode.parentNode.children)[0].firstElementChild.checked && this.totalNP();

            console.log(this.colorC);
            // 获取id
            let goodsId = eve.parentNode.parentNode.getAttribute('goods-id');
            this.newLocal(goodsId, num);
        }
        //数量减少的方法
    reduceFn(eve) {

            let numObj = eve.nextElementSibling;
            console.log(numObj);
            if (numObj.value >= 2) {
                var num = numObj.value - 1;
                numObj.value = num;
                console.log(num);
                let price = eve.parentNode.previousElementSibling.innerHTML;
                // console.log(price);
                eve.parentNode.nextElementSibling.innerHTML = price * num;
            }
            if (numObj.value == 1) {
                var num = 1;
                numObj.value = num;
                let price = eve.parentNode.previousElementSibling.innerHTML;
                // console.log(price);
                eve.parentNode.nextElementSibling.innerHTML = price * num;

            }

            //如果商品未选中,则不调用小计
            // tr的第一个子节点
            (eve.parentNode.parentNode.children)[0].firstElementChild.checked && this.totalNP();

            // 获取id
            let goodsId = eve.parentNode.parentNode.getAttribute('goods-id');
            this.newLocal(goodsId, num);
            console.log(num);
        }
        //更新local的数据
    newLocal(goodsId, num) {
        console.log(goodsId, num);
        let gd = localStorage.getItem('cart');
        console.log(gd);
        // 无数据则清空
        if (!gd) return;
        gd = JSON.parse(gd);
        gd.forEach((goods, index) => {
            if (goodsId == goods.id) {
                if (num) goods.num = num; // 修改数量
                else { // 删除当前商品
                    gd.splice(index, 1)
                }
            }
        });
        // console.log(gd);
        // console.log(gd);
        // 更新到local中
        localStorage.setItem('cart', JSON.stringify(gd))

    }

    //删除方法
    deleteFn(eve) {
        //获得tr标签
        let trObj = eve.parentNode.parentNode;
        // console.log(trObj);
        //获取到当前节点的id
        let id = trObj.getAttribute('goods-id');


        console.log(id);
        // console.log(trObj.getAttribute('goods-id'));
        let that = this;
        //询问框
        layer.confirm('您确定要删除吗？', {
            btn: ['确认', '取消'] //按钮
        }, function(tmp) {
            // console.log(trObj);
            layer.close(tmp);
            trObj.remove();
            if ((trObj.children)[0].firstElementChild.checked) {
                that.totalNP(document.querySelectorAll('.check-one'))
            }
            // 更新local中的数据
            that.newLocal(id);
            // location.reload();
            // console.log(totalNum, totalPrice);
        });
    }



    //给全选按钮的方法
    allFn(index, e) {
        // console.log(e.target);
        let getStatus = e.target.checked;
        // console.log(getStatus);
        //让单个按钮跟随全选按钮一起
        // console.log(this.ocheck);
        this.ocheck.forEach(data => {
            // console.log(data);
            data.checked = getStatus;
        });
        this.acheck[index].checked = getStatus;
        this.totalNP();
    }

    //给单个按钮的方法
    ocFn() {
        let that = this;
        let len = this.ocheck.length;
        this.ocheck.forEach(data => {
            // console.log(data.checked);
            data.onclick = function() {
                console.log(1);
                if (this.checked) {


                    let count = 0;
                    that.ocheck.forEach(data => {
                        data.checked && count++;
                        if (count == len) {
                            that.acheck[0].checked = true;
                            that.acheck[1].checked = true;
                        }
                    })
                } else {
                    that.acheck[0].checked = false;
                    that.acheck[1].checked = false;

                }
                that.totalNP();
            }
        })
    }

    //小计
    totalNP(oneObj = '') {
            // 删除的时候,重新获取check-one数据
            this.ocheck = oneObj || this.ocheck;
            // console.log(this.oneChec);
            let totalNum = 0;
            let totalPrice = 0;

            // 1 循环商品,找出选中的
            this.ocheck.forEach(goods => {
                if (goods.checked) { //如果被选中
                    let trObj = goods.parentNode.parentNode;
                    let tn = trObj.querySelector('.count-input').value - 0;
                    let tp = trObj.querySelector('.subtotal').innerHTML - 0;
                    console.log(tn, tp);
                    totalNum += tn;
                    totalPrice += tp;
                }
            })


            // 显示到总计
            this.$('#selectNum').innerHTML = totalNum;
            this.$('#priceTotal').innerHTML = totalPrice;
            console.log(totalNum, totalPrice);
            // console.log(this.$('#selectNum').innerHTML);
        }
        //获取数据
    getGoods() {
        let getCarts = localStorage.getItem('cart');
        // console.log(getCarts);
        let html = '';

        // console.log(JSON.parse(getCarts));
        //追加td
        JSON.parse(getCarts).forEach(v => {

            html += ` 
            <tr class="" goods-id=${v.id} style="height:100px;text-align: center; ">
                        <td class="choose-btn" style="text-align: center;">
                            <input type="checkbox" class="check-one check" id="choose-o-btn">
            
                        </td>
                        <td class="indent-product-name goods">
                            <img src="${v.src}" alt="" style="width: 50px;height: 50px; margin: 0 auto;">
                        </td>
                        <td class='goods'>
    ${v.name}	
                        </td>

                        <td class="indent-color-size">
                            <p class="indent-color">${v.colorObj}</p>
           <p class="indent-color">${v.leObj}</p>
                        </td>
          <td class="price" >                ${v.price}
                        </td>
               <td class="count">
               <span class="reduce">-</span>
               <input class="count-input indent-num" type="text" value="${v.num}" />
               <span class="add">+</span>
              
            </td>

        <td class="subtotal" style="width:100px;color:red;font-size:18px">
                 ${v.price * v.num}
       
                          
                        </td>
                        <td class="operation">
              <span class="delete">删除</span>
            </td>
                    </tr>`;
        });
        // 追加到tbody上
        this.$('tbody').innerHTML = html;
    }
    $(tag) {
        return document.querySelector(tag)
    }
}
new sc;