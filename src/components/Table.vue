<template>
    <el-table
        :data="data"
        v-bind="$attrs"
        :class="customClass"
    >
        <slot v-if="!columns.length" />
        <el-table-column
            v-for="item in columns"
            v-else
            :key="item.prop"
            v-bind="item"
        >
            <template
                v-if="item.render && typeof item.render === 'function'"
                #default="scope"
            >
                <expand-dom
                    v-bind="item"
                    :$scope="scope"
                />
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { h } from 'vue';

export default {
    components: {
        expandDom: (props) => {
            if (props.$scope.$index === -1) return;
            return props.render(h, { ...props.$scope });
        },
    },
    inheritAttrs: false,
    props: {
        columns: {
            type: Array,
            default() {
                return [];
            },
        },
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        customClass: {
            type: String,
            default: 'reset-style',
        },
    },
};
</script>
