/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/get_locality_weather_data/:path*",
                destination: "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data/:path*"
            }
        ]
    }
};

export default nextConfig;
