import { plainToInstance } from "class-transformer";

export interface SomeTypeDto {
  name: string;
  addr: string;
}

class ArticleDto {
  someValue: SomeTypeDto | null;

  constructor(args: { someValue: SomeTypeDto | null } = { someValue: null }) {
    this.someValue = args.someValue;
  }
}

const someValidationValue: SomeTypeDto = {
  name: "test",
  addr: "test",
};

const articleDto = new ArticleDto({ someValue: someValidationValue });

const plain = plainToInstance(ArticleDto, articleDto);

console.log(plain);
