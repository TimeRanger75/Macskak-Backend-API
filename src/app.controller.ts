import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import MacskakDto from './macskak.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get('/api/cats')
    async allCats(){
      const [macskak]=await db.execute('SELECT id, suly, szem_szin FROM macskak ORDER BY id');
      return {macskak:macskak};
    };

    @Get('/api/cats/:id')
    async Cat(@Param('id')id:number){
      const [cat]=await db.execute('SELECT id, suly, szem_szin FROM macskak WHERE id=?', [id]);
      return cat[0];
    };

    @Delete('/api/cats/:id')
      async deleteCat(@Param('id')id:number){
        const [cat]=await db.execute('DELETE FROM macskak WHERE id=?', [id]);
      };

      @Post('/api/cats')
      async insertCat(@Body() catData:MacskakDto){
        await db.execute('INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)', 
        [catData.suly,
        catData.szem_szin]);
       
      }
  
}
