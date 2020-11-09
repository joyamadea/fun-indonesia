import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EditProfilePage } from "./edit-profile.page";

const routes: Routes = [
  {
    path: "",
    component: EditProfilePage,
  },
  {
    path: "change-profile",
    loadChildren: () =>
      import("../change-profile/change-profile.module").then(
        (m) => m.ChangeProfilePageModule
      ),
  },
  {
    path: "change-password",
    loadChildren: () =>
      import("../change-password/change-password.module").then(
        (m) => m.ChangePasswordPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfilePageRoutingModule {}
