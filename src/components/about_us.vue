<script lang="ts">
import aboutUs from '../components/row_blocks.vue';
import '../scss/AboutUs.scss';
export default {
    name: 'MyComponent',
    components: {
        aboutUs
    },
    data() {
        return {
        }
    },
    props: {
        calendarSchedule: await Array<{
            team: string,
            dayInWeek: String,
            time: String,
            description: string,
            color: String,
            slantedImage: string,
            originalImage: string
        }>
    }
}

</script>

<template>
    <div class="page">
        <header id="about_us_header">
            <div id="about_us_header__background">
                <div id="about_us_header__content">
                    <h1 class="fw-semibold">
                        MEET OUR TEAM
                    </h1>
                    <p style="color: white;">

                        Our team is composed of five major sub-teams including
                        mechanical team, electrical team, software team, financial team,
                        and marketing team. Our mission is to provide the technical and
                        professional development of our members by working with a
                        diverse group of people on industry leading robotics, as well as
                        building a strong community in UW Bothell.
                    </p>
                </div>
            </div>
        </header>

        <section id="about_us_section">
            <div id="about_us_rows">
                <div v-if="calendarSchedule" v-for="(teamData) in calendarSchedule">
                    <aboutUs :image__left="teamData.slantedImage" :title="`${teamData.team.toUpperCase()} TEAM`"
                        :text="teamData.description" :image__left__responsive="teamData.originalImage"
                        :isFifthBlock="true" />
                </div>

            </div>
        </section>
    </div>
</template>
<style lang="scss"></style>