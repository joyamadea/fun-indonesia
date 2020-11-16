import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewsAddPage } from './reviews-add.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsAddPageRoutingModule {}
