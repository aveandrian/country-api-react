import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    console.log(params)
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${params.countryName}`)
    const data = await res.json()
    return data;
  }

export default function Country(){
    const countryData = useLoaderData()
    // useEffect(()=>{
    //     fetch(`https://restcountries.com/v3.1/name/${params.countryName}?fullText=true`)
    //     .then(res => res.json())
    //     .then(data => setConutryData(data))
    // }, [])

    console.log(countryData)
    return <h1>Country page</h1>
}