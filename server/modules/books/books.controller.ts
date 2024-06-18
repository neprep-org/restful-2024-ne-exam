import { Request, Response, NextFunction } from "express";
import {
  CreateBookValidationSchema,
  GetAllBooksQueryValidationSchema,
} from "./books.validations";
import ApiResponse from "../../common/api_response";
import BooksRepository from "./books.repository";

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, author, publisher, publicationYear, subject, count } =
      await CreateBookValidationSchema.validateAsync(req.body);

    const bookExist = await BooksRepository.existsBy({
      name,
      author,
      publisher,
      publicationYear,
      subject,
    });

    // check if provided book exist, if yes, update it's count only
    if (bookExist) {
      const book = await BooksRepository.findOne({
        where: {
          name,
          author,
          publisher,
          publicationYear,
          subject,
        },
      });

      if (!book) {
        return ApiResponse.error(res, "Book not found", 404);
      }

      count ? (book.count = count) : (book.count += 1);

      const updatedBook = await BooksRepository.save(book);

      if (!updatedBook) {
        return ApiResponse.error(res, "Failed to update book", 400);
      }

      return ApiResponse.success(
        res,
        { ...updatedBook },
        "Book updated successfully",
        200
      );
    }

    // create new book
    const book = BooksRepository.create({
      name,
      author,
      publisher,
      publicationYear,
      subject,
    });

    const newBook = await BooksRepository.save(book);

    if (!newBook) {
      return ApiResponse.error(res, "Failed to create user", 400);
    }

    return ApiResponse.success(
      res,
      { ...newBook },
      "Book created successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10000 } =
      await GetAllBooksQueryValidationSchema.validateAsync(req.query);

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [books, totalBooksType] = await BooksRepository.findAndCount({
      skip,
      take,
      order: { updatedAt: "DESC" },
    });

    const totalPages = Math.ceil(
      totalBooksType / parseInt(limit as string, 10)
    );

    // calculate total books by taking their count into consideratoins
    const totalBooks = books.reduce((acc, book) => acc + book.count, 0);

    return ApiResponse.success(
      res,
      {
        books,
        totalBooksType,
        totalBooks,
        totalPages,
        currentPage: Number(page),
      },
      "All books fetched successfully",
      200
    );
  } catch (error) {
    next(error);
  }
};
