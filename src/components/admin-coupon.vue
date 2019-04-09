<template>
<div>
    <div class="vld-parent">
        <loading :active.sync="isLoading" ></loading>
    </div>
    <div class="table-responsive mt-4">
        <div class="text-right">
            <button class="btn btn-primary" @click="openModal">ADD</button>
        </div>
        <table class="table table-striped table-sm mt-1">
            <thead>
                <tr>
                    <th class="pl-4">TITLE</th>
                    <th>PERCENT</th>
                    <th>DATE</th>
                    <th>CODE</th>
                    <th>ENABLE</th>
                    <th width="150" class="text-center">EDIT</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in coupons"  :key="item.id">
                    <td class="pl-3">{{ item.title }}</td>
                    <td>{{ item.percent }}</td>
                    <td>{{ item.due_date | dateFilter }}</td>
                    <td>{{ item.code }}</td>
                    <td>
                        <span class="text-success" v-if="item.is_enabled">enable</span>
                        <span class="text-danger" v-else>unable</span>
                    </td>
                    <td class="pr-3">
                        <button class="btn btn-outline-primary" @click="editCoupon(item)">edit</button>
                        <button class="btn btn-outline-danger" @click="openDelModal(item)">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination 
        :pagination="pagination" @getInform="getCoupons"/>
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title"
                                    v-model="tempCoupon.title" 
                                    placeholder="請輸入標題">
                                </div>
                                <div class="form-group">
                                    <label for="title">代碼</label>
                                    <input type="text" class="form-control" id="code" name="code"
                                    v-model="tempCoupon.code" v-validate="'required'"
                                    placeholder="請輸入代碼">
                                    <span class="text-danger" v-if="errors.has('code')">代碼欄位不得留空</span>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">折扣趴數</label>
                                        <input type="number" class="form-control" id="percent" name="percent"
                                        v-model="tempCoupon.percent" v-validate="'required|max_value:100|min_value:1'"
                                        placeholder="請輸入折扣趴數 1 - 100">
                                        <span class="text-danger" v-if="errors.has('percent')">請輸入正確的折扣</span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">期限</label>
                                        <input type="date" class="form-control" id="date" name="date"
                                        v-model="tempCoupon.due_date" v-validate="'required'"
                                        placeholder="請輸入期限">
                                        <span class="text-danger" v-if="errors.has('date')">請請輸入期限</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="is_enabled"
                                        :true-value="1" :false-value="0"
                                        v-model="tempCoupon.is_enabled">
                                        <label class="form-check-label" for="is_enabled">
                                        是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="cancelModal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>刪除優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="cancelModal">取消</button>
                        <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Pagination from '@/components/pagination';

import $ from 'jquery';

export default {
    data() {
        return {
            isLoading: false,
            updateLoading: false,
            coupons: [],
            tempCoupon: {},
            pagination: [],
        }
    },
    methods:{
        getCoupons(page= 1) {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
            vm.isLoading= true;
            this.$http.get(api).then((response) => {
                vm.coupons= response.data.coupons;
                vm.pagination= response.data.pagination;
                vm.isLoading= false;
            });
        },
        updateCoupon() {
            const vm= this;
            let httpMethod= 'post';
            let api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            let method= '新增';
            let tempCoupon= vm.tempCoupon;
            vm.getTimeStamp();
            if(tempCoupon.new){
                httpMethod= 'put';
                api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${tempCoupon.id}`;
                method= '修改';
                delete tempCoupon.new;
            };
            this.$validator.validate().then((result) => {
                if(result){
                    this.$http[httpMethod](api, { data: tempCoupon }).then((response) => {
                        if(response.data.success==true){
                            $('#couponModal').modal('hide');
                            this.$bus.$emit('message:push', `${method}成功`, 'success');
                            vm.getCoupons();
                        }else{
                            this.$bus.$emit('message:push', `${method}失敗`, 'danger');
                        }
                    })
                }
            });

        },
        delCoupon() {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
            this.$http.delete(api).then((response) => {
                if(response.data.success){
                    $('#delCouponModal').modal('hide');
                    this.$bus.$emit('message:push', `刪除成功`, 'success');
                    vm.getCoupons();
                }else{
                    this.$bus.$emit('message:push', `刪除失敗`, 'danger');
                }
            })
        },
        openModal(item) {
            this.tempCoupon= {};
            $('#couponModal').modal('show');
        },
        openDelModal(item) {
            this.tempCoupon= Object.assign({}, item);
            $('#delCouponModal').modal('show');
        },
        editCoupon(item) {
            this.tempCoupon= Object.assign({}, item);
            this.getDate(this.tempCoupon.due_date);
            this.tempCoupon.new= true;
            $('#couponModal').modal('show');
        },
        cancelModal() {
            $('#couponModal').modal('hide');
            $('#delCouponModal').modal('hide');
        },
        getTimeStamp() {
            const timeStamp= new Date(this.tempCoupon.due_date).getTime();
            this.tempCoupon.due_date= (timeStamp / 1000);
        },
        getDate(num) {
            num= num*1000;
            const date = new Date(Number(num));
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            let dateString = Y + M + D ;
            this.tempCoupon.due_date= dateString;
        },
    },
    created() {
        this.getCoupons();
    },
    components:{
        Pagination,
    },
}

</script>

<style scoped>
td{
    vertical-align: middle
}
.btn{
    line-height: 1
}
.icon-img{
    max-height: 60px;
}
</style>