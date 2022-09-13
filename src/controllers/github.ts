/**
 * GitHubController is responsible for fetching data from GitHub API.
 */

export class GithubController {
  private repos_count: number;
  private repos_sort: string;

  constructor() {
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }

  async getProfile(user: string) {
    const profileRes = await fetch(`https://api.github.com/users/${user}`);
    const repoRes = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`
    );

    const profile = await profileRes.json();
    const repos = await repoRes.json();

    return { profile, repos };
  }
}
