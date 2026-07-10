import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    otp(_msisdn: string): { code: number } {
        return { code: 0 };
    }

    verify(_msisdn: string, _code: string): { code: number } {
        return { code: 0 };
    }
}
