
export const plage_horaires = () => {

    const plage_horaire = [
        {
            days: "monday",
            hours: []
        },
        {
            days: "tuesday",
            hours: []
        },
        {
            days: "wednesday",
            hours: []
        },
        {
            days: "thursday",
            hours: []
        },
        {
            days: "friday",
            hours: []
        },
        {
            days: "satuday",
            hours: []
        },
        {
            days: "sunday",
            hours: []
        },
    ]

    plage_horaire.map((item) => {
        for(let i=6; i<=22; i++){
            const data = {
                heure_debut: (i<10?"0" + i: i) + ":00",
                heure_fin : (i + 1<10? "0" + (i + 1): i + 1) + ":00"
            }
            item.hours.push(data)
        }
    })

    return plage_horaire

    

}