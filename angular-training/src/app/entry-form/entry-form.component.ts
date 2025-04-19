import { Component,EventEmitter,Output ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsModule} from '@angular/forms';
import { SupabaseService } from '../supabase.service';


@Component({
  selector: 'app-entry-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent  implements OnInit{
  date :string=new Date().toISOString().substring(0,10);
  subject:string='';
  minutes:number=30;
  subjects:string[]=[];

  newSubject:string='';

  @Output() entryAdd=new EventEmitter<{
    date:string;
    subject:string;
    minutes:number;
  }>();

  constructor(private supabaseService:SupabaseService){}

  async addSubject(){
    if(!this.newSubject.trim())return;

    await this.supabaseService.addSubject(this.newSubject);
    this.subjects=await this.supabaseService.getSubject();
    this.newSubject='';
  }

  async deleteSubject(name:string){
    await this.supabaseService.deleteSubject(name);
    this.subjects=await this.supabaseService.getSubject();
  }

  async ngOnInit(){
    this.subjects=await this.supabaseService.getSubject();
    console.log('✅ subjects:', this.subjects);
    if(this.subjects.length>0){
      this.subject=this.subjects[0];
    }
  }

  submitForm(){
    this.entryAdd.emit({
      date:this.date,
      subject:this.subject,
      minutes:this.minutes,
    });
    this.minutes=30;
  }

  
}
