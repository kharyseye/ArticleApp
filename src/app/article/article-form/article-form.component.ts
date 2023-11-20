import { Component } from '@angular/core';
import { ArticleService } from 'src/app/shared/article.service';
import { NgForm } from "@angular/forms";
import { Article } from 'src/app/shared/article.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
  constructor(public service: ArticleService,
              private toastr: ToastrService
    ){
    
  }

  onSubmit(form:NgForm){
    this.service.formSubmitted = true
    if(form.valid){
      if(this.service.formData.idArticle == 0)
        this.insertRecord(form)
      else
        this.updateRecord(form)
    }
  }

  insertRecord(form: NgForm){
    this.service.postArticle()
    .subscribe({
      next: res => {
        this.service.list = res as Article[]
        this.service.resetForm(form)
        this.toastr.success('Article ajouté avec succés !', 'Nouvel Article')
      },
      error: err => {console.log(err)}
    })
    
  }
  updateRecord(form: NgForm){
    this.service.putArticle()
    .subscribe({
      next: res => {
        this.service.list = res as Article[]
        this.service.resetForm(form)
        this.toastr.info('Modification Appliquée avec succes !', 'Mise A Jour')
      },
      error: err => {console.log(err)}
    })
  }

}
