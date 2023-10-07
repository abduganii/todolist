import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn ,BaseEntity} from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: 'list' })
export class List extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;
  
    @Column('boolean', { default: false })
    isChecked: boolean = false;

    @ManyToOne(() => User, (user) => user.list, {
        cascade: true,
        onDelete: 'CASCADE',
      })
    @JoinColumn()
      user: User;
}