<script lang="ts">
import '../scss/homePage.scss';
import calendar from './calendar.vue'

export default {
    props: {
        calendarSchedule: await Array<{
            team: String,
            dayInWeek: String,
            time: String,
            description: String,
            color: String
        }>
    },
    components: { calendar },
    data() {
        return {}
    },

}



</script>

<template>
    <div class="page">
        <header class="bg-black mb-5 homePage__header">
            <!--header content-->
            <div class="homePage__header__content">

                <h1 class="m-0 d-flex flex-column justify-content-center fw-bold fst-italic">
                    <span class="text-primary ">TRICKFIRE</span>
                    ROBOTICS
                </h1>
                <img src="https://www.trickfirerobotics.org/assets/images/front_logo.svg" class="homePage__header__image" />
                <p class="m-0 text-white">
                    TrickFire Robotics is a student-led robotics team focused on providing a unique educational experience
                    through hands-on work on large scale projects. Since 2016 the team has traveled to the Kennedy Space
                    Center
                    to represent the University of Washington Bothell at the annual URC Robotics Mining Competition. A
                    competition that pits fifty college teams to design and build a rover that can mine on the surface of
                    the
                    moon.
                </p>
            </div>
            <!--header scroll down button-->
            <a class="d-flex flex-column homePage__header__scrollBtn" href="#calendar">

                <div class="d-flex homePage__header__scrollGreen">
                    <div class="bg-primary homePage__header__btn header__scroll--left"></div>
                    <div class="bg-primary homePage__header__btn header__scroll--right"></div>
                </div>

                <div class="d-flex homePage__header__scrollWhite">
                    <div class="bg-white homePage__header__btn header__scroll--left"></div>
                    <div class="bg-white homePage__header__btn header__scroll--right"></div>
                </div>
            </a>
        </header>

        <!--calendar-->
        <calendar v-if="calendarSchedule" :calendarSchedule="calendarSchedule" id="calendar" />

    </div>
</template>

<style lang="scss"></style>