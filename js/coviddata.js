function loadCovidData() {
    // "https://covid.ourworldindata.org/data/owid-covid-data.json"
    fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json', {
        credentials: 'omit'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)

            let countries = []
            for (let i = 0; i < data.length; i++) {
                let temp = data[i]['country']
                countries.push(temp.toLowerCase())
            }
            console.log(countries)

            const userCountry = document.getElementById("country").value.toLowerCase()
            var inList = false
            var ci = 0

            for (let j = 0; j < countries.length; j++) {
                if (countries[j] === userCountry) {
                    inList = true
                    ci = j
                    break
                }
            }

            if (inList == false) {
                document.getElementById('error').innerHTML = '<h4>Country not found in Database</h4>'
                document.getElementById('v_data').innerHTML = ''
            } else {
                document.getElementById('error').innerHTML = ''
                renderTable(userCountry, data[ci]['data'])
            }
        })
}

function renderTable(country = '', data = []) {
    console.log(data)

    document.getElementById('v_data').innerHTML = "<h3 id='country_name'>" + country + "</h3>"
    document.getElementById('v_data').innerHTML += `
            <tr>
                <td>Date</td>
                <td>Daily Vaccination</td>
                <td>Daily Vaccination per Million</td>
            </tr>
    `

    for (let c = 0; c < data.length; c++) {
        const date = data[c]['date']
        const dv = data[c]["daily_vaccinations"]
        const dvpm = data[c]["daily_vaccinations_per_million"]


        document.getElementById('v_data').innerHTML += `
            <tr>
                <td>`+ date + `</td>
                <td>`+ dv + `</td>
                <td>`+ dvpm + `</td>
            </tr>
        `
    }
}