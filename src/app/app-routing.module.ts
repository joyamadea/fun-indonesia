import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "tabs",
    pathMatch: "full",
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./component/menu/menu.module").then((m) => m.MenuComponentModule),
    data: { preload: true, delay: true },
  },
  {
    path: "confirmation-modal",
    loadChildren: () =>
      import("./pages/modal/confirmation-modal/confirmation-modal.module").then(
        (m) => m.ConfirmationModalPageModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/account/profile/profile.module").then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: "edit-profile",
    loadChildren: () =>
      import("./pages/account/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "change-profile",
    loadChildren: () =>
      import("./pages/account/change-profile/change-profile.module").then(
        (m) => m.ChangeProfilePageModule
      ),
  },
  {
    path: "change-password",
    loadChildren: () =>
      import("./pages/account/change-password/change-password.module").then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: "select-language",
    loadChildren: () =>
      import("./pages/select-language/select-language.module").then(
        (m) => m.SelectLanguagePageModule
      ),
  },
  {
    path: "about",
    loadChildren: () =>
      import("./pages/modal/about/about.module").then((m) => m.AboutPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
