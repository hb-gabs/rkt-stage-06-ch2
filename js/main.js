import { Favorite } from "./Favorite.js";

let input = document.querySelector('input');
let favBtn = document.querySelector('header button');

const fav = new Favorite("tbody");

favBtn.onclick = () => fav.addUser(input.value);