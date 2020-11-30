import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private dbPath = '/reviews';
  reviewRef: AngularFireList<Review> = null;

  constructor(private db: AngularFireDatabase) { 
    this.reviewRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Review> {
    return this.reviewRef;
  }

  create(review: Review, id): any{
    this.reviewRef = this.db.list(this.dbPath+"/"+id);
    return this.reviewRef.push(review);
  }
}