import AppDataSource from "../../db/data-source";
import Book from "./books.model";

const BooksRepository = AppDataSource.getRepository(Book);

export default BooksRepository;
