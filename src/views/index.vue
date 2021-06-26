<template>
    <div>
        <span>{{ t('test.title') }}</span>
        <span v-t="'test.titdddle'"></span>

        <button @click="changeLang('zh-cn')">中文</button>
        <button @click="changeLang('en-us')">英文</button>
    </div>
</template>
<script>
import { useI18n } from 'vue-i18n';
import { i18n } from '@/lang/i18n';

export default {
    setup() {
        const { t, locale } = useI18n();

        return { t, locale };
    },
    methods: {
        changeLang(lang) {
            if (lang !== i18n.global.locale.value) {
                i18n.setLang(lang);
            }
        },
    },
};
</script>
