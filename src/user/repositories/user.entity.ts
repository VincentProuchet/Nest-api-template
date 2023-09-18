import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: "user",
  orderBy: {
      email: "ASC",
      id: "DESC",
  },
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 64 })
  email: string;

  @Column()
  password: string;
}
