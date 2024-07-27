export interface Game{
  id: number;
  name: string;
  price: number;
  genre: string;
  releaseDate: string; 
  developers: string[];
  description: string;
  imagePath:string;
  bannerPath:string;
}