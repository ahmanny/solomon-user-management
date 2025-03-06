import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDateString, IsArray, ValidateNested } from 'class-validator';


export class UserInfoDto {
  // User Info dto
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

}

export class UserContactDto {
  // User Contact
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  linkedInUrl?: string;
}

export class UserAddressDto {
  // User Address
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;
}



export class UserAcademicsDto {

  // User Academics
  @IsArray()
  @IsString({ each: true })
  pastSchools: string[];
}



// create use dto
export class CreateUserDto {
  @ValidateNested()
  @Type(() => UserInfoDto)
  userInfo: UserInfoDto


  @ValidateNested()
  @Type(() => UserContactDto)
  userContact: UserContactDto


  @ValidateNested()
  @Type(() => UserAddressDto)
  userAddress: UserAddressDto


  @ValidateNested()
  @Type(() => UserAcademicsDto)
  userAcademics: UserAcademicsDto

}
