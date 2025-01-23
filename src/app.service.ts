import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getAnimals(lang){
    const animals = {
      ka:[
        {id:1,name:"cxeni",color:"shavi"}
      ],
      en:[{id:1,name:"horse",color:"black"}]
    }
    return animals[lang]
  }
}
