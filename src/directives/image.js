/**
 * 图片指令
 *
 * <span v-image="图片"/>
 * <img v-image="图片" />
 */
// import defaultImg from '@/assets/images/default.svg';
const defaultImg = '';

const install = (app) => {
    app.directive('image', {
        mounted(el, { value }) {
            if (!el.loadImg) {
                el.loadImg = (src) => {
                    const setImg = (img) => {
                        if (el.tagName.toLowerCase() === 'img') {
                            el.setAttribute('src', img);
                        } else {
                            el.style.background = `url(${img}) center/cover no-repeat`;
                        }
                    };

                    // 如果没有链接直接设置default
                    if (!src) {
                        setImg(defaultImg);
                        return;
                    }

                    let image = new Image();

                    image.onload = () => {
                        setImg(src);
                        image = null;
                    };

                    image.onerror = () => {
                        setImg(defaultImg); // eslint-disable-line
                        image = null;
                    };

                    el.img = src;
                    image.src = src;
                };
            }

            el.loadImg(value);
        },
        updated(el, { value }) {
            // 两次src不一致
            if (el.loadImg && el.img !== value) {
                el.loadImg(value);
            }
        },
        unmounted(el) {
            if (el.loadImg) delete el.loadImg;
        },
    });
};

export default install;
