import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publishedDate: '',
    category: '',
    description: '',
    availableCopies: 0,
    totalCopies: 0,
    coverImageUrl: ''
  };
  isEditMode = false;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadBook(+id);
    }
  }

  loadBook(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load book';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    if (this.isEditMode && this.book.id) {
      this.bookService.updateBook(this.book.id, this.book).subscribe({
        next: () => {
          this.router.navigate(['/books', this.book.id]);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update book';
          this.loading = false;
        }
      });
    } else {
      this.bookService.createBook(this.book).subscribe({
        next: (book) => {
          this.router.navigate(['/books', book.id]);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to create book';
          this.loading = false;
        }
      });
    }
  }
}
