import { plainToInstance } from "class-transformer";

export class SomeTypeDto {
  name: string;
  addr: string;

  constructor(name: string, addr: string) {
    this.name = name;
    this.addr = addr;
  }
}

class ArticleDto {
  someValue: SomeTypeDto;

  constructor(someValue: SomeTypeDto) {
    this.someValue = someValue;
  }
}

const someValidationValue = new SomeTypeDto("test", "test");

const articleDto = new ArticleDto(someValidationValue);

const plain = plainToInstance(ArticleDto, articleDto);

console.log(plain);
