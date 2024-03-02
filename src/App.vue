<template>
    <nav>
        <div id="iconCont">
            <router-link to="/">
                <img id="icon" src="./assets/NoteSphere.png">
            </router-link>
        </div>
        <span id="title">NoteSphere</span>
        <div id="btnCont">
            <button class="btn" @click="pressTitleBtn('min')">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="30%"
                    height="30%">
                    <image  x="0px" y="0px" width="100%" height="100%"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAAiCAQAAADW8fWPAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfoAgwTDScIEQmYAAAB50lEQVR42u3cv0sbYRzH8fddwR9LEEGnFqe03ToERI2DLXTSQVIcLB36DxQn/wDBwaG4OKiLo+IipR2ktAiCQqrgIhRpCzroYFE06CBijcN5XH6Y5ED0+2A/r+m5547wCXy4kOeexMtTUZVT8mBc8IsN1llmk8tKF3k3diHFHEnr/HLPDvjCAov8Kz9VXhOPIcaot84sRvaYZoLj4snSmiSY4Y11UjF2xCjjhRPFNXnGJ55bZxQnZBlkJzworEmazzRbpxNn7POazWAY1aSfWRqtk4lTdnkSDPzriQzzKomUeMxSMAhqkmaOOutM4qCXvIXwQ2efVus84qgsncHd5JtKIhV18D64m2hRXqo5IaGaSG2el1dJpJZD1URi8G//EvLwqSYSg2oiMagmEoNqIjH4XFhHEOdta3lNavN84NQ6hbjOBz5YhxCnrYQbCX7Qbp1FHHXJo/CbzoR1FnHWNER7YVfpss4jDvoT/Kwv2jL9lxbrTOKYHE3BIFpe6+PIOpU45ZzBcBjVZI1uflsnE2fk6GUxPChcrP/JUz5ybp1PHLBME9+jw9JnOsMkmdSC239tjXf0FE/d/McVCTIM8IoG68Ryr/JkGeFr+QmvygOdBtJ0keIFbXjW70Du0BlbbLDOVKULrgADhFz+EAQPNgAAAABJRU5ErkJggg==" />
                </svg>
            </button>
            <button class="btn" @click="pressTitleBtn('max')">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    height="35%">
                    <image  x="0px" y="0px" width="100%" height="100%"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ8AAAERCAQAAADP+upeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfoAgwTDASzbUmrAAAD90lEQVR42u3bvYpcBRiA4e+MKWJrZRWIWCiieAPW3oE34QWIxDuwt/Y2BIWInbGIYoJp1BRqaSGIYSOTYrO7yezO27jJGfV5qt05y+EbePnOmZ9dtrNXHOJf7mh+nXtzd+7Nnflq/58tFzbw7nwyr6z9DHhOHs7t+Xw+vOjQ+Tyuzcfz3toTs4Kf5/ruQ7t53Jgb8+Lac7KaZefXJ/J4Zz51SeHJRDanP300N8XBPPWS5Gx7eJ3CidP9cbI9xMGZ0xqO83i49jwcmMeBHF9c7A52LTPH20McnLedefKVC5wjD/b5cmbZ/i0RLvRgri5bdx7ss9gc7HdDHuz3ljzY7zX3Huz3pzwILi4EeRDkQZAHQR4EeRDkQZAHQR4EeRDkQZAHQR4EeRCuXMpZln9+Ci7dJXxVw/YgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CPIgyIMgD4I8CFcu5SzbtZ8Gz4btQZAHQR4EeRDkQZAHQR4EeRDkQZAHQR4EeRDkQZAH+x1t5mjtGThYv2zmt7Vn4GDd38yPa8/Awbq/mbtrz8DB+mkzd9aegYN12/Zgv9vLdubokr6QzH/L7/PSZma+WXsODtKt47fFbq49Bwfpi5llO+P/VLjIcvKm+g9rT8LB+W7mZHvYH+xaZs4+klvWnoaD8rgHn9gSzvKwPzhx2sKyc9PhHuT/7qk1sTl38Nu152M1D3avIefvPd6eZT6Yz+aPtWflOdrOrVnm6u7DS1xNXp835415da7PtXl5Xlj7GfAM/DXfz9fz/r7DjwBP/FP3sc1rXwAAAABJRU5ErkJggg==" />
                </svg>
            </button>
            <button class="btn close" @click="pressTitleBtn('close')">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1000 1000"
                    height="35%">
                    <image  x="0px" y="0px" width="100%" height="100%"  xlink:href="data:img/png;base64,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" />
                </svg>
            </button>
        </div>
    </nav>
    <router-view/>
</template>                                                                                  

<style scoped>
    @import url("./assets/style.css");
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import * as remote from '@electron/remote'

export default defineComponent({
    data() {
        return {
            notePrevMenu: {
                id: '',
                top: 0,
                left: 0,
                display: 'none'
            }
        }
    },
    methods: {
        pressTitleBtn(opt: 'min' | 'max' | 'close') {
            const win = remote.getCurrentWindow()
            if(opt == 'min') win.minimize()
            else if(opt == 'max') win.isMaximized() ? win.unmaximize() : win.maximize()
            else if(opt == 'close') win.close()
        },
    }
})
</script>