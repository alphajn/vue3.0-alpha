<template>
    <section>
        <ul class="flex-row">
            <li class="mr10">
                <el-button
                    type="primary"
                    plain
                    @click="$router.push('/demo/table/')"
                >
                    Table-Demo
                </el-button>
            </li>
        </ul>
    </section>
</template>
<style lang="scss" scoped>
section {
    margin: 10px;
}
</style>
