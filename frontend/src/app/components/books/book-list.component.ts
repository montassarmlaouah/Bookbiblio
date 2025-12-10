import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm = '';
  searchType: 'title' | 'author' | 'all' = 'all';
  loading = false;
  errorMessage = '';

  constructor(
    private bookService: BookService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load books';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBooks = this.books;
      return;
    }

    this.loading = true;

    if (this.searchType === 'title') {
      this.bookService.searchBooksByTitle(this.searchTerm).subscribe({
        next: (books) => {
          this.filteredBooks = books;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else if (this.searchType === 'author') {
      this.bookService.searchBooksByAuthor(this.searchTerm).subscribe({
        next: (books) => {
          this.filteredBooks = books;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.category.toLowerCase().includes(term)
      );
      this.loading = false;
    }
  }

  deleteBook(id: number | undefined): void {
    if (!id || !confirm('Are you sure you want to delete this book?')) {
      return;
    }

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete book';
      }
    });
  }
}
