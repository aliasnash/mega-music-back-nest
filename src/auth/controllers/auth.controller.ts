import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { OtpDto, VerifyDto } from '../dto/auth.dto';
import { AuthCodeResponseDto } from '../../common/dto/response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('otp')
    @ApiOperation({ summary: 'Отправить OTP', description: 'Запрашивает отправку одноразового кода на указанный номер телефона.' })
    @ApiBody({ type: OtpDto })
    @ApiResponse({ status: 200, description: 'OTP успешно запрошен', type: AuthCodeResponseDto })
    otp(@Body() body: OtpDto): AuthCodeResponseDto {
        return this.authService.otp(body.msisdn);
    }

    @Public()
    @Post('verify')
    @ApiOperation({ summary: 'Проверить OTP', description: 'Проверяет одноразовый код, отправленный на номер телефона.' })
    @ApiBody({ type: VerifyDto })
    @ApiResponse({ status: 200, description: 'Результат проверки OTP', type: AuthCodeResponseDto })
    verify(@Body() body: VerifyDto): AuthCodeResponseDto {
        return this.authService.verify(body.msisdn, body.code);
    }
}
