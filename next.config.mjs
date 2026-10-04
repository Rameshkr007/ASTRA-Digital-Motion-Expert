/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "ASTRA-Digital-Motion-Expert";

const nextConfig = {
  // Static export when running in GitHub Actions for GitHub Pages
  output: isGithubActions ? "export" : undefined,
  basePath: isGithubActions ? `/${repoName}` : undefined,
  assetPrefix: isGithubActions ? `/${repoName}/` : undefined,

  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
};

export default nextConfig;
