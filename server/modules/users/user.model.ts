import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  firstName: string;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  lastName: string;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  email: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  password: string;
}
