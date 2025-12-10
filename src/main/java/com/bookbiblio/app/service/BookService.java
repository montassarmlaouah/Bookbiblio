package com.bookbiblio.app.service;

import com.bookbiblio.app.entity.Book;
import com.bookbiblio.app.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    public Book createBook(Book book) {
        if (bookRepository.findByIsbn(book.getIsbn()).isPresent()) {
            throw new RuntimeException("Book with ISBN " + book.getIsbn() + " already exists");
        }
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = getBookById(id);
        
        // Check if ISBN is being changed and if the new ISBN already exists
        if (!book.getIsbn().equals(bookDetails.getIsbn())) {
            bookRepository.findByIsbn(bookDetails.getIsbn()).ifPresent(existingBook -> {
                if (!existingBook.getId().equals(id)) {
                    throw new RuntimeException("Book with ISBN " + bookDetails.getIsbn() + " already exists");
                }
            });
        }
        
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setIsbn(bookDetails.getIsbn());
        book.setPublisher(bookDetails.getPublisher());
        book.setPublishedDate(bookDetails.getPublishedDate());
        book.setCategory(bookDetails.getCategory());
        book.setDescription(bookDetails.getDescription());
        book.setAvailableCopies(bookDetails.getAvailableCopies());
        book.setTotalCopies(bookDetails.getTotalCopies());
        book.setCoverImageUrl(bookDetails.getCoverImageUrl());
        
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
    }

    public List<Book> searchBooksByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Book> searchBooksByAuthor(String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }

    public List<Book> getBooksByCategory(String category) {
        return bookRepository.findByCategory(category);
    }
}
