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
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/auth/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "on-boarding",
    loadChildren: () =>
      import("./pages/on-boarding/on-boarding.module").then(
        (m) => m.OnBoardingPageModule
      ),
  },
  {
    path: "places-detail/:id",
    loadChildren: () =>
      import("./pages/places/places-detail/places-detail.module").then(
        (m) => m.PlacesDetailPageModule
      ),
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/review/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'reviews-add',
    loadChildren: () => import('./pages/review/reviews-add/reviews-add.module').then( m => m.ReviewsAddPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
