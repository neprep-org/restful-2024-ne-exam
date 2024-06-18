import { Request, Response, NextFunction } from "express";
import CreateBookValidationSchema from "./books.validations";
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
      "User created successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};
