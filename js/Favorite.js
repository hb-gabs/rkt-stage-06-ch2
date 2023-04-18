import { GithubUser } from "./GithubUser.js";

export class Favorite {
    constructor(root) {
        this.rootName = root;
        this.root = document.querySelector(root);
        this.localStorageKey = "githubfavs";
        this.data;

        this.getAll();
        this.update();
    }

    getAll() {
        const favs = localStorage.getItem(this.localStorageKey);
        this.data = JSON.parse(favs);
    }

    save() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
        this.update();
    }

    create(newFav) {
        this.data = [...this.data, newFav];
        this.save();
    }

    update() {
        if (this.data.length) {
            this.clearTable()
            this.data.map(favData => this.root.innerHTML += this.setRow(favData));
            this.setDeleteEvent();
            return;
        }
        this.root.innerHTML = this.emptyTable();
    }

    setDeleteEvent() {
        document.querySelectorAll('.remove-btn').forEach(btn => btn.onclick = () => this.delete(btn.id))
    }

    clearTable() {
        this.root.innerHTML='';
    }

    delete(login) {
        const filteredData = this.data.filter(favData => favData.login !== login );
        this.data = filteredData;
        this.save();
    }

    setRow({ login, name, public_repos, followers }) {
        return `
            <tr>
                <td>
                    <img id="profile-img" src="https://github.com/${login}.png" alt="Perfil de ${name}">
                    <div class="user-info">
                        <span>
                            <a target="_blank" href="https://github.com/${login}">
                                ${name}
                            </a>
                        </span>
                        <p>
                            <a target="_blank" href="https://github.com/${login}">
                                /${login}
                            </a>
                        </p>
                    </div>
                </td>
                <td>
                    ${public_repos}
                </td>
                <td>
                    ${followers}
                </td>
                <td>
                    <button id="${login}" class="remove-btn">
                        Remover
                    </button>
                </td>
            </tr>
        `
    }

    async addUser(login) {
        const alreadyExist = this.data.find(favData => favData.login === login);
        if (alreadyExist) {
            alert('Usuário já cadastrado!');
            return;
        }
        let response = await GithubUser.getUser(login);
        if (!response.login) {
            alert("Usuário não encontrado!");
            return;
        }
        const favData = this.validateData(response);
        this.create(favData);
    }

    validateData(data) {
        if (!data.name) data.name = "Sem nome";
        return data;
    }

    emptyTable() {
        return `
            <div class="empty-table">
                <img src="../assets/images/smilling-star.svg">
                <h2>
                    Nenhum favorito ainda
                </h2>
            </div>
        `
    }
}