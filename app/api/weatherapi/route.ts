import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import path from "path";
import fs from "fs";

const mappingFile = path.join(process.cwd(), 'public', 'localityMapping.json');
const localityMapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const placeName = url.searchParams.get('placeName');

        if (!placeName) {
            return NextResponse.json({ error: "PlaceName is required" }, { status: 400 });
        }

        const localityId = localityMapping[placeName];
        if (!localityId) {
            return NextResponse.json({ error: "PlaceName not found" }, { status: 404 });
        }

        const weatherResponse = await axios.get("https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data", {
            params: { locality_id: localityId },
            headers: {
                'X-Zomato-Api-Key': process.env.WEATHER_UNION_API_KEY!,
            }
        });

        console.log("Weather data:", weatherResponse.data);
        return NextResponse.json(weatherResponse.data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        return NextResponse.json({ error: "Error getting weather data" }, { status: 500 });
    }
}