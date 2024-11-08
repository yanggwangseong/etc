import { plainToInstance } from "class-transformer";

export interface SomeTypeDto {
  name: string;
  addr: string;
}

type Constructor<T = {}> = new (...args: any[]) => T;

class ArticleDto {
  someValue: SomeTypeDto;

  constructor(someValue: SomeTypeDto) {
    this.someValue = someValue;
  }
}

function mixinFunction<TBase extends Constructor>(
  Base: TBase,
  { someValue }: { someValue: SomeTypeDto }
) {
  return class extends Base {
    someValue: SomeTypeDto;

    constructor(...args: any[]) {
      super(...args);
      this.someValue = someValue;
    }
  };
}

const someValidationValue: SomeTypeDto = {
  name: "test",
  addr: "test",
};

const articleDto = new (mixinFunction(ArticleDto, {
  someValue: someValidationValue,
}))(someValidationValue);

const plain = plainToInstance(ArticleDto, articleDto);

console.log(plain); // ArticleDto { someValue: { name: 'test', addr: 'test' } }
