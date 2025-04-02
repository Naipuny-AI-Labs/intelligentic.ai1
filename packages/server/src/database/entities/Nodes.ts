import { INodes } from '../../Interface'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('nodes')
export class Nodes implements INodes {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    accesstype: string

    @Column({ type: 'text' })
    nodeData: string

    @Column({ type: 'timestamp' })
    @CreateDateColumn()
    createdDate: Date

    @Column({ type: 'timestamp' })
    @UpdateDateColumn()
    updatedDate: Date
}
