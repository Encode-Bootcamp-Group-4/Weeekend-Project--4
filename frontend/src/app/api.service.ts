import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private http: HttpClient) {}

    postMintTokens(address: string, amount: number): Observable<any> {
        return this.http.post('http://194.233.174.186:3000/mint-tokens?to=' + address + '&amt=' + amount, {});
    }
    
}

