<template>
    <div class="wraper">
        <h3>二次封装element-Table</h3>
        <c-table
            border
            :data="table_data"
            :columns="columns"
        />
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import cTable from '@/components/Table';

export default {
    components: {
        cTable,
    },
    setup() {
        const data = reactive({
            table_data: [
                {
                    title: 'demo',
                    label: '132-label',
                },
                // {
                //     title: 'demo1',
                // },
            ],
            columns: [
                {
                    label: 'title',
                    prop: 'title',
                    render: ((h, { row }) => <span>{row.title}</span>),
                },
                // {
                //     label: 'label',
                //     prop: 'label',
                //     render: ((h, { row }) => h('span', {}, row.label)),
                // },
            ],
        });

        return {
            ...toRefs(data),
        };
    },
};
</script>
<style lang="scss" scoped>
.wraper {
    padding: 20px;

    h3 {
        padding: 20px 10px;
    }
}
</style>
