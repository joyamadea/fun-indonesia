import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from "./menu.component";
import { MenuRoutingModule } from "./menu-routing.module";
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [CommonModule, IonicModule, MenuRoutingModule, TranslateModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuComponentModule {}
