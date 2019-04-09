<template>
    <div class="showcase" :style="options.styles">
        <div>
            <span>{{ options.subtitle }}</span>
            <h3 class="mt-1">{{ options.title }}</h3>
            <p class="mt-2">{{ options.content }}</p>
            <button type="button" class="btn btn-dark mt-2" @click="directTo(options.direction)">前往</button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        options: {
            title: '',
            subtitle: '',
            content: '',
            direction: '',
            styles: {
                backgroundImage: '',
                height: '',
                width: '',
                color: '',
            },
        }
    },
    methods: {
        directTo(path) {
            this.$router.push(path)
        },
    }
}
</script>

<style scoped>
.showcase {
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center center;
    text-align: center;
    display: block;
    height: 300px;
    width: 100%;
}
.showcase div{
    display: inline-block;
    vertical-align: middle;
}
.showcase::before{
    content: '';
    width: 0;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}
h3 {
    font-weight: 1000;
    font-size: 30px;
}
</style>