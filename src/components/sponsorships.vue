<script lang="ts">
import '../scss/sponsorship.scss'
import row_blocks from './row_blocks.vue'
import { sponsorshipLogos } from '@/data/sponsorship_data'
export default {

    data() {
        return {
            sponsorshipLogos
        }
    },
    components: {
        row_blocks
    }
}
</script>

<template>
    <header class="sponsorship__header">
        <div class="sponsorship__header__background">
            <div class="sponsorship__header__content">
                <h1 class="fw-semibold" style="color: white;">
                    SPONSORSHIP
                </h1>
                <p style="color: white;">
                    TrickFire relies on generous grants and sponsorships to purchase the necessary materials and equipment
                    to build the rover and travel to the competition. Ordering what we need through university funding can
                    take weeks. For the vast majority of our parts and materials budget, we must submit a list of what we
                    need a year in advance; purchases must be made from that list. With your donation, you will directly
                    impact the development of our students by removing the red tape that hampers the club. Our team strives
                    for professional quality work; your support will enable professional procurement. In-kind sponsorships
                    are one great way to help our team get much-needed resources and tools to help construct the robot. In
                    addition to monetary and in-kind donations, we seek industry mentors. As such, working with your
                    organization’s professionals provides invaluable experience that helps us reach that goal while giving
                    you a direct connection to candidate employees
                </p>
            </div>
        </div>
    </header>


    <div class="my-5 mx-auto sponsorship__howToSponsor">

        <row_blocks
            image__left="https://raw.githubusercontent.com/TrickfireRobotics/TrickfireRobotics.github.io/dev/src/assets/Trickfire_image/slanted_image/sponsorship/slanted_teaching_new_member.png"
            image__left__responsive="https://github.com/TrickfireRobotics/TrickfireRobotics.github.io/blob/dong/sponsorship/src/assets/Trickfire_image/original_image/unused/unslanted_teaching_new_member.jpg?raw=true"
            text="Please contact us at tfrbtcs@uw.edu if you are interested in sponsoring TrickFire Robotics. All donated funds go through our UW Foundation fund. Donate by going to the link below and searching for the “UW Bothell Robotics Program Support Fund”."
            link="https://www.washington.edu/giving/make-a-gift/" linkName="UW's Make a Gift page" title="HOW TO SPONSOR"
            :isFifthBlock="false" />

    </div>





    <!--<div class="pb-5 sponsorship__ourPartner mt-5">
        <h3 class="text-primary ms-5">Our partner</h3>
        <div class="justify-content-around sponsorship__ourPartner__sponsorList">

            <img :src="sponsor" v-for="sponsor in sponsorshipLogos" class="my-2" />

        </div>
    </div>-->
</template>

<style lang="scss"></style>