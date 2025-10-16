import axios from "axios"
import express, { response } from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}))
const port = process.env.PORT
const api_key = process.env.API_KEY


app.get("/popular", async (req, res)=>{

    const items = []

    try {

        const type = req.query.type || "movie"
        const page = req.query.page || "1"

        const response = await axios.get(`https://api.themoviedb.org/3/discover/${type}`,
        {
            params: {
                include_adult: "true",
                language: "en-US",
                sort_by: "popularity.desc",
                page: page,
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${api_key}` 
            }
        }
        
    )

    const data = response.data.results

    let onlyThisProvider = null
    let country = null

    if(req.query.onlyThisProvider) {
        onlyThisProvider = req.query.onlyThisProvider.split(",").map(p => parseInt(p))
    }

    if(req.query.country) {
        country = req.query.country
    }


    for (const element of data) {
        try {

            const watchProvidersResponse = await axios.get(
                `https://api.themoviedb.org/3/${type}/${element.id}/watch/providers`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${api_key}`
                    }
                }
            )

            const providers = watchProvidersResponse.data.results
            let shouldInclude = false
            let availableCountries = []
            let providerNames = []

            if (onlyThisProvider) {
                for (const countryCode in providers) {
                    const countryProviders = providers[countryCode]
                    const allProviders = [
                        ...(countryProviders.flatrate || [])
                    ]

                    // Vérifier si au moins un provider correspond au filtre
                    const matchingProviders = allProviders.filter(p => onlyThisProvider.includes(p.provider_id))
                    if (matchingProviders.length > 0) {
                        availableCountries.push(countryCode)
                    }
                }

                // Si le contenu a au moins un provider correspondant, récupérer TOUS les providers de streaming
                if (availableCountries.length > 0) {
                    for (const countryCode in providers) {
                        const countryProviders = providers[countryCode]
                        const allStreamingProviders = [
                            ...(countryProviders.flatrate || [])
                        ]

                        allStreamingProviders.forEach(p => {
                            const existingProvider = providerNames.find(existing => existing.id === p.provider_id)
                            if (existingProvider) {
                                if (!existingProvider.countries.includes(countryCode)) {
                                    existingProvider.countries.push(countryCode)
                                }
                            } else {
                                providerNames.push({
                                    id: p.provider_id,
                                    name: p.provider_name,
                                    logo: p.logo_path,
                                    countries: [countryCode]
                                })
                            }
                        })
                    }
                }
            } else {
                availableCountries = Object.keys(providers)
            }

            if (country) {
            
                const availableInChosenCountry = availableCountries.includes(country)
                const availableElsewhere = availableCountries.some(c => c !== country)

                if (availableElsewhere && !availableInChosenCountry) {
                    shouldInclude = true
                }
            } else {
                shouldInclude = availableCountries.length > 0
            }

            if (shouldInclude) {
                items.push({
                    id: element.id,
                    name: element.name || element.title,
                    overview: element.overview,
                    genre_ids: element.genre_ids,
                    poster_path: element.poster_path,
                    availableCountries: availableCountries,
                    providers: providerNames
                })
            }

        } catch (error) {
            console.log(`Error fetching providers for ${element.id}:`, error.message)
        }
    }
  
    res.json(items)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})


app.listen(port, ()=>{
    console.log("Server is running on port ",port)
})