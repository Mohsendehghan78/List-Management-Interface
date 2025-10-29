export interface Item {
    id: string;
    title: string;
    subtitle: string;
    createdAt: Date;
    updatedAt?: Date;
  }
  
  export interface ItemFormData {
    title: string;
    subtitle: string;
  }