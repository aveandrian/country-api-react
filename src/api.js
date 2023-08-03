export async function getCountriesData(){
    let res = await fetch('https://restcountries.com/v3.1/all')
    console.log("res", res)
    let data = await res.json()
    console.log(data)
    return data
}