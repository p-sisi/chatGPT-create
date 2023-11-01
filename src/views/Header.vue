<template>
    <div class="header-container">
        <div class="header-container-title">
            面向对象课程学习助手
        </div>
        <div class="header-container-desc">
            <img src="/src/assets/image/cover.jpg" alt="">
            <div class="description">
                <div class="description-title">基于ChatGPT</div>
                <div class="description-tit">面向对象课程体系</div>
                <div class="description-desc">超越传统学习，探索未来编程！借助我们的ChatGPT辅助工具，面向对象编程变得如此轻松。探索编程的无限可能性，与ChatGPT一起掌握OOP世界。</div>
                <el-button type="primary" color="#4840ba" size="large">提问ChatGPT</el-button>
            </div>
        </div>
        <div class="header-container-divi">Question&nbsp;&&nbsp;Answer</div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.header-container {
    .header-container-title {
        padding: 26px 26px 0px 26px;
        font-size: 34px;
        font-weight: bold;
        color: #220a58;
    }
    .header-container-desc {
        display: flex;
        flex-direction: row;
        padding: 26px;
        img {
            width: 650px;
        }
        .description {
            flex: 1;
            margin-left: 30px;
            color: #351c75;
            .description-title {
                font-size: 50px;
                font-weight: 600;
            }
            .description-tit {
                font-size: 45px;
            }
            .el-button {
                margin-top: 30px;
            }
        }
    }
    .header-container-divi {
        height: 50px;
        width: 100%;
        color: #e69138;
        font-size: 34px;
        font-weight: 600;
        background-color: #351c75;
        margin-top: 30px;
        padding-left: 26px;
    }
}
</style>