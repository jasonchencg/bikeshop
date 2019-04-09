<template>
<div class="banner" :style="`backgroundImage: url(${options.imageUrl})`">
    <div class="banner-content" :style="`color: ${options.color}`">
        <div class="banner-title">{{ options.title }}</div>
        <div class="banner-subtitle">{{ options.subtitle }}</div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        options: {
            imageUrl: '',
            title: '',
            subtitle: '',
            color: ''
        },
    }
}
</script>

<style scoped>
.banner {
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center center;
    height: 400px;
    width: 100%;
}
.banner-content {
    margin-left: 100px;
    display:inline-block;
    vertical-align:middle;
}
.banner::before {
    content: '';
    width: 0;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}
.banner-title {
    font-size: 45px
}
.banner-subtitle {
    font-size: 30px
}
</style>