import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
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
    length: 50,
    nullable: false,
    type: "varchar",
  })
  publicationYear: string;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  subject: string;
}
