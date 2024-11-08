import "reflect-metadata";
import { plainToInstance, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  validate,
  ValidateNested,
} from "class-validator";

export class SomeTypeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  addr!: string;
}

class ArticleDto {
  @ValidateNested()
  @Type(() => SomeTypeDto)
  someValue!: SomeTypeDto;
}

const someValidationValue = {
  name: "test",
  addr: "test",
};

const plain = plainToInstance(ArticleDto, {
  someValue: someValidationValue,
} satisfies ArticleDto);

console.log(plain); // ArticleDto { someValue: SomeTypeDto { name: 'test', addr: 'test' } }
// Validation 진행
validate(plain).then((errors) => {
  if (errors.length > 0) {
    console.log("Validation failed. Errors:", errors);
  } else {
    console.log("Validation succeeded:", plain);
  }
});

const someValidationValue2 = {
  name: "test",
};

const errorPlain = plainToInstance(ArticleDto, {
  someValue: someValidationValue2,
});

console.log(errorPlain);

// Validation 진행
validate(errorPlain).then((errors) => {
  if (errors.length > 0) {
    console.log("Validation failed. Errors:", errors[0]?.constraints);
  } else {
    console.log("Validation succeeded:", errorPlain);
  }
});
