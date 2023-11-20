import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Article } from './article.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  url:string =environment.apibaseUrl + '/Articles'
  list:Article[]= [];
  formData : Article = new Article()
  formSubmitted : boolean = false;

  constructor(private http: HttpClient) { }

  refreshList(){
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as Article[]
        },
        error: err => { console.log(err)}
      })
  }

  postArticle(){
    return this.http.post(this.url, this.formData)
  }
  putArticle(){
    return this.http.put(this.url + '/' + this.formData.idArticle, this.formData)
  }

  deleteArticle(idArticle: number){
    return this.http.delete(this.url + '/' + idArticle)
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new Article()
    this.formSubmitted = false;
  }

}
