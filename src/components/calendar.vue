<script lang="ts">
import '../scss/calendar.scss'

let date = new Date()

const dateInWeeks = ["Sunday", 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const dayInWeeks = dateInWeeks.map(date => date.slice(0, 3))
const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
const currentMonthAndDateInWeek = `${dateInWeeks[date.getDay()]}, ${months[date.getMonth()]}`
const currentDate = `${date.getDate()}${date.getDate() == 1 ? "ST" :
    date.getDate() == 2 ? "ND" :
        date.getDate() == 3 ? "RD" :
            "TH"
    }`;


let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let monthW = months[currentMonth]
let teamScheduleInWeek = new Map()

let calendar: Array<{
    active: boolean,
    date: number,
    color: Array<string>
}> = []



export default {
    data() {
        let isCalendarShow = false
        const isResponsive = window.innerWidth < 1000
        return {
            currentDate,
            currentMonthAndDateInWeek,
            teamSchedule: [{
                team: '',
                color: '',
                time: '',
                dayInWeek: ''
            }],
            currentYear,
            monthW,
            calendar,
            dayInWeeks,
            isCalendarShow,
            isResponsive
        }
    },
    methods: {
        handleNextMonth() {
            if (currentMonth < 11) {
                currentMonth++
            }
            else {
                currentMonth = 0
                this.currentYear++
            }
            this.monthW = months[currentMonth]
            this.generateCalendar()
        },
        handlePreviousMonth() {
            if (currentMonth >= 1) {
                currentMonth--
            }
            else {
                currentMonth = 11
                this.currentYear--
            }
            this.monthW = months[currentMonth]
            this.generateCalendar()
        },

        generateCalendar() {
            let firstDateofMonth = new Date(this.currentYear, currentMonth, 1).getDay()//get first date of month
            let lastDateofMonth = new Date(this.currentYear, currentMonth + 1, 0).getDate()//get last date of month
            let lastDateofLastMonth = new Date(this.currentYear, currentMonth, 0).getDate()//get last date of last month
            let lastDayofMonth = new Date(this.currentYear, currentMonth, lastDateofMonth).getDay() //last date show in calendar
            this.calendar = []

            for (let i = firstDateofMonth; i > 0; i--) {
                this.calendar.push({
                    active: false,
                    date: lastDateofLastMonth - i + 1,
                    color: []
                })
            }
            for (let i = 1; i <= lastDateofMonth; i++) {
                this.calendar.push({
                    active: true,
                    date: i,
                    color: []
                })
            }
            for (let i = lastDayofMonth; i < 6; i++) {
                this.calendar.push({
                    active: false,
                    date: i - lastDayofMonth + 1,
                    color: []
                })
            }

            for (let i = 0; i < this.calendar.length; i++) {
                this.calendar[i].color = teamScheduleInWeek.get(i % 7);
            }

            console.log(this.calendar);
        },

        handleShowCalendarBtn() {
            this.isCalendarShow = !this.isCalendarShow
        }


    },

    props: ['calendarSchedule'],
    created() {
        this.teamSchedule = JSON.parse(JSON.stringify(this.calendarSchedule))
        //this.teamScheduleInWeek.set(0,'')
        this.teamSchedule.forEach(team => {
            //console.log(teamScheduleInWeek.get(dateInWeeks.indexOf(`${team.dayInWeek.slice(0, 1)}${team.dayInWeek.slice(1).toLowerCase()}`)))
            //teamScheduleInWeek.get(dateInWeeks.indexOf(`${team.dayInWeek.slice(0, 1)}${team.dayInWeek.slice(1).toLowerCase()}`)).push(team.color)
            if (teamScheduleInWeek.has(dateInWeeks.indexOf(`${team.dayInWeek.slice(0, 1)}${team.dayInWeek.slice(1).toLowerCase()}`))) {
                const colorList = teamScheduleInWeek.get(dateInWeeks.indexOf(`${team.dayInWeek.slice(0, 1)}${team.dayInWeek.slice(1).toLowerCase()}`));
                if (colorList.isArray) {
                    colorList.foreach((color: string) => {
                        if (team.color != color) {
                            colorList.push(team.color)
                        }
                    })
                }
            } else {
                teamScheduleInWeek.set(
                    dateInWeeks.indexOf(`${team.dayInWeek.slice(0, 1)}${team.dayInWeek.slice(1).toLowerCase()}`),
                    [team.color]
                )
            }
        })

        console.log(this.teamSchedule);
        this.generateCalendar()
    }
}

</script>

<template>
    <div class="d-flex calendar__container" id="calendar">
        <!--calendar button-->
        <div class="calendar__btn align-items-center justify-content-center fs-2" @click="handleShowCalendarBtn"
            v-bind:style="{
                right: isCalendarShow ? '100%' : 0,
                transform: isCalendarShow ? 'translateX(100%)' : 'translateX(0%)',
                'background-color': isCalendarShow ? '#00B733' : 'black'
            }">
            <font-awesome-icon :icon="['fas', 'arrow-right']" v-if="!isCalendarShow" />
            <font-awesome-icon :icon="['fas', 'arrow-left']" v-if="isCalendarShow" class="text-black" />
        </div>

        <div class="bg-primary calendar--left d-flex flex-column align-items-center justify-content-center" v-bind:style="!isCalendarShow && isResponsive ?
            {
                left: 0
            } : {
                left: '-100%'
            }
            ">
            <!--team calendar-->
            <p class=" my-2 fs-3 text-black">TEAM CALENDAR</p>
            <!--current date-->
            <div class="mb-4 mt-2 text-black">
                <p class="fs-2">{{ currentMonthAndDateInWeek }}</p>
                <p class="fs-1 text-center">{{ currentDate }}</p>
            </div>
            <!--TEAM SCHEDULE-->
            <div class="calendar__teamSchedule text-black">
                <p class=" mb-4 text-center fs-5">TEAM SCHEDULE</p>
                <div v-if="teamSchedule" v-for=" schedule  in  teamSchedule ">
                    <div class="d-flex align-items-center my-4">
                        <div class="me-3 teamSchedule__colorMark" :style="{
                            'background-color': schedule.color,
                            height: '15px',
                            width: '15px'
                        }
                            "></div>
                        <p class="my-0 fs-5">

                            {{ schedule.team }} meeting {{ schedule.time }}
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <div class="bg-black calendar--right">
            <div class="my-3 d-flex calendar__monthNYear justify-content-center align-items-center">
                <button class="previousMonth" @click="handlePreviousMonth">
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </button>
                <p class="text-center">{{ monthW }}, {{ currentYear }}</p>
                <button class="nextMonth" @click="handleNextMonth">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </button>
            </div>

            <div class="calendar__wrapper">

                <div class="calendar__date d-flex align-items-center">
                    <div class="my-2 fs-5" v-for=" date  in  dayInWeeks ">
                        {{ date }}

                    </div>
                </div>

                <div class="calendar__date d-flex align-items-center">
                    <div class="my-4" :class="!date.active ? 'inactive' : ''" v-for=" date  in  calendar ">
                        {{ date.date }}
                        <div class="d-flex justify-content-evenly calendar__color__container">
                            <div v-for=" color  in  date.color" :style="{
                                'background-color': color
                            }">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss"></style>