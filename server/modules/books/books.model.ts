import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "books" })
export default class Book {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  name: string;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  author: string;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  publisher: string;

  @Column({
    nullable: false,
    type: "int",
  })
  publicationYear: number;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  subject: string;

  @Column({
    nullable: false,
    type: "int",
    default: 1,
  })
  count: number;
}
