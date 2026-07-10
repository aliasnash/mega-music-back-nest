import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OtpDto {
    @ApiProperty({ description: 'Номер телефона (MSISDN)', example: '79001234567' })
    @IsString()
    @IsNotEmpty()
    msisdn: string;
}

export class VerifyDto {
    @ApiProperty({ description: 'Номер телефона (MSISDN)', example: '79001234567' })
    @IsString()
    @IsNotEmpty()
    msisdn: string;

    @ApiProperty({ description: 'OTP-код подтверждения', example: '1234' })
    @IsString()
    @IsNotEmpty()
    code: string;
}
