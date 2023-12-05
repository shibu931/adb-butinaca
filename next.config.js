/** @type {import('next').NextConfig} */
const nextConfig = {
    dangerouslyAllowSVG: true,
    images:{
        domains:["placehold.co"],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    }
}

module.exports = nextConfig
