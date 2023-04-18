export class GithubUser {
    static async getUser(login) {
        const url = `https://api.github.com/users/${login}`;
        return await fetch(url)
        .then(data => data.json())
        .then(({ login, name, public_repos, followers }) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}