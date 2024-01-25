const fetchData = async (fullURL: string) => {
    const rawData = await fetch(fullURL)
    const data = await rawData.text()
    let returnData = JSON.parse(data.substr(47).slice(0, -2)).table

    /*returnData = returnData.rows.map((item: { c: Array<{ v: String }> }) => {
        return {
            team: item.c[0].v,
            dayInWeek: item.c[1].v,
            time: item.c[2].v,
            description: item.c[3].v,
            color: item.c[4].v
        }
    })*/
    return returnData
}

const newFetchData = async (fullURL: string) => {
    const rawData = await fetch(fullURL)
    const data = await rawData.text()

    const unorganizedData = JSON.parse(data.substr(47).slice(0, -2)).table

    console.log(unorganizedData)

    const unorganizedMeetingSchedule = function () {
        let arrMeetingSchedule = []
        for (let i = 3; i < unorganizedData.rows.length; i++) {
            arrMeetingSchedule.push(unorganizedData.rows[i])
        }
        return arrMeetingSchedule
    }

    let returnData: {
        deadline: String,
        calendarSchedule: Array<{
            team: String,
            dayInWeek: String,
            time: String,
            description: String,
            color: String,
            slantedImage: String,
            originalImage: String
        }>
    } = {
        deadline: unorganizedData.rows[0].c[0].v,
        calendarSchedule: unorganizedMeetingSchedule().map((item: { c: Array<{ v: string }> }) => {
            return {
                team: item.c[0].v,
                dayInWeek: item.c[1] ? item.c[1].v : "None",
                time: item.c[2] ? item.c[2].v : "No meeting",
                description: item.c[3] ? item.c[3].v : "",
                color: item.c[4].v,
                slantedImage: item.c[5].v,
                originalImage: item.c[6].v
            }
        })
    }

    return returnData;
}


export { fetchData, newFetchData }
