import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { Article } from '../shared/article.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(public service: ArticleService,
    private toastr: ToastrService){
    
  }

  ngOnInit(): void {
   this.service.refreshList();
  }

  populateForm(selectedRecord:Article){
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(idArticle:number){
    if(confirm("Voulez-vous supprimer cet article?"))
      this.service.deleteArticle(idArticle)
      .subscribe({
        next: res => {
          this.service.list = res as Article[]
          this.toastr.error('Cet Article a été supprimé !', 'Suppression')
        },
        error: err => {console.log(err)}
      })
  }

}
