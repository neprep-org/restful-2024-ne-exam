import AppDataSource from "../../db/data-source";
import User from "./books.model";

const BooksRepository = AppDataSource.getRepository(User);

export default BooksRepository;
