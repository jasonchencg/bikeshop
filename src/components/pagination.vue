<template>
<nav aria-label="Page navigation example" v-if="pagination.total_pages > 1">
    <ul class="pagination justify-content-center">
        <li class="page-item" 
        :class="{'disabled' : !pagination.has_pre}">
            <a class="page-link" href="#" tabindex="-1" 
            @click.prevent="changePage(pagination.current_page - 1)">Previous</a>
        </li>
        <li class="page-item" 
        v-for="(page, key) in pagination.total_pages" :key="key" :class="{'active': page==pagination.current_page}">
            <a class="page-link" href="#" 
            @click.prevent="changePage(page)">{{page}}</a></li>
        <li class="page-item" 
        :class="{'disabled' : !pagination.has_next}">
            <a class="page-link" href="#" 
            @click.prevent="changePage(pagination.current_page + 1)">Next</a>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    props:['pagination'],
    methods:{
        changePage(page) {
            this.$emit('getInform', page);
        },
    }
}
</script>