import { GithubController } from "./github";
import { UIController } from "./ui";

const github = new GithubController();
const ui = new UIController();

export class FormInputController {
  searchInput: HTMLInputElement;

  constructor() {
    this.searchInput = document.getElementById(
      "searchUser"
    )! as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.searchInput.addEventListener("keyup", (e: KeyboardEvent) => {
      const userText = (e.target as HTMLInputElement).value;
      if (userText !== "") {
        github
          .getProfile(userText)
          .then((data) => {
            if (data.profile.message === "Not Found") {
              ui.showAlert("User not found", "alert alert-danger");
            } else {
              ui.showProfile(data.profile);
              ui.showRepos(data.repos);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        ui.clearProfile();
      }
    });
  }
}
