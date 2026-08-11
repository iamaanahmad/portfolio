export interface GithubStats {
  repos: number;
  followers: number;
  stars: number;
}

export async function getGithubStats(username: string): Promise<GithubStats | null> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("Failed to fetch user");
    const userData = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    const reposData = await reposRes.json();

    const totalStars = Array.isArray(reposData)
      ? reposData.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count || 0), 0)
      : 0;

    return {
      repos: userData.public_repos ?? 74,
      followers: userData.followers ?? 23,
      stars: totalStars,
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return null;
  }
}

