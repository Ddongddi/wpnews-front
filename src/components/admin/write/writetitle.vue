<template>
    <div class="container-fluid my-3">
        <h1>기사 등록</h1>
    </div>
</template>

<style scoped>
.container-fluid {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-fluid > h1::after {
    display: block;
    content: '';
    background-color: rgba(221, 27, 118, .6);
    width: 100%;
    height: 6px;
    border-radius: 5px;
}
</style>