# class-transformer plainToInstance 사용시 constructor의 argument 전달시 주의사항

```ts
import { plainToInstance } from "class-transformer";

export interface SomeTypeDto {
  name: string;
  addr: string;
}

class ArticleDto {
  someValue: SomeTypeDto;

  constructor(args: { someValue: SomeTypeDto }) {
    // 'TypeError: Cannot read properties of undefined (reading 'someValue')' 에러 발생
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
```

## 해결방법 1

```ts
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
  someValue?: SomeTypeDto;

  constructor(args: { someValue: SomeTypeDto }) {
    if (args) {
      this.someValue = args.someValue;
    }
  }
}

const someValidationValue = new SomeTypeDto("test", "test");

const articleDto = new ArticleDto({ someValue: someValidationValue });

const plain = plainToInstance(ArticleDto, articleDto);

console.log(plain);
// 결과 ArticleDto { someValue: SomeTypeDto { name: 'test', addr: 'test' } }
```

## 해결방법 2

```ts
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
```

## 문제 발생 원인

> 아래는 plainToInstance의 실제 내부 로직 레퍼런스입니다
> [new (targetType as any)()](https://github.com/typestack/class-transformer/blob/a073b5ea218dd4da9325fe980f15c1538980500e/src/TransformOperationExecutor.ts#L160)

**class-transforemr의 plainToInstance 에서는 생성자 함수를 호출 할때 arguments를 넘겨주지 않습니다**
**해당 에러가 발생하는데 결국 이것은 args가 undefined인데 someValue를 참조 할려고 하니까 발생하는 에러라는것을 알 수 있었습니다.**
