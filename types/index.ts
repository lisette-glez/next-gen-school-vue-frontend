export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {  
  email: string;
  password: string; 
}

export interface User {  
  email: string;
  email_verified_at?: Date;
  id: number;
  name: string;
  two_factor_confirmed_at?: Date;
  two_factor_recovery_codes?: number;
  two_factor_secret?: string;
  updated_at: Date;
  created_at: Date;
}

export interface Course {  
  id: number;
  title: string;
  description: string;
  price: number; 
  modules: Module[];
  content: string;
  choices: any;  
}

export interface Module {  
  id: number;
  title: string;
  description: string; 
  course: Course
}

export interface Lesson {  
  id: number;
  title: string;
  description: string;
  content: number; 
  module: Module  
}

export interface AccordionItem {
  title: string;
  description?: string;
  content?: string;
  lessons?: AccordionItem[];
}