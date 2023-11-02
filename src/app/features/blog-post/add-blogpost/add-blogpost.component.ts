import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit{
  model:AddBlogPost;
  categories$?:Observable<Category[]>;

  constructor(private blogpostService: BlogPostService,
    private router: Router, private categoryService: CategoryService
    ){
    this.model = {
      title:'',
      urlHandle:'',
      shortDescription:'',
      content:'',
      featuredImageUrl:'',
      pubishedDate: new Date(),
      author:'',
      isVisible:true,
      categories: [],
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onFormSubmit():void{
    this.blogpostService.creatBlogPost(this.model)
    .subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

}
