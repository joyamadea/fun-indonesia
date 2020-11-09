import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadingStrategy } from "@angular/router";
import { MenuComponent } from "./menu.component";
const routes: Routes = [
  {
    path: "",
    component: MenuComponent,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../../pages/places/places.module").then(
            (m) => m.PlacesPageModule
          ),
      },
      {
        path: "saved",
        loadChildren: () =>
          import("../../pages/saved/saved.module").then(
            (m) => m.SavedPageModule
          ),
      },
      {
        path: "account",
        loadChildren: () =>
          import("../../pages/account/profile/profile.module").then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
