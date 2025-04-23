export interface Serie {
    id: string;
    title: string;
    thumbnailUrl: string;
    genre: string[];
    age: string;
    duration: string;
  }
  
  export interface BlockSeriesProps {
    title: string;
    series: Serie[];
  }
  