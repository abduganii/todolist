import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn ,BaseEntity} from "typeorm";



@Entity({ name: 'list' })
export class List extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;
  
    @Column('boolean', { default: false })
    isChecked: boolean = false;

}