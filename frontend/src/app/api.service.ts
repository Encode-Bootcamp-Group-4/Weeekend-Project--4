import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private http: HttpClient) {}

    // getContractAddress(): Observable<any> {  
    //     return this.http.get('http://localhost:3000/token-address');
    // }

    postMintTokens(address: string, amount: number): Observable<any> {
        return this.http.post('http://194.233.174.186:3000/mint-tokens?to=' + address + '&amt=' + amount, {});
    }
}

