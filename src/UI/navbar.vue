<script lang="ts" >
import '../scss/nav.scss'

const isResponsive = window.innerWidth < 1000
const navLinkList = [
    {
        linkTitle: 'HOME',
        linkRouteName: '/'
    },
    {
        linkTitle: 'ABOUT US',
        linkRouteName: 'about_us'
    },
    {
        linkTitle: 'PROJECT',
        linkRouteName: 'projects'
    },
    {
        linkTitle: 'JOIN US',
        linkRouteName: 'join_us'
    },
    {
        linkTitle: 'SPONSORSHIP',
        linkRouteName: 'sponsorships'
    },
]
export default {

    data() {
        let navTop = '0%'
        let prevScrollPos = window.pageYOffset;

        return {
            isResponsive,
            navLinkList,
            prevScrollPos,
            navTop
        }
    },

    //handle link
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
    methods: {
        showHideNavHandle() {
            let currentScrollPos = window.pageYOffset;
            if (this.prevScrollPos <= currentScrollPos && window.innerWidth > 1000) {
                this.navTop = '-80px'
            }
            else {
                this.navTop = '0%'
            }
            this.prevScrollPos = currentScrollPos;
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: undefined
            });
        }

    },
    created() {
        window.addEventListener('scroll', this.showHideNavHandle)
    }


}

</script>

<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-primary p-0">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li v-for="navLink in navLinkList" :key="navLink.linkTitle" :class="(currentRouteName == navLink.linkRouteName) ||
                    (currentRouteName == 'home' && navLink.linkTitle == 'HOME') ? 'navBar-activePage py-2 px-1 mx-3 nav-item' :
                    'py-2 px-1 mx-3 nav-item'">
                    <router-link :to="navLink.linkRouteName" class="text-black nav-link" @click.native="scrollToTop">
                        {{ navLink.linkTitle }}
                    </router-link>
                </li>

            </ul>
        </div>
    </nav>
</template>

<style lang="scss"></style>