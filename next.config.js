/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
                pathname: "/depipxp3j/**",
                port: "",
                protocol: "https",
            },
            {
                hostname: "res.cloudinary.com",
                pathname: "/depipxp3j/**",
                port: "",
                protocol: "http",
            },
            {
                hostname: "**.googleusercontent.com",
                pathname: "/**",
                port: "",
                protocol: "https",
            },
        ],
    },
};

module.exports = nextConfig;
